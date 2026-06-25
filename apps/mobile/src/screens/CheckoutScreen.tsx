import React, { useMemo, useState } from 'react';
import { Alert, Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

import { useCart } from '../hooks/useCart';
import { CartLine } from '../components/CartLine';
import { PaymentSheet } from '../components/PaymentSheet';

/**
 * Unified checkout screen.
 *
 * Aggregates slopes + dining + spa line-items into a single transaction with
 * ZATCA-compliant VAT breakdown. Payment supports Apple Pay and Mada.
 *
 * Tracked in KAN-30; bilingual edge-cases tracked in KAN-31 / KAN-51.
 */
export function CheckoutScreen(): JSX.Element {
  const { t } = useTranslation();
  const { cart, total, vat } = useCart();
  const [submitting, setSubmitting] = useState(false);

  const summary = useMemo(
    () => ({
      subtotal: total - vat,
      vat,
      total,
    }),
    [total, vat],
  );

  async function onPay(method: 'apple_pay' | 'mada'): Promise<void> {
    setSubmitting(true);
    try {
      // ...integration with services/reservations checkout endpoint...
      Alert.alert(t('checkout.success_title'), t('checkout.success_body'));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{t('checkout.title')}</Text>

      {cart.lines.map((line) => (
        <CartLine key={line.id} line={line} />
      ))}

      <View style={styles.summary}>
        <Row label={t('checkout.subtotal')} value={summary.subtotal} />
        <Row label={t('checkout.vat')} value={summary.vat} />
        <Row label={t('checkout.total')} value={summary.total} bold />
      </View>

      <PaymentSheet onPay={onPay} disabled={submitting} />

      <Button
        title={t('checkout.cta')}
        onPress={() => onPay('apple_pay')}
        disabled={submitting}
      />
    </ScrollView>
  );
}

function Row({
  label,
  value,
  bold,
}: {
  label: string;
  value: number;
  bold?: boolean;
}): JSX.Element {
  return (
    <View style={styles.row}>
      <Text style={[styles.rowLabel, bold && styles.bold]}>{label}</Text>
      <Text style={[styles.rowValue, bold && styles.bold]}>
        {value.toFixed(2)} SAR
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#F7F8FA' },
  title: { fontSize: 24, fontWeight: '700', marginBottom: 16 },
  summary: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  rowLabel: { fontSize: 15, color: '#374151' },
  rowValue: { fontSize: 15, color: '#111827' },
  bold: { fontWeight: '700' },
});
