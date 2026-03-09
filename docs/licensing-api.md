# StackBill Licensing API

## Overview

StackBill Vendor is the central license server. Self-hosted StackBill instances must verify their license against this API.

---

## Endpoint

```
POST /api/license/verify
```

### Request

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `license_key` | string | ✅ | License key (format: `SB-XXXX-XXXX-XXXX`) |
| `instance_id` | string | ✅ | Unique identifier of the StackBill instance |
| `domain` | string | ❌ | Domain where the instance is hosted |
| `app_version` | string | ❌ | Version of the StackBill app |

#### Example

```json
{
  "license_key": "SB-A3K9-V7WN-M2PX",
  "instance_id": "inst_abc123def456",
  "domain": "billing.example.com",
  "app_version": "1.2.0"
}
```

### Responses

#### Valid license

```json
{
  "valid": true,
  "plan": "monthly",
  "max_instances": 2,
  "expires_at": "2026-04-09T00:00:00.000Z",
  "server_time": "2026-03-09T07:45:00.000Z"
}
```

#### Invalid license key

```json
{
  "valid": false,
  "reason": "invalid_license"
}
```

#### Licence expired

```json
{
  "valid": false,
  "reason": "license_expired"
}
```

#### Licence cancelled

```json
{
  "valid": false,
  "reason": "license_cancelled"
}
```

#### Instance limit reached

```json
{
  "valid": false,
  "reason": "instance_limit_reached"
}
```

#### Missing fields

```json
{
  "valid": false,
  "reason": "missing_license_key"
}
```

```json
{
  "valid": false,
  "reason": "missing_instance_id"
}
```

---

## Validation Logic

When `/api/license/verify` is called:

1. **License exists?** — Lookup by `license_key`
2. **Status active?** — Must be `active` (not `expired` or `cancelled`)
3. **Not expired?** — `expires_at` must be in the future
4. **Instance check:**
   - If `instance_id` already registered → update `last_seen_at` → ✅
   - If new instance and `count < max_instances` → register instance → ✅
   - If new instance and `count >= max_instances` → ❌ `instance_limit_reached`

---

## Stripe Webhooks

The following Stripe events trigger license actions:

| Event | Action |
|-------|--------|
| `checkout.session.completed` | Create a new license |
| `invoice.paid` | Extend license expiration |
| `customer.subscription.deleted` | Mark license as cancelled |

---

## License Key Format

```
SB-XXXX-XXXX-XXXX
```

Each segment is 4 alphanumeric characters (uppercase, no ambiguous characters like O/0/I/1).

---

## Database

Licenses and instances are stored in SQLite (`data/stackbill.db`).

### Table: `licenses`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key |
| `license_key` | TEXT | Unique license key |
| `plan` | TEXT | Plan name (monthly/yearly) |
| `max_instances` | INTEGER | Max allowed instances |
| `status` | TEXT | active / expired / cancelled |
| `created_at` | TEXT | ISO datetime |
| `expires_at` | TEXT | ISO datetime (nullable) |
| `stripe_customer_id` | TEXT | Stripe customer ID |
| `stripe_subscription_id` | TEXT | Stripe subscription ID (unique) |

### Table: `license_instances`

| Column | Type | Description |
|--------|------|-------------|
| `id` | INTEGER | Primary key |
| `license_id` | INTEGER | FK → licenses.id |
| `instance_id` | TEXT | Unique instance identifier |
| `domain` | TEXT | Instance domain (nullable) |
| `first_seen_at` | TEXT | First verification time |
| `last_seen_at` | TEXT | Last verification time |
