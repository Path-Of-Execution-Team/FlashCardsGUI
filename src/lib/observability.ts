import { collectDefaultMetrics, Counter, Gauge, Histogram, register } from 'prom-client';

const APP_NAME = process.env.APP_NAME || 'frontend';
const METRICS_PREFIX = process.env.METRICS_PREFIX || 'frontend_';
const BUCKETS = (process.env.METRICS_BUCKETS || '50,100,300,1000,2000,3000').split(',').map(b => Number(b));

if (!register.getSingleMetric(`${METRICS_PREFIX}process_cpu_user_seconds_total`)) {
  collectDefaultMetrics({ prefix: METRICS_PREFIX });
}

let requestCounter = register.getSingleMetric(`${APP_NAME}_requests_total`) as Counter<string>;
if (!requestCounter) {
  requestCounter = new Counter({
    name: `${APP_NAME}_requests_total`,
    help: 'Total number of HTTP requests',
    labelNames: ['method', 'path', 'status'],
  });
}

let errorCounter = register.getSingleMetric(`${APP_NAME}_errors_total`) as Counter<string>;
if (!errorCounter) {
  errorCounter = new Counter({
    name: `${APP_NAME}_errors_total`,
    help: 'Total number of HTTP 4xx/5xx errors',
    labelNames: ['method', 'path', 'status'],
  });
}

let requestDuration = register.getSingleMetric(`${APP_NAME}_request_duration_ms`) as Histogram<string>;
if (!requestDuration) {
  requestDuration = new Histogram({
    name: `${APP_NAME}_request_duration_ms`,
    help: 'Duration of HTTP requests in milliseconds',
    labelNames: ['method', 'path', 'status'],
    buckets: BUCKETS,
  });
}

let activeSessions = register.getSingleMetric(`${APP_NAME}_active_sessions`) as Gauge<string>;
if (!activeSessions) {
  activeSessions = new Gauge({
    name: `${APP_NAME}_active_sessions`,
    help: 'Number of active sessions (fake)',
  });
}

let cacheSize = register.getSingleMetric(`${APP_NAME}_cache_items`) as Gauge<string>;
if (!cacheSize) {
  cacheSize = new Gauge({
    name: `${APP_NAME}_cache_items`,
    help: 'Simulated number of items in cache',
  });
}

export function recordRequest(path: string, status = '200', durationMs: number, method = 'GET') {
  requestCounter.labels(method, path, status).inc();
  requestDuration.labels(method, path, status).observe(durationMs);

  if (status.startsWith('4') || status.startsWith('5')) {
    errorCounter.labels(method, path, status).inc();
  }
}

export { activeSessions, cacheSize, errorCounter, register, requestCounter, requestDuration };
