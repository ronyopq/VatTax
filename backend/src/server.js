import http from "node:http";
import { categories } from "./categories.js";
import { calculate, validateCalculationPayload } from "./calculate.js";

const PORT = Number(process.env.PORT || 8788);

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization"
  });
  res.end(JSON.stringify(payload));
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";
    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Payload too large"));
      }
    });
    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error("Invalid JSON"));
      }
    });
    req.on("error", reject);
  });
}

const server = http.createServer(async (req, res) => {
  const url = new URL(req.url || "/", `http://${req.headers.host}`);
  const pathname = url.pathname;

  if (req.method === "OPTIONS") {
    sendJson(res, 204, {});
    return;
  }

  if (req.method === "GET" && pathname === "/api/v1/health") {
    sendJson(res, 200, { ok: true, service: "vat-backend-mvp", now: new Date().toISOString() });
    return;
  }

  if (req.method === "GET" && pathname === "/api/v1/categories") {
    sendJson(res, 200, { items: categories });
    return;
  }

  if (req.method === "POST" && pathname === "/api/v1/calculate") {
    try {
      const body = await readBody(req);
      const validation = validateCalculationPayload(body);
      if (!validation.ok) {
        sendJson(res, 400, { ok: false, error: validation.error });
        return;
      }

      const result = calculate(validation.data);
      sendJson(res, 200, { ok: true, result });
      return;
    } catch (error) {
      sendJson(res, 400, { ok: false, error: error.message || "Bad request" });
      return;
    }
  }

  sendJson(res, 404, { ok: false, error: "Not found" });
});

server.listen(PORT, () => {
  console.log(`VAT backend MVP listening on http://localhost:${PORT}`);
});
