import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { CartLineKind } from '../types/cart';

export function CartKindBadges({
  kinds,
}: {
  kinds: CartLineKind[];
}): JSX.Element {
  const { t } = useTranslation();
  if (kinds.length === 0) return <View />;
  return (
    <View style={styles.row}>
      {kinds.map((k) => (
        <View key={k} style={styles.badge}>
          <Text style={styles.label}>{t(`cart.kind.${k}`)}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginBottom: 12 },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#EEF2F7',
  },
  label: { fontSize: 12, color: '#374151', fontWeight: '600' },
});
