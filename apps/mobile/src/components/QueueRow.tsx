import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { Lift } from '../types/lift';
import { Card, CardRow } from './ux-v2/Card';
import { useDirection } from './ux-v2/useDirection';

export function QueueRow({ lift }: { lift: Lift }): JSX.Element {
  const { t } = useTranslation();
  const dir = useDirection();
  const waitLabel = t('lift_queue.wait_minutes', { count: lift.waitMinutes });

  return (
    <Card>
      <CardRow direction={dir}>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: '600' }}>{lift.name}</Text>
          <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>
            {t(`lift_queue.status.${lift.status}`)}
          </Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: '700', color: '#1F2937' }}>
          {waitLabel}
        </Text>
      </CardRow>
    </Card>
  );
}
