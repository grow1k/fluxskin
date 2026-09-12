import catalog from "./catalog.json";
import type { Skin } from "./types";

export const CATEGORIES = [
  "Rifles",
  "Pistols",
  "SMGs",
  "Heavy",
  "Knives",
  "Gloves",
  "Equipment",
] as const;

const RARITY_RANK: Record<string, number> = {
  Contraband: 7,
  Extraordinary: 7,
  Covert: 6,
  Classified: 5,
  Restricted: 4,
  "Mil-Spec Grade": 3,
  "Industrial Grade": 2,
  "Consumer Grade": 1,
};

const HERO_WEAPONS = [
  "AK-47",
  "AWP",
  "M4A4",
  "M4A1-S",
  "Desert Eagle",
  "USP-S",
  "Glock-18",
  "Karambit",
  "Butterfly Knife",
  "M9 Bayonet",
  "Sport Gloves",
];

export const SKINS: Skin[] = [...(catalog.skins as Skin[])].sort((a, b) => {
  const ca = CATEGORIES.indexOf(a.category as (typeof CATEGORIES)[number]);
  const cb = CATEGORIES.indexOf(b.category as (typeof CATEGORIES)[number]);
  if (ca !== cb) return (ca === -1 ? 99 : ca) - (cb === -1 ? 99 : cb);
  const ha = HERO_WEAPONS.indexOf(a.weapon);
  const hb = HERO_WEAPONS.indexOf(b.weapon);
  const haN = ha === -1 ? 50 : ha;
  const hbN = hb === -1 ? 50 : hb;
  if (haN !== hbN) return haN - hbN;
  const ra = RARITY_RANK[a.rarity] ?? 0;
  const rb = RARITY_RANK[b.rarity] ?? 0;
  if (ra !== rb) return rb - ra;
  if (a.weapon !== b.weapon) return a.weapon.localeCompare(b.weapon);
  return a.name.localeCompare(b.name);
});

export const SKIN_BY_ID = new Map(SKINS.map((s) => [s.id, s]));

export function skinsForWeapon(weapon: string): Skin[] {
  return SKINS.filter((s) => s.weapon === weapon);
}

export const WEAPONS_BY_CATEGORY: Record<string, string[]> = (() => {
  const map: Record<string, Set<string>> = {};
  for (const s of SKINS) {
    (map[s.category] ??= new Set()).add(s.weapon);
  }
  const out: Record<string, string[]> = {};
  for (const [cat, set] of Object.entries(map)) {
    const list = [...set];
    list.sort((a, b) => {
      const ha = HERO_WEAPONS.indexOf(a);
      const hb = HERO_WEAPONS.indexOf(b);
      const haN = ha === -1 ? 50 : ha;
      const hbN = hb === -1 ? 50 : hb;
      if (haN !== hbN) return haN - hbN;
      return a.localeCompare(b);
    });
    out[cat] = list;
  }
  return out;
})();
