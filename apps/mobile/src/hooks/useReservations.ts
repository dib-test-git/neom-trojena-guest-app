import { useMemo } from 'react';

import type { Reservation } from '../types/reservation';

interface Section {
  title: string;
  data: Reservation[];
}

/**
 * Placeholder reservations source — to be wired up to services/reservations
 * once the unified-cart endpoints are stable. See KAN-30.
 */
export function useReservations(): Section[] {
  return useMemo(
    () => [
      {
        title: 'Today',
        data: [
          {
            id: 'r-101',
            title: 'Black Diamond — Chair 4',
            kind: 'slopes',
            timeLabel: '09:30',
          },
          {
            id: 'r-102',
            title: 'Summit Lounge — Brunch for 2',
            kind: 'dining',
            timeLabel: '12:45',
          },
        ],
      },
      {
        title: 'Tomorrow',
        data: [
          {
            id: 'r-201',
            title: 'Alpine Spa — 60 min massage',
            kind: 'spa',
            timeLabel: '16:00',
          },
        ],
      },
    ],
    [],
  );
}
