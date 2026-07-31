/**
 * TypeScript types that mirror the backend's auth response shapes.
 *
 * Keep in sync with:
 *  - backend/src/users/users.service.ts  (SafeUser)
 *  - backend/src/students/students.service.ts  (StudentProfile)
 *  - backend/src/auth/auth.service.ts  (AuthUser, LoginResult, RefreshResult)
 *  - backend/src/auth/auth.controller.ts  (response wrappers)
 */

export type UserStatus = "active" | "inactive" | "suspended";

/** Core user record minus the password hash. */
export type SafeUser = {
  id: string;
  email: string;
  roleId: string;
  /** e.g. "student" | "admin" */
  roleName: string;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

/** Optional student profile attached when the user has a student record. */
export type StudentProfile = {
  id: string;
  userId: string;
  studentCode: string;
  fullName: string;
  academicYear: number | null;
  createdAt: string;
  updatedAt: string;
};

/** Full authenticated user shape returned by /auth/login and /auth/me. */
export type AuthUser = SafeUser & {
  studentProfile: StudentProfile | null;
};

// ── API response wrappers ──────────────────────────────────────────────────

export type LoginResponse = {
  success: true;
  data: {
    accessToken: string;
    user: AuthUser;
  };
};

export type MeResponse = {
  success: true;
  data: {
    user: AuthUser;
  };
};

export type RefreshResponse = {
  success: true;
  data: {
    accessToken: string;
    user: AuthUser;
  };
};

export type LogoutResponse = {
  success: true;
};
