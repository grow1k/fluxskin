import type { Wear } from "./types";

export const WEAR_LABEL: Record<Wear, string> = {
  "Factory New": "Прямо с завода",
  "Minimal Wear": "Немного поношенное",
  "Field-Tested": "После полевых",
  "Well-Worn": "Поношенное",
  "Battle-Scarred": "Закалённое в боях",
};

export const WEAR_SHORT: Record<Wear, string> = {
  "Factory New": "FN",
  "Minimal Wear": "MW",
  "Field-Tested": "FT",
  "Well-Worn": "WW",
  "Battle-Scarred": "BS",
};

export function wearFromFloat(f: number): Wear {
  if (f < 0.07) return "Factory New";
  if (f < 0.15) return "Minimal Wear";
  if (f < 0.38) return "Field-Tested";
  if (f < 0.45) return "Well-Worn";
  return "Battle-Scarred";
}

export function clampFloat(value: number, min: number, max: number): number {
  const lo = Number.isFinite(min) ? min : 0;
  const hi = Number.isFinite(max) ? max : 1;
  return Math.min(hi, Math.max(lo, value));
}

export function randomFloat(min: number, max: number): number {
  const lo = Number.isFinite(min) ? min : 0;
  const hi = Number.isFinite(max) ? max : 1;
  const t = Math.random();
  const biased = t * t * 0.55 + t * 0.45;
  return Number((lo + (hi - lo) * biased).toFixed(10));
}

export function formatFloat(n: number): string {
  return n.toFixed(8).replace(/0+$/, "0");
}
