# Host a screening — prototype

A prototype landing page inviting organisations and communities to host a screening of *The Tuna Truth*.

**Status: prototype. Not production-ready.** Several operational questions are unresolved (see the bottom of this file), and the enquiry form is not connected to anything. Per the working standard on the donation page, nothing is marked production-ready while those remain open.

Originally built on branch `prototype/host-a-screening` in `IPNLF/tunatruth-support`, cut from `master` — deliberately **not** from `prototype/progress-bar-and-rewards`, so none of the unconfirmed fundraising/reward content came along. Since 2026-10-01 this repo is the home; that branch is only a record of where it started.

---

## How to run it

From the repo root:

```bash
python -m http.server 8843
```

Then open <http://localhost:8843/>.

## Structure

```
index.html                  page shell, section order, no-JS fallback
robots.txt                  prototype guard, see below
assets/css/tokens.css       design tokens, derived from the donation page
assets/css/screenings.css   this page's components
assets/js/config.js         everything likely to change lives here
assets/js/components.js     HTML-string components + form behaviour
assets/img/                 copies of the shared brand assets
```

Same no-framework, no-build-step pattern as the donation page, so anyone who can maintain that can maintain this.

**All paths inside the folder are relative**, on purpose. The same files work unchanged at a domain root *or* in a subfolder, so the hosting decision below is a copy operation rather than a rewrite. The only self-referencing absolute URLs are the Open Graph tags in `index.html` and `canonicalUrl` in `config.js`.

### The folder is a standalone copy, and that has a cost

`tokens.css` and the brand images are **duplicated** from the donation site rather than shared. This is a deliberate trade-off: the intended production home is a separate subdomain, which on GitHub Pages means a separate repo, and there is no build step to share a file between two Pages sites without inventing one.

The cost is real and recurring: **a brand change now has to be made twice, by hand, forever.** If the hosting decision lands on "a path under the existing domain" instead, collapse these back to the shared `/assets/` files and delete the copies.

## Things designed to change without a redesign

| What | Where | Notes |
|---|---|---|
| Award wording, finalist → winner | `config.js` → `award` | One object. Nothing about the award is hard-coded in the markup or CSS (brief §10). |
| Brand hierarchy, TunaTruth ⇄ IPNLF | `config.js` → `brandOrder` | Same pattern as the donation page. TunaTruth leads here. |
| Form endpoint | `config.js` → `formEndpoint` | See below. |
| Who-can-host categories | `config.js` → `hostTypes` | |
| Form dropdown options | `config.js` → `orgTypes`, `audienceBands`, `screeningKinds` | |
| Contact address | `config.js` → `fallbackEmail` | ⚠️ Also duplicated by hand in the `<noscript>` block in `index.html`. |

---

## The form is Beacon's, and that has consequences

Enquiries go straight into IPNLF's Beacon CRM as records, deduplicated against people already there. No rekeying, no second dashboard to check. For a small team that is the right trade, and it is why this route was chosen over a form service.

`config.js` -> `beacon` holds the account (`ipnlf`), the form id (`f5c48138`) and the SDK URL. Nothing else in this repo touches the form.

**Beacon owns the form completely.** It renders as a cross-origin iframe from `ipnlf.beaconforms.com`, so the page cannot style it, validate it, or change a single field. Font, colours and logo are configured on the Beacon side. The hand-built form that used to live here (nine fields, inline validation, honeypot) was deleted along with its CSS; it is in git history if this is ever revisited.

The Beacon REST API would have let us keep our own markup, but it needs a secret key, and a key in client-side code is a public key. That needs a server, and this site has none.

### Ordering matters, and it is easy to break

This page builds `<main>` with `innerHTML` at runtime, so the `.beacon-form` container does not exist when the document first parses. The SDK is therefore injected by `TTS.loadBeacon()` **after** the sections render, not from a `<script>` tag in the markup. Move it into the markup and the SDK can scan for `.beacon-form` before the container exists, and the form silently never appears.

### What the form currently asks, and what that costs

Because Beacon questions must map to existing CRM fields and new fields carry a cost, the form is much smaller than the one designed for this page. As built on 2026-10-01 it asks:

First name, last name, email, organisation (all required); a contact-consent block; and **one required free-text box** labelled "Approximate audience size? Preferred date or timeframe? Interested in a speaker, if available?"

Three consequences worth deciding on rather than absorbing:

1. **Three questions in one box will produce poor answers.** People answer one of the three, or write a sentence covering none of them cleanly. **This costs nothing to improve:** reword that single existing field's label into one plain prompt rather than three stacked questions. No new fields, no new cost.
2. **Nobody is asked whether the screening is private or open to the public.** That was the field that drives the permissions and licensing answer, and it is the one question tied to the still-unresolved question of who controls public-performance rights. It now has to be established by email on every single enquiry.
3. **Country and organisation type are not collected.** Brief §18 wanted reach reported by country and organisation type. That is now impossible from the form, and no amount of analytics replaces it.

### Privacy

The Beacon SDK is a third-party script that loads with the page, so a request reaches Beacon before any consent. Beacon's own guidance is to treat their form as a "necessary" cookie, since gating it behind consent stops the form loading at all. That is a deliberate decision, and it is a **different stance from the trailer**, which stays behind a click specifically so that nothing third-party loads unasked. Someone at IPNLF should confirm they are comfortable with the difference.

The consent block inside the form is marketing consent — "news and information about IPNLF and ways to support us". Worth noting that this page was deliberately kept free of fundraising asks (the donate link sits quietly in the footer), and this puts one in front of every host at the point of enquiry.

## Where this actually gets hosted

The brief prefers `screenings.tunatruth.com`. That is not a config change:

- GitHub Pages binds **one custom domain per Pages site**, and this repo's `CNAME` is already `donate.tunatruth.com`.

| Option | Trade-off |
|---|---|
| **A. Second repo** + `CNAME` = `screenings.tunatruth.com` + one DNS record | Clean separation, right URL, £0. Shared CSS/assets duplicated and will drift. |
| **B. A path on the existing domain** (`donate.tunatruth.com/screenings/`) | Ships today, no DNS, assets shared for free. The URL says "donate" on a page that is not asking for money — a real problem when writing to schools and film societies. |
| **C. Move to Netlify / Cloudflare Pages** | Multiple domains per site, and would restore Netlify Forms. Undoes a migration made deliberately; re-introduces a vendor. |
| **D. A subfolder of a wider tunatruth.com site**, if one exists | Best long-term URL; depends on infrastructure outside this repo. |

**Decided 2026-10-01: Option A.** This folder now lives in its own repo, `IPNLF/tunatruth-screenings`, with its contents at the repo root. It is served by GitHub Pages from `master` at <https://ipnlf.github.io/tunatruth-screenings/>.

`screenings.tunatruth.com` is **not** set up yet, deliberately: pointing Pages at a custom domain before the DNS record exists leaves the site unreachable and the Pages build reporting a domain error. To finish the job later:

1. Add a DNS `CNAME` record for `screenings` → `ipnlf.github.io` in the Wix account that manages `tunatruth.com` (the same place `donate` was set up).
2. Set the custom domain in the new repo's Pages settings, which writes a `CNAME` file, and enable Enforce HTTPS once the certificate is issued.
3. Update `canonicalUrl` in `config.js` and the two Open Graph tags in `index.html`.

### The site is public but hidden from search

GitHub Pages on a free plan requires a public repo, so this prototype is readable by anyone with the link. Because the copy is unapproved, the contact address is a placeholder and the form is not connected, two guards keep it out of search results:

- `<meta name="robots" content="noindex, nofollow">` in `index.html`
- `robots.txt` at the repo root, disallowing everything

**Removing both is a go-live step.** Neither prevents someone opening a link that is sent to them — they only stop the page being found by search.

---

## Measurement

The brief (§18) asks to track page visits, CTA clicks, completed enquiries, organisation type, country and audience size. What is actually achievable:

- **Page visits** — the Cloudflare beacon, already in place (same token as the donation site, so both appear in one dashboard).
- **Enquiries, organisation type, country, audience size** — these come **free from the form service's own dashboard** once an endpoint exists. Building custom analytics to count something the form already counts would be duplicated maintenance.
- **CTA clicks** — **not achievable as things stand.** Cloudflare Web Analytics' free beacon supports page views and referrers only; its own FAQ states custom events are not supported. Cloudflare Zaraz does support custom events but requires the domain to be proxied through Cloudflare and still needs a destination tool, which is more moving parts than the metric is worth. Plausible or Fathom (~£7–9/month) would give it in three lines, if IPNLF wants better analytics across the whole estate.

**Nothing fake is instrumented to paper over this gap.** With page views and completed enquiries you get a conversion rate, which is more useful than a raw click count on a page with one primary action.

---

## Deliberate deviations from the brief

Flagged rather than done silently, per the working standard in §21.

**1. "About the film" sits directly under the hero.** The brief's §15 order puts it at 7, after the form. At review on 2026-10-01 it was moved to position 2, which is where it does the most work: a decision-maker who has never heard of *The Tuna Truth* cannot commit to putting it in front of 200 colleagues on the strength of hosting logistics alone, so the film has to establish itself before the page asks anything. Its copy is now the donation page's "Behind the film" text, supplied at the same review. The hero CTA anchors straight to `#request`, so anyone already sold skips the lot, and the header carries a persistent "Request a screening" link. Serena stays low, as narrative depth for the undecided.

Section order is the array in `index.html` and nothing else depends on it. One knock-on: "Who can host" moved to the soft-foam surface, because it now follows a white section and the alternating surfaces are what separate sections on this page.

**2. "We'll help you get started" and "More than a screening" were merged into one section — and the second half has since been cut.** The brief lists them separately (§5 and §12), but both answer the same question — *what do I actually get, and how much work is this for me?* Split across two sections each had to be padded, so the reader met the same reassurance twice. They became one section with a checklist and a sidebar.

At review on 2026-10-01 that sidebar was removed, to be replaced by an image from the starter pack. **This means nothing on the page now covers brief §12**: the "a screening is a starting point, not an evening on its own" framing and the four optional event formats (screening only / plus facilitated discussion / plus a local panel / plus a team or classroom session) appear nowhere. That may well be the right call for the page's length, but it should be a deliberate decision rather than a side effect — the copy is preserved in the git history of `assets/js/components.js` if it needs to come back.

**3. The form is 9 fields, not 11.**
- **"Proposed screening location" cut.** Country plus organisation is enough to reply usefully at first contact; the venue is a second-email question and it made the form look longer than it is.
- **"Is the screening" reduced from four options to two.** Internal/educational/public/conference largely duplicated organisation type — a school's screening is educational by definition. What it uniquely carried was *private vs open to the public*, which is the distinction that actually drives the permissions answer, so that is what it now asks.
- **Audience size is a band, not a number.** Hosts rarely know a figure at enquiry stage, and a band is all that is needed to qualify.
- **Preferred date is free text, not a date picker.** "Some time in the spring term" is a valid and useful answer; a picker forces a false precision that then has to be unpicked over email.

**4. The hero was trimmed at review (2026-10-01).** The eyebrow row (TunaTruth wordmark plus a "Screenings" label) and the "Companies, schools, universities… are all welcome to ask" line below the buttons were both removed, to free vertical space. The wordmark duplicated the one in the header directly above it, and "Who can host" answers the audience question in more useful detail immediately below. The hero is now 439px tall at 375px wide, so both buttons sit well clear of the fold.

**5. Only one card grid on the page.** "Why host" is cards; "Who can host" is a plain list, "We'll help you" is a checklist, "How it works" is numbered steps. Three consecutive card grids reads as an information dump regardless of word count (brief §16). Section differentiation is done with alternating surfaces — white / cinematic dark / soft foam — not with per-section decoration.

**6. No "coming soon" download tiles for the screening pack.** The materials do not exist yet, and a page with four greyed-out placeholders looks abandoned on day one. The pack is described in prose. Adding a downloads block later is additive.

**7. The "Oscars of nature filmmaking" framing is not used here**, per brief §10, even though the donation page uses it.

---

## Content requiring approval

Everything below is marked `<!-- HOLDING COPY -->` in the source.

- Hero heading and support line.
- "Who can host" — all six category descriptions (`config.js` → `hostTypes`).
- "Why host" — all four benefit points.
- **"We'll help you get started" — the five-item screening-pack list. This is the most important one: it describes materials that do not exist yet. Do not publish this section until they do, or until the list is cut back to what does.**
- "More than a screening", including the four optional event formats.
- The four "How it works" steps.
- "About The Tuna Truth" synopsis paragraph.
- "Serena's journey", both paragraphs.
- The permissions note under "How it works".
- Privacy sentence under the submit button.

**Confirmed and carried over unchanged from the donation page** (not holding copy): the production credit block, and the Jackson Wild finalist facts (verified 2026-09-08 against jacksonwild.org/2026-media-awards).

## Assets still needed

- ~~A Serena portrait or a strong still of her.~~ **Supplied 2026-10-01.** Resized from a 3024px / 7.5MB PNG to 1200px / 93KB JPEG; the original was far too heavy to serve. The box is 16:9 rather than the old 4:3, which would have cropped the sides off a wide two-shot. **Its alt text still needs confirming** — it describes the scene without naming anyone, because who appears in the frame has not been confirmed. A credit line may also be needed.
- **A hero still chosen for this page.** It currently reuses the donation page's `hero-photo.jpg`. Fine for a prototype, but the two pages will look like the same page if they sit side by side.
- **An image for the "We'll help you get started" section.** Still outstanding. The right-hand column is held open and blank; see the `IMAGE SLOT — AWAITING ASSET` comment in `whatWeProvide()` and the `.tts-provide__aside--empty` rule in the CSS, and follow the `<figure>` pattern in `serena()` when one arrives.
- **A dedicated Open Graph image** for share previews (currently reuses the donation page's).
- **The screening pack itself** — host guide, checklist, discussion guide, promo assets, social tiles, invitation copy.
- ~~Confirmation of whether the film has a trailer.~~ **Added 2026-10-01**, unlisted on YouTube (`5piItxcGaAY`), embedded in "About the film" as a click-to-play facade. **It is currently on a personal channel (@naturevideos96, "James Wareing"), not an IPNLF or Tuna Truth channel.** That is a continuity risk and it shows the uploader's name in the player, so it should be re-uploaded to an organisation-owned channel before launch — at which point only `trailer.youtubeId` in `config.js` changes.
- **A dedicated poster frame for the trailer.** It currently reuses `og-image.jpg`.

## Operational decisions still needed

Not blocking the prototype. All of these need answers before launch, and none should be guessed.

**Rights and access**
1. Who controls public-performance/screening rights for the film? If IPNLF does not, this page is soliciting requests it may not be able to fulfil.
   **Changed at review (2026-10-01):** the standalone "A note on permissions" block was cut from "How it works". Step 2, "We'll advise on screening access and permissions for your type of event", is now the only place on the page that says permissions depend on the event. Brief §14 is explicit that the page must not imply anyone may simply show the film, so that step's wording should not be changed without putting the point back somewhere.
2. Is screening access free, paid or discretionary? *This is the first question a decision-maker asks, and the page currently does not answer it — expect it to generate email until it does.*
3. Are virtual screenings permitted?
4. Can hosts charge ticket fees? Can screenings be used for fundraising?
5. Are schools treated differently from commercial organisations?
6. Is there a minimum or maximum audience size?

**Service and capacity**
7. Who responds to screening requests, and what response time can IPNLF realistically promise? *The page deliberately states none right now. A line in "How it works" would prevent a lot of mismatched expectations.*
8. Can IPNLF or the filmmakers offer speakers, and under what circumstances? The page is scoped to "depending on availability, we may also be able to help" and the form asks only about *interest* — but if the honest answer is "we cannot", **delete the speaker checkbox rather than reword it.** An unanswerable question is worse than an absent one.
9. Which starter-kit materials already exist, if any?
10. What feedback and data should hosts submit afterwards? Step 4 currently asks for "rough attendance, photos or feedback" with no mechanism behind it.

**Systems**
11. Which email/CRM system should enquiries feed into? Does IPNLF run Google Workspace or Microsoft 365? This changes the form recommendation.
12. Which subdomain, and therefore which hosting option above.

### Known risks worth stating plainly

- **The enquiry inbox is this project's failure point.** Structured enquiries are worthless if nobody triages them. Expect a burst at launch, then a long tail that is easy to miss. If nobody will own it, the right move is to cut the form back to name/email/message and treat it as a contact form.
- **"Preferred date" implies a booking process that does not exist.** There is no calendar and no availability checking. It is worded as context ("some time in the spring term"), not a booking request — keep it that way unless a manual workflow is documented behind it.
- **Free-tier submission caps fail silently.** Budget for a paid tier, or use the unlimited Google/Microsoft route.

---

## Verified during the build

- No horizontal overflow at 320px, 375px or 390px.
- Primary CTA clears the usable fold at 375×667 and 390×844. At **320×568** the button starts at ~450px and is clipped by roughly a line — the smallest legacy phone size, and the header's persistent "Request a screening" link is above the fold at every size. Worth knowing before adding anything to the hero; re-measure if you do.
- Form: required-field errors on all 7 required fields, focus moves to the first invalid field, per-field messages tied to inputs via `aria-describedby`, email format rejected and accepted correctly, and a fully valid submission is blocked with an honest message rather than a fake success.
- `<header>` and `<footer>` are top-level siblings of `<main>`, so their landmark roles survive.
- Invalid fields are marked with a border colour *and* a text message, never colour alone.
- Honeypot field is off-screen, `aria-hidden`, and not focusable.
- `prefers-reduced-motion` is respected.
- No JavaScript errors. (Locally the Cloudflare beacon logs a CORS error — that is localhost-only and does not occur on a real domain.)

**Not verified:** real assistive-technology testing, cross-browser testing beyond Chromium, and anything about the form once it is connected.
