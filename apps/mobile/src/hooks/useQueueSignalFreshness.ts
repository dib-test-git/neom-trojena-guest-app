import { useEffect, useState } from 'react';

const STALE_AFTER_MS = 90_000; // 3x the 30s poll interval

export type Freshness = 'fresh' | 'stale';

/**
 * Reports whether the most recent lift-queue signal is still considered
 * fresh. If telemetry hasn't arrived within `STALE_AFTER_MS`, callers should
 * surface a warning to the guest. See KAN-29.
 */
export function useQueueSignalFreshness(lastUpdatedAt: number | null): Freshness {
  const [now, setNow] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 5_000);
    return () => clearInterval(t);
  }, []);

  if (lastUpdatedAt === null) return 'fresh';
  return now - lastUpdatedAt > STALE_AFTER_MS ? 'stale' : 'fresh';
}
