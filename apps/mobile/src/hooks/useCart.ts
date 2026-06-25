import { useMemo } from 'react';

import type { Cart, CartLineKind } from '../types/cart';

const VAT_RATE = 0.15; // KSA standard VAT — see docs/zatca-vat-compliance.md

/**
 * Demo cart hook. In production this binds to services/reservations cart
 * endpoints via React Query. See KAN-30.
 */
export function useCart(): {
  cart: Cart;
  total: number;
  vat: number;
  kindsPresent: CartLineKind[];
} {
  const cart: Cart = useMemo(
    () => ({
      id: 'cart-demo-1',
      lines: [
        { id: 'l1', kind: 'slopes', title: 'Day pass — Adult', amount: 420 },
        { id: 'l2', kind: 'dining', title: 'Summit Lounge — Brunch x2', amount: 360 },
        { id: 'l3', kind: 'spa', title: 'Alpine Spa — 60 min massage', amount: 520 },
      ],
    }),
    [],
  );

  const subtotal = cart.lines.reduce((sum, l) => sum + l.amount, 0);
  const vat = +(subtotal * VAT_RATE).toFixed(2);
  const total = +(subtotal + vat).toFixed(2);

  const kindsPresent = useMemo(() => {
    const seen = new Set<CartLineKind>();
    for (const l of cart.lines) seen.add(l.kind);
    return Array.from(seen);
  }, [cart]);

  return { cart, total, vat, kindsPresent };
}
