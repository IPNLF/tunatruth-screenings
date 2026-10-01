/* ============================================================
   TUNATRUTH SCREENINGS — SITE CONFIG
   Single place to change the things most likely to change:
   the enquiry form endpoint, the award status wording, the
   brand hierarchy, and the canonical URL.

   PROTOTYPE (2026-09-30). Nothing on this page has been
   approved by IPNLF or the production. See README-screenings.md
   for the full approval / decisions checklist.
   ============================================================ */
const SCREENINGS_CONFIG = {

  // --- Naming ------------------------------------------------------
  filmName: "The Tuna Truth",

  // --- Canonical URL ------------------------------------------------
  // NOT YET DECIDED. The brief's preference is screenings.tunatruth.com,
  // but GitHub Pages binds ONE custom domain per Pages site and this
  // repo's CNAME is already donate.tunatruth.com — so a second
  // subdomain means a second repo (or moving host). See
  // README-screenings.md "Where this actually gets hosted".
  //
  // Everything in this folder uses RELATIVE paths only, deliberately,
  // so the same files work unchanged at a domain root OR in a
  // subfolder. This value is used only for Open Graph / share links —
  // it is the one place a self-referencing absolute URL appears.
  // Currently the GitHub Pages URL. Change this (and the two Open
  // Graph tags in index.html) when a custom subdomain is set up.
  canonicalUrl: "https://ipnlf.github.io/tunatruth-screenings/",

  // --- Brand hierarchy ----------------------------------------------
  // Same pattern as the donation page: flip this one value to change
  // which mark takes top billing, without touching layout markup.
  // TunaTruth leads here (per brief §17 — the user journey is about
  // the film; IPNLF provides institutional credibility).
  brandOrder: {
    primary: "tunatruth",
    secondary: "ipnlf",
  },

  // --- Enquiry form -------------------------------------------------
  // formEndpoint is the ONE value to change to make this form real.
  //
  // null  = prototype mode. The form renders fully (real fields, real
  //         validation, real error states) but is visibly marked as
  //         not connected and the submit button is disabled. It will
  //         NEVER show a fake "thanks, we'll be in touch" screen —
  //         a demo that looks like it works is how real enquiries get
  //         silently binned.
  // "https://formspree.io/f/xxxxxxx" (or Basin/Getform equivalent)
  //       = live. The form POSTs there; set fallbackEmail below too.
  //
  // BLOCKED ON IPNLF: which service, who owns the account, and which
  // mailbox receives it. See README-screenings.md.
  formEndpoint: null,

  // Plain email fallback, shown next to the form. Some institutional
  // users will not use a web form at all, on policy or habit — and
  // while formEndpoint is null this is the only thing on the page
  // that actually reaches anyone.
  // Confirmed by the user 2026-10-01: info@ipnlf.org, IPNLF's own
  // general address. A shared alias, not an individual's inbox, which
  // was the thing that mattered — but it is also the address everything
  // else comes to, so screening enquiries will land in general traffic.
  // Worth revisiting if volume justifies a dedicated alias.
  // NOTE: duplicated by hand in the <noscript> block in index.html.
  fallbackEmail: "info@ipnlf.org",

  // --- Award status -------------------------------------------------
  // The 2026 Jackson Wild Media Awards are close (brief §10), so this
  // is deliberately one config object rather than award wording spread
  // across the markup. To change finalist -> winner, edit `status`,
  // `headline` and `detail` here and nothing else.
  //
  // CONFIRMED FACT (carried over from the donation page, verified
  // 2026-09-08 against jacksonwild.org/2026-media-awards): The Tuna
  // Truth is a 2026 Jackson Wild Media Awards finalist in the
  // Onscreen Personality category, alongside productions featuring
  // Sir David Attenborough, Benedict Cumberbatch and Will Smith.
  //
  // Note: the donation page also uses an "Oscars of nature
  // filmmaking" framing. Per brief §10 that framing is NOT used here
  // unless IPNLF explicitly asks for it and can substantiate it.
  award: {
    status: "finalist", // "finalist" | "winner" — used for the badge word only
    headline: "Jackson Wild Media Awards finalist",
    detail: "The Tuna Truth has been named a finalist in the 2026 Jackson Wild Media Awards, one of the leading international awards programmes for nature and environmental storytelling.",
    // Kept as its own line so it can be dropped without touching the
    // sentence above it.
    category: "Serena Appleby is a finalist in the Onscreen Personality category, alongside productions featuring Sir David Attenborough, Benedict Cumberbatch and Will Smith.",
  },

  // --- Who can host -------------------------------------------------
  // Six categories per brief §4. Kept in config so the list can be
  // trimmed or reordered without touching markup. One sentence each,
  // deliberately.
  // HOLDING COPY — requires IPNLF approval.
  hostTypes: [
    {
      title: "Companies &amp; workplaces",
      body: "Run a screening for staff as part of a sustainability, wellbeing or lunch-and-learn programme.",
    },
    {
      title: "Schools &amp; universities",
      body: "Use the film as a starting point for discussion around food systems, sustainability and human rights.",
    },
    {
      title: "NGOs &amp; community groups",
      body: "Bring members and supporters together around ocean, food and human-rights themes.",
    },
    {
      title: "Seafood &amp; hospitality",
      body: "Open a conversation with buyers, chefs and teams about where the tuna on the menu comes from.",
    },
    {
      title: "Conferences &amp; events",
      body: "Add a screening or an extract to a programme on sustainability, seafood, supply chains or the ocean.",
    },
    {
      title: "Film &amp; environmental societies",
      body: "Show the film for an audience interested in high quality environmental storytelling.",
    },
  ],

  // --- Organisation types offered in the form ------------------------
  // Deliberately the same taxonomy as hostTypes above, plus "Other",
  // so the "who can host" section and the form's routing field agree.
  // This is the field IPNLF would report organisation-type reach from.
  orgTypes: [
    "Company or workplace",
    "School or college",
    "University",
    "NGO or charity",
    "Community group",
    "Seafood or hospitality business",
    "Conference or industry event",
    "Film or environmental society",
    "Other",
  ],

  // Bands, not a free-text number: hosts rarely know a figure at
  // enquiry stage, and a band is all that is needed to qualify.
  audienceBands: [
    "Under 25",
    "25 – 75",
    "75 – 200",
    "200+",
    "Not sure yet",
  ],

  // Reduced from the brief's four options (§7) to the distinction that
  // actually drives the licensing answer: is this open to the public
  // or not. The four-option version largely duplicated organisation
  // type — a school's screening is "educational" by definition.
  screeningKinds: [
    "Private — internal to our organisation",
    "Open to the public",
    "Not sure yet",
  ],
};
