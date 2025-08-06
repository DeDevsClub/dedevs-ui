"use client";

import { useState, useEffect } from 'react';
import { SubscriptionStatus } from '@/types/subscription';

interface UsageLimitHook extends SubscriptionStatus {
  isLoading: boolean;
  error: string | null;
  refreshUsage: () => Promise<void>;
}

export function useUsageLimit(): UsageLimitHook {
  const [status, setStatus] = useState<SubscriptionStatus>({
    isSubscribed: false,
    requestsUsed: 0,
    requestsRemaining: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchUsageStatus = async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('/api/usage-status');
      
      if (!response.ok) {
        throw new Error('Failed to fetch usage status');
      }
      
      const data = await response.json();
      setStatus(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      console.error('Error fetching usage status:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const refreshUsage = async () => {
    await fetchUsageStatus();
  };

  useEffect(() => {
    fetchUsageStatus();
  }, []);

  return {
    ...status,
    isLoading,
    error,
    refreshUsage,
  };
}
