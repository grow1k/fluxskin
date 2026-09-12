import { o as require_jsx_runtime } from "../_libs/@radix-ui/react-collection+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as AuthSlot } from "./auth-slot-BYUCh_Rb.mjs";
import { t as Logo } from "./logo-C-oYsY_8.mjs";
import { a as Smartphone, c as MonitorSmartphone, n as Unplug, p as ArrowRight } from "../_libs/lucide-react.mjs";
import { n as SKINS } from "./data-DIqr_Wz0.mjs";
import { t as SkinImage } from "./skin-image-B5_Zc6aH.mjs";
import { t as Button } from "./button-DSzIXQiL.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-C5R3ZnUs.js
var import_jsx_runtime = require_jsx_runtime();
var HERO = SKINS.filter((s) => [
	"AK-47",
	"AWP",
	"M4A1-S",
	"Karambit",
	"Butterfly Knife",
	"Sport Gloves",
	"Desert Eagle"
].includes(s.weapon) && [
	"Covert",
	"Extraordinary",
	"Contraband",
	"Classified"
].includes(s.rarity)).slice(0, 8);
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mx-auto flex h-16 max-w-6xl items-center justify-between px-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "hidden items-center gap-6 text-sm text-muted-foreground md:flex",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/catalog",
								className: "hover:text-foreground",
								children: "Каталог"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#how",
								className: "hover:text-foreground",
								children: "Как это работает"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "#faq",
								className: "hover:text-foreground",
								children: "FAQ"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AuthSlot, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 md:grid-cols-2 md:items-center md:pt-16",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase",
						children: "fluxskin.ru"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "font-display mt-3 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl",
						children: [
							"Скины CS2.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"На твоих условиях."
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-5 max-w-md text-base leading-relaxed text-muted-foreground",
						children: "Собирай любой скин в инвентарь, крути float, клеи nametag и собирай лоадаут. Управление с сайта — с телефона или с компьютера."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mt-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/catalog",
								children: ["Открыть каталог", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4" })]
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
							asChild: true,
							variant: "outline",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/login",
								children: "Войти"
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-6 max-w-md text-xs leading-relaxed text-muted",
						children: "Fluxskin — веб-студия инвентаря. Не модифицирует клиент CS2, не обходит VAC и не связан с Valve."
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid grid-cols-4 gap-2",
					children: HERO.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "overflow-hidden rounded-md border border-border bg-card",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SkinImage, {
							src: s.image,
							alt: s.name,
							className: "p-1"
						})
					}, s.id))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "how",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3",
					children: [
						{
							icon: Smartphone,
							title: "Выбери на сайте",
							text: "Каталог винтовок, ножей, перчаток. Float, StatTrak, nametag — всё в карточке скина."
						},
						{
							icon: MonitorSmartphone,
							title: "Собери инвентарь",
							text: "Предметы живут в аккаунте. Бесплатный тариф — 16 слотов, Premium снимает лимит."
						},
						{
							icon: Unplug,
							title: "Клиент в браузере",
							text: "Ключ доступа связывает профиль с веб-клиентом. Синхронизация коллекции — без установки читов."
						}
					].map((step) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "rounded-lg border border-border bg-card p-5",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(step.icon, { className: "size-5 text-muted-foreground" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
								className: "mt-4 text-lg font-medium",
								children: step.title
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-2 text-sm leading-relaxed text-muted-foreground",
								children: step.text
							})
						]
					}, step.title))
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "Тарифы"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-8 grid gap-4 md:grid-cols-3",
						children: [
							{
								name: "Пробный",
								price: "24 часа",
								note: "Полный доступ при регистрации. 16 слотов после."
							},
							{
								name: "Premium",
								price: "449 ₽ / мес",
								note: "Без лимита инвентаря, ключи и кейсы без потолка."
							},
							{
								name: "Навсегда",
								price: "1 490 ₽",
								note: "Один платёж. Все будущие обновления каталога."
							}
						].map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "rounded-lg border border-border bg-card p-5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-sm text-muted-foreground",
									children: p.name
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 font-display text-2xl font-semibold",
									children: p.price
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-3 text-sm leading-relaxed text-muted-foreground",
									children: p.note
								})
							]
						}, p.name))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				id: "faq",
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto max-w-6xl px-4 py-16",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-3xl font-semibold",
						children: "FAQ"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dl", {
						className: "mt-8 grid gap-6 md:grid-cols-2",
						children: [
							{
								q: "Другие игроки видят скины?",
								a: "Нет. Fluxskin — локальная веб-коллекция. Steam-инвентарь и серверы Valve не меняются."
							},
							{
								q: "Это скинчейнджер для CS2?",
								a: "Это студия инвентаря с тем же сценарием, что был у веб-панелей вроде TouchSkins: выбор на сайте, инвентарь, ключ клиента. Сам клиент CS2 Fluxskin не патчит."
							},
							{
								q: "Можно получить VAC?",
								a: "За пользование сайтом — нет. Инжекторы и обход античита мы не распространяем."
							},
							{
								q: "Что за api.fluxskin.ru?",
								a: "Синхронизация профиля и инвентаря. В этой версии API встроено в приложение, ключ доступа — в настройках."
							}
						].map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
							className: "text-sm font-medium",
							children: item.q
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", {
							className: "mt-2 text-sm leading-relaxed text-muted-foreground",
							children: item.a
						})] }, item.q))
					})]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("footer", {
				className: "border-t border-border",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted md:flex-row md:justify-between",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Fluxskin · fluxskin.ru · api.fluxskin.ru" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Не связан с Valve Corporation. Counter-Strike — торговая марка Valve." })]
				})
			})
		]
	});
}
//#endregion
export { Home as component };
