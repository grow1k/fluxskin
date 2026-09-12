import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InspectDialog } from "@/components/inspect-dialog";
import { RequireAuth } from "@/components/require-auth";
import { SkinCard } from "@/components/skin-card";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { SKIN_BY_ID } from "@/lib/skins/data";
import type { InventoryItem, Skin } from "@/lib/skins/types";

export const Route = createFileRoute("/_app/inventory")({ component: InventoryRoute });

function InventoryRoute() {
  return (
    <RequireAuth>
      <InventoryPage />
    </RequireAuth>
  );
}

function InventoryPage() {
  const { data, isPending } = useDashboard();
  const [picked, setPicked] = useState<{ skin: Skin; item: InventoryItem } | null>(null);

  const rows = useMemo(() => {
    if (!data) return [];
    return data.items
      .map((item) => {
        const skin = SKIN_BY_ID.get(item.skinId);
        return skin ? { item, skin } : null;
      })
      .filter((x): x is { item: InventoryItem; skin: Skin } => Boolean(x));
  }, [data]);

  if (isPending || !data) {
    return <div className="h-40 animate-pulse rounded-md bg-card" />;
  }

  const { profile } = data;
  const cap = profile.inventoryLimit;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Инвентарь</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.count}
            {cap ? ` / ${cap}` : ""} предметов
            {profile.isPremium ? " · Premium" : " · бесплатный лимит"}
          </p>
        </div>
        <Button asChild variant="outline">
          <Link to="/catalog">Добавить скины</Link>
        </Button>
      </div>

      {rows.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-xl font-medium">Инвентарь пуст</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Откройте каталог и добавьте первый скин. Пробный Premium уже активен 24 часа.
          </p>
          <Button asChild className="mt-6">
            <Link to="/catalog">В каталог</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {rows.map(({ item, skin }) => (
            <SkinCard
              key={item.id}
              skin={skin}
              item={item}
              onClick={() => setPicked({ skin, item })}
            />
          ))}
        </div>
      )}

      <InspectDialog
        mode={picked ? { kind: "item", skin: picked.skin, item: picked.item } : null}
        onClose={() => setPicked(null)}
        isPremium={profile.isPremium}
        count={data.count}
        limit={profile.inventoryLimit}
      />
    </div>
  );
}
