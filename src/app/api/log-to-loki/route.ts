import { recordRequest } from '@/lib/observability';

export async function POST(req: Request) {
  const start = Date.now();

  try {
    const log = await req.json();
    const appName = process.env.APP_NAME || 'frontend';
    const level = typeof log.level === 'string' ? log.level.toLowerCase() : 'info';
    const structuredLog = {
      ...log,
      timestamp: new Date().toISOString(),
      app: appName,
      service_name: appName,
      env: process.env.NODE_ENV || 'development',
      namespace: process.env.POD_NAMESPACE || 'unknown',
      pod: process.env.POD_NAME || 'unknown',
      node: process.env.NODE_NAME || 'unknown',
      level,
    };

    const serializedLog = JSON.stringify(structuredLog);
    if (level === 'error') {
      console.error(serializedLog);
    } else if (level === 'warn' || level === 'warning') {
      console.warn(serializedLog);
    } else {
      console.log(serializedLog);
    }

    recordRequest('/api/log-to-loki', Date.now() - start, '200', 'POST');
    return new Response('ok');
  } catch (error) {
    console.error('Error logging to Loki:', error);
    recordRequest('/api/log-to-loki', Date.now() - start, '500', 'POST');
    return new Response('error', { status: 500 });
  }
}
