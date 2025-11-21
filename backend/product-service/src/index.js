import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

// Helper: get current products
async function fetchProducts() {
  const res = await fetch("http://localhost:4101/products");
  return res.json();
}

// Return all products
app.get("/products", async (req, res) => {
  const products = await fetchProducts();
  res.json(products);
});

// Search
app.get("/products/search", async (req, res) => {
  const q = (req.query.query || "").toLowerCase();
  const products = await fetchProducts();
  res.json(products.filter(p => p.name.toLowerCase().includes(q)));
});

// Filter by category
app.get("/products/category/:cat", async (req, res) => {
  const cat = req.params.cat.toLowerCase();
  const products = await fetchProducts();
  res.json(products.filter(p => p.category.toLowerCase() === cat));
});

// Get by ID
app.get("/products/:id", async (req, res) => {
  const products = await fetchProducts();
  const product = products.find(p => p.id === Number(req.params.id));
  if (!product) return res.status(404).json({ message: "Not found" });
  res.json(product);
});

app.listen(4002, () =>
  console.log("🚀 Product Service running on port 4002")
);
