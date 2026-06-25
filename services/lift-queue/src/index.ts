import express from 'express';
import pino from 'pino';

import { startTelemetryConsumer } from './consumer.js';
import { snapshot } from './store.js';

const logger = pino({ name: 'trojena-lift-queue' });
const app = express();

app.get('/healthz', (_req, res) => res.json({ ok: true, service: 'lift-queue' }));

/**
 * Serves the latest per-lift wait-time signal computed from the rolling
 * telemetry window. Consumed by the mobile app every 30s (see KAN-29).
 */
app.get('/v1/signals', (_req, res) => {
  res.json(snapshot());
});

const port = Number(process.env.PORT ?? 8081);
app.listen(port, () => {
  logger.info({ port }, 'lift-queue service listening');
});

startTelemetryConsumer(logger).catch((err) => {
  logger.error({ err }, 'telemetry consumer crashed');
  process.exitCode = 1;
});
