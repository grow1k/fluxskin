import { useState } from "react";
import { cn } from "@/lib/utils";

export function SkinImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        className={cn(
          "grid aspect-[4/3] place-items-center bg-card-2 text-[11px] text-muted",
          className,
        )}
      >
        Нет изображения
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setOk(false)}
      className={cn("aspect-[4/3] w-full object-contain object-center", className)}
    />
  );
}
