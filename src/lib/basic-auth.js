import { createHash, timingSafeEqual } from 'node:crypto';

/** Hash-then-compare keeps the comparison constant-time for inputs of any length. */
function safeEqual(given, expected) {
  const givenDigest = createHash('sha256').update(given).digest();
  const expectedDigest = createHash('sha256').update(expected).digest();
  return timingSafeEqual(givenDigest, expectedDigest);
}

/**
 * Pure credential check shared by proxy.js and Server Actions. Actions must
 * re-check auth themselves: they are public POST endpoints, and a proxy
 * matcher change can silently remove coverage.
 *
 * @returns {'unconfigured' | 'unauthorized' | 'ok'}
 */
export function checkBasicAuth(authorizationHeader) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;
  if (!user || !pass) return 'unconfigured';

  if (!authorizationHeader?.startsWith('Basic ')) return 'unauthorized';

  // Buffer (unlike atob) never throws on malformed base64 and decodes UTF-8.
  const decoded = Buffer.from(authorizationHeader.slice(6), 'base64').toString('utf8');
  // RFC 7617: the password is everything after the FIRST colon.
  const separator = decoded.indexOf(':');
  if (separator === -1) return 'unauthorized';

  // Evaluate both to avoid short-circuit timing leaks on the username.
  const isUserValid = safeEqual(decoded.slice(0, separator), user);
  const isPassValid = safeEqual(decoded.slice(separator + 1), pass);
  return isUserValid && isPassValid ? 'ok' : 'unauthorized';
}
