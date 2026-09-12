import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as useCurrentUser, t as cn } from "./utils-DFOk07bp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { c as useRemoveItem, o as useEquipItem, t as useAddItem, u as useUpdateItem } from "./use-dashboard-zsdy92Ac.mjs";
import { t as SkinImage } from "./skin-image-B5_Zc6aH.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-NQ2XYOkW.mjs";
import { i as RARITY_TONE, r as RARITY_RU, t as CATEGORY_RU } from "./labels-D6y7Paaq.mjs";
import { t as Input } from "./input-B7ZrAWP2.mjs";
import { a as randomFloat, i as formatFloat, o as wearFromFloat, r as clampFloat, t as WEAR_LABEL } from "./wear-BsdxYetA.mjs";
import { i as SliderTrack, n as SliderRange, r as SliderThumb, t as Slider$1 } from "../_libs/@radix-ui/react-slider+[...].mjs";
import { n as SwitchThumb, t as Switch$1 } from "../_libs/radix-ui__react-switch.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/inspect-dialog-ClUpzpRv.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Slider({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Slider$1, {
		className: cn("relative flex h-11 w-full touch-none items-center select-none", className),
		...props,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderTrack, {
			className: "relative h-1 w-full grow overflow-hidden rounded-full bg-border",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderRange, { className: "absolute h-full bg-primary" })
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SliderThumb, { className: "block size-4 rounded-full border border-border bg-primary shadow-none outline-none focus-visible:ring-2 focus-visible:ring-ring/50" })]
	});
}
function Switch({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch$1, {
		className: cn("peer inline-flex h-6 w-11 shrink-0 items-center rounded-full border border-border bg-card-2 transition-colors data-[state=checked]:bg-primary", className),
		...props,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SwitchThumb, { className: "pointer-events-none block size-5 translate-x-0.5 rounded-full bg-foreground transition-transform data-[state=checked]:translate-x-[22px] data-[state=checked]:bg-primary-foreground" })
	});
}
function InspectDialog({ mode, onClose, isPremium, count, limit }) {
	const skin = mode?.skin;
	const item = mode?.kind === "item" ? mode.item : null;
	const user = useCurrentUser();
	const [floatValue, setFloatValue] = (0, import_react.useState)(.15);
	const [stattrak, setStattrak] = (0, import_react.useState)(false);
	const [nametag, setNametag] = (0, import_react.useState)("");
	(0, import_react.useEffect)(() => {
		if (!skin) return;
		if (item) {
			setFloatValue(item.floatValue);
			setStattrak(item.stattrak);
			setNametag(item.nametag ?? "");
		} else {
			const mid = clampFloat((skin.minFloat + skin.maxFloat) / 2, skin.minFloat, skin.maxFloat);
			setFloatValue(Number(mid.toFixed(8)));
			setStattrak(false);
			setNametag("");
		}
	}, [skin, item]);
	const add = useAddItem();
	const update = useUpdateItem();
	const remove = useRemoveItem();
	const equip = useEquipItem();
	const wear = wearFromFloat(floatValue);
	const tone = skin ? RARITY_TONE[skin.rarity] ?? "rarity-milspec" : "";
	const atLimit = Boolean(!isPremium && limit && (count ?? 0) >= limit);
	const min = skin?.minFloat ?? 0;
	const max = skin?.maxFloat ?? 1;
	const sliderValue = (0, import_react.useMemo)(() => [floatValue], [floatValue]);
	if (!skin) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open: Boolean(mode),
		onOpenChange: (o) => !o && onClose(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
				className: "pr-10",
				children: skin.name
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogDescription, { children: [
				CATEGORY_RU[skin.category] ?? skin.category,
				" · ",
				RARITY_RU[skin.rarity] ?? skin.rarity,
				skin.collection ? ` · ${skin.collection}` : ""
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-3 overflow-hidden rounded-md border border-border bg-card-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "rarity-bar block " + tone }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinImage, {
					src: skin.image,
					alt: skin.name,
					className: "px-4 py-6"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 space-y-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-1 flex items-center justify-between text-sm",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted-foreground",
								children: "Износ"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "font-mono text-xs tabular-nums text-foreground",
								children: [
									WEAR_LABEL[wear],
									" · ",
									formatFloat(floatValue)
								]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Slider, {
							min,
							max,
							step: 1e-4,
							value: sliderValue,
							onValueChange: ([v]) => setFloatValue(clampFloat(v ?? min, min, max))
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-1 text-xs text-muted-foreground underline-offset-4 hover:underline",
							onClick: () => setFloatValue(randomFloat(min, max)),
							children: "Случайный float"
						})
					] }),
					skin.stattrak && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex h-11 items-center justify-between gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "StatTrak™" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Switch, {
							checked: stattrak,
							onCheckedChange: setStattrak
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
						className: "mb-1 block text-sm text-muted-foreground",
						htmlFor: "nametag",
						children: "Имя (до 20 символов)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
						id: "nametag",
						value: nametag,
						maxLength: 20,
						placeholder: "Nametag",
						onChange: (e) => setNametag(e.target.value)
					})] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-5 flex flex-col gap-2",
				children: mode?.kind === "catalog" ? user ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					disabled: add.isPending || atLimit,
					onClick: () => {
						add.mutate({
							skinId: skin.id,
							floatValue,
							stattrak,
							nametag: nametag || void 0,
							source: "catalog"
						}, { onSuccess: () => {
							toast.success("Добавлено в инвентарь");
							onClose();
						} });
					},
					children: atLimit ? "Лимит инвентаря" : add.isPending ? "Добавляем…" : "Добавить в инвентарь"
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/login",
						children: "Войти, чтобы добавить"
					})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						disabled: update.isPending,
						onClick: () => {
							if (!item) return;
							update.mutate({
								id: item.id,
								floatValue,
								stattrak,
								nametag: nametag || null
							}, { onSuccess: () => toast.success("Сохранено") });
						},
						children: update.isPending ? "Сохраняем…" : "Сохранить"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "outline",
						disabled: equip.isPending,
						onClick: () => item && equip.mutate(item.id),
						children: item?.equipped ? "Снять с лоадаута" : "Поставить в лоадаут"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						variant: "ghost",
						className: "text-destructive",
						disabled: remove.isPending,
						onClick: () => {
							if (!item) return;
							remove.mutate(item.id, { onSuccess: () => {
								toast.success("Удалено");
								onClose();
							} });
						},
						children: "Удалить"
					})
				] })
			})
		] })
	});
}
//#endregion
export { InspectDialog as t };
