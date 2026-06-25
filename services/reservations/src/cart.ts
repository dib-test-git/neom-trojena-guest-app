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
}

/**
 * Pure totals calculator. Kept side-effect-free so it can be reused both
 * server-side (for the ZATCA invoice) and client-side (for the checkout UI).
 */
export function totalCart(cart: Cart): CartTotals {
  const subtotalHalalas = cart.lines.reduce(
    (sum, line) => sum + line.amountHalalas * line.quantity,
    0,
  );
  const vatHalalas = Math.round(subtotalHalalas * VAT_RATE);
  return {
    subtotalHalalas,
    vatHalalas,
    totalHalalas: subtotalHalalas + vatHalalas,
  };
}

export function addLine(cart: Cart, line: CartLine): Cart {
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
