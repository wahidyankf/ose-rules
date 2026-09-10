---
description: >-
  Requires every outbound artifact from a public repository to pass a safety screen first, with no allowlist,
  suppression, or bypass.
when_to_use: >-
  Use before any push, pull request, comment, release, or published log, and when adding a publication surface.
---

# Public Outbound Safety

Nothing leaves a public repository without being screened first. Files, filenames, commit messages, branch and tag
names, pull-request titles and bodies, comments, release notes, and published logs are all outbound.

Deletion is not a remedy. Anything published may already be cached, cloned, indexed, or mirrored, so the only control
that works is the one that runs before publication.

## Surfaces

| Outbound artifact         | Screened input                                    |
| ------------------------- | ------------------------------------------------- |
| tracked content           | every tracked file, plus file and directory names |
| a staged or pushed change | added content and changed names                   |
| a commit                  | the message and related metadata text             |
| a branch or tag           | the name                                          |
| a pull request or comment | the title and the body                            |
| a release                 | tag annotation, title, notes, changelog excerpt   |
| a log or evidence record  | the text before it is written                     |

Names are screened as carefully as content. A branch named after an internal host publishes that host, and no diff
review looks at branch names.

## What Is Prohibited

Credentials and secrets; personal data not deliberately public; absolute paths belonging to a person or machine;
internal hostnames, addresses, and network topology; private repository or group identifiers; and raw scanner output
that could reproduce any of the above.

Replace with semantic placeholders — `<api-token>`, `<private-host>`, `<repository-path>`. Where replacement destroys
the artifact's meaning, the artifact stays private.

## Three Outcomes, Two Refusals

| Exit | Means      | Publication      |
| ---: | ---------- | ---------------- |
|    0 | clean      | may proceed      |
|    1 | blocked    | must not proceed |
|    2 | scan error | must not proceed |

`1` and `2` differ only in whether the problem is known. A scan that could not run is not a scan that passed, and
treating an error as clean turns the one guard that had to be reliable into a formality.

## No Bypass

No allowlist, no suppression comment, no environment variable, no `--force`. A screen that can be turned off will be
turned off, in a hurry, by someone who is certain it is a false positive.

A genuine false positive is fixed by narrowing the rule, in a change that is reviewed like any other.

## Runs First

Where a repository has gates, this is the first one on every surface it applies to. Screening after a formatter has
rewritten the file, or after a push has already happened, screens the wrong thing at the wrong time.

## Scanner Output Is Itself Sensitive

A finding names what it found. Reports record the file, the rule, and the location — never the matched value, which
would publish it a second time in the record of having caught it.
