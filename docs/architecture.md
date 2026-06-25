# Architecture

## System overview

```
   ┌──────────────────┐         ┌──────────────────────┐
   │  Trojena mobile  │◄───────►│  reservations svc    │
   │  (React Native)  │  HTTPS  │  unified cart +      │
   └──────────────────┘         │  ZATCA invoicing     │
            ▲                   └─────────┬────────────┘
            │ 30s poll                    │
            │                             ▼
   ┌──────────────────┐         ┌──────────────────────┐
   │  lift-queue svc  │◄────────│  inventory & PMS     │
   │  Kafka consumer  │  Kafka  │  (slopes/dining/spa) │
   └──────────────────┘         └──────────────────────┘
```

## Mobile app

- **React Native 0.74** with TypeScript strict mode.
- **i18next** for AR/EN with full RTL (Right-to-Left) layout handling.
- **@react-navigation/native-stack** for screen routing.
- **Apple Pay** (iOS) and **Mada** (cross-platform) for payments.
- Local persistence via **MMKV**; remote state via React Query (planned).

## Backend services

| Service           | Purpose                                       | Stack                  |
| ----------------- | --------------------------------------------- | ---------------------- |
| `reservations`    | Unified cart, ZATCA invoice generation        | Node 20, Express, Zod  |
| `lift-queue`      | Turnstile telemetry → wait-time signal API    | Node 20, KafkaJS       |

## Compliance & resilience

- VAT / e-invoicing: see [zatca-vat-compliance.md](./zatca-vat-compliance.md)
- Scale for 30k concurrent guests at AWG 2029: see [awg-2029-readiness.md](./awg-2029-readiness.md)

## Repository layout

The repo is a npm workspace monorepo with `apps/*` and `services/*`. CI is
split per surface: `mobile-ci` runs typecheck + Jest + Detox-light; `backend-ci`
runs typecheck + Jest against the Node services.
