import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Reservation } from '../types/reservation';

export function ReservationCard({
  reservation,
}: {
  reservation: Reservation;
}): JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{reservation.title}</Text>
      <Text style={styles.meta}>
        {t(`reservations.kind.${reservation.kind}`)} · {reservation.timeLabel}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    padding: 12,
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  title: { fontSize: 16, fontWeight: '600' },
  meta: { fontSize: 12, color: '#6B7280', marginTop: 2 },
});
