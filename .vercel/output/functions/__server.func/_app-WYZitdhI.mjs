import { o as __toESM } from "./_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "./_libs/@radix-ui/react-collection+[...].mjs";
import { d as useRouterState, m as Outlet, v as Link } from "./_libs/@tanstack/react-router+[...].mjs";
import { a as DialogOverlay, n as DialogClose, o as DialogPortal, r as DialogContent, s as DialogTitle, t as Dialog } from "./_libs/@radix-ui/react-dialog+[...].mjs";
import { r as useCurrentUserState, t as cn } from "./_ssr/utils-DFOk07bp.mjs";
import { t as AuthSlot } from "./_ssr/auth-slot-BYUCh_Rb.mjs";
import { t as Logo } from "./_ssr/logo-C-oYsY_8.mjs";
import { t as useClientStore } from "./_ssr/client-store-wpFKJYg2.mjs";
import { a as useDashboard } from "./_ssr/use-dashboard-zsdy92Ac.mjs";
import { c as MonitorSmartphone, d as Crosshair, f as Box, i as Sword, l as Menu, o as ShoppingBag, s as Settings, t as X, u as LayoutGrid } from "./_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/_app-WYZitdhI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Sheet = Dialog;
function SheetContent({ className, children, side = "right", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "fixed inset-0 z-50 bg-background/80 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
		className: cn("fixed z-50 border-border bg-card p-5 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out", side === "right" && "inset-y-0 right-0 h-full w-[min(100%,380px)] border-l data-[state=open]:slide-in-from-right data-[state=closed]:slide-out-to-right", side === "bottom" && "inset-x-0 bottom-0 w-full rounded-t-xl border-t data-[state=open]:slide-in-from-bottom data-[state=closed]:slide-out-to-bottom", className),
		...props,
		children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogClose, {
			className: "absolute top-3 right-3 grid size-11 place-items-center rounded-sm text-muted-foreground hover:text-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { className: "size-4" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "sr-only",
				children: "Закрыть"
			})]
		})]
	})] });
}
function SheetTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
		className: cn("font-display text-lg font-semibold", className),
		...props
	});
}
var NAV = [
	{
		to: "/catalog",
		label: "Каталог",
		icon: LayoutGrid
	},
	{
		to: "/inventory",
		label: "Инвентарь",
		icon: Box
	},
	{
		to: "/loadout",
		label: "Лоадаут",
		icon: Sword
	},
	{
		to: "/cases",
		label: "Кейсы",
		icon: Crosshair
	},
	{
		to: "/shop",
		label: "Магазин",
		icon: ShoppingBag
	},
	{
		to: "/client",
		label: "Клиент",
		icon: MonitorSmartphone
	},
	{
		to: "/settings",
		label: "Настройки",
		icon: Settings
	}
];
var MOBILE_PRIMARY = [
	"/catalog",
	"/inventory",
	"/cases",
	"/client"
];
function AppShell({ children }) {
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const { user } = useCurrentUserState();
	const dash = useDashboard(Boolean(user));
	const running = useClientStore((s) => s.running);
	const [more, setMore] = (0, import_react.useState)(false);
	const profile = dash.data?.profile;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-background lg:flex lg:flex-col",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "flex h-16 items-center px-5",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/",
							className: "flex items-center",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "flex flex-1 flex-col gap-1 px-3",
						children: NAV.map((item) => {
							const Icon = item.icon;
							const active = pathname === item.to;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								className: cn("flex h-11 items-center gap-3 rounded-sm px-3 text-sm transition-colors duration-150", active ? "bg-card-2 text-foreground" : "text-muted-foreground hover:bg-card hover:text-foreground"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "border-t border-border px-4 py-4 text-xs text-muted-foreground",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Клиент" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: running ? "text-ok" : "text-muted",
								children: running ? "онлайн" : "оффлайн"
							})]
						}), profile && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-2",
							children: profile.isPremium ? "Premium" : `Слоты ${dash.data?.count ?? 0}/${profile.inventoryLimit}`
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 lg:hidden",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					className: "flex items-center",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "lg:pl-60",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden h-16 items-center justify-between border-b border-border px-6 lg:flex",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center gap-3 text-sm text-muted-foreground",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: cn("size-1.5 rounded-full", running ? "bg-ok" : "bg-muted") }),
							running ? "Клиент подключён" : "Клиент не запущен",
							profile && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-muted",
								children: [
									"· ",
									profile.stars,
									" ★ · ",
									profile.keys,
									" ключей"
								]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "px-4 py-6 pb-28 lg:px-8 lg:pb-10",
					children
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
				className: "fixed inset-x-0 bottom-0 z-20 grid h-16 grid-cols-5 border-t border-border bg-background lg:hidden",
				children: [NAV.filter((n) => MOBILE_PRIMARY.includes(n.to)).map((item) => {
					const Icon = item.icon;
					const active = pathname === item.to;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex flex-col items-center justify-center gap-1 text-[10px]", active ? "text-foreground" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
					}, item.to);
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => setMore(true),
					className: "flex flex-col items-center justify-center gap-1 text-[10px] text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { className: "size-4" }), "Ещё"]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sheet, {
				open: more,
				onOpenChange: setMore,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(SheetContent, {
					side: "bottom",
					className: "pb-8",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetTitle, { children: "Разделы" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-4 grid gap-1",
						children: NAV.map((item) => {
							const Icon = item.icon;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: item.to,
								onClick: () => setMore(false),
								className: "flex h-12 items-center gap-3 rounded-sm px-2 text-sm hover:bg-card-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), item.label]
							}, item.to);
						})
					})]
				})
			})
		]
	});
}
function AppLayout() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AppShell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) });
}
//#endregion
export { AppLayout as component };
