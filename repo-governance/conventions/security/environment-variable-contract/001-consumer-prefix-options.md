---
description: >-
  Compares the options for prefixing application-defined environment keys, with what each gains and costs.
when_to_use: >-
  Use when choosing whether an application's own environment keys carry a consumer prefix.
---

# Consumer Prefix Options

| Option                  | Example                  | Gains                                              | Costs                                    |
| ----------------------- | ------------------------ | -------------------------------------------------- | ---------------------------------------- |
| prefix app-defined keys | `<CONSUMER>_API_TIMEOUT` | visible ownership; no collisions in a shared scope | longer names; exempt names must be known |
| no prefix               | `API_TIMEOUT`            | short names matching library defaults              | consumers sharing a scope can collide    |

The entrypoint [Environment Variable Contract](../environment-variable-contract.md) keeps the binding rules:
framework-reserved names stay unprefixed, and a prefix never names a tier.
