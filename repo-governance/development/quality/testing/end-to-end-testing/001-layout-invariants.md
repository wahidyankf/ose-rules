---
description: >-
  Requires layout invariants (touch-target size, horizontal overflow, and scroll-area budget on short viewports) to be
  asserted by deterministic geometry tests at fixed viewports, with the worst-case content as the tested state.
when_to_use: >-
  Use when a change alters the layout of a rendered interface, adds a control or a stacked list of messages, or changes
  how a view fits a phone, a soft keyboard, or landscape orientation.
---

# Layout Invariants

Some layout properties must hold at every supported viewport, and a person looking at a screen misses them too often to
serve as the check. This module extends [End-to-End Testing](../end-to-end-testing.md) with three invariants:

- **touch-target size:** every interactive control meets the minimum in
  [Forms and Targets](../../user-interfaces/accessibility/002-forms-and-targets.md), including on coarse pointers such
  as touch screens;
- **horizontal overflow:** no element widens the page beyond its viewport; and
- **scroll-area budget:** on a short viewport, such as one shortened by a soft keyboard or a landscape phone, the
  scrolling area fits the height budget its view declares, so its persistent controls stay visible.

## Assert Them With Geometry Tests

Each invariant is asserted by a deterministic geometry test. The test measures rendered boxes at fixed viewports,
through helpers shared by every surface, and fails when any box breaks the invariant. The fixed viewports include a
short portrait viewport, sized for a soft keyboard, and a landscape viewport.

A manual inspection alone is never accepted for these invariants. It may add evidence, but a passing look does not
replace a measurement.

## Test the Worst Case

The tested state is the worst content the surface can hold: for example, the maximum number of attachments together with
stacked messages. A layout that fits one short message can overflow, or push its controls out of reach, once messages
stack. A test over a typical example proves less than it appears to.
