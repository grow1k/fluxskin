import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useDashboard } from "./use-dashboard-zsdy92Ac.mjs";
import { r as SKIN_BY_ID } from "./data-DIqr_Wz0.mjs";
import { t as RequireAuth } from "./require-auth-CfN_imDi.mjs";
import { t as SkinImage } from "./skin-image-B5_Zc6aH.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { t as CATEGORY_RU } from "./labels-D6y7Paaq.mjs";
import { t as InspectDialog } from "./inspect-dialog-ClUpzpRv.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/loadout-NDDY6bFZ.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var SLOTS = [
	"Knives",
	"Gloves",
	"Rifles",
	"Pistols",
	"SMGs",
	"Heavy"
];
function LoadoutRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LoadoutPage, {}) });
}
function LoadoutPage() {
	const { data, isPending } = useDashboard();
	const [picked, setPicked] = (0, import_react.useState)(null);
	const equipped = (0, import_react.useMemo)(() => {
		if (!data) return [];
		return data.items.filter((i) => i.equipped).map((item) => {
			const skin = SKIN_BY_ID.get(item.skinId);
			return skin ? {
				item,
				skin
			} : null;
		}).filter((x) => Boolean(x));
	}, [data]);
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-md bg-card" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "Лоадаут"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: "Экипированные скины по слотам. Один активный скин на оружие."
		}),
		equipped.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-lg border border-border bg-card px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-medium",
					children: "Лоадаут пуст"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Откройте предмет в инвентаре и нажмите «Поставить в лоадаут»."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/inventory",
						children: "К инвентарю"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 space-y-8",
			children: SLOTS.map((slot) => {
				const items = equipped.filter((x) => x.skin.category === slot);
				if (!items.length) return null;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium text-muted-foreground",
					children: CATEGORY_RU[slot] ?? slot
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3",
					children: items.map(({ item, skin }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPicked({
							item,
							skin
						}),
						className: "flex items-center gap-4 rounded-md border border-border bg-card p-3 text-left hover:border-muted",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "w-28 shrink-0",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinImage, {
								src: skin.image,
								alt: skin.name
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted-foreground",
									children: skin.weapon
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "truncate text-sm font-medium",
									children: skin.pattern || skin.name
								}),
								item.nametag && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "truncate text-xs text-muted-foreground",
									children: [
										"\"",
										item.nametag,
										"\""
									]
								})
							]
						})]
					}, item.id))
				})] }, slot);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectDialog, {
			mode: picked ? {
				kind: "item",
				skin: picked.skin,
				item: picked.item
			} : null,
			onClose: () => setPicked(null),
			isPremium: data.profile.isPremium,
			count: data.count,
			limit: data.profile.inventoryLimit
		})
	] });
}
//#endregion
export { LoadoutRoute as component };
