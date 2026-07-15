import { NextResponse } from 'next/server';

import { checkBasicAuth } from '@/lib/basic-auth';

const NOINDEX = 'noindex, nofollow, noarchive, nosnippet, noimageindex';

function unauthorized(message) {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="kutche", charset="UTF-8"',
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Robots-Tag': NOINDEX,
    },
  });
}

export function proxy(request) {
  const result = checkBasicAuth(request.headers.get('authorization'));

  // Fail closed: if auth is not configured, nothing is served.
  // Details go to the server log only — never to the unauthenticated caller.
  if (result === 'unconfigured') {
    console.error('Basic auth is not configured: set BASIC_AUTH_USER and BASIC_AUTH_PASS.');
    return unauthorized('Site is not configured.');
  }
  if (result === 'unauthorized') {
    return unauthorized('Кой е там? 🥺');
  }
  return NextResponse.next();
}

export const config = {
  // Everything behind auth except static assets, robots.txt and the favicon.
  matcher: ['/((?!_next/static|_next/image|robots.txt|icon.svg).*)'],
};
