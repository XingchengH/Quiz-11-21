import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors());
app.use(express.json());

// =====================
// INIT SERVICE (POST)
// =====================
app.use(
  "/api/init",
  createProxyMiddleware({
    target: "http://localhost:4101",
    changeOrigin: true,
    pathRewrite: {
      "^/api/init": "/init",
    },
    onProxyReq: (proxyReq, req) => {
      if (req.body) {
        const bodyData = JSON.stringify(req.body);
        proxyReq.setHeader("Content-Type", "application/json");
        proxyReq.setHeader("Content-Length", Buffer.byteLength(bodyData));
        proxyReq.write(bodyData);
      }
    },
  })
);

// =====================
// PRODUCT SERVICE
// =====================
app.use(
  "/api/products",
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true,
    pathRewrite: {
      "^/api/products": "/products",
    },
  })
);

app.listen(5000, () => console.log("API Gateway on 5000"));
