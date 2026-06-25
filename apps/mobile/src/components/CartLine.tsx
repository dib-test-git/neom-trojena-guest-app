import React from 'react';
import { Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import type { CartLineItem } from '../types/cart';
import { useDirection } from './ux-v2/useDirection';

export function CartLine({ line }: { line: CartLineItem }): JSX.Element {
  const { t } = useTranslation();
  const dir = useDirection();
  return (
    <View
      style={{
        flexDirection: dir === 'rtl' ? 'row-reverse' : 'row',
        padding: 10,
        borderBottomWidth: 1,
        borderColor: '#F1F5F9',
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 15, fontWeight: '500' }}>{line.title}</Text>
        <Text style={{ fontSize: 12, color: '#6B7280' }}>
          {t(`cart.kind.${line.kind}`)}
        </Text>
      </View>
      <Text style={{ fontSize: 15, fontWeight: '600', alignSelf: 'center' }}>
        {line.amount.toFixed(2)} SAR
      </Text>
    </View>
  );
}
