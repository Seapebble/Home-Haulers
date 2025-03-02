import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import mongoose from "mongoose";
import { createClient } from "redis";
import cookieParser from "cookie-parser";
import path from "path";

// ✅ Manually specify the .env path
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const app = express();

// ✅ Allowed Frontend Domains
const allowedOrigins = [
    "http://localhost:5173",  // Local Dev Frontend
    "https://reimagined-enigma-r4pj75q447qv256vw-5173.app.github.dev", // GitHub Codespace Frontend
];

// ✅ CORS Middleware - Allow Requests from Frontend
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
    optionsSuccessStatus: 200,
    allowedHeaders: ["Content-Type", "Authorization"],
}));

// ✅ Security Middleware
app.use(helmet({
    contentSecurityPolicy: false, // Prevents blocking inline scripts/styles
    crossOriginResourcePolicy: { policy: "cross-origin" }
}));

// ✅ Fix: Enable Trust Proxy for rate limit to work correctly
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

// ✅ Default API Route
app.get("/", (req, res) => {
    res.send("OC Pro Movers API is running...");
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
