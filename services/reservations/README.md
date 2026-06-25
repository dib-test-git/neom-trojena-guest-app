# services/reservations

Unified cart + booking orchestration. Owns the cart aggregate that lets a
guest combine **slopes**, **dining**, and **spa** line-items into a single
ZATCA-compliant transaction.

## Run locally

```bash
npm install
npm run dev   # tsx watch — defaults to PORT=8080
```

## Endpoints

| Method | Path                              | Purpose                       |
| ------ | --------------------------------- | ----------------------------- |
| POST   | `/v1/cart`                        | Create a new cart             |
| GET    | `/v1/cart/:id`                    | Fetch cart + totals           |
| POST   | `/v1/cart/:id/lines`              | Add a line                    |
| DELETE | `/v1/cart/:id/lines/:lineId`      | Remove a line                 |
| POST   | `/v1/checkout`                    | Pay + book (stub)             |
| GET    | `/healthz`                        | Liveness                      |

Tracked under KAN-30.
