export async function register() {
  // Intentionally empty — add OpenTelemetry later if needed
}

export async function onRequestError(
  err: unknown,
  context: { router: "app" | "pages"; path: string },
) {
  console.error("[onRequestError]", context.router, context.path);
  console.error(err);
}
