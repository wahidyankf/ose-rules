---
description: >-
  Requires every canonical agent to declare exactly one of four workload tiers, describing normal use rather than naming
  a vendor model.
when_to_use: >-
  Use when assigning a tier to an agent, or when a vendor model name is proposed as metadata.
---

# Portable Tiers

Every canonical agent declares exactly one `tier`:

| Tier        | Normal workload                                                         |
| ----------- | ----------------------------------------------------------------------- |
| `ultra`     | rare, highest-complexity synthesis where cost and latency are secondary |
| `plan`      | architecture, planning, or high-context judgement                       |
| `execution` | normal implementation, repair, and repository mutation                  |
| `fast`      | narrow lookup, classification, or inexpensive deterministic support     |

## The Tier Is Not a Quality Ranking

`fast` is not a worse agent. It is an agent whose work is narrow, and giving it a heavier tier makes every invocation
slower and more expensive without making any answer better.

## Select From Normal Use, Not the Hardest Case

Every agent has an occasional hard invocation. Choosing a tier from that case moves the whole roster upward, and after a
few rounds the tiers stop distinguishing anything.

Ask what this agent does on a typical day.

## No Vendor Model Names

A tier names a workload. It never names a model, a provider, a context size, or a price band.

Model names change, and they change independently in each harness. Metadata that names one is wrong the next time the
provider ships, in every repository that copied it, with nothing to signal the drift.

Where a repository does want to map tiers to concrete models, that mapping lives in its own configuration — keyed by
harness and then by tier — and never in the agent. An omitted mapping is the designed default: the harness applies its
own inheritance, which is what a harness is for.
