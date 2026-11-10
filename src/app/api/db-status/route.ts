import { NextResponse } from 'next/server';
import { checkDatabaseConnection } from '@/lib/db-service';

export async function GET() {
  const status = await checkDatabaseConnection();
  return NextResponse.json({
    ...status,
    databaseUrl: process.env.DATABASE_URL ? 'Đã cấu hình' : 'Chưa cấu hình',
    timestamp: new Date().toISOString(),
  });
}
