import { Link } from "@tanstack/react-router";
import { UserButton } from "@/lib/auth/gates";
import { useCurrentUserState } from "@/lib/auth/use-current-user";

export function AuthSlot() {
  const { user, isPending } = useCurrentUserState();
  if (isPending) {
    return <div className="size-8 animate-pulse rounded-full bg-card-2" />;
  }
  if (!user) {
    return (
      <Link
        to="/login"
        className="inline-flex h-11 items-center rounded-sm bg-primary px-4 text-sm font-medium text-primary-foreground"
      >
        Войти
      </Link>
    );
  }
  return <UserButton />;
}
