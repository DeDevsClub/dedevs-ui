import { NextRequest, NextResponse } from 'next/server';
import { validateSubscriptionAndUsage } from '@/lib/subscription';
import { getCurrentUserId } from '@/lib/shared';
import { UnauthorizedError } from '@/types/errors';

export async function GET(request: NextRequest) {
  try {
    const userId = await getCurrentUserId(request);
    const validation = await validateSubscriptionAndUsage(userId);

    return NextResponse.json({
      isSubscribed: validation.isSubscribed,
      requestsUsed: validation.requestsUsed,
      requestsRemaining: validation.requestsRemaining,
    });
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    console.error('Error fetching usage status:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
