import { Link, createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState, type FormEvent } from "react";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GROK_PROVIDERS, authClient, authEnabled, signIn } from "@/lib/auth/client";
import { emailAndPasswordEnabled } from "@/lib/auth/email-password";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const { user, isPending } = useCurrentUserState();
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (user) void navigate({ to: "/inventory" });
  }, [user, navigate]);

  if (isPending) {
    return <main className="grid min-h-dvh place-items-center bg-background text-foreground" />;
  }
  if (user) {
    return <main className="grid min-h-dvh place-items-center bg-background text-foreground" />;
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "player",
          callbackURL: "/inventory",
        });
        if (res.error) throw new Error(res.error.message);
      } else {
        const res = await authClient.signIn.email({
          email,
          password,
          callbackURL: "/inventory",
        });
        if (res.error) throw new Error(res.error.message);
      }
      window.location.href = "/inventory";
    } catch (err) {
      setError(err instanceof Error ? err.message : "Не удалось войти");
      setBusy(false);
    }
  }

  return (
    <main className="grid min-h-dvh bg-background text-foreground lg:grid-cols-2">
      <section className="relative hidden flex-col justify-between border-r border-border p-10 lg:flex">
        <Link to="/">
          <Logo />
        </Link>
        <div>
          <h1 className="font-display max-w-md text-4xl font-semibold tracking-tight">
            Инвентарь, который ты собираешь сам.
          </h1>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
            Каталог, float, StatTrak, кейсы и лоадаут — с телефона или с компьютера.
            fluxskin.ru · api.fluxskin.ru
          </p>
        </div>
        <p className="text-xs text-muted">Не связан с Valve Corporation.</p>
      </section>

      <section className="flex flex-col justify-center px-5 py-12 sm:px-10">
        <div className="mx-auto w-full max-w-sm">
          <Link to="/" className="mb-8 flex lg:hidden">
            <Logo />
          </Link>
          <h2 className="font-display text-2xl font-semibold">Вход</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Google, X или почта. В превью вход настоящий.
          </p>

          {authEnabled ? (
            <div className="mt-6 flex flex-col gap-2">
              {GROK_PROVIDERS.map((p) => (
                <Button
                  key={p.providerId}
                  type="button"
                  variant="outline"
                  onClick={() => signIn(p.providerId, { callbackURL: "/inventory" })}
                >
                  Продолжить с {p.label}
                </Button>
              ))}
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">Вход отключён.</p>
          )}

          {emailAndPasswordEnabled && (
            <>
              <div className="my-6 flex items-center gap-3 text-xs text-muted">
                <span className="h-px flex-1 bg-border" />
                почта
                <span className="h-px flex-1 bg-border" />
              </div>
              <form className="space-y-3" onSubmit={onSubmit}>
                {mode === "up" && (
                  <Input
                    placeholder="Имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="nickname"
                  />
                )}
                <Input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <Input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                />
                {error && <p className="text-sm text-destructive">{error}</p>}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "…" : mode === "up" ? "Создать аккаунт" : "Войти"}
                </Button>
              </form>
              <button
                type="button"
                className="mt-4 text-sm text-muted-foreground underline-offset-4 hover:underline"
                onClick={() => setMode(mode === "up" ? "in" : "up")}
              >
                {mode === "up" ? "Уже есть аккаунт" : "Регистрация по почте"}
              </button>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
