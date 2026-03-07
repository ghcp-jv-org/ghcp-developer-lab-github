import type { NextConfig } from "next";

/**
 * Security headers applied to every response.
 *
 * Rationale for each header:
 *  - X-Content-Type-Options: nosniff
 *      Prevents browsers from MIME-sniffing uploaded images served with an
 *      unexpected content-type, blocking a key polyglot-file attack vector.
 *  - X-Frame-Options: DENY
 *      Blocks the upload and admin pages from being embedded in iframes,
 *      preventing clickjacking attacks.
 *  - X-XSS-Protection: 1; mode=block
 *      Enables the legacy XSS auditor in older browsers as a secondary layer.
 *  - Referrer-Policy: strict-origin-when-cross-origin
 *      Limits referrer leakage to same-origin navigation and HTTPS→HTTPS
 *      cross-origin requests only.
 *  - Permissions-Policy
 *      Restricts access to sensitive browser APIs that this application does
 *      not need (camera, microphone, geolocation).
 *  - Content-Security-Policy
 *      Primary XSS defence layer. blob: in img-src is required for
 *      URL.createObjectURL() image previews in the upload component.
 *      Tighten script-src / style-src after auditing inline script usage.
 */
const SECURITY_HEADERS = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-XSS-Protection", value: "1; mode=block" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // NOTE: 'unsafe-inline' is intentionally excluded from script-src.
      // Next.js App Router supports nonce-based CSP; add a nonce via middleware
      // before production deployment. See:
      // https://nextjs.org/docs/app/building-your-application/configuring/content-security-policy
      "script-src 'self'",
      "style-src 'self' 'unsafe-inline'",   // inline styles required by Tailwind / framer-motion
      "img-src 'self' blob: data:",         // blob: required for URL.createObjectURL() previews
      "connect-src 'self'",
      "frame-ancestors 'none'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        // Apply security headers to all routes
        source: "/(.*)",
        headers: SECURITY_HEADERS,
      },
    ];
  },
};

export default nextConfig;
