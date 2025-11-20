import { Router } from "express";
import { products } from "../app.js";
const router = Router();

// =============================================
// GET /api/products
// Return all products
// =============================================
router.get("/", (req, res) => {
  res.json(products);
});

// =============================================
// GET /api/products/search?query=
// Search by name (case-insensitive)
// =============================================
router.get("/search", (req, res) => {
  const q = (req.query.query || "").toLowerCase();

  const result = products.filter((p) => p.name.toLowerCase().includes(q));

  res.json(result);
});

// =============================================
// GET /api/products/category/:cat
// Filter by category (exact match, case-insensitive)
// =============================================
router.get("/category/:cat", (req, res) => {
  const cat = req.params.cat.toLowerCase();

  const result = products.filter((p) => p.category.toLowerCase() === cat);
  console.log(result);

  res.json(result);
});

// =============================================
// GET /api/products/:id
// Return single product by ID
// =============================================
router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

export default router;
