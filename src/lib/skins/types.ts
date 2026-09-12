export type Skin = {
  id: string;
  name: string;
  weapon: string;
  weaponId: string;
  category: string;
  pattern: string;
  rarity: string;
  rarityColor: string;
  minFloat: number;
  maxFloat: number;
  stattrak: boolean;
  souvenir: boolean;
  image: string;
  collection: string | null;
  wears: string[];
};

export type Wear =
  | "Factory New"
  | "Minimal Wear"
  | "Field-Tested"
  | "Well-Worn"
  | "Battle-Scarred";

export type InventoryItem = {
  id: string;
  userId: string;
  skinId: string;
  wear: Wear;
  floatValue: number;
  stattrak: boolean;
  stattrakCount: number;
  nametag: string | null;
  equipped: boolean;
  source: string;
  createdAt: string;
};

export type Plan = "trial" | "free" | "premium" | "lifetime";

export type Profile = {
  userId: string;
  accessKey: string;
  plan: Plan;
  planUntil: string | null;
  stars: number;
  keys: number;
  createdAt: string;
  isPremium: boolean;
  inventoryLimit: number | null;
};

export type FluxCase = {
  id: string;
  name: string;
  nameRu: string;
  blurb: string;
  tone: "core" | "prime" | "night" | "edge";
};
