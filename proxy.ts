import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

/**
 * Next.js 16 renamed `middleware.ts` to `proxy.ts` (the exported function
 * itself can be named anything as a default export — Clerk's
 * `clerkMiddleware()` factory still returns the same request handler shape
 * either way). See: node_modules/next/dist/docs/01-app/03-api-reference/
 * 03-file-conventions/proxy.md, shipped with next@16.3.1.
 *
 * Everything under the authenticated app shell — plus onboarding, which
 * requires a signed-in user before it means anything — is protected here.
 * The marketing site (`/`, `/sign-in`, `/sign-up`) stays public.
 */
const isProtectedRoute = createRouteMatcher([
  "/overview(.*)",
  "/subscriptions(.*)",
  "/analytics(.*)",
  "/savings(.*)",
  "/ai-insights(.*)",
  "/settings(.*)",
  "/onboarding(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Run on everything except static assets and Next internals.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run on API routes.
    "/(api|trpc)(.*)",
  ],
};
