import express from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { createClient } from "redis";
import cookieParser from "cookie-parser";
import path from "path";
import quoteRoutes from "./routes/quoteRoutes";

// ✅ Manually specify the .env path
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// ✅ Allowed Frontend Domains
const allowedOrigins = [
    "https://reimagined-enigma-r4pj75q447qv256vw-5173.app.github.dev",
    "http://localhost:5173"
  ];
console
// ✅ CORS Middleware - Allow Requests from Frontend
app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("CORS policy does not allow this origin"), false);
        }
    },
    credentials: true,
    methods: ["GET", "HEAD", "PUT", "PATCH", "POST", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// // ✅ Handle Preflight Requests (OPTIONS)
app.options("*", cors());

// // ✅ Handle Preflight Requests (OPTIONS)
// app.options("*", (req, res) => {
//     res.sendStatus(204);
// });

// ✅ Middleware to Set Headers on Every Response
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && allowedOrigins.includes(origin)) {
      res.header("Access-Control-Allow-Origin", origin);
    }
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    next();
});

// ✅ Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Prevents blocking inline scripts/styles
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

//✅ Fix: Enable Trust Proxy for rate limit to work correctly
app.set("trust proxy", 1); 

// ✅ Rate Limiting
app.use(rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per window
  standardHeaders: true,
  legacyHeaders: false,
}));

// ✅ Middleware Setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ✅ Set up EJS for dynamic SEO meta tags
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// ✅ Connect MongoDB
const mongoUri = process.env.MONGO_URI;

if (!mongoUri) {
  console.error("❌ MONGO_URI is missing in .env file!");
  process.exit(1); // Exit if MongoDB URI is missing
}

mongoose.connect(process.env.MONGO_URI as string)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Connect Redis (Better Error Handling)
const redisClient = createClient({ legacyMode: true });

redisClient.on("error", (err) => console.error("❌ Redis Connection Error:", err));
redisClient.connect()
    .then(() => console.log("✅ Redis Connected"))
    .catch(err => console.error("❌ Redis Connection Failed:", err));

// ✅ Dynamic Meta Tags Route for SEO
app.get("/meta/:slug", (req, res) => {
    const slug = req.params.slug;

    // Example meta info
    const pageTitle = `Moving Services in ${slug} - OC Pro Movers`;
    const pageDescription = `Looking for reliable moving services in ${slug}? OC Pro Movers provides top-rated local and long-distance moving services. Get a free quote today!`;
    const pageImage = "https://www.ocpromovers.com/logo.png";
    const pageUrl = `https://www.ocpromovers.com/${slug}`;

    res.render("meta", {
        title: pageTitle,
        description: pageDescription,
        url: pageUrl,
        image: pageImage,
    });
});

// ✅ Register API routes
app.use("/api", quoteRoutes);

// ✅ Default API Route
app.get("/", (req, res) => {
    res.send("Welcome to the Home Haulers API!");
});


// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

export default app;