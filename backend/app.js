import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

import ProductRoute from "./routes/product.route.js";

// =============================================
// In-memory product store (empty at backend start)
// =============================================
export let products = [];

// =============================================
// POST /api/init
// Receives the initial products array from frontend
// =============================================
app.post("/api/init", (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  products = req.body;
  console.log("✅ Backend initialized with", products.length, "products");

  return res.json({ message: "Initialization successful" });
});

app.use("/api/products", ProductRoute);

// =============================================
app.listen(5000, () => {
  console.log("🚀 Backend server running on http://localhost:5000");
});
