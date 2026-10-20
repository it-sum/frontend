"use client";

import { useEffect } from "react";
import { refresh } from "@/src/services/auth.service";
import { ApiError } from "@/src/lib/api";
import { useAuthStore } from "@/src/stores/auth.store";

export function SessionRestorer() {
  const { setSession, clearSession, setRestoring } = useAuthStore();

  useEffect(() => {
    let cancelled = false;

    async function restore() {
      // A locale transition can remount this component while the in-memory
      // session is still valid. Do not let a refresh without a cookie clear it.
      if (useAuthStore.getState().accessToken) return;

      try {
        const res = await refresh();
        if (!cancelled) {
          setSession(res.data.accessToken, res.data.user);
        }
      } catch (err) {
        if (!cancelled) {
          if (err instanceof ApiError && err.status === 401) {
            clearSession();
          } else {
            clearSession();
          }
        }
      }
    }

    restore();
    return () => {
      cancelled = true;
    };
  }, [setSession, clearSession, setRestoring]);

  return null;
}
