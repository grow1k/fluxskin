import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as useDashboard } from "./use-dashboard-zsdy92Ac.mjs";
import { r as SKIN_BY_ID } from "./data-DIqr_Wz0.mjs";
import { t as RequireAuth } from "./require-auth-CfN_imDi.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { t as InspectDialog } from "./inspect-dialog-ClUpzpRv.mjs";
import { t as SkinCard } from "./skin-card-Dips2ksq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inventory-DRKZ-X8S.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function InventoryRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(InventoryPage, {}) });
}
function InventoryPage() {
	const { data, isPending } = useDashboard();
	const [picked, setPicked] = (0, import_react.useState)(null);
	const rows = (0, import_react.useMemo)(() => {
		if (!data) return [];
		return data.items.map((item) => {
			const skin = SKIN_BY_ID.get(item.skinId);
			return skin ? {
				item,
				skin
			} : null;
		}).filter((x) => Boolean(x));
	}, [data]);
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-md bg-card" });
	const { profile } = data;
	const cap = profile.inventoryLimit;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Инвентарь"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					data.count,
					cap ? ` / ${cap}` : "",
					" предметов",
					profile.isPremium ? " · Premium" : " · бесплатный лимит"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				asChild: true,
				variant: "outline",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/catalog",
					children: "Добавить скины"
				})
			})]
		}),
		rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-10 rounded-lg border border-border bg-card px-6 py-16 text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "font-display text-xl font-medium",
					children: "Инвентарь пуст"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Откройте каталог и добавьте первый скин. Пробный Premium уже активен 24 часа."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/catalog",
						children: "В каталог"
					})
				})
			]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
			children: rows.map(({ item, skin }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinCard, {
				skin,
				item,
				onClick: () => setPicked({
					skin,
					item
				})
			}, item.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectDialog, {
			mode: picked ? {
				kind: "item",
				skin: picked.skin,
				item: picked.item
			} : null,
			onClose: () => setPicked(null),
			isPremium: profile.isPremium,
			count: data.count,
			limit: profile.inventoryLimit
		})
	] });
}
//#endregion
export { InventoryRoute as component };
