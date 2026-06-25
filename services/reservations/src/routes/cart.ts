import { Router } from 'express';

import { addLine, removeLine, totalCart, type Cart, CartLine } from '../cart.js';

const carts = new Map<string, Cart>();

export const cartRouter = Router();

cartRouter.post('/', (req, res) => {
  const id = `cart_${Date.now()}`;
  const cart: Cart = {
    id,
    guestId: req.body?.guestId ?? 'anonymous',
    lines: [],
    currency: 'SAR',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  carts.set(id, cart);
  res.status(201).json(cart);
});

cartRouter.get('/:id', (req, res) => {
  const cart = carts.get(req.params.id);
  if (!cart) return res.status(404).json({ error: 'cart_not_found' });
  res.json({ cart, totals: totalCart(cart) });
});

cartRouter.post('/:id/lines', (req, res) => {
  const cart = carts.get(req.params.id);
  if (!cart) return res.status(404).json({ error: 'cart_not_found' });
  const parsed = CartLine.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: 'invalid_line', issues: parsed.error.issues });
  }
  const next = addLine(cart, parsed.data);
  carts.set(cart.id, next);
  res.status(201).json(next);
});

cartRouter.delete('/:id/lines/:lineId', (req, res) => {
  const cart = carts.get(req.params.id);
  if (!cart) return res.status(404).json({ error: 'cart_not_found' });
  const next = removeLine(cart, req.params.lineId);
  carts.set(cart.id, next);
  res.json(next);
});
