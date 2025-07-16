import { NextResponse } from 'next/server';

import { register } from '@/lib/observability';

export async function GET() {
  return new NextResponse(await register.metrics(), {
    headers: {
      'Content-Type': register.contentType,
      'Cache-Control': 'no-store',
    },
  });
}
