import express, { Request, Response } from "express"; // ✅ Import NextFunction
import Quote from "../models/Quote";
import {asyncHandler} from "../utils/asyncHandler";

const router = express.Router();

// ✅ POST /api/request-quote → Create a new quote request
router.post("/request-quote", asyncHandler(async (req: Request, res: Response) => {
  console.log("🔍 Received data:", req.body);

  const { name, email, phone, movingDate, movingSize, movingFrom, movingTo, additionalDetails } = req.body;

  if (!name || !email || !phone || !movingDate || !movingSize || !movingFrom || !movingTo) {
    console.log("⚠️ Missing required fields!");
    return res.status(400).json({ message: "All required fields must be filled!" });
  }

  const newQuote = new Quote({ name, email, phone, movingDate, movingSize, movingFrom, movingTo, additionalDetails });
  await newQuote.save();

  console.log("✅ Quote saved successfully:", newQuote);
  return res.status(201).json({ message: "Quote request submitted successfully!", quote: newQuote });
}));

// ✅ GET /api/quotes → Get all quotes
router.get("/quotes", asyncHandler(async (req: Request, res: Response) => {
  const quotes = await Quote.find().sort({ createdAt: -1 });
  res.status(200).json(quotes);
}));

export default router;
