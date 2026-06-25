/**
 * In-memory rolling window of turnstile scans, used to estimate wait times.
 *
 * Production deployment swaps this for Redis Streams.
 */

interface TurnstileEvent {
  liftId: string;
  liftName: string;
  ts: number; // epoch ms
  capacityPerMin: number;
}

interface Signal {
  id: string;
  name: string;
  status: 'open' | 'standby' | 'closed';
  waitMinutes: number;
}

const WINDOW_MS = 5 * 60_000;
const events: TurnstileEvent[] = [];

export function ingest(evt: TurnstileEvent): void {
  events.push(evt);
  const cutoff = Date.now() - WINDOW_MS;
  while (events.length && events[0]!.ts < cutoff) events.shift();
}

export function snapshot(): Signal[] {
  const byLift = new Map<string, TurnstileEvent[]>();
  for (const e of events) {
    const arr = byLift.get(e.liftId) ?? [];
    arr.push(e);
    byLift.set(e.liftId, arr);
  }

  const out: Signal[] = [];
  for (const [liftId, evts] of byLift) {
    const newest = evts[evts.length - 1]!;
    const arrivals = evts.length;
    const minutes = WINDOW_MS / 60_000;
    const arrivalsPerMin = arrivals / minutes;
    const capacity = Math.max(1, newest.capacityPerMin);
    // Naive queueing-theory-ish estimate; clamped to >=0 to avoid KAN-52.
    const raw = Math.round((arrivalsPerMin / capacity) * 10);
    out.push({
      id: liftId,
      name: newest.liftName,
      status: 'open',
      waitMinutes: Math.max(0, raw),
    });
  }
  return out;
}
