import { apiClient } from "@/src/lib/api";
import type {
  AuthUser,
  LoginResponse,
  LogoutResponse,
  MeResponse,
  RefreshResponse,
} from "@/src/types/auth";

const DEMO_TOKEN_PREFIX = "demo-account:";
const DEMO_TIMESTAMP = "2026-01-01T00:00:00.000Z";

// These identities create frontend-only demo sessions. Production builds keep
// them disabled unless the deployment explicitly opts in with an env flag.
const DEMO_USERS: Record<string, AuthUser> = {
  sadmin: {
    id: "demo-sadmin",
    email: "sadmin@demo.local",
    roleId: "demo-admin-role",
    roleName: "admin",
    status: "active",
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
    studentProfile: null,
  },
  admin: {
    id: "demo-admin",
    email: "admin@demo.local",
    roleId: "demo-admin-role",
    roleName: "admin",
    status: "active",
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
    studentProfile: null,
  },
  student: {
    id: "demo-student",
    email: "student@demo.local",
    roleId: "demo-student-role",
    roleName: "student",
    status: "active",
    createdAt: DEMO_TIMESTAMP,
    updatedAt: DEMO_TIMESTAMP,
    studentProfile: {
      id: "demo-student-profile",
      userId: "demo-student",
      studentCode: "student",
      fullName: "Demo Student",
      academicYear: null,
      createdAt: DEMO_TIMESTAMP,
      updatedAt: DEMO_TIMESTAMP,
    },
  },
};

function areDemoAccountsEnabled() {
  return (
    process.env.NODE_ENV === "development" ||
    process.env.NEXT_PUBLIC_ENABLE_DEMO_ACCOUNTS === "true"
  );
}

function getDemoUser(identifier: string) {
  if (!areDemoAccountsEnabled()) return undefined;
  const normalizedIdentifier = identifier.trim().toLowerCase();
  return Object.prototype.hasOwnProperty.call(
    DEMO_USERS,
    normalizedIdentifier,
  )
    ? DEMO_USERS[normalizedIdentifier]
    : undefined;
}

function getDemoUserFromToken(token: string) {
  if (!areDemoAccountsEnabled() || !token.startsWith(DEMO_TOKEN_PREFIX)) {
    return undefined;
  }

  const identifier = token.slice(DEMO_TOKEN_PREFIX.length);
  return Object.prototype.hasOwnProperty.call(DEMO_USERS, identifier)
    ? DEMO_USERS[identifier]
    : undefined;
}

export function isDemoAccessToken(token: string | null | undefined) {
  return Boolean(token && getDemoUserFromToken(token));
}

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
  const normalizedIdentifier = identifier.trim().toLowerCase();
  const demoUser = password === "" ? getDemoUser(normalizedIdentifier) : undefined;

  if (demoUser) {
    return {
      success: true,
      data: {
        accessToken: `${DEMO_TOKEN_PREFIX}${normalizedIdentifier}`,
        user: demoUser,
      },
    };
  }

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
  const demoUser = getDemoUserFromToken(token);
  if (demoUser) {
    return { success: true, data: { user: demoUser } };
  }

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
export async function logout(
  token?: string | null,
): Promise<LogoutResponse> {
  if (isDemoAccessToken(token)) return { success: true };

  return apiClient<LogoutResponse>("/auth/logout", {
    method: "POST",
  });
}
