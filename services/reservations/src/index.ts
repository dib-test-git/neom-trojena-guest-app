import express from 'express';
import pinoHttp from 'pino-http';
import pino from 'pino';

import { cartRouter } from './routes/cart.js';
import { checkoutRouter } from './routes/checkout.js';

const logger = pino({ name: 'trojena-reservations' });
const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(pinoHttp({ logger }));

app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'reservations' }));

app.use('/v1/cart', cartRouter);
app.use('/v1/checkout', checkoutRouter);

const port = Number(process.env.PORT ?? 8080);
app.listen(port, () => {
  logger.info({ port }, 'reservations service listening');
});
