import { Router } from 'express';

export const checkoutRouter = Router();

/**
 * Stub checkout endpoint. The real implementation forwards the cart to:
 *  - the payment processor (Apple Pay token / Mada PAN)
 *  - the ZATCA Phase 2 e-invoicing pipeline
 *  - the inventory services to convert holds into confirmed bookings
 *
 * See docs/zatca-vat-compliance.md.
 */
checkoutRouter.post('/', (req, res) => {
  const { cartId, paymentMethod } = req.body ?? {};
  if (!cartId || !paymentMethod) {
    return res.status(400).json({ error: 'cartId and paymentMethod are required' });
  }

  res.json({
    bookingId: `bkg_${Date.now()}`,
    status: 'confirmed',
    paymentMethod,
    zatcaInvoiceId: `inv_${Date.now()}`,
  });
});
