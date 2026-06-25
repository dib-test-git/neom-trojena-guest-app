import { useCallback, useEffect, useRef, useState } from 'react';

import type { Lift } from '../types/lift';

const REFRESH_MS = 30_000;
const ENDPOINT = '/lift-queue/v1/signals';

interface State {
  lifts: Lift[];
  refreshing: boolean;
  lastUpdated: string;
}

/**
 * Polls the lift-queue service every 30 seconds and exposes the latest
 * wait-time signal per lift. See KAN-29.
 */
export function useLiftQueue(): State & { refresh: () => Promise<void> } {
  const [lifts, setLifts] = useState<Lift[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState('—');
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  const refresh = useCallback(async () => {
    setRefreshing(true);
    try {
      const res = await fetch(ENDPOINT);
      const data: Lift[] = await res.json();
      setLifts(data);
      setLastUpdated(new Date().toLocaleTimeString());
    } finally {
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    refresh();
    timer.current = setInterval(refresh, REFRESH_MS);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, [refresh]);

  return { lifts, refreshing, lastUpdated, refresh };
}
