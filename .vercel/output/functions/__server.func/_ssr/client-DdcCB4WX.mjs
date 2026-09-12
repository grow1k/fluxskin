import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { t as useClientStore } from "./client-store-wpFKJYg2.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { a as useDashboard } from "./use-dashboard-zsdy92Ac.mjs";
import { t as RequireAuth } from "./require-auth-CfN_imDi.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/client-DdcCB4WX.js
var import_jsx_runtime = require_jsx_runtime();
function ClientRoute() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RequireAuth, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClientPage, {}) });
}
function ClientPage() {
	const { data, isPending } = useDashboard();
	const running = useClientStore((s) => s.running);
	const lastSync = useClientStore((s) => s.lastSync);
	const setRunning = useClientStore((s) => s.setRunning);
	const markSync = useClientStore((s) => s.markSync);
	if (isPending || !data) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-40 animate-pulse rounded-md bg-card" });
	function downloadConfig() {
		if (!data) return;
		const payload = {
			host: "api.fluxskin.ru",
			site: "fluxskin.ru",
			accessKey: data.profile.accessKey,
			inventory: data.count,
			note: "Fluxskin web companion config. Not a CS2 injector."
		};
		const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = "fluxskin-client.json";
		a.click();
		URL.revokeObjectURL(url);
		toast.success("Конфиг скачан");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mx-auto max-w-xl",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl font-semibold",
				children: "Клиент"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted-foreground",
				children: "Веб-компаньон. Ключ из настроек связывает профиль с api.fluxskin.ru."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-6 overflow-hidden rounded-xl border border-border bg-card",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex items-center justify-between border-b border-border px-4 py-3 text-xs text-muted-foreground",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fluxskin Client" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-mono",
						children: "v2.4.0-web"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "space-y-4 p-5",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Статус",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: running ? "text-ok" : "text-muted-foreground",
								children: running ? "Запущен" : "Остановлен"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "API",
							children: "api.fluxskin.ru"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Ключ",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs",
								children: data.profile.accessKey
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Row, {
							label: "Инвентарь",
							children: [data.count, " предметов"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Row, {
							label: "Синхронизация",
							children: lastSync ? new Date(lastSync).toLocaleString("ru-RU") : "ещё не было"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col gap-2 pt-2",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									onClick: () => {
										setRunning(!running);
										if (!running) {
											markSync();
											toast.success("Клиент запущен, инвентарь синхронизирован");
										}
									},
									children: running ? "Остановить" : "Запустить"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "outline",
									disabled: !running,
									onClick: () => {
										markSync();
										toast.success("Синхронизировано");
									},
									children: "Синхронизировать"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									variant: "ghost",
									onClick: downloadConfig,
									children: "Скачать конфиг"
								})
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-4 text-xs leading-relaxed text-muted",
				children: "Это браузерный компаньон. Fluxskin не ставит программу в процесс CS2 и не обходит античит. Конфиг содержит только ключ доступа к вашему профилю."
			})
		]
	});
}
function Row({ label, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex items-start justify-between gap-4 text-sm",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "text-right",
			children
		})]
	});
}
//#endregion
export { ClientRoute as component };
