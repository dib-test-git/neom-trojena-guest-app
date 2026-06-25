import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Reservation } from '../types/reservation';
import { Card } from './ux-v2/Card';
import { useDirection } from './ux-v2/useDirection';

export function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}): JSX.Element {
  const { t } = useTranslation();
  const dir = useDirection();
  return (
    <Card direction={dir} spacing="md">
      <Text style={{ fontSize: 16, fontWeight: '600' }}>{reservation.title}</Text>
      <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
        {t(`reservations.kind.${reservation.kind}`)} · {reservation.timeLabel}
      </Text>
    </Card>
  );
}
