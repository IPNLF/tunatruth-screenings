# Working agreement for this project

## The central rule

**A requested change is not complete merely because it has been implemented. It is complete when the resulting page has been reviewed as a coherent, usable whole.**

For material visual changes: review the rendered desktop and mobile page, including adjacent sections, and correct regressions before publishing. If visual inspection is unavailable, say explicitly what remains unverified and do not claim the design has been validated.

## Why this is written down

Across roughly fifteen separate edit requests in October 2026, this page degraded from a coherent design into clutter, competing priorities and awkward spacing. Every individual edit was applied correctly and verified — by DOM assertion: does the element exist, is the class right, is there overflow, what is the pixel offset. The rendered page was almost never looked at as a composition.

The result was shipping a trailer poster that was the film's own title card, with a play button and a label sitting on top of its lettering. That was found by the client, not by the checks. Measurable correctness had been substituted for perceptual quality. They are different claims.

## Review procedure for material visual changes

1. **Baseline first.** Look at the current rendered page (desktop and mobile) and name what is working, before changing it.
2. **Batch related edits**, then inspect once as a whole — rather than apply, verify and publish one request at a time, which makes closing tickets the unit of progress and leaves the reviewed state permanently one edit behind.
3. **Inspect the whole page afterwards**, including sections not touched but adjacent to or affected by the change.
4. **Run the regression checklist** below.
5. **Fix regressions before reporting completion.** They are defects, not follow-ups.

### Regression checklist

- Empty or orphaned space left where something was removed
- Two elements doing the same job, or saying the same thing twice
- Anything competing with the single primary action
- Components that imply interaction but have none (pills that are not clickable, cards that are not links)
- Images cropped to fit a column rather than to show their subject
- Heading-level inflation, or a new heading where existing copy would do
- Whether a layout device still scales at the new content volume
- Text that is clipped, overflowing, or set beyond a comfortable reading measure
- Whether the page still answers the visitor's questions in order

## Design judgment

The client's feedback is **input to a design process**. It does not transfer responsibility for composition, hierarchy, spacing, imagery, brand consistency or the visitor's journey.

- **Challenge a change that carries a meaningful usability or design trade-off**: say why, recommend a better route to the same underlying objective, then follow the explicit requirement if it stands.
- **Do not seek approval for routine adjustments.** Carry authorised work through coherently and exercise judgment on the detail.
- **Do not give each new content item its own section, card, heading or component.** Ask first whether it belongs inside an existing one.
- **Recompose a weakening layout** instead of accumulating patches.
- When a design concern and an explicit instruction genuinely conflict and cannot be reconciled, put the trade-off in front of the client rather than silently choosing compliance.

## Principles are adaptable; the original is a baseline, not a rulebook

The first design's component counts, colours and section treatments are a **reference point, not a constraint**. What matters is what made it work, and those qualities can be achieved other ways:

- One unmistakable primary action, with its colour reserved for it alone
- Section differentiation achieved economically, rather than by decorating every block
- A restrained component vocabulary — lists, steps and running text before cards and badges
- Text held to a real reading measure
- Display type used selectively, so it still signals importance
- Copy scoped to what IPNLF can actually service

If a different structure serves the visitor better, use it. Do not preserve a count of sections or a specific treatment for its own sake.

## Separate defect sources

Fix each at its actual source, and say which is which:

- **Website implementation** — this repo
- **Configuration** — the Beacon form's fields, labels, consent options and styling are set in Beacon. Do not patch page CSS to compensate for something controlled there.
- **External dependencies** — YouTube hosting, pack materials, approvals
- **Platform limitations** — GitHub Pages, the Beacon iframe, artifact sandboxing

## Project-specific standing notes

- **The page is noindexed** (`robots` meta + `robots.txt`) while copy is unapproved. Removing both is a go-live step.
- **A form rendering is not proof of delivery.** The enquiry journey is not complete until receipt, CRM mapping and the enquirer's confirmation have been verified by an authorised test.
- **Do not add download links** for the host pack until those materials are approved for public release.
- Check 320, 390, 768 and 1440 for overflow, readable text, intentional crops, working anchors, keyboard focus and trailer behaviour.
