import { Kafka } from 'kafkajs';
import type { Logger } from 'pino';

import { ingest } from './store.js';

const TOPIC = 'trojena.lift.turnstile.v1';

/**
 * Kafka consumer for turnstile telemetry. Each event represents a single
 * guest scan at a lift base. We use the moving average of scans / minute
 * (capacity-adjusted) to estimate wait times. See KAN-29.
 */
export async function startTelemetryConsumer(logger: Logger): Promise<void> {
  const brokers = (process.env.KAFKA_BROKERS ?? 'localhost:9092').split(',');
  const kafka = new Kafka({ clientId: 'trojena-lift-queue', brokers });
  const consumer = kafka.consumer({ groupId: 'trojena-lift-queue' });

  await consumer.connect();
  await consumer.subscribe({ topic: TOPIC, fromBeginning: false });

  await consumer.run({
    eachMessage: async ({ message }) => {
      try {
        const payload = JSON.parse(message.value?.toString() ?? '{}');
        ingest(payload);
      } catch (err) {
        logger.warn({ err }, 'failed to parse turnstile event');
      }
    },
  });

  logger.info({ topic: TOPIC }, 'telemetry consumer started');
}
