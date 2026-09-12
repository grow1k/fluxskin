import { o as __toESM } from "../_runtime.mjs";
import { o as require_jsx_runtime, s as require_react } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { b as useNavigate, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { r as signIn, t as authClient } from "./client-B40BzJxt.mjs";
import { r as useCurrentUserState } from "./utils-DFOk07bp.mjs";
import { t as GROK_PROVIDERS } from "./server-O9OR0IUJ.mjs";
import { t as Logo } from "./logo-C-oYsY_8.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
import { t as Input } from "./input-B7ZrAWP2.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-xzDXhfvj.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Login() {
	const { user, isPending } = useCurrentUserState();
	const navigate = useNavigate();
	const [mode, setMode] = (0, import_react.useState)("in");
	const [email, setEmail] = (0, import_react.useState)("");
	const [password, setPassword] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [error, setError] = (0, import_react.useState)(null);
	const [busy, setBusy] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (user) navigate({ to: "/inventory" });
	}, [user, navigate]);
	if (isPending) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "grid min-h-dvh place-items-center bg-background text-foreground" });
	if (user) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", { className: "grid min-h-dvh place-items-center bg-background text-foreground" });
	async function onSubmit(e) {
		e.preventDefault();
		setError(null);
		setBusy(true);
		try {
			if (mode === "up") {
				const res = await authClient.signUp.email({
					email,
					password,
					name: name || email.split("@")[0] || "player",
					callbackURL: "/inventory"
				});
				if (res.error) throw new Error(res.error.message);
			} else {
				const res = await authClient.signIn.email({
					email,
					password,
					callbackURL: "/inventory"
				});
				if (res.error) throw new Error(res.error.message);
			}
			window.location.href = "/inventory";
		} catch (err) {
			setError(err instanceof Error ? err.message : "Не удалось войти");
			setBusy(false);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "grid min-h-dvh bg-background text-foreground lg:grid-cols-2",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "relative hidden flex-col justify-between border-r border-border p-10 lg:flex",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "font-display max-w-md text-4xl font-semibold tracking-tight",
					children: "Инвентарь, который ты собираешь сам."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground",
					children: "Каталог, float, StatTrak, кейсы и лоадаут — с телефона или с компьютера. fluxskin.ru · api.fluxskin.ru"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted",
					children: "Не связан с Valve Corporation."
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "flex flex-col justify-center px-5 py-12 sm:px-10",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mx-auto w-full max-w-sm",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "mb-8 flex lg:hidden",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl font-semibold",
						children: "Вход"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 text-sm text-muted-foreground",
						children: "Google, X или почта. В превью вход настоящий."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-6 flex flex-col gap-2",
						children: GROK_PROVIDERS.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
							type: "button",
							variant: "outline",
							onClick: () => signIn(p.providerId, { callbackURL: "/inventory" }),
							children: ["Продолжить с ", p.label]
						}, p.providerId))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "my-6 flex items-center gap-3 text-xs text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" }),
								"почта",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "h-px flex-1 bg-border" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "space-y-3",
							onSubmit,
							children: [
								mode === "up" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									placeholder: "Имя",
									value: name,
									onChange: (e) => setName(e.target.value),
									autoComplete: "nickname"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "email",
									required: true,
									placeholder: "Email",
									value: email,
									onChange: (e) => setEmail(e.target.value),
									autoComplete: "email"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
									type: "password",
									required: true,
									minLength: 8,
									placeholder: "Пароль",
									value: password,
									onChange: (e) => setPassword(e.target.value),
									autoComplete: mode === "up" ? "new-password" : "current-password"
								}),
								error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-destructive",
									children: error
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
									type: "submit",
									className: "w-full",
									disabled: busy,
									children: busy ? "…" : mode === "up" ? "Создать аккаунт" : "Войти"
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline",
							onClick: () => setMode(mode === "up" ? "in" : "up"),
							children: mode === "up" ? "Уже есть аккаунт" : "Регистрация по почте"
						})
					] })
				]
			})
		})]
	});
}
//#endregion
export { Login as component };
