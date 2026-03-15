import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

const recordRequestMock = vi.fn();

vi.mock('@/lib/observability', () => ({
  recordRequest: recordRequestMock,
}));

describe('log-to-loki route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, 'error').mockImplementation(() => undefined);
    vi.spyOn(console, 'warn').mockImplementation(() => undefined);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('logs warning payloads and records a successful request', async () => {
    const { POST } = await import('@/app/api/log-to-loki/route');

    const response = await POST(
      new Request('http://localhost/api/log-to-loki', {
        method: 'POST',
        body: JSON.stringify({
          level: 'WARN',
          msg: 'hello',
        }),
      })
    );

    expect(await response.text()).toBe('ok');
    expect(console.warn).toHaveBeenCalledWith(expect.stringContaining('"level":"warn"'));
    expect(recordRequestMock).toHaveBeenCalledWith('/api/log-to-loki', expect.any(Number), '200', 'POST');
  });

  it('returns 500 and records a failed request when the payload is invalid', async () => {
    const { POST } = await import('@/app/api/log-to-loki/route');

    const response = await POST(
      new Request('http://localhost/api/log-to-loki', {
        method: 'POST',
        body: '{invalid-json',
      })
    );

    expect(response.status).toBe(500);
    expect(await response.text()).toBe('error');
    expect(console.error).toHaveBeenCalledWith('Error logging to Loki:', expect.anything());
    expect(recordRequestMock).toHaveBeenCalledWith('/api/log-to-loki', expect.any(Number), '500', 'POST');
  });
});
