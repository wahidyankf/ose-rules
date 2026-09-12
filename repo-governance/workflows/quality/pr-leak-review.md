---
name: pr-leak-review
description: >-
  Reviews one pinned pull-request head for leaked secrets, misplaced environment properties, and machine-specific paths,
  and posts a sanitized evidence record bound to that head.
when_to_use: >-
  Use for every open pull request before it merges, and again each time its head moves.
---

# PR Leak Review

## Entry

A pull request is open, and no `pass` record posted by the reviewer identity the adopter designates exists for its
current head.

- `pull-request` (`string`, required): the pull request's number or address.

## Sequence

1. **Pin the head.** Resolve the pull request through the forge's API and record the repository, the base branch and its
   revision, and the exact head revision. Everything after this step concerns that head alone.
2. **Read the entire change at that head.** The full base-to-head diff, including configuration, generated files,
   localized content, binary metadata, and removed lines context needs, plus the title and body. A summary or memory of
   the change is not a reading, and no file is skipped because another gate covers it.
3. **Judge candidates against three categories and no others:**
   1. a real secret, credential, or other value that grants access, per
      [No Secrets in Tracked Files](../../conventions/security/no-secrets-in-tracked-files.md);
   2. a property that belongs in environment or secret storage, per
      [Environment Variable Contract](../../conventions/security/environment-variable-contract.md); and
   3. a real machine-specific absolute path or host evidence, per
      [No Machine-Specific Values](../../conventions/security/no-machine-specific-values.md).

   Public identifiers, documented public values, placeholders, repository-relative paths, and synthetic fixtures are not
   leaks. A name containing `key`, `token`, `secret`, or `prod` is not evidence alone; a candidate is a finding only
   when shape and context show the value is real. No candidate is copied into notes, commands, or logs.

4. **Write each finding without its value.** Record the category, the file and line or metadata location, why it breaks
   the category, and the remediation: rotate then remove, move to environment storage, or use a repository-relative or
   configured path. Never repeat, partly quote, hash, encode, or describe a value's pattern.
5. **Confirm the head before posting.** If the live head differs from the pin, post nothing and end the run as `stale`.
6. **Post exactly one review, whatever the result.** Its body says every other security and semantic concern was out of
   scope, and carries this record under a marker name the adopter fixes once:

   ```text
   <!-- <leak-review-marker>:v1
   {"repository":"<owner>/<repository>","pull_request":"<number>","base_ref":"<base-branch>",
    "base_sha":"<base-revision>","head_sha":"<reviewed-revision>","result":"pass|findings",
    "counts":{"secret_or_private_value":0,"protected_environment_property":0,
    "machine_specific_absolute_path":0}}
   -->
   ```

7. **Read the review back.** Through the API, confirm the posted review's commit equals the pinned head and its
   repository, pull request, base, head, result, and counts match step 6. Marker-shaped text elsewhere has no authority.
8. **Query the live head once more.** A moved head ends the run as `stale`, with the evidence bound to the head it
   reviewed.

## Exit

Success leaves `result` (`enum`: `pass`, `findings`, `stale`, `failed`) at `pass` or `findings`, with `reviewed-head`
(`string`), `review-id` (`string`), and `counts` (`string`) per category. `pass` means every count is zero; `findings`,
any nonzero count. Only `pass` for the exact head being merged satisfies the merge precondition.

`stale` means the head moved, and the record authorizes nothing for the new head. `failed` means an API, posting,
read-back, or authentication error left no verdict. Neither retries inside the run.

## Example Usage

```text
Run pr-leak-review for the current head of pull request 412.
```

## Related Workflows

- [Harness Parity Verification](harness-parity-verification.md) is another single-pass review that changes nothing.

## One Head, One Review

A moved head needs one new review. Clean reviews do not accumulate: passes on earlier heads say nothing about the head
that merges, so the run neither retries nor waits for a clean streak. An unposted pass cannot be told apart from a
review nobody ran, which is why step 6 posts every result.

An adopter enforces the precondition in its own merge gate or branch protection, accepting only an authenticated `pass`
matching the pull request's current repository, base, and head.

## The Review Is Itself Published

The review body is outbound, per [Public Outbound Safety](../../conventions/security/public-outbound-safety.md). A path
pasted into it is the finding the review exists to catch, and a quoted secret is published again in the record of its
discovery. Anything found is treated as already disclosed.

It is not a security or semantic review. A screen matches shapes; this review reads context, and three categories keep
it small enough for every head.

## Principles

This workflow implements [Fail Closed](../../principles/fail-closed.md), because `stale` and `failed` never satisfy the
precondition, and [Evidence Over Assertion](../../principles/evidence-over-assertion.md), because the verdict is a
posted record read back against one head.
