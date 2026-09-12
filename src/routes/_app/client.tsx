import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { useClientStore } from "@/lib/client-store";
import { useDashboard } from "@/lib/hooks/use-dashboard";

export const Route = createFileRoute("/_app/client")({ component: ClientRoute });

function ClientRoute() {
  return (
    <RequireAuth>
      <ClientPage />
    </RequireAuth>
  );
}

function ClientPage() {
  const { data, isPending } = useDashboard();
  const running = useClientStore((s) => s.running);
  const lastSync = useClientStore((s) => s.lastSync);
  const setRunning = useClientStore((s) => s.setRunning);
  const markSync = useClientStore((s) => s.markSync);

  if (isPending || !data) return <div className="h-40 animate-pulse rounded-md bg-card" />;

  function downloadConfig() {
    if (!data) return;
    const payload = {
      host: "api.fluxskin.ru",
      site: "fluxskin.ru",
      accessKey: data.profile.accessKey,
      inventory: data.count,
      note: "Fluxskin web companion config. Not a CS2 injector.",
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "fluxskin-client.json";
    a.click();
    URL.revokeObjectURL(url);
    toast.success("Конфиг скачан");
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-semibold">Клиент</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Веб-компаньон. Ключ из настроек связывает профиль с api.fluxskin.ru.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-4 py-3 text-xs text-muted-foreground">
          <span>Fluxskin Client</span>
          <span className="font-mono">v2.4.0-web</span>
        </div>
        <div className="space-y-4 p-5">
          <Row label="Статус">
            <span className={running ? "text-ok" : "text-muted-foreground"}>
              {running ? "Запущен" : "Остановлен"}
            </span>
          </Row>
          <Row label="API">api.fluxskin.ru</Row>
          <Row label="Ключ">
            <span className="font-mono text-xs">{data.profile.accessKey}</span>
          </Row>
          <Row label="Инвентарь">{data.count} предметов</Row>
          <Row label="Синхронизация">
            {lastSync ? new Date(lastSync).toLocaleString("ru-RU") : "ещё не было"}
          </Row>
          <div className="flex flex-col gap-2 pt-2">
            <Button
              onClick={() => {
                setRunning(!running);
                if (!running) {
                  markSync();
                  toast.success("Клиент запущен, инвентарь синхронизирован");
                }
              }}
            >
              {running ? "Остановить" : "Запустить"}
            </Button>
            <Button
              variant="outline"
              disabled={!running}
              onClick={() => {
                markSync();
                toast.success("Синхронизировано");
              }}
            >
              Синхронизировать
            </Button>
            <Button variant="ghost" onClick={downloadConfig}>
              Скачать конфиг
            </Button>
          </div>
        </div>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-muted">
        Это браузерный компаньон. Fluxskin не ставит программу в процесс CS2 и не обходит античит.
        Конфиг содержит только ключ доступа к вашему профилю.
      </p>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-right">{children}</span>
    </div>
  );
}
