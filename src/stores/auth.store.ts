import { create } from "zustand";
import type { AuthUser } from "@/src/types/auth";

type AuthState = {
  /** Short-lived JWT access token held in memory only (never persisted to storage). */
  accessToken: string | null;
  /** Full authenticated user object. */
  user: AuthUser | null;
  /** True while a silent session-restore (/auth/me or /auth/refresh) is in flight. */
  isRestoring: boolean;
};

type AuthActions = {
  /** Store a new session after login or token refresh. */
  setSession: (accessToken: string, user: AuthUser) => void;
  /** Clear the session after logout or when the token is no longer valid. */
  clearSession: () => void;
  /** Mark the restore-in-progress flag. */
  setRestoring: (value: boolean) => void;
};

export type AuthStore = AuthState & AuthActions;

export const useAuthStore = create<AuthStore>((set) => ({
  // ── State ──────────────────────────────────────────────────────────────────
  accessToken: null,
  user: null,
  isRestoring: true, // start as true so pages wait before deciding to redirect

  // ── Actions ────────────────────────────────────────────────────────────────
  setSession: (accessToken, user) =>
    set({ accessToken, user, isRestoring: false }),

  clearSession: () =>
    set({ accessToken: null, user: null, isRestoring: false }),

  setRestoring: (value) => set({ isRestoring: value }),
}));
