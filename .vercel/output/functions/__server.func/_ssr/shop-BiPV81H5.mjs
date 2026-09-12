import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useDashboard, i as useBuyStars, r as useBuyPlan } from "./use-dashboard-zsdy92Ac.mjs";
import { t as RequireAuth } from "./require-auth-CfN_imDi.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { n as PLAN_RU } from "./labels-D6y7Paaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/shop-BiPV81H5.js
var import_jsx_runtime = require_jsx_runtime();
function ShopRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShopPage, {}) });
}
function ShopPage() {
	const { data, isPending } = useDashboard();
	const stars = useBuyStars();
	const plan = useBuyPlan();
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-md bg-card" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-display text-2xl font-semibold",
			children: "Магазин"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-1 text-sm text-muted-foreground",
			children: [
				"План: ",
				PLAN_RU[data.profile.plan] ?? data.profile.plan,
				" · ",
				data.profile.stars,
				" ★ ·",
				" ",
				data.profile.keys,
				" ключей"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 text-xs text-muted",
			children: "Оплата в превью зачисляется сразу — это демонстрационный магазин, не эквайринг."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 text-sm font-medium text-muted-foreground",
			children: "Подписка"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 md:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
					title: "7 дней",
					price: "199 ₽",
					busy: plan.isPending,
					onBuy: () => plan.mutate("week", { onSuccess: () => toast.success("Premium на 7 дней") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
					title: "30 дней",
					price: "449 ₽",
					busy: plan.isPending,
					onBuy: () => plan.mutate("month", { onSuccess: () => toast.success("Premium на 30 дней") })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
					title: "Навсегда",
					price: "1 490 ₽",
					busy: plan.isPending,
					onBuy: () => plan.mutate("lifetime", { onSuccess: () => toast.success("Lifetime активирован") })
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-10 text-sm font-medium text-muted-foreground",
			children: "Звёзды"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 grid gap-3 md:grid-cols-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
				title: "200 ★",
				price: "99 ₽",
				note: `Ключ кейса — 50 ★`,
				busy: stars.isPending,
				onBuy: () => stars.mutate("s200", { onSuccess: () => toast.success("+200 ★") })
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PlanCard, {
				title: "800 ★",
				price: "299 ₽",
				busy: stars.isPending,
				onBuy: () => stars.mutate("s800", { onSuccess: () => toast.success("+800 ★") })
			})]
		})
	] });
}
function PlanCard({ title, price, note, busy, onBuy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-lg border border-border bg-card p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 font-display text-2xl font-semibold",
				children: price
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-xs text-muted",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-4 w-full",
				disabled: busy,
				onClick: onBuy,
				children: "Купить"
			})
		]
	});
}
//#endregion
export { ShopRoute as component };
