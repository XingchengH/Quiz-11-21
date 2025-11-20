const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// =============================================
// In-memory product store (empty at backend start)
// =============================================
let products = [];

// =============================================
// POST /api/init
// Receives the initial products array from frontend
// =============================================
app.post("/api/init", (req, res) => {
  const incoming = req.body;

  if (!Array.isArray(incoming)) {
    return res.status(400).json({ message: "Invalid data format" });
  }

  products = incoming;
  console.log("✅ Backend initialized with", products.length, "products");

  return res.json({ message: "Initialization successful" });
});

// =============================================
// GET /api/products
// Return all products
// =============================================
app.get("/api/products", (req, res) => {
  res.json(products);
});

// =============================================
// GET /api/products/:id
// Return single product by ID
// =============================================
app.get("/api/products/:id", (req, res) => {
  const id = Number(req.params.id);
  const product = products.find((p) => p.id === id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.json(product);
});

// =============================================
// GET /api/products/search?query=
// Search by name (case-insensitive)
// =============================================
app.get("/api/products/search", (req, res) => {
  const q = (req.query.query || "").toLowerCase();

  const result = products.filter((p) => p.name.toLowerCase().includes(q));

  res.json(result);
});

// =============================================
// GET /api/products/category/:cat
// Filter by category (exact match, case-insensitive)
// =============================================
app.get("/api/products/category/:cat", (req, res) => {
  const cat = req.params.cat.toLowerCase();

  const result = products.filter((p) => p.category.toLowerCase() === cat);
  console.log(result);

  res.json(result);
});

// =============================================
app.listen(5000, () => {
  console.log("🚀 Backend server running on http://localhost:5000");
});
