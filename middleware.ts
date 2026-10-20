import createMiddleware from "next-intl/middleware";
import { routing } from "./src/i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Next.js requires statically analyzable matchers; keep this locale pattern aligned with SUPPORTED_LOCALES.
  matcher: ["/", "/(en|ar)/:path*"],
};
