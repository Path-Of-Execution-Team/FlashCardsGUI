import { beforeEach, describe, expect, it, vi } from 'vitest';

describe('observability', () => {
  beforeEach(async () => {
    vi.resetModules();

    const { register } = await import('prom-client');
    register.clear();

    delete process.env.APP_NAME;
    delete process.env.METRICS_BUCKETS;
    delete process.env.METRICS_PREFIX;
  });

  it('registers metrics and records requests and errors', async () => {
    const { activeSessions, cacheSize, errorCounter, recordRequest, register, requestCounter, requestDuration } = await import('@/lib/observability');

    activeSessions.set(3);
    cacheSize.set(7);

    recordRequest('/api/log-to-loki', 42, '200', 'POST');
    recordRequest('/api/log-to-loki', 64, '500', 'POST');

    const requests = await requestCounter.get();
    const errors = await errorCounter.get();
    const durations = await requestDuration.get();

    expect(register.getSingleMetric('frontend_requests_total')).toBeTruthy();
    expect(register.getSingleMetric('frontend_errors_total')).toBeTruthy();
    expect(register.getSingleMetric('frontend_request_duration_ms')).toBeTruthy();

    expect(requests.values).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          labels: expect.objectContaining({
            method: 'POST',
            path: '/api/log-to-loki',
            status: '200',
          }),
          value: 1,
        }),
        expect.objectContaining({
          labels: expect.objectContaining({
            method: 'POST',
            path: '/api/log-to-loki',
            status: '500',
          }),
          value: 1,
        }),
      ])
    );

    expect(errors.values).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          labels: expect.objectContaining({
            method: 'POST',
            path: '/api/log-to-loki',
            status: '500',
          }),
          value: 1,
        }),
      ])
    );

    expect(durations.values.length).toBeGreaterThan(0);
  });
});
