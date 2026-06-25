import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Lift } from '../types/lift';

export function QueueRow({ lift }: { lift: Lift }): JSX.Element {
  const { t } = useTranslation();
  const waitLabel = t('lift_queue.wait_minutes', { count: lift.waitMinutes });

  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.name}>{lift.name}</Text>
        <Text style={styles.status}>{t(`lift_queue.status.${lift.status}`)}</Text>
      </View>
      <Text style={styles.wait}>{waitLabel}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginVertical: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  name: { fontSize: 16, fontWeight: '600' },
  status: { fontSize: 12, color: '#6B7280', marginTop: 2 },
  wait: { fontSize: 18, fontWeight: '700', color: '#1F2937' },
});
