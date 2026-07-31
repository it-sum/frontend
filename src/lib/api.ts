/**
 * ApiError is thrown by the API client for any non-2xx HTTP response.
 * The `message` field always comes verbatim from the backend's error response;
 * never invent a different message — display it as-is in the UI.
 */
export class ApiError extends Error {
  constructor(
    public readonly status: number,
    message: string,
    public readonly code?: string,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000/api/v1";

type RequestOptions = Omit<RequestInit, "body"> & {
  body?: unknown;
  /** Bearer token for endpoints that require Authorization header. */
  token?: string;
};

/**
 * Thin fetch wrapper that:
 *  - Prefixes NEXT_PUBLIC_API_URL to every path
 *  - Always sends credentials: "include" so the httpOnly refresh cookie travels with requests
 *  - Sets Content-Type: application/json and serialises the body
 *  - Parses the JSON response
 *  - On non-2xx status throws ApiError carrying the backend's { code, message } shape
 */
export async function apiClient<T = unknown>(
  path: string,
  options: RequestOptions = {},
): Promise<T> {
  const { body, token, headers: extraHeaders, ...rest } = options;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(extraHeaders as Record<string, string>),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...rest,
    credentials: "include",
    headers,
    ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
  });

  // Parse body regardless of status so we can extract the error message.
  let json: unknown;
  try {
    json = await response.json();
  } catch {
    json = null;
  }

  if (!response.ok) {
    // The backend wraps errors as { message, error, statusCode } (NestJS default)
    // or { code, message } via our custom UnauthorizedException payload.
    const errBody = json as
      { message?: string; code?: string } | null | undefined;
    const message =
      errBody?.message ?? response.statusText ?? "An unexpected error occurred";
    const code = errBody?.code;
    throw new ApiError(response.status, message, code);
  }

  return json as T;
}
