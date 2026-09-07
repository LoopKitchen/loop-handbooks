/**
 * Auth gate for the handbooks (Sanshray, 2026-09-07).
 *
 * Every request except /login and static plumbing must carry a valid Firebase
 * ID token (Loop's own Firebase project — the same identity the Loop app uses)
 * in the `hb_token` cookie, issued to a @tryloop.ai / @loopai.com account.
 * The middleware verifies the token's SIGNATURE against Google's JWKS on every
 * request, so a forged or expired cookie is a redirect, never a view: on a
 * static host, client-side-only auth would protect nothing.
 */
import { jwtVerify, createRemoteJWKSet } from 'jose'

export const config = {
  // Everything except the login page, Vercel internals, and the favicon.
  matcher: ['/((?!login|_vercel|favicon\\.ico).*)'],
}

const PROJECT_ID = 'arboreal-vision-339901'
const JWKS = createRemoteJWKSet(
  new URL('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com'),
)
const ALLOWED_DOMAINS = ['tryloop.ai', 'loopai.com']

export default async function middleware(request: Request): Promise<Response | undefined> {
  const url = new URL(request.url)
  const cookie = request.headers.get('cookie') ?? ''
  const token = cookie
    .split(/;\s*/)
    .find((c) => c.startsWith('hb_token='))
    ?.slice('hb_token='.length)

  if (token) {
    try {
      const { payload } = await jwtVerify(token, JWKS, {
        issuer: `https://securetoken.google.com/${PROJECT_ID}`,
        audience: PROJECT_ID,
      })
      const email = typeof payload.email === 'string' ? payload.email.toLowerCase() : ''
      const domain = email.split('@')[1] ?? ''
      if (payload.email_verified === true && ALLOWED_DOMAINS.includes(domain)) {
        return undefined // authenticated: fall through to the static file
      }
    } catch {
      // expired / forged / wrong project: treat as signed out
    }
  }

  const login = new URL('/login/', url.origin)
  login.searchParams.set('next', url.pathname + url.search + url.hash)
  return Response.redirect(login.toString(), 302)
}
