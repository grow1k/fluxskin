import { SkinImage } from "@/components/skin-image";
import { RARITY_TONE } from "@/lib/skins/labels";
import type { InventoryItem, Skin } from "@/lib/skins/types";
import { WEAR_SHORT, formatFloat } from "@/lib/skins/wear";
import { cn } from "@/lib/utils";

export function SkinCard({
  skin,
  item,
  onClick,
  selected,
}: {
  skin: Skin;
  item?: InventoryItem;
  onClick?: () => void;
  selected?: boolean;
}) {
  const tone = RARITY_TONE[skin.rarity] ?? "rarity-milspec";
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-md border bg-card text-left transition-[border-color] duration-150",
        selected ? "border-primary" : "border-border hover:border-muted",
      )}
    >
      <span className={cn("rarity-bar", tone)} />
      <div className="relative px-2 pt-3">
        <SkinImage src={skin.image} alt={skin.name} />
        {item?.equipped && (
          <span className="absolute top-2 left-2 rounded-full bg-primary px-2 py-0.5 text-[10px] font-medium text-primary-foreground">
            В лоадауте
          </span>
        )}
        {item?.stattrak && (
          <span className="absolute top-2 right-2 font-mono text-[10px] font-medium tracking-wide text-rarity-gold">
            ST
          </span>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-1 px-3 pt-2 pb-3">
        <p className="text-[11px] text-muted-foreground">{skin.weapon}</p>
        <p className="line-clamp-2 text-[13px] leading-snug font-medium text-foreground">
          {item?.nametag ? `"${item.nametag}"` : skin.pattern || skin.name}
        </p>
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className={cn("text-[10px] font-medium tracking-wide uppercase", tone)}>
            {skin.rarity.replace(" Grade", "")}
          </span>
          {item ? (
            <span className="font-mono text-[10px] text-muted-foreground tabular-nums">
              {WEAR_SHORT[item.wear]} · {formatFloat(item.floatValue).slice(0, 6)}
            </span>
          ) : null}
        </div>
      </div>
    </button>
  );
}
