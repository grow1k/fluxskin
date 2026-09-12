import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { SkinImage } from "@/components/skin-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useBuyKey, useDashboard, useOpenCase } from "@/lib/hooks/use-dashboard";
import { CASES, KEY_COST_STARS, caseContents } from "@/lib/skins/cases";
import { SKIN_BY_ID } from "@/lib/skins/data";
import { RARITY_TONE } from "@/lib/skins/labels";
import type { FluxCase, Skin } from "@/lib/skins/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/_app/cases")({ component: CasesRoute });

function CasesRoute() {
  return (
    <RequireAuth>
      <CasesPage />
    </RequireAuth>
  );
}

function CasesPage() {
  const { data, isPending } = useDashboard();
  const open = useOpenCase();
  const buy = useBuyKey();
  const [active, setActive] = useState<FluxCase | null>(null);
  const [won, setWon] = useState<Skin | null>(null);
  const [spinning, setSpinning] = useState(false);

  if (isPending || !data) return <div className="h-40 animate-pulse rounded-md bg-card" />;

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-2xl font-semibold">Кейсы</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {data.profile.keys} ключей · {data.profile.stars} ★
          </p>
        </div>
        <Button
          variant="outline"
          disabled={buy.isPending}
          onClick={() =>
            buy.mutate(undefined, { onSuccess: () => toast.success("Ключ куплен") })
          }
        >
          Ключ · {KEY_COST_STARS} ★
        </Button>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => setActive(c)}
            className="rounded-lg border border-border bg-card p-5 text-left hover:border-muted"
          >
            <CaseMark tone={c.tone} />
            <h2 className="mt-4 font-display text-xl font-semibold">{c.nameRu}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.blurb}</p>
          </button>
        ))}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(o) => !o && !spinning && setActive(null)}>
        <DialogContent className="max-w-2xl">
          {active && (
            <CaseOpen
              fluxCase={active}
              spinning={spinning}
              keys={data.profile.keys}
              onOpen={() => {
                setSpinning(true);
                open.mutate(active.id, {
                  onSuccess: (res) => {
                    const skin = SKIN_BY_ID.get(res.skinId) ?? null;
                    window.setTimeout(() => {
                      setWon(skin);
                      setSpinning(false);
                    }, 1400);
                  },
                  onError: () => setSpinning(false),
                });
              }}
            />
          )}
        </DialogContent>
      </Dialog>

      <Dialog open={Boolean(won)} onOpenChange={(o) => !o && setWon(null)}>
        <DialogContent>
          {won && (
            <>
              <DialogTitle>Дроп</DialogTitle>
              <DialogDescription className={RARITY_TONE[won.rarity]}>{won.name}</DialogDescription>
              <SkinImage src={won.image} alt={won.name} className="mt-4" />
              <Button className="mt-4 w-full" onClick={() => setWon(null)}>
                В инвентарь
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function CaseOpen({
  fluxCase,
  spinning,
  keys,
  onOpen,
}: {
  fluxCase: FluxCase;
  spinning: boolean;
  keys: number;
  onOpen: () => void;
}) {
  const contents = useMemo(() => caseContents(fluxCase.id), [fluxCase.id]);
  const reel = [...contents, ...contents];
  return (
    <div>
      <DialogTitle>{fluxCase.nameRu}</DialogTitle>
      <DialogDescription>{fluxCase.blurb}</DialogDescription>
      <div className="relative mt-4 overflow-hidden rounded-md border border-border bg-card-2">
        <div className="pointer-events-none absolute inset-y-0 left-1/2 z-10 w-px bg-primary" />
        <div
          className={cn("flex w-max gap-2 p-3", spinning && "animate-[flux-reel_1.2s_linear]")}
          style={spinning ? undefined : { transform: "translateX(0)" }}
        >
          {reel.map((s, i) => (
            <div key={s.id + i} className="w-24 shrink-0">
              <SkinImage src={s.image} alt={s.name} />
            </div>
          ))}
        </div>
      </div>
      <p className="mt-3 text-xs text-muted-foreground">Содержимое: {contents.length} предметов</p>
      <Button className="mt-4 w-full" disabled={spinning || keys < 1} onClick={onOpen}>
        {keys < 1 ? "Нет ключей" : spinning ? "Открываем…" : "Открыть за 1 ключ"}
      </Button>
    </div>
  );
}

function CaseMark({ tone }: { tone: FluxCase["tone"] }) {
  const label: Record<FluxCase["tone"], string> = {
    core: "CORE",
    prime: "PRIME",
    night: "NIGHT",
    edge: "EDGE",
  };
  return (
    <div className="grid h-28 place-items-center rounded-md border border-border bg-card-2 font-display text-sm tracking-[0.2em] text-muted-foreground">
      {label[tone]}
    </div>
  );
}
