import { Link, createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InspectDialog } from "@/components/inspect-dialog";
import { RequireAuth } from "@/components/require-auth";
import { SkinImage } from "@/components/skin-image";
import { Button } from "@/components/ui/button";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { SKIN_BY_ID } from "@/lib/skins/data";
import { CATEGORY_RU } from "@/lib/skins/labels";
import type { InventoryItem, Skin } from "@/lib/skins/types";

export const Route = createFileRoute("/_app/loadout")({ component: LoadoutRoute });

const SLOTS = ["Knives", "Gloves", "Rifles", "Pistols", "SMGs", "Heavy"] as const;

function LoadoutRoute() {
  return (
    <RequireAuth>
      <LoadoutPage />
    </RequireAuth>
  );
}

function LoadoutPage() {
  const { data, isPending } = useDashboard();
  const [picked, setPicked] = useState<{ skin: Skin; item: InventoryItem } | null>(null);

  const equipped = useMemo(() => {
    if (!data) return [];
    return data.items
      .filter((i) => i.equipped)
      .map((item) => {
        const skin = SKIN_BY_ID.get(item.skinId);
        return skin ? { item, skin } : null;
      })
      .filter((x): x is { item: InventoryItem; skin: Skin } => Boolean(x));
  }, [data]);

  if (isPending || !data) return <div className="h-40 animate-pulse rounded-md bg-card" />;

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold">Лоадаут</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Экипированные скины по слотам. Один активный скин на оружие.
      </p>

      {equipped.length === 0 ? (
        <div className="mt-10 rounded-lg border border-border bg-card px-6 py-16 text-center">
          <p className="font-display text-xl font-medium">Лоадаут пуст</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Откройте предмет в инвентаре и нажмите «Поставить в лоадаут».
          </p>
          <Button asChild className="mt-6">
            <Link to="/inventory">К инвентарю</Link>
          </Button>
        </div>
      ) : (
        <div className="mt-8 space-y-8">
          {SLOTS.map((slot) => {
            const items = equipped.filter((x) => x.skin.category === slot);
            if (!items.length) return null;
            return (
              <section key={slot}>
                <h2 className="text-sm font-medium text-muted-foreground">
                  {CATEGORY_RU[slot] ?? slot}
                </h2>
                <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map(({ item, skin }) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setPicked({ item, skin })}
                      className="flex items-center gap-4 rounded-md border border-border bg-card p-3 text-left hover:border-muted"
                    >
                      <div className="w-28 shrink-0">
                        <SkinImage src={skin.image} alt={skin.name} />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs text-muted-foreground">{skin.weapon}</p>
                        <p className="truncate text-sm font-medium">{skin.pattern || skin.name}</p>
                        {item.nametag && (
                          <p className="truncate text-xs text-muted-foreground">"{item.nametag}"</p>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      <InspectDialog
        mode={picked ? { kind: "item", skin: picked.skin, item: picked.item } : null}
        onClose={() => setPicked(null)}
        isPremium={data.profile.isPremium}
        count={data.count}
        limit={data.profile.inventoryLimit}
      />
    </div>
  );
}
