import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as cn } from "./utils-DFOk07bp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useDashboard, n as useBuyKey, s as useOpenCase } from "./use-dashboard-zsdy92Ac.mjs";
import { r as SKIN_BY_ID } from "./data-DIqr_Wz0.mjs";
import { n as caseContents, t as CASES } from "./cases-DhZL-Ls7.mjs";
import { t as RequireAuth } from "./require-auth-CfN_imDi.mjs";
import { t as SkinImage } from "./skin-image-B5_Zc6aH.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { i as DialogTitle, n as DialogContent, r as DialogDescription, t as Dialog } from "./dialog-NQ2XYOkW.mjs";
import { i as RARITY_TONE } from "./labels-D6y7Paaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/cases-5_cfXvEr.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function CasesRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CasesPage, {}) });
}
function CasesPage() {
	const { data, isPending } = useDashboard();
	const open = useOpenCase();
	const buy = useBuyKey();
	const [active, setActive] = (0, import_react.useState)(null);
	const [won, setWon] = (0, import_react.useState)(null);
	const [spinning, setSpinning] = (0, import_react.useState)(false);
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-md bg-card" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex flex-wrap items-end justify-between gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Кейсы"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: [
					data.profile.keys,
					" ключей · ",
					data.profile.stars,
					" ★"
				]
			})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				variant: "outline",
				disabled: buy.isPending,
				onClick: () => buy.mutate(void 0, { onSuccess: () => toast.success("Ключ куплен") }),
				children: [
					"Ключ · ",
					50,
					" ★"
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6 grid gap-4 sm:grid-cols-2",
			children: CASES.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => setActive(c),
				className: "rounded-lg border border-border bg-card p-5 text-left hover:border-muted",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseMark, { tone: c.tone }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-4 font-display text-xl font-semibold",
						children: c.nameRu
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-sm leading-relaxed text-muted-foreground",
						children: c.blurb
					})
				]
			}, c.id))
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(active),
			onOpenChange: (o) => !o && !spinning && setActive(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, {
				className: "max-w-2xl",
				children: active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseOpen, {
					fluxCase: active,
					spinning,
					keys: data.profile.keys,
					onOpen: () => {
						setSpinning(true);
						open.mutate(active.id, {
							onSuccess: (res) => {
								const skin = SKIN_BY_ID.get(res.skinId) ?? null;
								window.setTimeout(() => {
									setWon(skin);
									setSpinning(false);
								}, 1400);
							},
							onError: () => setSpinning(false)
						});
					}
				})
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
			open: Boolean(won),
			onOpenChange: (o) => !o && setWon(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogContent, { children: won && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: "Дроп" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, {
					className: RARITY_TONE[won.rarity],
					children: won.name
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinImage, {
					src: won.image,
					alt: won.name,
					className: "mt-4"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4 w-full",
					onClick: () => setWon(null),
					children: "В инвентарь"
				})
			] }) })
		})
	] });
}
function CaseOpen({ fluxCase, spinning, keys, onOpen }) {
	const contents = (0, import_react.useMemo)(() => caseContents(fluxCase.id), [fluxCase.id]);
	const reel = [...contents, ...contents];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, { children: fluxCase.nameRu }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogDescription, { children: fluxCase.blurb }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "relative mt-4 overflow-hidden rounded-md border border-border bg-card-2",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-primary" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: cn("flex w-max gap-2 p-3", spinning && "animate-[flux-reel_1.2s_linear]"),
				style: spinning ? void 0 : { transform: "translateX(0)" },
				children: reel.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "w-24 shrink-0",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinImage, {
						src: s.image,
						alt: s.name
					})
				}, s.id + i))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
			className: "mt-3 text-xs text-muted-foreground",
			children: [
				"Содержимое: ",
				contents.length,
				" предметов"
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
			className: "mt-4 w-full",
			disabled: spinning || keys < 1,
			onClick: onOpen,
			children: keys < 1 ? "Нет ключей" : spinning ? "Открываем…" : "Открыть за 1 ключ"
		})
	] });
}
function CaseMark({ tone }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "grid h-28 place-items-center rounded-md border border-border bg-card-2 font-display text-sm tracking-[0.2em] text-muted-foreground",
		children: {
			core: "CORE",
			prime: "PRIME",
			night: "NIGHT",
			edge: "EDGE"
		}[tone]
	});
}
//#endregion
export { CasesRoute as component };
