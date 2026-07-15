import { NextResponse } from 'next/server';

const NOINDEX = 'noindex, nofollow, noarchive, nosnippet, noimageindex';

function unauthorized(message) {
  return new NextResponse(message, {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="kutche", charset="UTF-8"',
      'X-Robots-Tag': NOINDEX,
    },
  });
}

export function proxy(request) {
  const user = process.env.BASIC_AUTH_USER;
  const pass = process.env.BASIC_AUTH_PASS;

  // Fail closed: if auth is not configured, nothing is served.
  if (!user || !pass) {
    return unauthorized('Basic auth is not configured (set BASIC_AUTH_USER and BASIC_AUTH_PASS).');
  }

  const header = request.headers.get('authorization') ?? '';
  if (header.startsWith('Basic ')) {
    const [givenUser, givenPass] = atob(header.slice(6)).split(':');
    if (givenUser === user && givenPass === pass) {
      return NextResponse.next();
    }
  }
  return unauthorized('Кой е там? 🥺');
}

export const config = {
  // Everything behind auth except static assets, robots.txt and the favicon.
  matcher: ['/((?!_next/static|_next/image|robots.txt|icon.svg).*)'],
};
