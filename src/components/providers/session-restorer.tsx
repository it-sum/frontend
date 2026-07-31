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
