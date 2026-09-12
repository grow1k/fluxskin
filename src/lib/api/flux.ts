import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { authMiddleware } from "@/lib/auth/middleware";
import { getSql, type Sql } from "@/lib/db";
import { FREE_INVENTORY_LIMIT, KEY_COST_STARS, rollCaseSkin } from "@/lib/skins/cases";
import { SKIN_BY_ID } from "@/lib/skins/data";
import type { InventoryItem, Plan, Profile, Wear } from "@/lib/skins/types";
import { clampFloat, randomFloat, wearFromFloat } from "@/lib/skins/wear";

type ProfileRow = {
  user_id: string;
  access_key: string;
  plan: string;
  plan_until: string | Date | null;
  stars: number;
  keys: number;
  created_at: string | Date;
};

type ItemRow = {
  id: string;
  user_id: string;
  skin_id: string;
  wear: string;
  float_value: number;
  stattrak: boolean;
  stattrak_count: number;
  nametag: string | null;
  equipped: boolean;
  source: string;
  created_at: string | Date;
};

function iso(v: string | Date | null | undefined): string | null {
  if (!v) return null;
  if (v instanceof Date) return v.toISOString();
  return String(v);
}

function asBool(v: unknown): boolean {
  return v === true || v === "t" || v === "true" || v === 1;
}

function makeKey(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const chunk = (n: number) =>
    Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * alphabet.length)]).join("");
  return `FLUX-${chunk(4)}-${chunk(4)}-${chunk(4)}`;
}

function decorateProfile(row: ProfileRow): Profile {
  const planUntil = iso(row.plan_until);
  const plan = (row.plan as Plan) || "free";
  const untilMs = planUntil ? Date.parse(planUntil) : 0;
  const active = plan === "lifetime" || (Boolean(untilMs) && untilMs > Date.now());
  const isPremium = plan === "lifetime" || ((plan === "premium" || plan === "trial") && active);
  return {
    userId: row.user_id,
    accessKey: row.access_key,
    plan: isPremium ? plan : plan === "trial" || plan === "premium" ? "free" : plan,
    planUntil,
    stars: Number(row.stars) || 0,
    keys: Number(row.keys) || 0,
    createdAt: iso(row.created_at) ?? new Date().toISOString(),
    isPremium,
    inventoryLimit: isPremium ? null : FREE_INVENTORY_LIMIT,
  };
}

function mapItem(row: ItemRow): InventoryItem {
  return {
    id: row.id,
    userId: row.user_id,
    skinId: row.skin_id,
    wear: row.wear as Wear,
    floatValue: Number(row.float_value),
    stattrak: asBool(row.stattrak),
    stattrakCount: Number(row.stattrak_count) || 0,
    nametag: row.nametag,
    equipped: asBool(row.equipped),
    source: row.source,
    createdAt: iso(row.created_at) ?? new Date().toISOString(),
  };
}

async function ensureProfile(sql: Sql, userId: string): Promise<void> {
  const existing = await sql<{ user_id: string }>`select user_id from profiles where user_id = ${userId}`;
  if (existing.length) return;
  const until = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString();
  await sql`
    insert into profiles (user_id, access_key, plan, plan_until, stars, keys)
    values (${userId}, ${makeKey()}, ${"trial"}, ${until}, ${80}, ${2})
  `;
}

export type Dashboard = {
  profile: Profile;
  items: InventoryItem[];
  count: number;
};

async function loadDashboard(sql: Sql, userId: string): Promise<Dashboard> {
  await ensureProfile(sql, userId);
  const profiles = await sql<ProfileRow>`select * from profiles where user_id = ${userId}`;
  const items = await sql<ItemRow>`
    select * from inventory_items where user_id = ${userId} order by created_at desc
  `;
  const mapped = items.map(mapItem);
  return {
    profile: decorateProfile(profiles[0]),
    items: mapped,
    count: mapped.length,
  };
}

export const getDashboard = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    return loadDashboard(sql, context.userId);
  });

const addSchema = z.object({
  skinId: z.string().min(1),
  floatValue: z.number().min(0).max(1),
  stattrak: z.boolean(),
  nametag: z.string().max(20).optional(),
  source: z.string().max(24).optional(),
});

export const addItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => addSchema.parse(d))
  .handler(async ({ context, data }) => {
    const skin = SKIN_BY_ID.get(data.skinId);
    if (!skin) throw new Error("Скин не найден");
    const sql = await getSql();
    const dash = await loadDashboard(sql, context.userId);
    if (!dash.profile.isPremium && dash.count >= FREE_INVENTORY_LIMIT) {
      throw new Error("Лимит инвентаря. Откройте Premium, чтобы снимать ограничение.");
    }
    const floatValue = clampFloat(data.floatValue, skin.minFloat, skin.maxFloat);
    const wear = wearFromFloat(floatValue);
    const id = crypto.randomUUID();
    const nametag = data.nametag?.trim() ? data.nametag.trim().slice(0, 20) : null;
    await sql`
      insert into inventory_items
        (id, user_id, skin_id, wear, float_value, stattrak, nametag, equipped, source)
      values
        (${id}, ${context.userId}, ${data.skinId}, ${wear}, ${floatValue}, ${data.stattrak}, ${nametag}, ${false}, ${data.source ?? "catalog"})
    `;
    return loadDashboard(sql, context.userId);
  });

const itemIdSchema = z.object({ id: z.string().min(1) });

export const removeItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => itemIdSchema.parse(d))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await sql`delete from inventory_items where id = ${data.id} and user_id = ${context.userId}`;
    return loadDashboard(sql, context.userId);
  });

const updateSchema = z.object({
  id: z.string().min(1),
  floatValue: z.number().min(0).max(1).optional(),
  stattrak: z.boolean().optional(),
  nametag: z.string().max(20).nullable().optional(),
});

export const updateItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => updateSchema.parse(d))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<ItemRow>`
      select * from inventory_items where id = ${data.id} and user_id = ${context.userId}
    `;
    if (!rows[0]) throw new Error("Предмет не найден");
    const skin = SKIN_BY_ID.get(rows[0].skin_id);
    let floatValue = Number(rows[0].float_value);
    let wear = rows[0].wear;
    if (typeof data.floatValue === "number" && skin) {
      floatValue = clampFloat(data.floatValue, skin.minFloat, skin.maxFloat);
      wear = wearFromFloat(floatValue);
    }
    const stattrak = data.stattrak ?? asBool(rows[0].stattrak);
    const nametag =
      data.nametag === undefined
        ? rows[0].nametag
        : data.nametag && data.nametag.trim()
          ? data.nametag.trim().slice(0, 20)
          : null;
    await sql`
      update inventory_items
      set wear = ${wear}, float_value = ${floatValue}, stattrak = ${stattrak}, nametag = ${nametag}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return loadDashboard(sql, context.userId);
  });

export const equipItem = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => itemIdSchema.parse(d))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const rows = await sql<ItemRow>`
      select * from inventory_items where id = ${data.id} and user_id = ${context.userId}
    `;
    if (!rows[0]) throw new Error("Предмет не найден");
    const skin = SKIN_BY_ID.get(rows[0].skin_id);
    if (!skin) throw new Error("Скин не найден");
    const siblings = await sql<ItemRow>`
      select id, skin_id from inventory_items where user_id = ${context.userId} and equipped = true
    `;
    for (const row of siblings) {
      const other = SKIN_BY_ID.get(row.skin_id);
      if (other && other.weapon === skin.weapon) {
        await sql`
          update inventory_items set equipped = false
          where id = ${row.id} and user_id = ${context.userId}
        `;
      }
    }
    const next = !asBool(rows[0].equipped);
    await sql`
      update inventory_items set equipped = ${next}
      where id = ${data.id} and user_id = ${context.userId}
    `;
    return loadDashboard(sql, context.userId);
  });

const caseSchema = z.object({ caseId: z.string().min(1) });

export const openCase = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => caseSchema.parse(d))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    const dash = await loadDashboard(sql, context.userId);
    if (dash.profile.keys < 1) throw new Error("Нет ключей. Купите ключ в магазине.");
    if (!dash.profile.isPremium && dash.count >= FREE_INVENTORY_LIMIT) {
      throw new Error("Лимит инвентаря. Откройте Premium.");
    }
    const { skin } = rollCaseSkin(data.caseId);
    const floatValue = randomFloat(skin.minFloat, skin.maxFloat);
    const wear = wearFromFloat(floatValue);
    const id = crypto.randomUUID();
    await sql`update profiles set keys = keys - 1 where user_id = ${context.userId} and keys > 0`;
    await sql`
      insert into inventory_items
        (id, user_id, skin_id, wear, float_value, stattrak, nametag, equipped, source)
      values
        (${id}, ${context.userId}, ${skin.id}, ${wear}, ${floatValue}, ${false}, ${null}, ${false}, ${"case"})
    `;
    const next = await loadDashboard(sql, context.userId);
    const item = next.items.find((i) => i.id === id);
    return { dashboard: next, item, skinId: skin.id };
  });

export const buyKey = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    const dash = await loadDashboard(sql, context.userId);
    if (dash.profile.stars < KEY_COST_STARS) throw new Error("Недостаточно звёзд");
    await sql`
      update profiles
      set stars = stars - ${KEY_COST_STARS}, keys = keys + 1
      where user_id = ${context.userId} and stars >= ${KEY_COST_STARS}
    `;
    return loadDashboard(sql, context.userId);
  });

const starsSchema = z.object({ pack: z.enum(["s200", "s800"]) });

export const buyStars = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => starsSchema.parse(d))
  .handler(async ({ context, data }) => {
    const amount = data.pack === "s800" ? 800 : 200;
    const sql = await getSql();
    await ensureProfile(sql, context.userId);
    await sql`update profiles set stars = stars + ${amount} where user_id = ${context.userId}`;
    return loadDashboard(sql, context.userId);
  });

const planSchema = z.object({ plan: z.enum(["week", "month", "lifetime"]) });

export const buyPlan = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .validator((d: unknown) => planSchema.parse(d))
  .handler(async ({ context, data }) => {
    const sql = await getSql();
    await ensureProfile(sql, context.userId);
    if (data.plan === "lifetime") {
      await sql`
        update profiles set plan = ${"lifetime"}, plan_until = ${null}
        where user_id = ${context.userId}
      `;
    } else {
      const days = data.plan === "week" ? 7 : 30;
      const until = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toISOString();
      await sql`
        update profiles set plan = ${"premium"}, plan_until = ${until}
        where user_id = ${context.userId}
      `;
    }
    return loadDashboard(sql, context.userId);
  });

export const rotateAccessKey = createServerFn({ method: "POST" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const sql = await getSql();
    await ensureProfile(sql, context.userId);
    const key = makeKey();
    await sql`update profiles set access_key = ${key} where user_id = ${context.userId}`;
    return loadDashboard(sql, context.userId);
  });
