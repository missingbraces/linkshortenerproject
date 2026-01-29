import { NextRequest, NextResponse } from 'next/server';
import { getLinkByShortCode } from '@/data/links';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ shortcode: string }> }
) {
  const { shortcode } = await params;

  // Fetch the link by short code
  const link = await getLinkByShortCode(shortcode);

  // If link doesn't exist, return 404
  if (!link) {
    return new NextResponse('Link not found', { status: 404 });
  }

  // Redirect to the original URL
  return NextResponse.redirect(link.originalUrl, { status: 307 });
}
