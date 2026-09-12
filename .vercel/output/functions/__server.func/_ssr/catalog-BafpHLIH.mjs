import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { r as useCurrentUserState, t as cn } from "./utils-DFOk07bp.mjs";
import { a as useDashboard } from "./use-dashboard-zsdy92Ac.mjs";
import { i as WEAPONS_BY_CATEGORY, n as SKINS, t as CATEGORIES } from "./data-DIqr_Wz0.mjs";
import { t as CATEGORY_RU } from "./labels-D6y7Paaq.mjs";
import { t as Input } from "./input-B7ZrAWP2.mjs";
import { t as InspectDialog } from "./inspect-dialog-ClUpzpRv.mjs";
import { t as SkinCard } from "./skin-card-Dips2ksq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/catalog-BafpHLIH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var PAGE = 48;
function CatalogPage() {
	const { user } = useCurrentUserState();
	const dash = useDashboard(Boolean(user));
	const [q, setQ] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [weapon, setWeapon] = (0, import_react.useState)("All");
	const [rarity, setRarity] = (0, import_react.useState)("All");
	const [shown, setShown] = (0, import_react.useState)(PAGE);
	const [picked, setPicked] = (0, import_react.useState)(null);
	const weapons = category === "All" ? [] : WEAPONS_BY_CATEGORY[category] ?? [];
	const filtered = (0, import_react.useMemo)(() => {
		const query = q.trim().toLowerCase();
		return SKINS.filter((s) => {
			if (category !== "All" && s.category !== category) return false;
			if (weapon !== "All" && s.weapon !== weapon) return false;
			if (rarity !== "All" && s.rarity !== rarity) return false;
			if (!query) return true;
			return s.name.toLowerCase().includes(query) || s.weapon.toLowerCase().includes(query) || s.pattern.toLowerCase().includes(query);
		});
	}, [
		q,
		category,
		weapon,
		rarity
	]);
	const slice = filtered.slice(0, shown);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Каталог"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [filtered.length, " скинов · добавление в инвентарь после входа"]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "w-full max-w-sm",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: q,
					onChange: (e) => {
						setQ(e.target.value);
						setShown(PAGE);
					},
					placeholder: "Поиск: Asiimov, Karambit, Fade"
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-4 flex gap-2 overflow-x-auto pb-1",
			children: [{
				id: "All",
				label: "Все"
			}, ...CATEGORIES.map((c) => ({
				id: c,
				label: CATEGORY_RU[c] ?? c
			}))].map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				onClick: () => {
					setCategory(c.id);
					setWeapon("All");
					setShown(PAGE);
				},
				className: cn("h-9 shrink-0 rounded-full border px-3 text-sm", category === c.id ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"),
				children: c.label
			}, c.id))
		}),
		weapons.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-3 flex gap-2 overflow-x-auto pb-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: weapon === "All",
				onClick: () => {
					setWeapon("All");
					setShown(PAGE);
				},
				children: "Оружие"
			}), weapons.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: weapon === w,
				onClick: () => {
					setWeapon(w);
					setShown(PAGE);
				},
				children: w
			}, w))]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-3 flex gap-2 overflow-x-auto pb-1",
			children: [
				"All",
				"Covert",
				"Classified",
				"Restricted",
				"Mil-Spec Grade",
				"Extraordinary"
			].map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
				active: rarity === r,
				onClick: () => {
					setRarity(r);
					setShown(PAGE);
				},
				children: r === "All" ? "Редкость" : r.replace(" Grade", "")
			}, r))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
			children: slice.map((skin) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinCard, {
				skin,
				onClick: () => setPicked(skin)
			}, skin.id))
		}),
		shown < filtered.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 flex justify-center",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "h-11 rounded-sm border border-border px-4 text-sm text-muted-foreground hover:text-foreground",
				onClick: () => setShown((n) => n + PAGE),
				children: ["Ещё ", Math.min(PAGE, filtered.length - shown)]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InspectDialog, {
			mode: picked ? {
				kind: "catalog",
				skin: picked
			} : null,
			onClose: () => setPicked(null),
			isPremium: dash.data?.profile.isPremium,
			count: dash.data?.count,
			limit: dash.data?.profile.inventoryLimit
		})
	] });
}
function Chip({ active, onClick, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		onClick,
		className: cn("h-9 shrink-0 rounded-full border px-3 text-sm", active ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground hover:text-foreground"),
		children
	});
}
//#endregion
export { CatalogPage as component };
