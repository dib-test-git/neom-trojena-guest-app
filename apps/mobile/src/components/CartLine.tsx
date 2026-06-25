import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { CartLineItem } from '../types/cart';

export function CartLine({ line }: { line: CartLineItem }): JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.row}>
      <View style={{ flex: 1 }}>
        <Text style={styles.title}>{line.title}</Text>
        <Text style={styles.kind}>{t(`cart.kind.${line.kind}`)}</Text>
      </View>
      <Text style={styles.amount}>{line.amount.toFixed(2)} SAR</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  title: { fontSize: 15, fontWeight: '500' },
  kind: { fontSize: 12, color: '#6B7280' },
  amount: { fontSize: 15, fontWeight: '600', alignSelf: 'center' },
});
