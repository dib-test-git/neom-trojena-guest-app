import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLiftQueue } from '../hooks/useLiftQueue';
import { useQueueSignalFreshness } from '../hooks/useQueueSignalFreshness';
import { QueueRow } from '../components/QueueRow';

/**
 * Lift queue dashboard.
 *
 * Shows current wait-time per lift / chair, refreshed every 30 seconds
 * from the lift-queue telemetry service. See KAN-29.
 */
export function LiftQueueScreen(): JSX.Element {
  const { t } = useTranslation();
  const { lifts, refreshing, refresh, lastUpdated, lastUpdatedAt } = useLiftQueue();
  const freshness = useQueueSignalFreshness(lastUpdatedAt);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('lift_queue.label')}</Text>
      <Text style={[styles.subheader, freshness === 'stale' && styles.stale]}>
        {t('lift_queue.last_updated', { time: lastUpdated })}
        {freshness === 'stale' && `  ·  ${t('lift_queue.stale_warning')}`}
      </Text>
      <FlatList
        data={lifts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <QueueRow lift={item} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={refresh} />
        }
        ListEmptyComponent={
          <Text style={styles.empty}>{t('lift_queue.empty')}</Text>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#F7F8FA' },
  header: { fontSize: 24, fontWeight: '700', marginBottom: 4 },
  subheader: { fontSize: 13, color: '#6B7280', marginBottom: 16 },
  stale: { color: '#B45309' },
  empty: { textAlign: 'center', marginTop: 32, color: '#6B7280' },
});
