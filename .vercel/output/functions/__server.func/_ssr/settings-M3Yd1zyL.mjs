import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { n as useCurrentUser } from "./utils-DFOk07bp.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useDashboard, l as useRotateKey } from "./use-dashboard-zsdy92Ac.mjs";
import { t as RequireAuth } from "./require-auth-CfN_imDi.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { n as PLAN_RU } from "./labels-D6y7Paaq.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/settings-M3Yd1zyL.js
var import_jsx_runtime = require_jsx_runtime();
function SettingsRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SettingsPage, {}) });
}
function SettingsPage() {
	const user = useCurrentUser();
	const { data, isPending } = useDashboard();
	const rotate = useRotateKey();
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-md bg-card" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Настройки"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Профиль и ключ доступа к API."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-6 rounded-lg border border-border bg-card p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-sm font-medium",
					children: "Аккаунт"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
					className: "mt-3 space-y-2 text-sm",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Имя"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: user?.displayName ?? "—" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "Почта"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
								className: "truncate",
								children: user?.primaryEmail ?? "—"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex justify-between gap-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
								className: "text-muted-foreground",
								children: "План"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: PLAN_RU[data.profile.plan] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-4 rounded-lg border border-border bg-card p-5",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "text-sm font-medium",
						children: "Ключ доступа"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-xs text-muted-foreground",
						children: "Вставьте ключ в клиент, чтобы связать аккаунт. Хост API: api.fluxskin.ru"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("code", {
						className: "mt-3 block rounded-sm bg-card-2 px-3 py-3 font-mono text-sm",
						children: data.profile.accessKey
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-3 flex flex-wrap gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "outline",
							onClick: async () => {
								await navigator.clipboard.writeText(data.profile.accessKey);
								toast.success("Ключ скопирован");
							},
							children: "Копировать"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							variant: "ghost",
							disabled: rotate.isPending,
							onClick: () => rotate.mutate(void 0, { onSuccess: () => toast.success("Ключ обновлён") }),
							children: "Обновить ключ"
						})]
					})
				]
			})
		]
	});
}
//#endregion
export { SettingsRoute as component };
