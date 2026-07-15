import 'server-only';

import { headers } from 'next/headers';

import { checkBasicAuth } from './basic-auth';

/**
 * Server Actions are reachable via direct POST regardless of proxy coverage,
 * so every action calls this before touching the database.
 */
export async function isAuthenticated() {
  const authorization = (await headers()).get('authorization');
  return checkBasicAuth(authorization) === 'ok';
}
