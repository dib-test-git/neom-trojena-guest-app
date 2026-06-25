import React from 'react';
import { StyleSheet, View, ViewProps } from 'react-native';

type Direction = 'ltr' | 'rtl';
type Spacing = 'sm' | 'md' | 'lg';

const PADDING: Record<Spacing, number> = { sm: 8, md: 12, lg: 16 };

/**
 * Bilingual UX kit v2 — primitive `Card` that handles direction-aware
 * padding, border radius, and elevation tokens. Replaces a tangle of
 * ad-hoc StyleSheet objects scattered through the app. See KAN-31.
 */
export function Card({
  children,
  direction = 'ltr',
  spacing = 'md',
  style,
  ...rest
}: ViewProps & { direction?: Direction; spacing?: Spacing }): JSX.Element {
  return (
    <View
      {...rest}
      style={[
        styles.card,
        { padding: PADDING[spacing] },
        direction === 'rtl' && { transform: [{ scaleX: 1 }] },
        style,
      ]}
    >
      {children}
    </View>
  );
}

export function CardRow({
  children,
  direction,
}: {
  children: React.ReactNode;
  direction: Direction;
}): JSX.Element {
  return (
    <View
      style={[
        styles.row,
        { flexDirection: direction === 'rtl' ? 'row-reverse' : 'row' },
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginVertical: 4,
    marginHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  row: { alignItems: 'center' },
});
