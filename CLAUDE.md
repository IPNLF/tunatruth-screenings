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
- A standalone line wrapping with two or three words orphaned on a second line — give it room or tighten the copy, never `white-space: nowrap`
- Parallel lists or columns of visibly unequal length; check the rendered heights, do not assume
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

---

# Progress log

Append-only. Newest block at the top. Each entry records what changed,
what is verified, and what the next session must not assume.

## 13 October 2026 — NGO partner page `/ngo/`

Live at `https://screenings.tunatruth.com/ngo/`, noindexed, not linked
from any navigation. Twelve commits, `13e465e` to `f856bd5`. All
deployed and verified against the live site, not just locally.

### What changed

- **Contributors confirmed.** Professor Callum Roberts (University of
  Exeter) and Ian Urbina. IPNLF supplied "The Ocean Outlaw Project";
  the correct name is **The Outlaw Ocean Project**, the non-profit
  Urbina founded in 2019. The page uses the correct form. Initials in
  the placeholder tiles now skip honorifics, or Roberts would have
  shown as "PC".
- **Two headshots added, three still missing.** Roberts and Urbina have
  Wikimedia Commons portraits under CC BY-SA, cropped to 256px square
  in `assets/img/contributors/`. **The visible credit line IS the
  licence.** Remove it to tidy the layout and the page is using
  someone's photograph without permission. Jess Rattle, Emilia Dyer and
  Sara Pipernos have no freely licensed photograph anywhere; their
  pictures on their employers' sites belong to those employers, and
  this is a page we send to those employers. Do not lift them.
- **The free-screening offer section was removed** at IPNLF's request,
  from markup, copy and stylesheet together. It promised a waived
  licence nobody had agreed to give. Recoverable from `aadae9e^`. Do
  not reinstate it from memory.
- **"What the film sets out to do"** is now one paragraph, not three
  columns. **"Human rights"**, **"Appear live together"** and **"Share
  the messaging"** reworded by IPNLF.
- **Its own Beacon form**, `d330ed74` ("Expression of interest"): name,
  email, organisation, consent, no free-text. The main page and `/pt/`
  stay on `cc02962e`, which carries the required "when, who for, where"
  field the host workflow needs. The enquiry lede was rewritten to stop
  promising a free-text box this form does not have.
- **Presenter photo scaled down** from 520px to a 360px ceiling, so
  Serena reads as the lead entry above the contributor list rather than
  her own section.
- **`.ngo-page` body class added.** `--soft` and `--form` both resolve
  to cream in `tokens.css`, so the last two sections merged into one
  block. The override is scoped to this page; the main page and `/pt/`
  are untouched and have no body class.

### Verified on the live page

Heading order H1 → H2 → H3 with no skips. All nine images load with alt
text. All external links carry `rel="noopener"`. No horizontal overflow
at 375px. All text passes WCAG AA. `noindex, nofollow` present.

### Open, and needing a decision rather than code

1. Headshots for Rattle, Dyer and Pipernos. Dyer is in-house and
   Pipernos is reachable through Sunline.
2. **The contributor hedge was removed at IPNLF's request.** The note
   saying roles were "not yet checked against the final cut" is gone,
   so the page now presents all five names and roles as settled fact.
3. The hero CTA reads "Collaborate" but jumps to a section headed
   "Start a conversation".
4. **The Beacon iframe has no `title` attribute** (WCAG 2.4.1, 4.1.2).
   Beacon generates the iframe, so fixing it means changing the shared
   component and affecting the live main page and `/pt/`. Not done.
5. **The live main page's `og:url` still points at
   `https://ipnlf.github.io/tunatruth-screenings/`.** `/pt/` and
   `/ngo/` are correct. One-line fix, but on the public page, so it
   needs the client's go-ahead.
6. Running time "one hour" is confirmed here but still `[CONFIRM]` in
   the main screening pack and the student pack. Those disagree.
7. Copy approval, licence policy, and an end-to-end enquiry test all
   remain outstanding. The noindex guard stays until they are done.

### Traps that cost time in this session

- **Bump the `?v=` cache key on every CSS or JS change.** Browsers
  serve stale files otherwise, and a verification run will report the
  old values as if they were live. This happened again at `f856bd5`.
- **Never `git add -A` in this repo.** More than one session works here
  at once. An earlier `-A` swept another session's in-progress work
  into a commit and pushed it. Stage named paths only.
- The Beacon admin URL's numeric id (`.../form/100572`) is internal and
  404s on `beaconforms.com`. Only the hash from the share link works.

---

# Where the project stands (handover, 13 October 2026)

Everything above is the working agreement and still applies. This section is
state: what exists, what will bite you, and what is unresolved.

## Live

- **English:** https://screenings.tunatruth.com
- **Portuguese (pt-PT):** https://screenings.tunatruth.com/pt/
- **NGO partner page:** `/ngo/` — deliberately not linked from the main nav.
- **Free-offer variant:** `/screening-offer/` — a mockup, see the warning below.
- Repo `IPNLF/tunatruth-screenings`, branch `master`. Push and GitHub Pages
  redeploys every variant together, usually within 60-120 seconds.
- `/pt/` is a **folder, not a subdomain**. One Pages site, one certificate.
- DNS: a CNAME record `screenings` to `ipnlf.github.io`, created in Wix, which
  runs the DNS for tunatruth.com on `ns6/ns7.wixdns.net`. Certificate issued,
  Enforce HTTPS on. The old `ipnlf.github.io/tunatruth-screenings/` address
  301s to the custom domain.
- If a certificate ever stalls again: clearing the custom domain in Pages
  settings and immediately re-entering it re-triggers provisioning. That fixed
  a two-hour stall here, and the certificate arrived within 30 seconds.

## Four page variants, built in different sessions

`/` and `/pt/` share `components.js` and differ only by config. **`/ngo/` does
not**: it has its own `components.ngo.js` and `config.ngo.js`, so a change to
the shared components will not reach it, and vice versa. Check which file you
are editing.

`/screening-offer/` is **generated** from `config.js` by `tools/make_offer.py`.
Do not hand-edit `config.offer.js`; re-run the script, or the variant silently
drifts from the main page.

**Read the header comment in `config.offer.js` before touching that page.** It
states that every instance of "free" on it is an unconfirmed commercial claim,
that IPNLF has set no licensing policy, and that it must not be published until
someone can stand behind that. A free-screening offer was removed from the NGO
page for the same reason and is recoverable from git history only. **Do not
reinstate a free offer from memory anywhere.**

The NGO page and the offer variant were built in sessions other than the one
that wrote this handover. Their own file headers are the authority on their
status, not this section.

## Architecture, and the traps in it

**`components.js` contains no user-facing text.** Every string is read from the
config, so a translation is a data file and never a second copy of the
component code. `config.js` is English, `config.pt.js` is Portuguese.
Adding copy means adding it to `copy` in BOTH configs.

**`cfg.assetBase`** is `""` for the root page and `"../"` for `/pt/`. Any new
asset URL must go through the `asset()` helper, including paths that come from
the config. The trailer poster was missed exactly this way and 404'd on `/pt/`
while working at the root.

**Do not shadow `t`.** It is the copy object at module scope. `trailer()`
originally declared a local `const t = cfg.trailer`, which silently emptied an
aria-label in both languages.

**Cache keys are manual.** `index.html`, `pt/index.html` and the poster
reference in `components.js` carry a `?v=` string. Bump it on every change to
CSS, JS or the poster image, or browsers serve the old file and the page will
look unchanged after a correct edit. This has wasted time more than once.

**The hero line has a 420px cap tuned to both languages at once.** English and
Portuguese must land on the same number of lines or the two heroes differ in
height. The window is narrow: at 400px the English fell to four lines while the
Portuguese held three. **Re-measure both languages whenever either string
changes**; the stylesheet says so at the rule.

## The screening pack (NOT in version control)

`C:\Users\jtwar\Downloads\Screening Pack (DRAFT)\Screening Pack (DRAFT)\`

- **The SVGs are the source of truth.** Every PNG, the A3 PDF, the three
  PowerPoint backgrounds, the Word host-pack image and the website's sample
  poster are generated from them.
- `scratchpad/rebuild_pack.py` regenerates the whole set. Run it after ANY
  SVG edit, then copy the filled sample poster into `assets/img/` and bump the
  cache key.
- Applied so far: the Tuna Truth palette, IPNLF logo left and the film wordmark
  right, commas in the A3 strapline, event-panel padding, and a panel narrowed
  to the poster's own text column.
- Two pre-existing bugs were fixed where the SVGs had drifted from the
  delivered rasters: invisible host text on the A3, and colliding event text on
  the square and landscape.
- **This folder exists on one laptop with no version control.** Originals are in
  `_originals-before-claude-edits-20261007`. Worth moving somewhere shared.

## Student pack (Google Drive)

Folder "Screening Pack - Students". Five Google Docs, created natively, all
open correctly. Two `.docx` files in the same folder **do not open in Google
Docs** and should be treated as broken.

Cause, as far as it was narrowed: those two were assembled by hand as raw
OOXML packages rather than written by a Word library. Word and LibreOffice open
them; Google's importer rejects them. LibreOffice-resaved copies exist in
`TunaTruth-student-screening-pack-v1\resaved\` and were delivered to the
client to test, but **that test has not been reported back**.

Separately: pushing binaries through the Drive connector requires transcribing
~27,000 characters of base64, and at least one attempt arrived corrupt. Do not
rely on it for files of that size. Create Google Docs natively, or hand the
file to the client to upload.

## Open items

**Go-live, deliberately still blocking:**

- `noindex` meta and `robots.txt` `Disallow: /` are both in place while copy is
  unapproved. Removing them is one commit, with the canonical URL in
  `config.js` and the two Open Graph URLs in each `index.html`, which still
  point at the old `ipnlf.github.io` address.
- `robots.txt` carries a comment saying the enquiry form is not connected and
  the contact address is a placeholder. **Both are now untrue** and it should
  be corrected whether or not the guards come off.

**Decisions waiting on IPNLF:**

- The Beacon form is **English only on the Portuguese page**. Its fields and
  labels live in Beacon, so a translated form means a second form there, with
  whatever that costs under the field limits already raised. A pt-PT
  translation of the labels has been supplied in chat but not applied.
- The form collects name, email and organisation but **no date, venue or
  audience size**, so every enquiry starts as a manual email exchange. Fine at
  five a month, not at fifty, which matters if student outreach goes ahead.
- Host pack materials are not approved for public release, so **no download
  links**.
- The **enquiry journey has never been tested end to end**. A form rendering is
  not proof of delivery.

**Design points raised and left with the client:**

- The Jackson Wild award is now stated twice within a screen: in the hero line
  and again with its logo in The Film.
- The logo artwork uses an orange and a teal that are not in the supplied
  six-colour palette. On the new deep blue it reads as two near-but-unequal
  warms. Cannot be fixed from CSS; needs the original logo artwork.
- The landscape and square assets still use coral for the date line, which now
  sits under an orange wordmark. One edit to resolve if wanted.
- Hero copy is still marked HOLDING COPY pending IPNLF/production approval.

**Wix, not done:** the plan was to rename the "Watch the Doc" nav item to
"Host a Screening" and point it at the new subdomain, keeping the existing page
hidden rather than deleted. Steps were supplied; nothing has been changed yet.
Note that linking it from the main nav publishes unapproved copy to the public.
