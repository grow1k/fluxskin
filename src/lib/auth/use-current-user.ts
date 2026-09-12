import { authClient } from "./client";
import { authEnabled } from "./client";

const DEV_USER = {
  id: "dev-user",
  displayName: "FluxSkin User",
  email: "dev@fluxskin.local",
  image: null,
};

type CurrentUser = typeof DEV_USER;

export type CurrentUserState = {
  user: CurrentUser | null;
  isPending: boolean;
};

/**
 * Read the current authenticated user. When auth is disabled, a local dev user
 * is returned synchronously; when enabled, Better Auth owns the session state.
 */
export function useCurrentUserState(): CurrentUserState {
  if (!authEnabled) return { user: DEV_USER, isPending: false };
  const { data, isPending } = authClient.useSession();
  const user = data?.user;
  return {
    user: user
      ? {
          id: user.id,
          displayName: user.name ?? null,
          email: user.email ?? null,
          image: user.image ?? null,
        }
      : null,
    isPending,
  };
}
