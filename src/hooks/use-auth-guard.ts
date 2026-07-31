import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";
import { useAuthStore } from "@/src/stores/auth.store";
import { me } from "@/src/services/auth.service";
import { ApiError } from "@/src/lib/api";

/**
 * useAuthGuard — UX-only route protection hook.
 *
 * Usage: call at the top of any protected page component.
 *
 * Behaviour:
 * - While the session is being restored (isRestoring=true), does nothing.
 * - Once restore is complete:
 *   - If there's a valid in-memory access token → verifies it with /auth/me.
 *   - If /auth/me succeeds → user stays on the page.
 *   - If /auth/me fails (401) or there's no token → redirect to /login.
 *
 * NOTE: The backend guards are the source of truth. This hook is for UX
 * only — it avoids a flash of protected content before the 401 is returned.
 *
 * @param allowedRole  optional — redirect away if user's role doesn't match.
 */
export function useAuthGuard(allowedRole?: string) {
  const { accessToken, user, isRestoring, setSession, clearSession } =
    useAuthStore();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    // Wait until SessionRestorer has finished.
    if (isRestoring) return;

    // No token means no session.
    if (!accessToken) {
      router.replace(`/${locale}/login`);
      return;
    }

    // Verify the token is still valid by calling /auth/me.
    let cancelled = false;
    me(accessToken)
      .then((res) => {
        if (!cancelled) {
          setSession(accessToken, res.data.user);
          // Role mismatch — send them to the right dashboard.
          if (allowedRole && res.data.user.roleName !== allowedRole) {
            const target =
              res.data.user.roleName === "admin" ? "admin" : "dashboard";
            router.replace(`/${locale}/${target}`);
          }
        }
      })
      .catch((err) => {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 401) {
            clearSession();
            router.replace(`/${locale}/login`);
          }
        }
      });

    return () => {
      cancelled = true;
    };
  }, [
    isRestoring,
    accessToken,
    locale,
    allowedRole,
    router,
    setSession,
    clearSession,
  ]);

  return { user, isRestoring };
}
