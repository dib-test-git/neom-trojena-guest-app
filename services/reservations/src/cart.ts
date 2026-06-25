import { z } from 'zod';

/**
 * Unified cart domain model.
 *
 * A single cart can hold lines from three inventories — slopes (lift passes /
 * ski-school sessions), dining (table reservations + prix-fixe holds), and
 * spa (treatments). The service mediates inventory availability at add-time
 * and re-validates again at checkout.
 *
 * Tracked in KAN-30.
 */

export const CartLineKind = z.enum(['slopes', 'dining', 'spa']);
export type CartLineKind = z.infer<typeof CartLineKind>;

export const CartLine = z.object({
  id: z.string(),
  kind: CartLineKind,
  sku: z.string(),
  title: z.string(),
  /** Amount in halalas (SAR * 100) to avoid float drift. */
  amountHalalas: z.number().int().nonnegative(),
  quantity: z.number().int().positive().default(1),
  /** Optional time window for inventory-bearing line types (slopes/spa). */
  windowStart: z.string().datetime().optional(),
  windowEnd: z.string().datetime().optional(),
});
export type CartLine = z.infer<typeof CartLine>;

export const Cart = z.object({
  id: z.string(),
  guestId: z.string(),
  lines: z.array(CartLine),
  currency: z.literal('SAR'),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type Cart = z.infer<typeof Cart>;

export const VAT_RATE = 0.15;

export interface CartTotals {
  subtotalHalalas: number;
  vatHalalas: number;
  totalHalalas: number;
  kindBreakdown: Record<CartLineKind, number>;
}

const ZERO_BREAKDOWN: Record<CartLineKind, number> = {
  slopes: 0,
  dining: 0,
  spa: 0,
};

/**
 * Pure totals calculator. Kept side-effect-free so it can be reused both
 * server-side (for the ZATCA invoice) and client-side (for the checkout UI).
 *
 * Now also returns a per-kind breakdown so the mobile UI can render a small
 * "slopes + dining + spa" badge above the cart.
 */
export function totalCart(cart: Cart): CartTotals {
  const kindBreakdown: Record<CartLineKind, number> = { ...ZERO_BREAKDOWN };
  let subtotalHalalas = 0;
  for (const line of cart.lines) {
    const lineTotal = line.amountHalalas * line.quantity;
    subtotalHalalas += lineTotal;
    kindBreakdown[line.kind] += lineTotal;
  }
  const vatHalalas = Math.round(subtotalHalalas * VAT_RATE);
  return {
    subtotalHalalas,
    vatHalalas,
    totalHalalas: subtotalHalalas + vatHalalas,
    kindBreakdown,
  };
}

export function kindsPresent(cart: Cart): CartLineKind[] {
  const seen = new Set<CartLineKind>();
  for (const l of cart.lines) seen.add(l.kind);
  return Array.from(seen);
}

export function addLine(cart: Cart, line: CartLine): Cart {
  // Enforce: a cart cannot hold two slopes lines covering overlapping windows.
  if (line.kind === 'slopes' && line.windowStart && line.windowEnd) {
    const overlap = cart.lines.find(
      (l) =>
        l.kind === 'slopes' &&
        l.windowStart &&
        l.windowEnd &&
        l.windowStart < line.windowEnd! &&
        line.windowStart! < l.windowEnd,
    );
    if (overlap) {
      throw new Error(`slopes line overlaps with ${overlap.id}`);
    }
  }
  return {
    ...cart,
    lines: [...cart.lines, line],
    updatedAt: new Date().toISOString(),
  };
}

export function removeLine(cart: Cart, lineId: string): Cart {
  return {
    ...cart,
    lines: cart.lines.filter((l) => l.id !== lineId),
    updatedAt: new Date().toISOString(),
  };
}
