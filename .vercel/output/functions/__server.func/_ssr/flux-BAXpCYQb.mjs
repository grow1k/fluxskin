import { i as TSS_SERVER_FUNCTION, r as createServerFn } from "./ssr.mjs";
import { Dt as boolean, Ft as string, Mt as object, jt as number, wt as _enum } from "../_libs/@better-auth/core+[...].mjs";
import { r as getSql } from "./db-DilINDH7.mjs";
import { t as authMiddleware } from "./middleware-CsxwVmT6.mjs";
import { r as SKIN_BY_ID } from "./data-DIqr_Wz0.mjs";
import { r as rollCaseSkin } from "./cases-DhZL-Ls7.mjs";
import { a as randomFloat, o as wearFromFloat, r as clampFloat } from "./wear-BsdxYetA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/flux-BAXpCYQb.js
var createServerRpc = (serverFnMeta, splitImportFn) => {
	const url = "/_serverFn/" + serverFnMeta.id;
	return Object.assign(splitImportFn, {
		url,
		serverFnMeta,
		[TSS_SERVER_FUNCTION]: true
	});
};
function iso(v) {
	if (!v) return null;
	if (v instanceof Date) return v.toISOString();
	return String(v);
}
function asBool(v) {
	return v === true || v === "t" || v === "true" || v === 1;
}
function makeKey() {
	const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
	const chunk = (n) => Array.from({ length: n }, () => alphabet[Math.floor(Math.random() * 32)]).join("");
	return `FLUX-${chunk(4)}-${chunk(4)}-${chunk(4)}`;
}
function decorateProfile(row) {
	const planUntil = iso(row.plan_until);
	const plan = row.plan || "free";
	const untilMs = planUntil ? Date.parse(planUntil) : 0;
	const isPremium = plan === "lifetime" || (plan === "premium" || plan === "trial") && (plan === "lifetime" || Boolean(untilMs) && untilMs > Date.now());
	return {
		userId: row.user_id,
		accessKey: row.access_key,
		plan: isPremium ? plan : plan === "trial" || plan === "premium" ? "free" : plan,
		planUntil,
		stars: Number(row.stars) || 0,
		keys: Number(row.keys) || 0,
		createdAt: iso(row.created_at) ?? (/* @__PURE__ */ new Date()).toISOString(),
		isPremium,
		inventoryLimit: isPremium ? null : 16
	};
}
function mapItem(row) {
	return {
		id: row.id,
		userId: row.user_id,
		skinId: row.skin_id,
		wear: row.wear,
		floatValue: Number(row.float_value),
		stattrak: asBool(row.stattrak),
		stattrakCount: Number(row.stattrak_count) || 0,
		nametag: row.nametag,
		equipped: asBool(row.equipped),
		source: row.source,
		createdAt: iso(row.created_at) ?? (/* @__PURE__ */ new Date()).toISOString()
	};
}
async function ensureProfile(sql, userId) {
	if ((await sql`select user_id from profiles where user_id = ${userId}`).length) return;
	const until = new Date(Date.now() + 864e5).toISOString();
	await sql`
    insert into profiles (user_id, access_key, plan, plan_until, stars, keys)
    values (${userId}, ${makeKey()}, ${"trial"}, ${until}, ${80}, ${2})
  `;
}
async function loadDashboard(sql, userId) {
	await ensureProfile(sql, userId);
	const profiles = await sql`select * from profiles where user_id = ${userId}`;
	const mapped = (await sql`
    select * from inventory_items where user_id = ${userId} order by created_at desc
  `).map(mapItem);
	return {
		profile: decorateProfile(profiles[0]),
		items: mapped,
		count: mapped.length
	};
}
var getDashboard_createServerFn_handler = createServerRpc({
	id: "a7343109f52ea1f9c4130b5f17fa6197f52120ffb227a40470f1f6d82dd399e3",
	name: "getDashboard",
	filename: "src/lib/api/flux.ts"
}, (opts) => getDashboard.__executeServer(opts));
var getDashboard = createServerFn({ method: "GET" }).middleware([authMiddleware]).handler(getDashboard_createServerFn_handler, async ({ context }) => {
	return loadDashboard(await getSql(), context.userId);
});
var addSchema = object({
	skinId: string().min(1),
	floatValue: number().min(0).max(1),
	stattrak: boolean(),
	nametag: string().max(20).optional(),
	source: string().max(24).optional()
});
var addItem_createServerFn_handler = createServerRpc({
	id: "a88ab65316a4250d9611fa97830d2d420c41075e8d99d9d3ae1e27a4c5261b0b",
	name: "addItem",
	filename: "src/lib/api/flux.ts"
}, (opts) => addItem.__executeServer(opts));
var addItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => addSchema.parse(d)).handler(addItem_createServerFn_handler, async ({ context, data }) => {
	const skin = SKIN_BY_ID.get(data.skinId);
	if (!skin) throw new Error("Скин не найден");
	const sql = await getSql();
	const dash = await loadDashboard(sql, context.userId);
	if (!dash.profile.isPremium && dash.count >= 16) throw new Error("Лимит инвентаря. Откройте Premium, чтобы снимать ограничение.");
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
var itemIdSchema = object({ id: string().min(1) });
var removeItem_createServerFn_handler = createServerRpc({
	id: "ea1a754f93e43de18a10fa3e4d1d2cc3b435126839c4883a027ccb4c5e15f3c1",
	name: "removeItem",
	filename: "src/lib/api/flux.ts"
}, (opts) => removeItem.__executeServer(opts));
var removeItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => itemIdSchema.parse(d)).handler(removeItem_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await sql`delete from inventory_items where id = ${data.id} and user_id = ${context.userId}`;
	return loadDashboard(sql, context.userId);
});
var updateSchema = object({
	id: string().min(1),
	floatValue: number().min(0).max(1).optional(),
	stattrak: boolean().optional(),
	nametag: string().max(20).nullable().optional()
});
var updateItem_createServerFn_handler = createServerRpc({
	id: "7cb8f5edf66f9decd283c106ee6a337086f2c325409476b5cd7530c8fa6921c0",
	name: "updateItem",
	filename: "src/lib/api/flux.ts"
}, (opts) => updateItem.__executeServer(opts));
var updateItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => updateSchema.parse(d)).handler(updateItem_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
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
	const nametag = data.nametag === void 0 ? rows[0].nametag : data.nametag && data.nametag.trim() ? data.nametag.trim().slice(0, 20) : null;
	await sql`
      update inventory_items
      set wear = ${wear}, float_value = ${floatValue}, stattrak = ${stattrak}, nametag = ${nametag}
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return loadDashboard(sql, context.userId);
});
var equipItem_createServerFn_handler = createServerRpc({
	id: "095003ca09fb815b1d802b01b837175e6a4d61c4d331419e620b469cc3517d16",
	name: "equipItem",
	filename: "src/lib/api/flux.ts"
}, (opts) => equipItem.__executeServer(opts));
var equipItem = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => itemIdSchema.parse(d)).handler(equipItem_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const rows = await sql`
      select * from inventory_items where id = ${data.id} and user_id = ${context.userId}
    `;
	if (!rows[0]) throw new Error("Предмет не найден");
	const skin = SKIN_BY_ID.get(rows[0].skin_id);
	if (!skin) throw new Error("Скин не найден");
	const siblings = await sql`
      select id, skin_id from inventory_items where user_id = ${context.userId} and equipped = true
    `;
	for (const row of siblings) {
		const other = SKIN_BY_ID.get(row.skin_id);
		if (other && other.weapon === skin.weapon) await sql`
          update inventory_items set equipped = false
          where id = ${row.id} and user_id = ${context.userId}
        `;
	}
	await sql`
      update inventory_items set equipped = ${!asBool(rows[0].equipped)}
      where id = ${data.id} and user_id = ${context.userId}
    `;
	return loadDashboard(sql, context.userId);
});
var caseSchema = object({ caseId: string().min(1) });
var openCase_createServerFn_handler = createServerRpc({
	id: "68903cab4bd33a63ef5ffabb0e0bdb809ada27c5af31623a22aae43f5b28bdee",
	name: "openCase",
	filename: "src/lib/api/flux.ts"
}, (opts) => openCase.__executeServer(opts));
var openCase = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => caseSchema.parse(d)).handler(openCase_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	const dash = await loadDashboard(sql, context.userId);
	if (dash.profile.keys < 1) throw new Error("Нет ключей. Купите ключ в магазине.");
	if (!dash.profile.isPremium && dash.count >= 16) throw new Error("Лимит инвентаря. Откройте Premium.");
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
	return {
		dashboard: next,
		item: next.items.find((i) => i.id === id),
		skinId: skin.id
	};
});
var buyKey_createServerFn_handler = createServerRpc({
	id: "a3e74e6e1e6c649f179264fb01c25e254b09d47c0ab7b357a311b2187e735ddb",
	name: "buyKey",
	filename: "src/lib/api/flux.ts"
}, (opts) => buyKey.__executeServer(opts));
var buyKey = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(buyKey_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	if ((await loadDashboard(sql, context.userId)).profile.stars < 50) throw new Error("Недостаточно звёзд");
	await sql`
      update profiles
      set stars = stars - ${50}, keys = keys + 1
      where user_id = ${context.userId} and stars >= ${50}
    `;
	return loadDashboard(sql, context.userId);
});
var starsSchema = object({ pack: _enum(["s200", "s800"]) });
var buyStars_createServerFn_handler = createServerRpc({
	id: "47511a1cdb3d3f744e548d409358fb0e03c669210ef3c3e157c23d2b3456ecc7",
	name: "buyStars",
	filename: "src/lib/api/flux.ts"
}, (opts) => buyStars.__executeServer(opts));
var buyStars = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => starsSchema.parse(d)).handler(buyStars_createServerFn_handler, async ({ context, data }) => {
	const amount = data.pack === "s800" ? 800 : 200;
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await sql`update profiles set stars = stars + ${amount} where user_id = ${context.userId}`;
	return loadDashboard(sql, context.userId);
});
var planSchema = object({ plan: _enum([
	"week",
	"month",
	"lifetime"
]) });
var buyPlan_createServerFn_handler = createServerRpc({
	id: "484fa47641b9b3c5a142a687f939b848ddb86536ca64058fe533ecfa8b296bf9",
	name: "buyPlan",
	filename: "src/lib/api/flux.ts"
}, (opts) => buyPlan.__executeServer(opts));
var buyPlan = createServerFn({ method: "POST" }).middleware([authMiddleware]).validator((d) => planSchema.parse(d)).handler(buyPlan_createServerFn_handler, async ({ context, data }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	if (data.plan === "lifetime") await sql`
        update profiles set plan = ${"lifetime"}, plan_until = ${null}
        where user_id = ${context.userId}
      `;
	else {
		const days = data.plan === "week" ? 7 : 30;
		await sql`
        update profiles set plan = ${"premium"}, plan_until = ${new Date(Date.now() + days * 24 * 60 * 60 * 1e3).toISOString()}
        where user_id = ${context.userId}
      `;
	}
	return loadDashboard(sql, context.userId);
});
var rotateAccessKey_createServerFn_handler = createServerRpc({
	id: "28f9e69d6df652207e0b9693e26b9b5934eadc8956ac948bd53f7aebabcd49a8",
	name: "rotateAccessKey",
	filename: "src/lib/api/flux.ts"
}, (opts) => rotateAccessKey.__executeServer(opts));
var rotateAccessKey = createServerFn({ method: "POST" }).middleware([authMiddleware]).handler(rotateAccessKey_createServerFn_handler, async ({ context }) => {
	const sql = await getSql();
	await ensureProfile(sql, context.userId);
	await sql`update profiles set access_key = ${makeKey()} where user_id = ${context.userId}`;
	return loadDashboard(sql, context.userId);
});
//#endregion
export { addItem_createServerFn_handler, buyKey_createServerFn_handler, buyPlan_createServerFn_handler, buyStars_createServerFn_handler, equipItem_createServerFn_handler, getDashboard_createServerFn_handler, openCase_createServerFn_handler, removeItem_createServerFn_handler, rotateAccessKey_createServerFn_handler, updateItem_createServerFn_handler };
