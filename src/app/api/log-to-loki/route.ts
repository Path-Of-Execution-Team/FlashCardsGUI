import { recordRequest } from '@/lib/observability';

export async function POST(req: Request) {
  const start = Date.now();

  try {
    const log = await req.json();
    const appName = process.env.APP_NAME || 'frontend';
    const level = log.level || 'info';

    const streamLabels = {
      app: appName,
      service_name: appName,
      level,
      namespace: process.env.POD_NAMESPACE || 'unknown',
      pod: process.env.POD_NAME || 'unknown',
      node: process.env.NODE_NAME || 'unknown',
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
