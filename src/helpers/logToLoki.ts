// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function logToLoki(data: { level: string; msg: string; [key: string]: any }) {
  const logEntry = {
    ...data,
    timestamp: new Date().toISOString(),
    path: window.location.pathname,
    userAgent: navigator.userAgent,
  };

  await fetch('/api/log-to-loki', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(logEntry),
  });
}
