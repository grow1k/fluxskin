import { Link, createFileRoute } from "@tanstack/react-router";
import { ArrowRight, MonitorSmartphone, Smartphone, Unplug } from "lucide-react";
import { AuthSlot } from "@/components/auth-slot";
import { Logo } from "@/components/logo";
import { SkinImage } from "@/components/skin-image";
import { Button } from "@/components/ui/button";
import { SKINS } from "@/lib/skins/data";

export const Route = createFileRoute("/")({ component: Home });

const HERO = SKINS.filter(
  (s) =>
    ["AK-47", "AWP", "M4A1-S", "Karambit", "Butterfly Knife", "Sport Gloves", "Desert Eagle"].includes(
      s.weapon,
    ) && ["Covert", "Extraordinary", "Contraband", "Classified"].includes(s.rarity),
).slice(0, 8);

function Home() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <header className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm text-muted-foreground md:flex">
          <Link to="/catalog" className="hover:text-foreground">
            Каталог
          </Link>
          <a href="#how" className="hover:text-foreground">
            Как это работает
          </a>
          <a href="#faq" className="hover:text-foreground">
            FAQ
          </a>
        </nav>
        <AuthSlot />
      </header>

      <section className="mx-auto grid max-w-6xl gap-10 px-4 pt-10 pb-16 md:grid-cols-2 md:items-center md:pt-16">
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
            fluxskin.ru
          </p>
          <h1 className="font-display mt-3 text-4xl leading-[1.05] font-semibold tracking-tight sm:text-5xl">
            Скины CS2.
            <br />
            На твоих условиях.
          </h1>
          <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground">
            Собирай любой скин в инвентарь, крути float, клеи nametag и собирай лоадаут.
            Управление с сайта — с телефона или с компьютера.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Button asChild>
              <Link to="/catalog">
                Открыть каталог
                <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/login">Войти</Link>
            </Button>
          </div>
          <p className="mt-6 max-w-md text-xs leading-relaxed text-muted">
            Fluxskin — веб-студия инвентаря. Не модифицирует клиент CS2, не обходит VAC и не
            связан с Valve.
          </p>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {HERO.map((s) => (
            <div
              key={s.id}
              className="overflow-hidden rounded-md border border-border bg-card"
            >
              <SkinImage src={s.image} alt={s.name} className="p-1" />
            </div>
          ))}
        </div>
      </section>

      <section id="how" className="border-t border-border">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 md:grid-cols-3">
          {[
            {
              icon: Smartphone,
              title: "Выбери на сайте",
              text: "Каталог винтовок, ножей, перчаток. Float, StatTrak, nametag — всё в карточке скина.",
            },
            {
              icon: MonitorSmartphone,
              title: "Собери инвентарь",
              text: "Предметы живут в аккаунте. Бесплатный тариф — 16 слотов, Premium снимает лимит.",
            },
            {
              icon: Unplug,
              title: "Клиент в браузере",
              text: "Ключ доступа связывает профиль с веб-клиентом. Синхронизация коллекции — без установки читов.",
            },
          ].map((step) => (
            <div key={step.title} className="rounded-lg border border-border bg-card p-5">
              <step.icon className="size-5 text-muted-foreground" />
              <h2 className="mt-4 text-lg font-medium">{step.title}</h2>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-semibold">Тарифы</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              { name: "Пробный", price: "24 часа", note: "Полный доступ при регистрации. 16 слотов после." },
              { name: "Premium", price: "449 ₽ / мес", note: "Без лимита инвентаря, ключи и кейсы без потолка." },
              { name: "Навсегда", price: "1 490 ₽", note: "Один платёж. Все будущие обновления каталога." },
            ].map((p) => (
              <div key={p.name} className="rounded-lg border border-border bg-card p-5">
                <p className="text-sm text-muted-foreground">{p.name}</p>
                <p className="mt-2 font-display text-2xl font-semibold">{p.price}</p>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-16">
          <h2 className="font-display text-3xl font-semibold">FAQ</h2>
          <dl className="mt-8 grid gap-6 md:grid-cols-2">
            {[
              {
                q: "Другие игроки видят скины?",
                a: "Нет. Fluxskin — локальная веб-коллекция. Steam-инвентарь и серверы Valve не меняются.",
              },
              {
                q: "Это скинчейнджер для CS2?",
                a: "Это студия инвентаря с тем же сценарием, что был у веб-панелей вроде TouchSkins: выбор на сайте, инвентарь, ключ клиента. Сам клиент CS2 Fluxskin не патчит.",
              },
              {
                q: "Можно получить VAC?",
                a: "За пользование сайтом — нет. Инжекторы и обход античита мы не распространяем.",
              },
              {
                q: "Что за api.fluxskin.ru?",
                a: "Синхронизация профиля и инвентаря. В этой версии API встроено в приложение, ключ доступа — в настройках.",
              },
            ].map((item) => (
              <div key={item.q}>
                <dt className="text-sm font-medium">{item.q}</dt>
                <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <footer className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-8 text-xs text-muted md:flex-row md:justify-between">
          <span>Fluxskin · fluxskin.ru · api.fluxskin.ru</span>
          <span>Не связан с Valve Corporation. Counter-Strike — торговая марка Valve.</span>
        </div>
      </footer>
    </div>
  );
}
