import { SKINS } from "./data";
import type { FluxCase, Skin } from "./types";

export const CASES: FluxCase[] = [
  {
    id: "flux-core",
    name: "Flux Core",
    nameRu: "Flux Core",
    blurb: "Винтовки и пистолеты — основа любого лоадаута.",
    tone: "core",
  },
  {
    id: "prime-line",
    name: "Prime Line",
    nameRu: "Prime Line",
    blurb: "Классика: Asiimov, Redline, Printstream и соседние тайные.",
    tone: "prime",
  },
  {
    id: "night-shift",
    name: "Night Shift",
    nameRu: "Night Shift",
    blurb: "Тёмные финиши, перчатки и скрытые ножи.",
    tone: "night",
  },
  {
    id: "edge-protocol",
    name: "Edge Protocol",
    nameRu: "Edge Protocol",
    blurb: "Ножи, перчатки и верхняя редкость.",
    tone: "edge",
  },
];

const byRarity = (cat: string[], rarities: string[]) =>
  SKINS.filter((s) => cat.includes(s.category) && rarities.includes(s.rarity));

const CORE_POOL = {
  milspec: byRarity(["Rifles", "Pistols", "SMGs"], ["Mil-Spec Grade"]),
  restricted: byRarity(["Rifles", "Pistols"], ["Restricted"]),
  classified: byRarity(["Rifles", "Pistols"], ["Classified"]),
  covert: byRarity(["Rifles", "Pistols"], ["Covert"]),
  gold: SKINS.filter((s) => s.category === "Knives").slice(0, 40),
};

const PRIME_PATTERNS = [
  "Asiimov",
  "Redline",
  "Printstream",
  "Neo-Noir",
  "Hyper Beast",
  "The Empress",
  "Bloodsport",
  "Vulcan",
  "Fade",
  "Lightning Strike",
  "Howl",
  "Dragon Lore",
  "Kill Confirmed",
  "Blaze",
  "Hot Rod",
  "Mecha Industries",
];

const PRIME_SKINS = SKINS.filter((s) => PRIME_PATTERNS.includes(s.pattern));

const PRIME_POOL = {
  milspec: PRIME_SKINS.filter((s) => s.rarity === "Mil-Spec Grade").concat(
    CORE_POOL.milspec,
  ),
  restricted: PRIME_SKINS.filter((s) => s.rarity === "Restricted").concat(
    CORE_POOL.restricted,
  ),
  classified: PRIME_SKINS.filter((s) => s.rarity === "Classified").concat(
    CORE_POOL.classified,
  ),
  covert: PRIME_SKINS.filter((s) => s.rarity === "Covert").concat(CORE_POOL.covert),
  gold: SKINS.filter((s) => s.category === "Knives" && ["Fade", "Doppler", "Marble Fade", "Tiger Tooth", "Slaughter"].includes(s.pattern)),
};

const NIGHT_POOL = {
  milspec: byRarity(["SMGs", "Heavy", "Pistols"], ["Mil-Spec Grade", "Industrial Grade"]),
  restricted: byRarity(["SMGs", "Pistols", "Rifles"], ["Restricted"]),
  classified: byRarity(["Rifles", "Pistols", "Gloves"], ["Classified"]),
  covert: byRarity(["Rifles", "Pistols"], ["Covert"]),
  gold: SKINS.filter((s) => s.category === "Gloves"),
};

const EDGE_POOL = {
  milspec: byRarity(["Rifles", "Pistols"], ["Restricted"]),
  restricted: byRarity(["Rifles", "Pistols"], ["Classified"]),
  classified: byRarity(["Rifles", "Pistols"], ["Covert"]).slice(0, 24),
  covert: byRarity(["Rifles", "Pistols"], ["Covert"]).slice(24, 48),
  gold: SKINS.filter((s) => s.category === "Knives" || s.category === "Gloves"),
};

const POOLS: Record<string, typeof CORE_POOL> = {
  "flux-core": CORE_POOL,
  "prime-line": PRIME_POOL,
  "night-shift": NIGHT_POOL,
  "edge-protocol": EDGE_POOL,
};

export type RolledRarity = "milspec" | "restricted" | "classified" | "covert" | "gold";

export function rollRarity(): RolledRarity {
  const r = Math.random();
  if (r < 0.0026) return "gold";
  if (r < 0.009) return "covert";
  if (r < 0.041) return "classified";
  if (r < 0.201) return "restricted";
  return "milspec";
}

function pick<T>(arr: T[]): T | undefined {
  if (!arr.length) return undefined;
  return arr[Math.floor(Math.random() * arr.length)];
}

export function rollCaseSkin(caseId: string): { skin: Skin; rarity: RolledRarity } {
  const pool = POOLS[caseId] ?? CORE_POOL;
  const order: RolledRarity[] = [rollRarity(), "covert", "classified", "restricted", "milspec", "gold"];
  for (const rarity of order) {
    const skin = pick(pool[rarity]);
    if (skin) return { skin, rarity };
  }
  const fallback = SKINS[Math.floor(Math.random() * SKINS.length)];
  return { skin: fallback, rarity: "milspec" };
}

export function caseContents(caseId: string): Skin[] {
  const pool = POOLS[caseId] ?? CORE_POOL;
  const take = (arr: Skin[], n: number) => arr.slice(0, n);
  return [
    ...take(pool.gold, 6),
    ...take(pool.covert, 6),
    ...take(pool.classified, 8),
    ...take(pool.restricted, 10),
    ...take(pool.milspec, 12),
  ];
}

export const KEY_COST_STARS = 50;
export const FREE_INVENTORY_LIMIT = 16;
