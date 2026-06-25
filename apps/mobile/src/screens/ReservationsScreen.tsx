import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { ReservationCard } from '../components/ReservationCard';
import { useReservations } from '../hooks/useReservations';

/**
 * Reservation hub. Lists upcoming bookings across slopes, dining, and spa,
 * grouped by date. Tapping a card deep-links into the unified cart.
 *
 * Tracked in KAN-30.
 */
export function ReservationsScreen(): JSX.Element {
  const { t } = useTranslation();
  const sections = useReservations();

  return (
    <View style={styles.container}>
      <SectionList
        sections={sections}
        keyExtractor={(item) => item.id}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({ item }) => <ReservationCard reservation={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>{t('reservations.empty')}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F7F8FA' },
  sectionHeader: {
    fontSize: 14,
    fontWeight: '600',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#EEF2F7',
    color: '#374151',
  },
  empty: { textAlign: 'center', marginTop: 48, color: '#6B7280' },
});
