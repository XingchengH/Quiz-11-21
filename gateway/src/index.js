import express from "express";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";

const app = express();
app.use(cors());
app.use(express.json());

// INIT SERVICE
app.use(
  "/api/init",
  createProxyMiddleware({
    target: "http://localhost:4101",
    changeOrigin: true,
    pathRewrite: { "^/api/init": "/init" },
    onProxyReq: (proxyReq, req) => {
      const body = JSON.stringify(req.body);      
      proxyReq.setHeader("Content-Type", "application/json");
      proxyReq.setHeader("Content-Length", Buffer.byteLength(body));
      proxyReq.write(body);
    },
  })
);

// PRODUCT SERVICE (no need pathRewrite per-route)
app.use(
  "/api",
  createProxyMiddleware({
    target: "http://localhost:4002",
    changeOrigin: true,
    pathRewrite: { "^/api": "" },
  })
);

app.listen(5000, () => console.log("API Gateway on 5000"));
