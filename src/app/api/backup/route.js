import { getBackupData } from '@/features/lists';
import { checkBasicAuth } from '@/lib/basic-auth';

// Route Handlers are public HTTP endpoints — re-check auth here, never rely on
// the proxy matcher alone.
export async function GET(request) {
  if (checkBasicAuth(request.headers.get('authorization')) !== 'ok') {
    return new Response('Кой е там? 🥺', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="kutche", charset="UTF-8"',
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }

  let lists;
  try {
    lists = await getBackupData();
  } catch (error) {
    console.error('backup export failed', error);
    return new Response('Backup failed.', { status: 500 });
  }

  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    lists,
  };
  const date = payload.exportedAt.slice(0, 10);

  return new Response(JSON.stringify(payload, null, 2), {
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Content-Disposition': `attachment; filename="kutche-backup-${date}.json"`,
      'Cache-Control': 'no-store',
    },
  });
}
