import React from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useLiftQueue } from '../hooks/useLiftQueue';
import { QueueRow } from '../components/QueueRow';

/**
 * Lift queue dashboard.
 *
 * Shows current wait-time per lift / chair, refreshed every 30 seconds
 * from the lift-queue telemetry service. See KAN-29.
 */
export function LiftQueueScreen(): JSX.Element {
  const { t } = useTranslation();
  const { lifts, refreshing, refresh, lastUpdated } = useLiftQueue();

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{t('lift_queue.label')}</Text>
      <Text style={styles.subheader}>
        {t('lift_queue.last_updated', { time: lastUpdated })}
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
  empty: { textAlign: 'center', marginTop: 32, color: '#6B7280' },
});
