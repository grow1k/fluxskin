import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { SkinImage } from "@/components/skin-image";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { useAddItem, useEquipItem, useRemoveItem, useUpdateItem } from "@/lib/hooks/use-dashboard";
import { CATEGORY_RU, RARITY_RU, RARITY_TONE } from "@/lib/skins/labels";
import type { InventoryItem, Skin } from "@/lib/skins/types";
import { WEAR_LABEL, clampFloat, formatFloat, randomFloat, wearFromFloat } from "@/lib/skins/wear";

type Mode = { kind: "catalog"; skin: Skin } | { kind: "item"; skin: Skin; item: InventoryItem };

export function InspectDialog({
  mode,
  onClose,
  isPremium,
  count,
  limit,
}: {
  mode: Mode | null;
  onClose: () => void;
  isPremium?: boolean;
  count?: number;
  limit?: number | null;
}) {
  const skin = mode?.skin;
  const item = mode?.kind === "item" ? mode.item : null;
  const user = useCurrentUser();
  const [floatValue, setFloatValue] = useState(0.15);
  const [stattrak, setStattrak] = useState(false);
  const [nametag, setNametag] = useState("");

  useEffect(() => {
    if (!skin) return;
    if (item) {
      setFloatValue(item.floatValue);
      setStattrak(item.stattrak);
      setNametag(item.nametag ?? "");
    } else {
      const mid = clampFloat((skin.minFloat + skin.maxFloat) / 2, skin.minFloat, skin.maxFloat);
      setFloatValue(Number(mid.toFixed(8)));
      setStattrak(false);
      setNametag("");
    }
  }, [skin, item]);

  const add = useAddItem();
  const update = useUpdateItem();
  const remove = useRemoveItem();
  const equip = useEquipItem();

  const wear = wearFromFloat(floatValue);
  const tone = skin ? (RARITY_TONE[skin.rarity] ?? "rarity-milspec") : "";
  const atLimit = Boolean(!isPremium && limit && (count ?? 0) >= limit);

  const min = skin?.minFloat ?? 0;
  const max = skin?.maxFloat ?? 1;
  const sliderValue = useMemo(() => [floatValue], [floatValue]);

  if (!skin) return null;

  return (
    <Dialog open={Boolean(mode)} onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogTitle className="pr-10">{skin.name}</DialogTitle>
        <DialogDescription>
          {CATEGORY_RU[skin.category] ?? skin.category} · {RARITY_RU[skin.rarity] ?? skin.rarity}
          {skin.collection ? ` · ${skin.collection}` : ""}
        </DialogDescription>
        <div className="mt-3 overflow-hidden rounded-md border border-border bg-card-2">
          <span className={"rarity-bar block " + tone} />
          <SkinImage src={skin.image} alt={skin.name} className="px-4 py-6" />
        </div>

        <div className="mt-4 space-y-4">
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Износ</span>
              <span className="font-mono text-xs tabular-nums text-foreground">
                {WEAR_LABEL[wear]} · {formatFloat(floatValue)}
              </span>
            </div>
            <Slider
              min={min}
              max={max}
              step={0.0001}
              value={sliderValue}
              onValueChange={([v]) => setFloatValue(clampFloat(v ?? min, min, max))}
            />
            <button
              type="button"
              className="mt-1 text-xs text-muted-foreground underline-offset-4 hover:underline"
              onClick={() => setFloatValue(randomFloat(min, max))}
            >
              Случайный float
            </button>
          </div>

          {skin.stattrak && (
            <label className="flex h-11 items-center justify-between gap-3 text-sm">
              <span>StatTrak™</span>
              <Switch checked={stattrak} onCheckedChange={setStattrak} />
            </label>
          )}

          <div>
            <label className="mb-1 block text-sm text-muted-foreground" htmlFor="nametag">
              Имя (до 20 символов)
            </label>
            <Input
              id="nametag"
              value={nametag}
              maxLength={20}
              placeholder="Nametag"
              onChange={(e) => setNametag(e.target.value)}
            />
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          {mode?.kind === "catalog" ? (
            user ? (
              <Button
                disabled={add.isPending || atLimit}
                onClick={() => {
                  add.mutate(
                    {
                      skinId: skin.id,
                      floatValue,
                      stattrak,
                      nametag: nametag || undefined,
                      source: "catalog",
                    },
                    {
                      onSuccess: () => {
                        toast.success("Добавлено в инвентарь");
                        onClose();
                      },
                    },
                  );
                }}
              >
                {atLimit ? "Лимит инвентаря" : add.isPending ? "Добавляем…" : "Добавить в инвентарь"}
              </Button>
            ) : (
              <Button asChild>
                <Link to="/login">Войти, чтобы добавить</Link>
              </Button>
            )
          ) : (
            <>
              <Button
                disabled={update.isPending}
                onClick={() => {
                  if (!item) return;
                  update.mutate(
                    { id: item.id, floatValue, stattrak, nametag: nametag || null },
                    { onSuccess: () => toast.success("Сохранено") },
                  );
                }}
              >
                {update.isPending ? "Сохраняем…" : "Сохранить"}
              </Button>
              <Button
                variant="outline"
                disabled={equip.isPending}
                onClick={() => item && equip.mutate(item.id)}
              >
                {item?.equipped ? "Снять с лоадаута" : "Поставить в лоадаут"}
              </Button>
              <Button
                variant="ghost"
                className="text-destructive"
                disabled={remove.isPending}
                onClick={() => {
                  if (!item) return;
                  remove.mutate(item.id, {
                    onSuccess: () => {
                      toast.success("Удалено");
                      onClose();
                    },
                  });
                }}
              >
                Удалить
              </Button>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
