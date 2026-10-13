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
    // Same line as the main page, deliberately: a partner arriving
    // here should meet the film described the way everyone else meets
    // it. The 420px cap in screenings.css is tuned to this exact
    // string, so it lands on three lines here too.
    heroLede: "Award-shortlisted documentary that unearths secrets of sustainable seafood, the people behind it and how our choices impact the ocean.",
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
    goals: [
      {
        heading: "Food systems",
        body: "The film follows the journey tuna takes from the ocean to the shelf, and asks what the true price is – on ecosystems and people.",
      },
      {
        heading: "Biodiversity",
        body: "What is caught, what is caught alongside it, and what that means for the ocean these fisheries depend on.",
      },
      {
        heading: "Human rights",
        body: "The conditions of the people who catch and process seafood, and why those working in this sector are in need of protection.",
      },
    ],
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
    // credit/creditUrl/licence: REQUIRED whenever photo is set. These
    // two portraits are Creative Commons BY-SA from Wikimedia Commons,
    // and BY-SA is only a licence while the attribution is actually
    // shown. Strip the credit and the page is simply using someone's
    // photograph without permission.
    //
    // The other three are still null, and not for want of looking:
    // no freely licensed photograph of them exists. Their pictures on
    // their employers' sites belong to those employers, and this is a
    // page we send TO those employers. Each person (or their press
    // office) supplies one and says it may be used.
    contributors: [
      {
        name: "Professor Callum Roberts",
        role: "Marine conservation biologist, University of Exeter",
        photo: "callum-roberts.jpg",
        credit: "Heinrich Böll Stiftung",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Professor_Callum_Roberts.jpg",
        licence: "CC BY-SA 2.0",
      },
      {
        // "The Outlaw Ocean Project", not "The Ocean Outlaw Project":
        // the non-profit Urbina founded in 2019, named after his book
        // The Outlaw Ocean. Checked, because the words transpose
        // easily and this page goes to people who would notice.
        name: "Ian Urbina",
        role: "Investigative journalist, The Outlaw Ocean Project",
        photo: "ian-urbina.jpg",
        credit: "Eric T. White",
        creditUrl: "https://commons.wikimedia.org/wiki/File:Ian_Urbina.jpg",
        licence: "CC BY-SA 4.0",
      },
      {
        name: "Jess Rattle",
        role: "Head of Investigations, Blue Marine Foundation",
        photo: null,
      },
      {
        name: "Emilia Dyer",
        role: "Advocacy and Engagement Lead, IPNLF",
        photo: null,
      },
      {
        name: "Sara Pipernos",
        role: "Director",
        photo: null,
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
        body: "Agreed assets your team can use directly, so we can both promote the film's goals.",
      },
      {
        heading: "Appear together live",
        body: "Share the stage with us to promote the film's message as well as our own individual work.",
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
