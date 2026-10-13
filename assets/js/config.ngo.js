/* ============================================================
   TUNATRUTH SCREENINGS — NGO PARTNER PAGE

   Standalone page at /ngo/. Deliberately NOT linked from the main
   page's navigation: it is a page you send to a named organisation,
   not one a visitor stumbles into.

   DRAFT. NOT APPROVED.

   The free-screening offer that used to sit at the foot of this page
   has been removed at IPNLF's request: it promised a waived licence
   that nobody had agreed to give. It is recoverable from git history
   if the policy is ever settled. Do not reinstate it from memory.

   The contributor roles below describe what each person is publicly
   known for. None has been checked against the finished film.
   ============================================================ */
const SCREENINGS_CONFIG = {
  lang: "en-GB",

  // This page lives in /ngo/, one level below the shared /assets.
  assetBase: "../",

  filmName: "The Tuna Truth",
  fallbackEmail: "info@ipnlf.org",

  brandOrder: { primary: "tunatruth", secondary: "ipnlf" },

  // The partner-side form, NOT the host form the main page uses.
  // "Expression of interest": name, email, organisation, consent. It
  // deliberately has no free-text field, so NGO enquiries arrive in
  // Beacon already separated from screening requests.
  //
  // d330ed74 is the PUBLIC form hash from Beacon's share link. The id
  // in the admin URL (100572) is internal and 404s on beaconforms.com.
  beacon: {
    account: "ipnlf",
    formId: "d330ed74",
    sdkUrl: "https://static.beaconproducts.co.uk/js-sdk/production/beaconcrm.min.js",
  },

  award: { status: "finalist" },

  trailer: {
    enabled: true,
    youtubeId: "KVdUoFiMHRA",
    poster: "assets/img/trailer-poster.jpg",
  },

  // --- Shared chrome, read by components.js -------------------------
  copy: {
    cta: "Collaborate",
    ctaAria: "Collaborate with us on The Tuna Truth",

    ipnlfLinkAria: "IPNLF — for one-by-one fishers (opens ipnlf.org)",
    ipnlfLogoAlt: "IPNLF — for one-by-one fishers",
    filmLinkAria: "The Tuna Truth (opens tunatruth.com)",
    filmLogoAlt: "The Tuna Truth, with Serena Appleby",

    heroTitleLead: "Help us spread",
    heroTitleTail: "The Tuna Truth",
    // HOLDING COPY — requires IPNLF approval
    // Same line as the main page, deliberately: a partner arriving
    // here should meet the film described the way everyone else meets
    // it. The 420px cap in screenings.css is tuned to this exact
    // string, so it lands on three lines here too.
    heroLede: "Award-shortlisted documentary that unearths secrets of sustainable seafood, the people behind it and how our choices impact the ocean.",
    heroPhotoAlt: "A still from The Tuna Truth",
    trailerAria: "Play the trailer for The Tuna Truth",
    trailerFrameTitle: "Trailer for The Tuna Truth",

    requestTitle: "Start a conversation",
    // Matched to the expression-of-interest form, which asks only for
    // details: the previous line invited them to say what they had in
    // mind, and that form has no field to say it in.
    requestLede: "Let us know your details and we will be in touch soon to discuss how we can work together.",
    emailFallbackBefore: "Prefer email? Write to ",
    emailFallbackAfter: ".",

    footerNavAria: "Related links",
    privacyUrl: "https://ipnlf.org/privacy-policy/",
    privacyLabel: "Privacy policy",
    supportFilmLabel: "Support the film",
  },

  // --- NGO page content, read by components.ngo.js ------------------
  ngo: {
    // 1. What the film is for
    // Replaced the three equal columns (food systems / biodiversity /
    // human rights) with a single statement at IPNLF's request. The
    // same three subjects are still named, inside one argument rather
    // than as three parallel claims.
    goalTitle: "What the film sets out to do",
    goalBody: "We cannot protect oceans and coastal communities without addressing the food system. <em>The Tuna Truth</em> aims to engage consumers in meaningful, educational conversations about where their food comes from, while informing them honestly about biodiversity loss, human rights abuses and related issues.",
    // 2. The film itself
    filmTitle: "The film",
    factsHeading: "At a glance",
    // Running time confirmed by IPNLF, 13 October 2026. The same fact
    // is still [CONFIRM] in the main screening pack and the student
    // pack, which have not been updated.
    facts: [
      { label: "Running time", value: "One hour" },
      { label: "Filmed in", value: "Bristol, Cornwall and the Azores (Portugal)" },
      { label: "Presented by", value: "Serena Appleby" },
      { label: "Directed by", value: "Sara Pipernos" },
      { label: "Recognition", value: "Jackson Wild Media Awards 2026 finalist" },
    ],

    presenterHeading: "Presented by Serena Appleby",
    presenterBody: "Serena is a Filipino-British chef and presenter, known from BBC Three's <em>Hungry For It</em> and creator of the Kring Kringz pop-up. She begins the film as a seafood lover asking a simple question: how much do we really know about the tuna we eat?",
    presenterPhotoAlt: "Serena Appleby holding a platter of grilled tuna, from The Tuna Truth.",
    presenterPhotoAltTwo: "Serena Appleby on location during filming of The Tuna Truth.",

    contributorsHeading: "Who appears in it",
    // photo: a file in assets/img/contributors/, or null.
    // credit/creditUrl/licence: optional; a credit line renders when set.
    // Roberts and Urbina are Creative Commons BY-SA from Wikimedia
    // Commons, which requires attribution. The credits were removed on
    // 13 Oct 2026 at IPNLF's request, with that risk accepted knowingly.
    // To restore them, put these back on the two entries:
    //   Roberts: "Heinrich Böll Stiftung", CC BY-SA 2.0,
    //     https://commons.wikimedia.org/wiki/File:Professor_Callum_Roberts.jpg
    //   Urbina: "Eric T. White", CC BY-SA 4.0,
    //     https://commons.wikimedia.org/wiki/File:Ian_Urbina.jpg
    //
    // Jess Rattle, Emilia Dyer and Sara Pipernos: photos supplied by
    // IPNLF on 13 Oct 2026, never lifted from employers' sites.
    contributors: [
      {
        name: "Professor Callum Roberts",
        role: "Marine conservation biologist, University of Exeter",
        photo: "callum-roberts.jpg",
      },
      {
        // "The Outlaw Ocean Project", not "The Ocean Outlaw Project":
        // the non-profit Urbina founded in 2019, named after his book
        // The Outlaw Ocean. Checked, because the words transpose
        // easily and this page goes to people who would notice.
        name: "Ian Urbina",
        role: "Investigative journalist, The Outlaw Ocean Project",
        photo: "ian-urbina.jpg",
      },
      {
        name: "Jess Rattle",
        role: "Head of Investigations, Blue Marine Foundation",
        photo: "jess-rattle.jpg",
      },
      {
        name: "Emilia Dyer",
        role: "Advocacy and Engagement Lead, IPNLF",
        photo: "emilia-dyer.jpg",
      },
      {
        name: "Sara Pipernos",
        role: "Director",
        photo: "sara-pipernos.jpg",
      },
    ],
    // 3. Ways to work together
    collabTitle: "Ways to work together",
    // The "n" key the earlier draft carried is gone: the component
    // numbers these from their position, so a second source of
    // numbering was dead data waiting to disagree with the markup.
    collaborations: [
      {
        heading: "Campaign together",
        body: "Line the film up behind a project you are already working towards, to add weight to your campaign.",
      },
      {
        heading: "Share the messaging",
        body: "Receive agreed assets your team can use directly, so we can both promote the film's goals.",
      },
      {
        heading: "Appear live together",
        body: "Share the stage with us to promote the film's message as well as our own individual work.",
      },
    ],
  },
};
