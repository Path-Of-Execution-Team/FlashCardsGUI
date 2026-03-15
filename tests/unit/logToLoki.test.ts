import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

describe('logToLoki', () => {
  const fetchMock = vi.fn().mockResolvedValue(new Response(null, { status: 200 }));

  beforeEach(() => {
    vi.stubGlobal('fetch', fetchMock);
    vi.stubGlobal('window', {
      location: {
        pathname: '/pl/profile',
      },
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
    vi.unstubAllGlobals();
  });

  it('sends a normalized log payload to the API route', async () => {
    const { logToLoki } = await import('@/helpers/logToLoki');

    await logToLoki({
      level: 'WARN',
      msg: 'Something happened',
      feature: 'profile',
    });

    expect(fetchMock).toHaveBeenCalledWith(
      '/api/log-to-loki',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: expect.any(String),
      })
    );

    const [, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(String(requestInit.body));

    expect(payload).toMatchObject({
      level: 'warn',
      msg: 'Something happened',
      feature: 'profile',
      path: '/pl/profile',
    });
    expect(payload.timestamp).toEqual(expect.any(String));
    expect(payload.userAgent).toEqual(expect.any(String));
  });
});
