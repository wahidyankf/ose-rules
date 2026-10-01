---
name: pr-leak-review
description: >-
  Defines a leak and reviews every commit bound for a remote for one, privately before each push and as a sanitized
  record posted on the pull request before each merge.
when_to_use: >-
  Use before every push to a remote, and for every open pull request before it merges and again each time its head
  moves.
---

# PR Leak Review

A **leak** is anything in outbound history that a reader of the remote could use to reach an environment or identify the
machine it came from. [Leak Classes](pr-leak-review/001-leak-classes.md) defines the three classes and what is not one.
History is the subject, not the final tree: a value one commit adds and a later commit deletes is still in every clone.
The review binds from adoption onward; history published before it is out of scope.

## Entry

Two entry points share one judgement:

- **Push.** Before any push to a remote, review the outgoing range privately per
  [Push Review](pr-leak-review/002-push-review.md). Nothing is posted; a finding blocks the push.
- **Merge.** A pull request is open, and no `pass` record posted by the reviewer identity the adopter designates exists
  for its current head. `pull-request` (`string`, required): the pull request's number or address.

## Sequence

1. **Pin the head.** Resolve the pull request through the forge's API and record the repository, the base branch and its
   revision, and the exact head revision. Everything after this step concerns that head alone.
2. **Read every commit at that head.** Each commit's diff from base to head, including configuration, generated files,
   localized content, binary metadata, file names, and commit messages, plus the title and body. A summary or memory of
   the change is not a reading, and no file is skipped because another gate covers it.
3. **Judge candidates against the three [leak classes](pr-leak-review/001-leak-classes.md) and no others.** A candidate
   is a finding only when shape and context show the value is real. No candidate is copied into notes, commands, or
   logs.
4. **Write each finding without its value.** Record the class, the commit, the file and line or metadata location, why
   it breaks the class, and the remediation in [Push Review](pr-leak-review/002-push-review.md#remediation). Never
   repeat, partly quote, hash, encode, or describe a value's pattern.
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
(`string`), `review-id` (`string`), and `counts` (`string`) per class. `pass` means every count is zero; `findings`, any
nonzero count. Only `pass` for the exact head being merged satisfies the merge precondition.

`stale` means the head moved, and the record authorizes nothing for the new head. `failed` means an API, posting,
read-back, or authentication error left no verdict. Neither retries inside the run.

## Example Usage

```text
Run pr-leak-review for the current head of pull request 412.
Run the push leak review for the commits this branch is about to push.
```

## Related Workflows

- [Harness Parity Verification](harness-parity-verification.md) is another single-pass review that changes nothing.

## One Head, One Review

A moved head needs one new review. Passes on earlier heads say nothing about the head that merges, so the run neither
retries nor waits for a clean streak. An unposted merge pass cannot be told apart from a review nobody ran, which is why
step 6 posts every result. [Enforcement](pr-leak-review/003-enforcement.md) makes the precondition mechanical.

## Principles

This workflow implements [Fail Closed](../../principles/fail-closed.md), because `stale` and `failed` never satisfy the
precondition, and [Evidence Over Assertion](../../principles/evidence-over-assertion.md), because the verdict is a
posted record read back against one head.
