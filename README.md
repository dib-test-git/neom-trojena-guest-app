# Trojena — Mountain Resort Guest & Operations App

> NEOM Trojena — the year-round mountain destination. This monorepo hosts the
> guest-facing mobile experience (skiing, dining, spa) and the backend
> services powering reservations, lift-queue telemetry, and the 2029 Asian
> Winter Games (AWG) operations dashboard.

![Trojena hero — screenshot placeholder](./docs/screenshots/hero.png)
![Lift queue screen — screenshot placeholder](./docs/screenshots/lift-queue.png)
![Checkout (AR) — screenshot placeholder](./docs/screenshots/checkout-ar.png)

## Highlights

- React Native (TypeScript) bilingual (AR / EN, full RTL) guest app
- Unified cart across **slopes**, **dining**, and **spa**
- Real-time lift-queue wait-time signals (30s refresh)
- Apple Pay + **Mada** (Saudi domestic scheme) at checkout
- **ZATCA** Phase 2 e-invoicing compliance
- Operations dashboard built for **30,000 concurrent guests** at AWG 2029

## Monorepo layout

```
apps/
  mobile/             React Native guest app (iOS + Android)
services/
  reservations/       Unified cart + booking orchestration (Node.js / Express)
  lift-queue/         Telemetry consumer producing wait-time signals
docs/
  architecture.md
  awg-2029-readiness.md
  zatca-vat-compliance.md
```

## Getting started

```bash
# 1. Install workspace deps
npm install

# 2. Mobile app
cd apps/mobile
npm install
npx pod-install ios
npm run ios       # or: npx react-native run-ios
npm run android   # or: npx react-native run-android

# 3. Backend services
cd services/reservations && npm install && npm run dev
cd services/lift-queue   && npm install && npm run dev
```

Minimum tooling: Node 20.x, Xcode 15+, Android Studio Hedgehog+, CocoaPods 1.15+.

## Jira

This repo is tracked under the **KAN** project. Active epics and stories:

| Issue   | Title                                                           | Status      |
| ------- | --------------------------------------------------------------- | ----------- |
| KAN-20  | Epic: Trojena — Mountain Resort Guest & Operations App          | In Progress |
| KAN-29  | Guest app — lift queue wait-time signals                        | Done        |
| KAN-30  | Reservation flow — slopes, dining, spa unified cart             | In Progress |
| KAN-31  | AR/EN bilingual UX                                              | In Review   |
| KAN-32  | AWG 2029 ops dashboard — 30k concurrent guests                  | To Do       |
| KAN-33  | Adventure sports waivers — digital signing                      | To Do       |
| KAN-51  | [P1 Bug] App crashes on Arabic locale at checkout               | In Review   |
| KAN-52  | [P2 Bug] Lift queue shows -1 minute wait for Chair 4            | To Do       |

## Contributing

See `.github/PULL_REQUEST_TEMPLATE.md`. All PRs must reference a KAN ticket
and pass the mobile + backend CI workflows.

## License

Proprietary — © NEOM. Internal use only.
