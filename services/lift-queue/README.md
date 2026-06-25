# services/lift-queue

Consumes turnstile telemetry from Trojena's lift gates and produces near-real-time
wait-time signals for the guest app. See KAN-29.

## Inputs

- Kafka topic: `trojena.lift.turnstile.v1`
- Event shape:

  ```json
  {
    "liftId": "chair-4",
    "liftName": "Chair 4 — Black Diamond",
    "ts": 1719300000000,
    "capacityPerMin": 18
  }
  ```

## Output

`GET /v1/signals` — array of `{ id, name, status, waitMinutes }`.

`waitMinutes` is clamped to `>= 0` — see KAN-52 (Chair 4 negative-wait bug).

## Run locally

```bash
npm install
KAFKA_BROKERS=localhost:9092 npm run dev
```
