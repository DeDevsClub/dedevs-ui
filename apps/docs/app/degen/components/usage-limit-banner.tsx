"use client";

import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Crown, AlertTriangle } from 'lucide-react';
import { AI_REQUEST_FREE_TIER_LIMIT } from '@/lib/constants';
import Link from 'next/link';

interface UsageLimitBannerProps {
  isSubscribed: boolean;
  requestsUsed: number;
  requestsRemaining: number;
  isLoading?: boolean;
}

export function UsageLimitBanner({ 
  isSubscribed, 
  requestsUsed, 
  requestsRemaining,
  isLoading = false 
}: UsageLimitBannerProps) {
  if (isLoading) {
    return null;
  }

  if (isSubscribed) {
    return (
      <Alert className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-amber-50">
        <Crown className="h-4 w-4 text-yellow-600" />
        <AlertDescription className="text-yellow-800">
          <span className="font-medium">Pro Member</span> - Unlimited AI component generation
        </AlertDescription>
      </Alert>
    );
  }

  const usagePercentage = (requestsUsed / AI_REQUEST_FREE_TIER_LIMIT) * 100;
  const isNearLimit = requestsUsed >= AI_REQUEST_FREE_TIER_LIMIT - 1;
  const isAtLimit = requestsRemaining === 0;

  if (isAtLimit) {
    return (
      <Alert className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50">
        <AlertTriangle className="h-4 w-4 text-red-600" />
        <AlertDescription className="text-red-800">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Free limit reached!</span> You've used all {AI_REQUEST_FREE_TIER_LIMIT} free generations.
            </div>
            <Link href="/pricing" className="ml-4">
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Crown className="w-4 h-4 mr-1" />
                Upgrade to Pro
              </Button>
            </Link>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  return (
    <Alert className={`${isNearLimit ? 'border-orange-200 bg-gradient-to-r from-orange-50 to-yellow-50' : 'border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50'}`}>
      <AlertTriangle className={`h-4 w-4 ${isNearLimit ? 'text-orange-600' : 'text-blue-600'}`} />
      <AlertDescription className={isNearLimit ? 'text-orange-800' : 'text-blue-800'}>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <div>
              <span className="font-medium">Free Tier:</span> {requestsRemaining} of {AI_REQUEST_FREE_TIER_LIMIT} generations remaining
            </div>
            {isNearLimit && (
              <Link href="/pricing" className="ml-4">
                <Button size="sm" variant="outline" className="border-orange-300 text-orange-700 hover:bg-orange-100">
                  <Crown className="w-4 h-4 mr-1" />
                  Upgrade for Unlimited
                </Button>
              </Link>
            )}
          </div>
          <Progress 
            value={usagePercentage} 
            className={`h-2 ${isNearLimit ? 'bg-orange-100' : 'bg-blue-100'}`}
          />
        </div>
      </AlertDescription>
    </Alert>
  );
}
