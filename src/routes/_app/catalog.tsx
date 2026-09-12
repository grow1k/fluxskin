import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { InspectDialog } from "@/components/inspect-dialog";
import { SkinCard } from "@/components/skin-card";
import { Input } from "@/components/ui/input";
import { useCurrentUserState } from "@/lib/auth/use-current-user";
import { useDashboard } from "@/lib/hooks/use-dashboard";
import { CATEGORIES, SKINS, WEAPONS_BY_CATEGORY } from "@/lib/skins/data";
import { CATEGORY_RU } from "@/lib/skins/labels";
import type { Skin } from "@/lib/skins/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/catalog")({ component: CatalogPage });

const PAGE = 48;

function CatalogPage() {
  const { user } = useCurrentUserState();
  const dash = useDashboard(Boolean(user));
  const [q, setQ] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [weapon, setWeapon] = useState<string>("All");
  const [rarity, setRarity] = useState<string>("All");
  const [shown, setShown] = useState(PAGE);
  const [picked, setPicked] = useState<Skin | null>(null);

  const weapons = category === "All" ? [] : (WEAPONS_BY_CATEGORY[category] ?? []);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return SKINS.filter((s) => {
      if (category !== "All" && s.category !== category) return false;
      if (weapon !== "All" && s.weapon !== weapon) return false;
      if (rarity !== "All" && s.rarity !== rarity) return false;
      if (!query) return true;
      return (
        s.name.toLowerCase().includes(query) ||
        s.weapon.toLowerCase().includes(query) ||
        s.pattern.toLowerCase().includes(query)
      );
    });
  }, [q, category, weapon, rarity]);

  const slice = filtered.slice(0, shown);

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Каталог</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {filtered.length} скинов · добавление в инвентарь после входа
          </p>
        </div>
        <div className="w-full max-w-sm">
          <Input
            value={q}
            onChange={(e) => {
              setQ(e.target.value);
              setShown(PAGE);
            }}
            placeholder="Поиск: Asiimov, Karambit, Fade"
          />
        </div>
      </div>

      <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
        {[{ id: "All", label: "Все" }, ...CATEGORIES.map((c) => ({ id: c, label: CATEGORY_RU[c] ?? c }))].map(
          (c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => {
                setCategory(c.id);
                setWeapon("All");
                setShown(PAGE);
              }}
              className={cn(
                "h-9 shrink-0 rounded-full border px-3 text-sm",
                category === c.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border text-muted-foreground hover:text-foreground",
              )}
            >
              {c.label}
            </button>
          ),
        )}
      </div>

      {weapons.length > 0 && (
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          <Chip active={weapon === "All"} onClick={() => { setWeapon("All"); setShown(PAGE); }}>
            Оружие
          </Chip>
          {weapons.map((w) => (
            <Chip key={w} active={weapon === w} onClick={() => { setWeapon(w); setShown(PAGE); }}>
              {w}
            </Chip>
          ))}
        </div>
      )}

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {["All", "Covert", "Classified", "Restricted", "Mil-Spec Grade", "Extraordinary"].map((r) => (
          <Chip key={r} active={rarity === r} onClick={() => { setRarity(r); setShown(PAGE); }}>
            {r === "All" ? "Редкость" : r.replace(" Grade", "")}
          </Chip>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {slice.map((skin) => (
          <SkinCard key={skin.id} skin={skin} onClick={() => setPicked(skin)} />
        ))}
      </div>

      {shown < filtered.length && (
        <div className="mt-6 flex justify-center">
          <button
            type="button"
            className="h-11 rounded-sm border border-border px-4 text-sm text-muted-foreground hover:text-foreground"
            onClick={() => setShown((n) => n + PAGE)}
          >
            Ещё {Math.min(PAGE, filtered.length - shown)}
          </button>
        </div>
      )}

      <InspectDialog
        mode={picked ? { kind: "catalog", skin: picked } : null}
        onClose={() => setPicked(null)}
        isPremium={dash.data?.profile.isPremium}
        count={dash.data?.count}
        limit={dash.data?.profile.inventoryLimit}
      />
    </div>
  );
}

function Chip({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "h-9 shrink-0 rounded-full border px-3 text-sm",
        active
          ? "border-primary bg-primary text-primary-foreground"
          : "border-border text-muted-foreground hover:text-foreground",
      )}
    >
      {children}
    </button>
  );
}
