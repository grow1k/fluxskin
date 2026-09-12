import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-DFOk07bp.mjs";
import { t as SkinImage } from "./skin-image-B5_Zc6aH.mjs";
import { i as RARITY_TONE } from "./labels-D6y7Paaq.mjs";
import { i as formatFloat, n as WEAR_SHORT } from "./wear-BsdxYetA.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/skin-card-Dips2ksq.js
var import_jsx_runtime = require_jsx_runtime();
function SkinCard({ skin, item, onClick, selected }) {
	const tone = RARITY_TONE[skin.rarity] ?? "rarity-milspec";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		onClick,
		className: cn("group relative flex flex-col overflow-hidden rounded-md border bg-card text-left transition-[border-color] duration-150", selected ? "border-primary" : "border-border hover:border-muted"),
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("rarity-bar", tone) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "relative px-2 pt-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinImage, {
						src: skin.image,
						alt: skin.name
					}),
					item?.equipped && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground",
						children: "В лоадауте"
					}),
					item?.stattrak && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "absolute top-2 right-2 font-mono text-[10px] font-medium tracking-wide text-rarity-gold",
						children: "ST"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-1 flex-col gap-1 px-3 pt-2 pb-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] text-muted-foreground",
						children: skin.weapon
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "line-clamp-2 text-[13px] leading-snug font-medium text-foreground",
						children: item?.nametag ? `"${item.nametag}"` : skin.pattern || skin.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-auto flex items-center justify-between pt-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: cn("text-[10px] font-medium tracking-wide uppercase", tone),
							children: skin.rarity.replace(" Grade", "")
						}), item ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "font-mono text-[10px] text-muted-foreground tabular-nums",
							children: [
								WEAR_SHORT[item.wear],
								" · ",
								formatFloat(item.floatValue).slice(0, 6)
							]
						}) : null]
					})
				]
			})
		]
	});
}
//#endregion
export { SkinCard as t };
