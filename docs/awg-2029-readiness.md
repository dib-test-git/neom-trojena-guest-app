# AWG 2029 readiness — 30k concurrent guest scaling plan

NEOM Trojena will host the **2029 Asian Winter Games** (AWG). This document
captures the load-testing plan and the work needed to take the guest +
operations platform from its current capacity to a verified, sustained
**30,000 concurrent guests** across the resort footprint.

Tracked in **KAN-32** (sprint-25).

## Target traffic profile

| Surface                       | Peak concurrent | Steady state | p95 latency target |
| ----------------------------- | --------------- | ------------ | ------------------ |
| Mobile app — lift queue poll  | 30,000          | 18,000       | 250 ms             |
| Mobile app — reservations API | 6,000           | 3,500        | 400 ms             |
| Mobile app — checkout         | 1,500           | 700          | 800 ms             |
| Ops dashboard — control room  | 200             | 200          | 1 s                |

## Load-test phases

1. **Component soak** — each service held at 2x target for 4 hours.
2. **End-to-end ramp** — Gatling scenario climbs 0 → 30k over 30 min,
   holds 30k for 60 min, ramps down.
3. **Failure injection** — kill a `lift-queue` replica during the soak;
   confirm signals recover within 60s.
4. **Game-day rehearsal** — full ops + mobile pair-stress, replayed twice
   with NEOM SREs and Trojena ops staff.

## Capacity work-streams

- Horizontal autoscaling on `lift-queue` (Kafka consumer group rebalancing).
- Read-through Redis cache in front of `/v1/cart/:id` to absorb client poll.
- CDN-fronted static assets for AR/EN i18n bundles.
- Bookings DB: partition by `resortDay` to keep hot indexes small.
- Apple Pay merchant session pre-warm endpoint to cut checkout p95.

## Open questions

- ZATCA Phase 2 throughput during peak — coordinate with the tax integrator.
- Mada gateway QPS ceiling — pending vendor confirmation.
- Native push fan-out for queue alerts: APNs / FCM token sharding.

## Status

- [x] Component soak environment provisioned (eu-west-2 mirror)
- [ ] Gatling scenarios committed under `tools/loadtest/` *(KAN-32)*
- [ ] Game-day #1 scheduled
