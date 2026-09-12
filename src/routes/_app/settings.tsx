import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { RequireAuth } from "@/components/require-auth";
import { Button } from "@/components/ui/button";
import { useCurrentUser } from "@/lib/auth/use-current-user";
import { useDashboard, useRotateKey } from "@/lib/hooks/use-dashboard";
import { PLAN_RU } from "@/lib/skins/labels";

export const Route = createFileRoute("/_app/settings")({ component: SettingsRoute });

function SettingsRoute() {
  return (
    <RequireAuth>
      <SettingsPage />
    </RequireAuth>
  );
}

function SettingsPage() {
  const user = useCurrentUser();
  const { data, isPending } = useDashboard();
  const rotate = useRotateKey();

  if (isPending || !data) return <div className="h-40 animate-pulse rounded-md bg-card" />;

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="font-display text-2xl font-semibold">Настройки</h1>
      <p className="mt-1 text-sm text-muted-foreground">Профиль и ключ доступа к API.</p>

      <section className="mt-6 rounded-lg border border-border bg-card p-5">
        <h2 className="text-sm font-medium">Аккаунт</h2>
        <dl className="mt-3 space-y-2 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Имя</dt>
            <dd>{user?.displayName ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Почта</dt>
            <dd className="truncate">{user?.primaryEmail ?? "—"}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">План</dt>
            <dd>{PLAN_RU[data.profile.plan]}</dd>
          </div>
        </dl>
      </section>

      <section className="mt-4 rounded-lg border border-border bg-card p-5">
        <h2 className="text-sm font-medium">Ключ доступа</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Вставьте ключ в клиент, чтобы связать аккаунт. Хост API: api.fluxskin.ru
        </p>
        <code className="mt-3 block rounded-sm bg-card-2 px-3 py-3 font-mono text-sm">
          {data.profile.accessKey}
        </code>
        <div className="mt-3 flex flex-wrap gap-2">
          <Button
            variant="outline"
            onClick={async () => {
              await navigator.clipboard.writeText(data.profile.accessKey);
              toast.success("Ключ скопирован");
            }}
          >
            Копировать
          </Button>
          <Button
            variant="ghost"
            disabled={rotate.isPending}
            onClick={() =>
              rotate.mutate(undefined, { onSuccess: () => toast.success("Ключ обновлён") })
            }
          >
            Обновить ключ
          </Button>
        </div>
      </section>
    </div>
  );
}
