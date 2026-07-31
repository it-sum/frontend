import { apiClient } from "@/src/lib/api";
import type {
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RefreshResponse,
} from "@/src/types/auth";

/**
 * Auth service — thin wrappers over the API client.
 *
 * The access token is NOT stored here; the caller (auth store or component) is
 * responsible for persisting it in memory and passing it back via `token`.
 */

/**
 * Authenticate with email/student-code + password.
 * On success the backend also sets an httpOnly refresh cookie.
 */
export async function login(
  identifier: string,
  password: string,
): Promise<LoginResponse> {
  return apiClient<LoginResponse>("/auth/login", {
    method: "POST",
    body: { identifier, password },
  });
}

/**
 * Fetch the currently authenticated user.
 * Requires a valid access token — pass it as `token`.
 */
export async function me(token: string): Promise<MeResponse> {
  return apiClient<MeResponse>("/auth/me", {
    method: "GET",
    token,
  });
}

/**
 * Rotate the refresh token and obtain a new access token.
 * The refresh token travels via the httpOnly cookie (credentials: "include").
 */
export async function refresh(): Promise<RefreshResponse> {
  return apiClient<RefreshResponse>("/auth/refresh", {
    method: "POST",
  });
}

/**
 * Revoke the current session on the backend and clear the refresh cookie.
 * Safe to call even when not authenticated (backend handles gracefully).
 */
export async function logout(): Promise<LogoutResponse> {
  return apiClient<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
}
