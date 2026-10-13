/* ============================================================
   TUNATRUTH SCREENINGS — NGO PARTNER PAGE

   Standalone page at /ngo/. Deliberately NOT linked from the main
   page's navigation: it is a page you send to a named organisation,
   not one a visitor stumbles into.

   DRAFT. NOT APPROVED. Two things on this page carry more risk than
   anything on the main site, and both are marked inline:

   1. THE WAIVED LICENCE. The offer of free screenings for an NGO's
      members is an unconfirmed commercial commitment. The pack's own
      permissions note says it "does not grant rights or confirm an
      approved licensing policy", and the student pack flags the same
      question as open. Someone has to be able to stand behind this
      before the page is sent to anybody.

   2. THE CONTRIBUTOR LIST. Two contributors were supplied by first
      name only and are marked [CONFIRM]. Nothing has been invented to
      fill the gaps: an unverified affiliation attached to a real
      person is a correction waiting to happen.
   ============================================================ */
const SCREENINGS_CONFIG = {
  lang: "en-GB",

  // This page lives in /ngo/, one level below the shared /assets.
  assetBase: "../",

  filmName: "The Tuna Truth",
  fallbackEmail: "info@ipnlf.org",

  brandOrder: { primary: "tunatruth", secondary: "ipnlf" },

  // Same Beacon form as the main page. If NGO enquiries need to be
  // told apart from host enquiries in the CRM, that is a second form
  // on Beacon's side, with whatever that costs under the field limits.
  beacon: {
    account: "ipnlf",
    formId: "cc02962e",
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

    heroTitleLead: "Work with us",
    heroTitleTail: "on The Tuna Truth",
    // HOLDING COPY — requires IPNLF approval
    heroLede: "A documentary on food systems, biodiversity and the people behind our seafood, and an open invitation to campaign alongside it.",
    heroPhotoAlt: "A still from The Tuna Truth",
    trailerAria: "Play the trailer for The Tuna Truth",
    trailerFrameTitle: "Trailer for The Tuna Truth",

    requestTitle: "Start a conversation",
    requestLede: "Tell us who you are and what you have in mind. We will come back to you.",
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
    goalTitle: "What the film sets out to do",
    // HOLDING COPY — requires IPNLF/production approval.
    goalLede: "<em>The Tuna Truth</em> is made for people who buy and eat seafood, not for people who already work on it. It uses one familiar product to open up three subjects that are usually argued about separately.",
    goals: [
      {
        heading: "Food systems",
        body: "Tuna is cheap, convenient and everywhere. The film follows it back from the shelf to the water, and asks what that price does not cover.",
      },
      {
        heading: "Biodiversity",
        body: "What is caught, what is caught alongside it, and what that means for the ocean these fisheries depend on.",
      },
      {
        heading: "Human rights",
        body: "The conditions of the people who catch and process seafood, and why this sector is harder to see into than work that happens on land.",
      },
    ],

    // 2. The film itself
    filmTitle: "The film",
    factsHeading: "At a glance",
    // Running time is NOT confirmed anywhere in this project. Do not
    // guess it: a wrong runtime on a partner page becomes a wrong
    // runtime in somebody else's event listing.
    facts: [
      { label: "Running time", value: "[CONFIRM]" },
      { label: "Filmed in", value: "Bristol, Cornwall and the Azores (Portugal)" },
      { label: "Presented by", value: "Serena Appleby" },
      { label: "Directed by", value: "Sara Pipernos" },
      { label: "Languages and captions", value: "[CONFIRM]" },
      { label: "Recognition", value: "Jackson Wild Media Awards 2026 finalist" },
    ],

    presenterHeading: "Presented by Serena Appleby",
    presenterBody: "Serena is a Filipino-British chef and presenter, known from BBC Three's <em>Hungry For It</em> and creator of the Kring Kringz pop-up. She begins the film as a seafood lover asking a simple question: how much do we really know about the tuna we eat?",
    presenterPhotoAlt: "Serena Appleby holding a platter of grilled tuna, from The Tuna Truth.",
    presenterPhotoAltTwo: "Serena Appleby on location during filming of The Tuna Truth.",

    contributorsHeading: "Who appears in it",
    // SUPPLIED BY IPNLF, PARTLY INCOMPLETE. Roles below describe what
    // each contributor is publicly known for; none has been checked
    // against the finished film. Two are first-name-only and must be
    // completed before this page goes anywhere.
    contributorsNote: "Contributors are listed for IPNLF review and have not yet been checked against the final cut.",
    contributors: [
      {
        name: "Callum Roberts",
        role: "Marine conservation biologist",
        note: "[CONFIRM affiliation and how he is credited]",
      },
      {
        name: "Ian Urbina",
        role: "Investigative journalist, The Outlaw Ocean Project",
        note: "[CONFIRM how he is credited]",
      },
      {
        name: "[CONFIRM FULL NAME]",
        role: "Blue Marine Foundation",
        note: "Supplied as “Jess from Blue Marine”. Full name and job title needed.",
      },
      {
        name: "[CONFIRM FULL NAME]",
        role: "[CONFIRM ORGANISATION AND ROLE]",
        note: "Supplied as “Amelia”. Nothing further is known, so nothing has been assumed.",
      },
      {
        name: "Sara Pipernos",
        role: "Director",
        note: "Supplied as “filmmaker Sarah”. Spelled Sara Pipernos on the official credit block, which is what is used here.",
      },
    ],

    // 3. Ways to work together
    collabTitle: "Ways to work together",
    collabLede: "Three routes, in rough order of how much work they take. None of them needs the others.",
    collaborations: [
      {
        n: "Campaigns",
        heading: "Campaign together",
        body: "Line the film up behind a moment you are already working towards, so it adds weight to your campaign rather than competing with it for attention.",
      },
      {
        n: "Messaging",
        heading: "Share the messaging",
        body: "Agreed lines, clips and assets your communications team can use directly, so the film and your own materials say compatible things.",
      },
      {
        n: "Events",
        heading: "Appear together live",
        body: "Panels, premieres and conference sessions. Speaker availability depends on our team's capacity and is agreed case by case.",
      },
    ],

    // 4. The offer
    offerTitle: "Free screenings for your members",
    // UNCONFIRMED COMMERCIAL COMMITMENT. See the header of this file.
    // Every sentence here promises something IPNLF has not yet decided
    // it can give. Do not send this page to anyone until it has.
    offerLede: "We will waive the screening licence for community screenings run by your members.",
    offerPoints: [
      "No licence fee for a community screening run by one of your member groups",
      "The digital host pack: discussion prompts, editable posters and invitations",
      "Practical guidance on running the event, and on what to do afterwards",
    ],
    offerSmallPrint: "Each screening is still agreed in advance so we know where the film is going. Ticketed, fundraising and online events are handled separately.",
    offerFlag: "DRAFT OFFER — not yet approved by IPNLF.",
  },
};
