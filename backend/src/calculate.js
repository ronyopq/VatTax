import { categories } from "./categories.js";

function round2(value) {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

export function validateCalculationPayload(payload) {
  if (!payload || typeof payload !== "object") {
    return { ok: false, error: "Invalid payload" };
  }

  const mode = payload.mode;
  if (!["gross", "vendor", "category"].includes(mode)) {
    return { ok: false, error: "mode must be gross, vendor, or category" };
  }

  const bill = Number(payload.bill);
  if (!Number.isFinite(bill) || bill <= 0 || bill > 10000000) {
    return { ok: false, error: "bill must be > 0 and <= 10000000" };
  }

  let vatRate = Number(payload.vatRate);
  let taxRate = Number(payload.taxRate);

  if (mode === "category") {
    const category = categories.find((item) => item.code === payload.categoryCode);
    if (!category) {
      return { ok: false, error: "categoryCode is required for category mode" };
    }
    vatRate = category.vatRate;
    taxRate = category.taxRate;
  }

  if (!Number.isFinite(vatRate) || !Number.isFinite(taxRate)) {
    return { ok: false, error: "vatRate and taxRate must be valid numbers" };
  }

  if (vatRate < 0 || vatRate > 100 || taxRate < 0 || taxRate > 100) {
    return { ok: false, error: "vatRate and taxRate must be between 0 and 100" };
  }

  return {
    ok: true,
    data: {
      mode,
      bill: round2(bill),
      vatRate: round2(vatRate),
      taxRate: round2(taxRate),
      categoryCode: payload.categoryCode || null
    }
  };
}

export function calculate(payload) {
  const totalRate = payload.vatRate + payload.taxRate;

  let payableAmount;
  let grossAmount;

  if (payload.mode === "vendor") {
    payableAmount = round2(payload.bill / (1 + totalRate / 100));
    grossAmount = round2(payload.bill);
  } else {
    payableAmount = round2(payload.bill);
  }

  const vatAmount = round2(payableAmount * payload.vatRate / 100);
  const taxAmount = round2(payableAmount * payload.taxRate / 100);
  const totalDeduction = round2(vatAmount + taxAmount);

  if (payload.mode !== "vendor") {
    grossAmount = round2(payableAmount + totalDeduction);
  }

  return {
    mode: payload.mode,
    bill: payload.bill,
    vatRate: payload.vatRate,
    taxRate: payload.taxRate,
    vatAmount,
    taxAmount,
    totalDeduction,
    payableAmount,
    grossAmount,
    categoryCode: payload.categoryCode,
    calculatedAt: new Date().toISOString()
  };
}
