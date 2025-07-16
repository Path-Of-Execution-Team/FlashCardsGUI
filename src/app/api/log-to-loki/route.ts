import { recordRequest } from '@/lib/observability';

export async function POST(req: Request) {
  const start = Date.now();

  try {
    const log = await req.json();

    const streamLabels = {
      app: process.env.APP_NAME || 'frontend',
      level: log.level || 'info',
      env: process.env.NODE_ENV || 'development',
    };

    const lokiPayload = {
      streams: [
        {
          stream: streamLabels,
          values: [[`${Date.now()}000000`, JSON.stringify(log)]],
        },
      ],
    };

    const res = await fetch(process.env.LOKI_PUSH_URL!, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(lokiPayload),
    });

    if (!res.ok) {
      console.error('Loki responded with:', res.status, await res.text());
      throw new Error('Loki push failed');
    }

    recordRequest('/api/log-to-loki', '200', Date.now() - start, 'POST');
    return new Response('ok');
  } catch (error) {
    console.error('Error logging to Loki:', error);
    recordRequest('/api/log-to-loki', '500', Date.now() - start, 'POST');
    return new Response('error', { status: 500 });
  }
}
