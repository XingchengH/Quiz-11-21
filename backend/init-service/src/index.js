import express from "express";
import cors from "cors";
import { products } from "./store.js";

const app = express();
app.use(cors());
app.use(express.json());

// Receive initial data
app.post("/init", (req, res) => {
  if (!Array.isArray(req.body)) {
    return res.status(400).json({ message: "Invalid data" });
  }

  products.length = 0;
  products.push(...req.body);

  console.log("Init Service stored", products.length, "products");
  res.json({ message: "OK" });
});

// Product Service fetches here
app.get("/api/products", (req, res) => {
  res.json(products);
});

app.listen(4101, () => console.log("Init Service running on port 4101"));
