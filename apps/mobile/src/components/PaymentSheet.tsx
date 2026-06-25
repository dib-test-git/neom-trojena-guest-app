import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';

type Method = 'apple_pay' | 'mada';

export function PaymentSheet({
  onPay,
  disabled,
}: {
  onPay: (method: Method) => void;
  disabled?: boolean;
}): JSX.Element {
  const { t } = useTranslation();
  return (
    <View style={styles.sheet}>
      <Text style={styles.heading}>{t('checkout.choose_method')}</Text>
      <View style={styles.row}>
        <PayButton
          label={t('checkout.apple_pay')}
          onPress={() => onPay('apple_pay')}
          disabled={disabled}
        />
        <PayButton
          label={t('checkout.mada')}
          onPress={() => onPay('mada')}
          disabled={disabled}
        />
      </View>
    </View>
  );
}

function PayButton({
  label,
  onPress,
  disabled,
}: {
  label: string;
  onPress: () => void;
  disabled?: boolean;
}): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
      ]}
    >
      <Text style={styles.buttonLabel}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  sheet: { marginTop: 16 },
  heading: { fontSize: 14, fontWeight: '600', marginBottom: 8, color: '#374151' },
  row: { flexDirection: 'row', gap: 8 },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#111827',
    alignItems: 'center',
  },
  pressed: { opacity: 0.85 },
  disabled: { backgroundColor: '#9CA3AF' },
  buttonLabel: { color: '#FFFFFF', fontSize: 15, fontWeight: '600' },
});
