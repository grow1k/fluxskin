import { Link, useRouterState } from "@tanstack/react-router";
import {
  Box,
  Crosshair,
  LayoutGrid,
  Menu,
  MonitorSmartphone,
  Settings,
  ShoppingBag,
  Sword,
} from "lucide-react";
import { useState } from "react";
import { AuthSlot } from "@/components/auth-slot";
import { Logo } from "@/components/logo";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { useClientStore } from "@/lib/client-store";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/catalog", label: "Каталог", icon: LayoutGrid },
  { to: "/inventory", label: "Инвентарь", icon: Box },
  { to: "/loadout", label: "Лоадаут", icon: Sword },
  { to: "/cases", label: "Кейсы", icon: Crosshair },
  { to: "/shop", label: "Магазин", icon: ShoppingBag },
  { to: "/client", label: "Клиент", icon: MonitorSmartphone },
  { to: "/settings", label: "Настройки", icon: Settings },
] as const;

const MOBILE_PRIMARY = ["/catalog", "/inventory", "/cases", "/client"] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { user } = useCurrentUserState();
  const dash = useDashboard(Boolean(user));
  const running = useClientStore((s) => s.running);
  const [more, setMore] = useState(false);
  const profile = dash.data?.profile;

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-60 border-r border-border bg-background lg:flex lg:flex-col">
        <div className="flex h-16 items-center px-5">
          <Link to="/" className="flex items-center">
            <Logo />
          </Link>
        </div>
        <nav className="flex flex-1 flex-col gap-1 px-3">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-sm px-3 text-sm transition-colors duration-150",
                  active
                    ? "bg-card-2 text-foreground"
                    : "text-muted-foreground hover:bg-card hover:text-foreground",
                )}
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-border px-4 py-4 text-xs text-muted-foreground">
          <div className="flex items-center justify-between">
            <span>Клиент</span>
            <span className={running ? "text-ok" : "text-muted"}>
              {running ? "онлайн" : "оффлайн"}
            </span>
          </div>
          {profile && (
            <p className="mt-2">
              {profile.isPremium ? "Premium" : `Слоты ${dash.data?.count ?? 0}/${profile.inventoryLimit}`}
            </p>
          )}
        </div>
      </aside>

      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/95 px-4 lg:hidden">
        <Link to="/" className="flex items-center">
          <Logo />
        </Link>
        <AuthSlot />
      </header>

      <div className="lg:pl-60">
        <div className="hidden h-16 items-center justify-between border-b border-border px-6 lg:flex">
          <div className="flex items-center gap-3 text-sm text-muted-foreground">
            <span className={cn("size-1.5 rounded-full", running ? "bg-ok" : "bg-muted")} />
            {running ? "Клиент подключён" : "Клиент не запущен"}
            {profile && (
              <span className="text-muted">
                · {profile.stars} ★ · {profile.keys} ключей
              </span>
            )}
          </div>
          <AuthSlot />
        </div>
        <div className="px-4 py-6 pb-28 lg:px-8 lg:pb-10">{children}</div>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-20 grid h-16 grid-cols-5 border-t border-border bg-background lg:hidden">
        {NAV.filter((n) => (MOBILE_PRIMARY as readonly string[]).includes(n.to)).map((item) => {
          const Icon = item.icon;
          const active = pathname === item.to;
          return (
            <Link
              key={item.to}
              to={item.to}
              className={cn(
                "flex flex-col items-center justify-center gap-1 text-[10px]",
                active ? "text-foreground" : "text-muted-foreground",
              )}
            >
              <Icon className="size-4" />
              {item.label}
            </Link>
          );
        })}
        <button
          type="button"
          onClick={() => setMore(true)}
          className="flex flex-col items-center justify-center gap-1 text-[10px] text-muted-foreground"
        >
          <Menu className="size-4" />
          Ещё
        </button>
      </nav>

      <Sheet open={more} onOpenChange={setMore}>
        <SheetContent side="bottom" className="pb-8">
          <SheetTitle>Разделы</SheetTitle>
          <div className="mt-4 grid gap-1">
            {NAV.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMore(false)}
                  className="flex h-12 items-center gap-3 rounded-sm px-2 text-sm hover:bg-card-2"
                >
                  <Icon className="size-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
