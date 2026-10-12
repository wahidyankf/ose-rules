---
description: >-
  Agents never open private-key contents anywhere; key or secret access is handed to the user for a separate terminal
  session; only local-development secrets may appear in session records.
when_to_use: >-
  Use when an agent might touch private keys or secrets, or when writing a step that hands secret access to a person.
---

# Private-Key and Secret Access

Agents must not open or read private-key contents anywhere. When private-key or secret access is necessary, agents hand
the command or script to the user, who executes it in a separate terminal session; agents never run the access step
themselves. Agents record no secrets in the session except secrets usable only in local development.

Reason: the user reserves all private-key and secret access to themselves.

## Obligations

1. Agents must not open or read private-key contents anywhere, including outside every repository.
2. When private-key or secret access is necessary, agents must hand the command or script to the user, who executes it
   in a separate terminal session; agents must not enter or run the access step on the user's behalf, through a
   delegate, a remote session, or a scheduled command.
3. Agents must not record secrets in the session, except secrets usable only in local development: services on loopback
   or localhost, and dummy or example values such as `.env.example`.

## Boundaries

The read prohibition covers content reads through a shell, an SSH client, a script, a scanner, a hashing command, an
archive, a semantic indexer, or any other tool; suppressing output does not authorize reading bytes. Agents may inspect
names, paths, and file metadata without reading contents, and must treat a suspected private key as protected rather
than opening a header to classify it. Public keys and SSH configuration are separate artifacts. Authentication-agent
signing that opens no private-key file is outside this prohibition, which imposes no general SSH ban. This convention
requests no key removal, relocation, redaction, replacement, or rotation;
[No Secrets in Tracked Files](no-secrets-in-tracked-files.md) still governs what enters version history.

## Verification Observations

- Conforming read: a metadata-only inventory lists key paths and modes without opening contents.
- Violating read: an agent-triggered command opens key bytes, even if it prints nothing.
- Conforming handoff: the tool history shows the agent never ran the access step; the user ran the handed command in
  their own terminal.
- Violating handoff: an agent tool or delegate enters or runs the access step for the user.
- Conforming record: output, responses, reports, and artifacts hold no secret beyond local-development values.
- Violating record: a non-local secret value appears in the session.

## Enforcement Disposition

Each obligation is **unenforced by decision**; review checks the observations above. No mechanical check proves bytes
were never opened, a command was entered by the user personally, or free text holds no secret.
