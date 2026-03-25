import http from "node:http";
import { categories } from "./categories.js";
import { calculate, validateCalculationPayload } from "./calculate.js";

const PORT = Number(process.env.PORT || 8788);
const HISTORY_LIMIT = 500;
const historyStore = [];

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

function normalizeHistoryRow(row) {
  if (!row || typeof row !== "object") return null;

  const historyId = String(row.historyId || `history-${Date.now()}-${Math.floor(Math.random() * 10000)}`);
  const mode = ["gross", "vendor", "category"].includes(row.mode) ? row.mode : "gross";
  const bill = Number(row.bill);
  const vatRate = Number(row.vatRate);
  const taxRate = Number(row.taxRate);
  const payableAmount = Number(row.payableAmount);

  if (!Number.isFinite(bill) || bill <= 0) return null;
  if (!Number.isFinite(vatRate) || vatRate < 0 || vatRate > 100) return null;
  if (!Number.isFinite(taxRate) || taxRate < 0 || taxRate > 100) return null;
  if (!Number.isFinite(payableAmount) || payableAmount < 0) return null;

  return {
    historyId,
    mode,
    bill,
    vatRate,
    taxRate,
    vatAmount: Number(row.vatAmount) || 0,
    taxAmount: Number(row.taxAmount) || 0,
    totalDeduction: Number(row.totalDeduction) || 0,
    grossAmount: Number(row.grossAmount) || 0,
    payableAmount,
    categoryName: String(row.categoryName || ""),
    categoryId: String(row.categoryId || ""),
    languageAtCalculation: String(row.languageAtCalculation || "en"),
    calculatedAt: row.calculatedAt ? new Date(row.calculatedAt).toISOString() : new Date().toISOString(),
    syncedAt: new Date().toISOString()
  };
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

  if (req.method === "GET" && pathname === "/api/v1/history") {
    sendJson(res, 200, { items: historyStore.slice(0, HISTORY_LIMIT) });
    return;
  }

  if (req.method === "POST" && pathname === "/api/v1/history") {
    try {
      const body = await readBody(req);
      const rows = Array.isArray(body?.items)
        ? body.items
        : (body && typeof body === "object" ? [body] : []);

      if (rows.length === 0) {
        sendJson(res, 400, { ok: false, error: "history payload is required" });
        return;
      }

      const accepted = [];
      rows.forEach((row) => {
        const normalized = normalizeHistoryRow(row);
        if (!normalized) return;
        const existingIndex = historyStore.findIndex((item) => item.historyId === normalized.historyId);
        if (existingIndex >= 0) {
          historyStore[existingIndex] = normalized;
        } else {
          historyStore.unshift(normalized);
        }
        accepted.push(normalized.historyId);
      });

      if (historyStore.length > HISTORY_LIMIT) {
        historyStore.splice(HISTORY_LIMIT);
      }

      sendJson(res, 200, {
        ok: true,
        accepted: accepted.length,
        total: historyStore.length,
        ids: accepted
      });
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
