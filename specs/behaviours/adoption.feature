Feature: Alignment assessment and artifact adoption
  The catalog is read by many repositories and writes to none of them on its own.
  These scenarios fix that boundary: what an assessment may do, what opens an
  adoption, what an adoption may touch, and what it records.

  # ---------------------------------------------------------------- assess-alignment

  Scenario: An assessment reports without writing
    Given a repository that differs from the catalog in several artifacts
    When assess-alignment runs over the requested scope
    Then it reports one status per in-scope artifact
    And the repository working tree is unchanged
    And no branch, commit, or external state is created anywhere

  Scenario: Every in-scope artifact receives exactly one status
    Given a requested scope of four catalog artifacts
    When assess-alignment compares them by intent
    Then each is adopted-equivalent, locally-adapted-equivalent, local-extension, or not-applicable

  Scenario: A local form that preserves intent is equivalent, not a gap
    Given the repository achieves an artifact's purpose through a differently shaped rule
    When assess-alignment compares them by intent rather than by text
    Then the artifact is locally-adapted-equivalent

  Scenario: A contradiction is not absorbed into a success status
    Given a local rule that directly contradicts a catalog artifact
    When assess-alignment evaluates that artifact
    Then it is reported as a conflict
    And it is not reported as locally-adapted-equivalent

  Scenario: A missing behaviour the user wants is a gap
    Given the repository has no equivalent of a requested artifact
    And the user's request indicates they want that behaviour
    When assess-alignment evaluates it
    Then it is reported as a gap

  Scenario: An assessment does not fix what it finds
    Given assess-alignment identifies a single-line correction in the target repository
    When the assessment completes
    Then the correction appears in the report
    And no file in the target repository has been modified

  # ---------------------------------------------------------------- adopt-artifact

  Scenario: An unrequested adoption performs no mutation
    Given an agent working on an unrelated task notices a useful catalog artifact
    And the user has not asked to adopt anything
    When the agent decides what to do
    Then adopt-artifact performs no mutation
    And the agent may report the option and its trade-off and nothing more

  Scenario: An explicit request adopts only the named scope
    Given a user explicitly requests two named catalog artifacts
    When adopt-artifact applies them to the target repository
    Then only those artifacts and the local integration files they require are changed
    And unrelated improvements noticed during adoption are reported rather than applied

  Scenario: An omitted version resolves to the latest stable tag
    Given an adoption request that names no catalog version
    And the catalog has released v0.1.0, v0.2.0, and v0.3.0-rc.1
    When adopt-artifact resolves its source
    Then it selects v0.2.0
    And it ignores the prerelease
    And it records the resolved tag and full commit SHA before any file is edited

  Scenario: An unverifiable source stops the adoption
    Given an adoption request whose version cannot be resolved unambiguously
    When adopt-artifact attempts to resolve the source
    Then it stops before editing anything
    And it reports why resolution failed

  Scenario: Provenance is recorded in the adopting commit
    Given adopt-artifact has applied three named artifacts at a resolved stable tag
    When the adopting commit is created
    Then it carries three OSE-Rules-Source trailers
    And exactly one OSE-Rules-Version trailer
    And exactly one OSE-Rules-Commit trailer holding a full commit SHA

  Scenario: A stronger local requirement survives adoption
    Given the target repository's local rule is stricter than the artifact being adopted
    When adopt-artifact maps the artifact into local ownership
    Then the stricter local requirement is preserved
    And adoption does not loosen the repository

  Scenario: A contradiction stops rather than being resolved silently
    Given an artifact that contradicts an existing local rule
    When adopt-artifact reaches that artifact
    Then it refuses the contradiction and reports it
    And it neither overwrites the local rule nor weakens the artifact to fit

  # ---------------------------------------------------------------- after adoption

  Scenario: Adoption creates no ongoing obligation
    Given a repository adopted a catalog artifact at v0.2.0
    And the catalog has since released v0.3.0
    When either repository changes
    Then no automatic synchronization runs
    And no pin check, byte-identity check, or drift ledger runs
    And the adopting repository remains the owner of its copy

  Scenario: A later local edit needs no trailer
    Given a repository has adopted an artifact and recorded its provenance
    When a maintainer later edits that local copy for their own reasons
    Then the commit requires no OSE-Rules trailer
    And the earlier provenance record remains accurate about where the artifact came from
