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

  // --- Enquiry form (Beacon CRM) ------------------------------------
  // Enquiries go straight into IPNLF's Beacon CRM as records, rather
  // than to an inbox or a form-service dashboard. That is the whole
  // point of this route: no rekeying, and submissions deduplicate
  // against people already in the CRM.
  //
  // CONSEQUENCE, accepted knowingly: Beacon owns the form. The fields,
  // their validation, and the form's appearance are all configured in
  // Beacon, not here. Nothing in this repo controls them. Font, colours
  // and logo are set on the Beacon side to match this page.
  //
  // There is also a Beacon REST API, which would have let us keep our
  // own markup — but it needs a secret key, and a key in client-side
  // code is a public key. That needs a server; this site has none.
  //
  // PRIVACY: the SDK is a third-party script that loads with the page,
  // so a request reaches Beacon before any consent. Beacon's own
  // guidance is to treat their form as a "necessary" cookie, since
  // gating it behind consent stops the form loading at all. That is a
  // deliberate decision, not an oversight — see README "Privacy".
  // Note it is a different stance from the trailer, which stays behind
  // a click precisely to avoid this.
  beacon: {
    account: "ipnlf",
    formId: "f5c48138",
    sdkUrl: "https://static.beaconproducts.co.uk/js-sdk/production/beaconcrm.min.js",
  },

  // Plain email route, shown under the form. Some institutional users
  // will not use a web form at all, on policy or habit, and it is the
  // fallback if the SDK is blocked by an ad or privacy extension —
  // which Beacon's own guidance warns does happen.
  fallbackEmail: "info@ipnlf.org",

  // --- Trailer ------------------------------------------------------
  // Hosted on YouTube (unlisted), NOT in this repo. The master export is
  // 1.3GB: GitHub rejects any file over 100MB, Pages caps a site at ~1GB,
  // and its terms exclude video hosting — so self-hosting was never an
  // option. YouTube also transcodes and serves adaptive quality, which a
  // static file cannot.
  //
  // The page loads a click-to-play facade (a still plus a play button)
  // and only creates the iframe once someone clicks. That keeps the page
  // fast AND keeps third-party cookies off it until the viewer opts in,
  // which is why there is no cookie banner here. youtube-nocookie.com is
  // used for the same reason. Do not swap it for a plain embed that
  // loads on page load without revisiting the consent question.
  //
  // Unlisted means it stays out of YouTube search, not that it is
  // secret: embedding puts the ID in the page source.
  trailer: {
    enabled: true,
    youtubeId: "5piItxcGaAY",
    // Poster frame, from this repo. Deliberately not YouTube's own
    // thumbnail, which would be a third-party request before consent.
    // A real film still, NOT the title card that was here first: the
    // card already carries the film's name in large type, so a play
    // button and a label landed on top of lettering and the whole thing
    // read as clutter.
    poster: "assets/img/trailer-poster.jpg",
  },

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
  // Six categories per brief §4. RESTRUCTURE 2026-10-01: the separate
  // "Why host" card grid was removed because it largely restated these
  // same ideas, so each line now carries its own reason to take part
  // rather than leaving that to a second band further down.
  // The schools and film-society lines are the user's own wording and
  // should not be reworded without asking.
  // HOLDING COPY — requires IPNLF approval.
  hostTypes: [
    {
      title: "Companies &amp; workplaces",
      body: "A ready-made session for a sustainability, wellbeing or lunch-and-learn programme, and a shared starting point for talking about sourcing.",
    },
    {
      title: "Schools &amp; universities",
      body: "Use the film as a starting point for discussion around food systems, sustainability and human rights.",
    },
    {
      title: "NGOs &amp; community groups",
      body: "Bring members and supporters together around ocean, food and human-rights themes, with something to talk about afterwards.",
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

  // --- What we provide / what you organise --------------------------
  // Added 2026-10-01. A prospective host's real question is "how much
  // work is this for me?", and splitting it this way answers it far
  // better than describing only our side. It also fills the dead space
  // that was sitting in this section waiting for an image.
  //
  // Wording stays scoped (brief §5): nothing here promises a speaker,
  // travel, AV support, filmmaker attendance, bespoke production, or
  // that screenings are free.
  // HOLDING COPY — the screening pack does not exist yet. Do not
  // publish this list until the materials it describes are real.
  weProvide: [
    "Access to the film, and guidance on the permissions that apply to your type of event",
    "A host checklist and a suggested running order",
    "Discussion prompts and post-screening questions",
    "Promotional assets and sample invitation copy",
  ],
  youOrganise: [
    "A venue and a screen, with sound your audience can hear",
    "Your invitations and guest list",
    "Someone to introduce the film and keep the discussion going",
    "The date, and anything you want to serve",
  ],

  // Brief §12. These were lost when the "More than a screening" aside
  // was removed on 2026-10-01; restored here, where they answer the
  // "what does a screening actually look like" question in context.
  formats: [
    "Screening only",
    "Screening plus a facilitated discussion",
    "Screening plus a local panel",
    "Screening as part of a team or classroom session",
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
