import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { useBuyPlan, useBuyStars, useDashboard } from "@/lib/hooks/use-dashboard";
import { KEY_COST_STARS } from "@/lib/skins/cases";
import { PLAN_RU } from "@/lib/skins/labels";

export const Route = createFileRoute("/_app/shop")({ component: ShopRoute });

function ShopRoute() {
  return (
    <RequireAuth>
      <ShopPage />
    </RequireAuth>
  );
}

function ShopPage() {
  const { data, isPending } = useDashboard();
  const stars = useBuyStars();
  const plan = useBuyPlan();

  if (isPending || !data) return <div className="h-40 animate-pulse rounded-md bg-card" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Магазин</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        План: {PLAN_RU[data.profile.plan] ?? data.profile.plan} · {data.profile.stars} ★ ·{" "}
        {data.profile.keys} ключей
      </p>
      <p className="mt-2 text-xs text-muted">
        Оплата в превью зачисляется сразу — это демонстрационный магазин, не эквайринг.
      </p>

      <h2 className="mt-8 text-sm font-medium text-muted-foreground">Подписка</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-3">
        <PlanCard
          title="7 дней"
          price="199 ₽"
          busy={plan.isPending}
          onBuy={() =>
            plan.mutate("week", { onSuccess: () => toast.success("Premium на 7 дней") })
          }
        />
        <PlanCard
          title="30 дней"
          price="449 ₽"
          busy={plan.isPending}
          onBuy={() =>
            plan.mutate("month", { onSuccess: () => toast.success("Premium на 30 дней") })
          }
        />
        <PlanCard
          title="Навсегда"
          price="1 490 ₽"
          busy={plan.isPending}
          onBuy={() =>
            plan.mutate("lifetime", { onSuccess: () => toast.success("Lifetime активирован") })
          }
        />
      </div>

      <h2 className="mt-10 text-sm font-medium text-muted-foreground">Звёзды</h2>
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        <PlanCard
          title="200 ★"
          price="99 ₽"
          note={`Ключ кейса — ${KEY_COST_STARS} ★`}
          busy={stars.isPending}
          onBuy={() => stars.mutate("s200", { onSuccess: () => toast.success("+200 ★") })}
        />
        <PlanCard
          title="800 ★"
          price="299 ₽"
          busy={stars.isPending}
          onBuy={() => stars.mutate("s800", { onSuccess: () => toast.success("+800 ★") })}
        />
      </div>
    </div>
  );
}

function PlanCard({
  title,
  price,
  note,
  busy,
  onBuy,
}: {
  title: string;
  price: string;
  note?: string;
  busy: boolean;
  onBuy: () => void;
}) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-sm text-muted-foreground">{title}</p>
      <p className="mt-2 font-display text-2xl font-semibold">{price}</p>
      {note && <p className="mt-2 text-xs text-muted">{note}</p>}
      <Button className="mt-4 w-full" disabled={busy} onClick={onBuy}>
        Купить
      </Button>
    </div>
  );
}
