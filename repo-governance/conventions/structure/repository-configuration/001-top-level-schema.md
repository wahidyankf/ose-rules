---
description: >-
  Fixes the required and optional top-level configuration keys, and fails any unknown key that is not namespaced.
when_to_use: >-
  Use when creating a repository configuration file or adding a top-level key to one.
---

# Top-Level Schema

## Required

| Key          | Holds                                                   |
| ------------ | ------------------------------------------------------- |
| `schema`     | the schema identifier and version this file conforms to |
| `visibility` | exactly `public` or `private`                           |
| `gates`      | a nonempty, ordered list of gate entries                |

`visibility` is required rather than inferred. A repository's remote can change, a fork inherits nothing useful, and a
tool that guesses will guess wrong exactly once — on the repository where being wrong matters.

`gates` is ordered, and the order is meaningful: gates run in declaration order and stop at the first failure. It is
nonempty because a repository declaring no gate has declared that nothing must pass, which is a decision worth writing
out rather than reaching by omission.

## Optional

| Key           | Holds                                                     |
| ------------- | --------------------------------------------------------- |
| `governance`  | repository-specific governance settings                   |
| `model-tiers` | a mapping from harness and tier to a concrete model       |
| `extensions`  | namespaced payloads, one first-level key per profile name |

Each is omitted when empty. An empty map is not a smaller map; it is a key that should not be there, and it fails.

## Canonical Key Order

`schema`, `visibility`, `governance`, `model-tiers`, `gates`, `extensions`. Optional keys keep their position when
present and leave no gap when absent.

## Unknown Keys Fail

A top-level key outside this set fails. Anything a repository needs that this schema does not describe goes under
`extensions`, whose first-level key names the owning profile; the validator checks that the namespace exists and leaves
the payload to whatever owns it.

Without that escape, the schema either forbids real needs or grows a field per repository until it describes nothing in
particular. Putting every escape inside one key keeps them visible: `extensions` is the first place a reader looks for
what this repository does that the shared contract does not cover.

A namespace is not an exemption. An extension payload is screened by the same rules as the rest of the file, and a
repository cannot smuggle a private host or a credential into one by naming it after a vendor.

## Model Tiers Are Optional Everywhere

Any harness and any tier may be omitted. A present tier carries a nonempty model and a nonempty effort — both or
neither; a half-pair fails.

Omission is the designed default, not a gap: the harness applies its own inheritance, which is the behaviour a mapping
would otherwise have to reimplement and keep current.
