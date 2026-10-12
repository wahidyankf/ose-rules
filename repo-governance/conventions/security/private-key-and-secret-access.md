---
description: >-
  Agents never open private-key contents anywhere; every secret step is one clipboard command with its directory that
  the user runs in their own terminal and answers with one word; nothing secret reaches the harness session; sessions
  lock before any pause; agent delivery follows proper pipelines; leak reviews are real reads.
when_to_use: >-
  Use when an agent might touch private keys or secrets, when writing a step that hands secret access to a person, or
  when operating a leak review.
---

# Private-Key and Secret Access

Agents must not open or read private-key contents anywhere. Every secret step is one copy-ready command carrying its
working directory, placed by the agent on the operator clipboard; the operator runs it in their own terminal and replies
with the success word the step names. Nothing secret reaches the harness session. Sessions lock before any pause.
Agent-assisted delivery needs a proper pipeline. A leak review is a real read of every commit at the pinned head.

Reason: regtech `[HUMAN]` removes value exposure from the session, and proper pipelines earn faster delivery.

## Obligations

1. Agents must not open or read private-key contents anywhere, including outside every repository.
2. Each secret step is exactly one copy-ready command carrying its working directory, placed by the agent on the
   operator clipboard; the operator runs it in their own terminal, entering each secret only at a hidden prompt, and
   replies with the success word the step names; the agent continues only on it.
3. Agents must never request, handle, or record secret values, full outputs, or screenshots, and must avoid any script
   or interaction that prints, echoes, logs, or otherwise exposes a secret to the harness session; diagnosis uses exit
   and error codes alone, and only local-development secrets may appear in session records.
4. The secret session opens only inside the phase that needs it and locks before any review, pause, or PR handoff.
5. Agent-assisted delivery applies only with a proper pipeline and secrets management (tracked wrapper, closed one-word
   outputs, leak screens, green gates); elsewhere the agent stops at the secret boundary.
6. An agent may operate the leak review, but must read every commit at the pinned head against the three leak classes
   before posting; a record without that reading is fabrication.

## Boundaries

The prohibition covers reads through a shell, SSH client, script, scanner, hash, archive, indexer, or other tool;
suppressed output authorizes nothing. Agents may inspect names, paths, and metadata without reading contents, treating a
suspected key as protected without opening a header to classify it. Public keys and SSH configuration are separate
artifacts. Authentication-agent signing that opens no private-key file is outside this prohibition, which imposes no
general SSH ban. Values move only through a hidden prompt, standard input, or a child environment, never an argument,
log, chat, commit, or tracked file. Local development means loopback services and dummy or example values such as
`.env.example`. This convention requests no key removal, relocation, redaction, replacement, or rotation;
[No Secrets in Tracked Files](no-secrets-in-tracked-files.md) still governs what enters version history.

## Verification Observations

- Conforming read: a metadata-only inventory lists key paths and modes without opening contents.
- Violating read: an agent-triggered command opens key bytes, even if it prints nothing.
- Conforming step: the step is one command starting in its named directory, placed on the clipboard.
- Violating step: prose instructions, several commands, or a command with no directory or clipboard.
- Conforming reply: the named word arrives before work continues.
- Violating reply: work continues without it, or free-form output counts as success.
- Conforming session: outputs, responses, reports, and artifacts hold no non-local secret, and no script echoes one
  toward the harness.
- Violating session: a non-local secret, full output, or screenshot is requested, transmitted, or recorded.
- Conforming lifecycle: unlock and lock bracket the phase's secret steps.
- Violating lifecycle: a pause, review, or PR handoff occurs while unlocked.
- Conforming incentive: the agent proceeds only after wrapper tests and gates pass.
- Violating incentive: secret-touching automation runs without that pipeline.
- Conforming review: tool history shows every commit at the pinned head read before posting.
- Violating review: a record posts without those reads or for a different head.

## Enforcement Disposition

Each obligation is **unenforced by decision**; review checks the observations above. No mechanical check proves bytes
were never opened, a command was entered by the user personally, free text holds no secret, a lock preceded a pause, a
pipeline is adequate, or a review actually read.
