/* ============================================================
   TUNATRUTH SCREENINGS — EUROPEAN PORTUGUESE (pt-PT)

   DRAFT MACHINE-ASSISTED TRANSLATION. NOT REVIEWED BY A NATIVE
   SPEAKER. Do not publish or link to this page until it has been.

   This file is a translation of config.js and nothing else. All copy
   on the page comes from here, so a reviewer reads and edits one data
   file; components.js carries no language of its own and is shared
   between the two versions.

   TRANSLATION BRIEF: the layout is fixed, so string lengths matter.
   Where a literal translation would have run long enough to add a line
   and change the composition, the wording has been tightened instead.
   Those places are marked LENGTH. A reviewer should treat them as
   wording to improve, not as meaning to restore at any length.

   NOT TRANSLATED, deliberately:
   - "The Tuna Truth": the film's title.
   - Organisation names, and the Jackson Wild award category, which is
     an official category name.
   - The enquiry form itself. It is served by Beacon and its fields and
     labels are configured there, NOT here, so it currently renders in
     English on this page. See README.
   ============================================================ */
const SCREENINGS_CONFIG = {
  lang: "pt-PT",

  // This page lives in /pt/, one level below the shared /assets folder.
  assetBase: "../",

  filmName: "The Tuna Truth",

  copy: {
    cta: "Saber mais",
    ctaAria: "Saber mais sobre como organizar uma sessão",

    ipnlfLinkAria: "IPNLF — pela pesca um a um (abre ipnlf.org)",
    ipnlfLogoAlt: "IPNLF — pela pesca um a um",
    filmLinkAria: "The Tuna Truth (abre tunatruth.com)",
    filmLogoAlt: "The Tuna Truth, com Serena Appleby",

    heroTitleLead: "Organize uma sessão",
    heroTitleTail: "de The Tuna Truth",
    // HOLDING COPY — requires IPNLF/production approval
    // LENGTH: 680px against the English 681px, so both hold one
    // line down to 768px. "finalista", not "premiado": the film is
    // shortlisted, not a winner.
    heroLede: "Documentário finalista que revela os segredos do pescado sustentável, quem está por trás e como as nossas escolhas afetam o oceano.",
    heroPhotoAlt: "Um fotograma de The Tuna Truth",
    trailerAria: "Reproduzir o trailer de The Tuna Truth",
    trailerFrameTitle: "Trailer de The Tuna Truth",

    filmTitle: "O filme",
    // HOLDING COPY — requires production/IPNLF approval
    synopsis: "Rodado em Bristol, na Cornualha e nos Açores (Portugal), <em>The Tuna Truth</em> expõe aspetos preocupantes da indústria do pescado e convida a uma viagem rumo a escolhas mais sustentáveis.",
    // HOLDING COPY — requires IPNLF approval
    ipnlfRole: "A IPNLF apoia o filme no âmbito do seu trabalho de promoção de comunidades costeiras prósperas e de pescarias de atum ambiental e socialmente responsáveis.",
    // The category name is left in English: it is the official name of
    // the Jackson Wild category, not a description.
    awardLine: "Jackson Wild Media Awards 2026: {status} — categoria Onscreen Personality.",
    creditsSummary: "Ficha técnica",
    // CONFIRMED factual credit — from the official poster asset.
    credits: "<em>The Tuna Truth</em> é uma produção da Sunline Films, encomendada e com produção executiva da IPNLF, apresentada pela chef Serena Appleby e produzida e realizada por Sara Pipernos, com o apoio da Human Rights at Sea, da Blue Marine Foundation e da Sustainable Communities and Fisheries Trust.",
    presenterPhotoAlt: "Serena Appleby com uma travessa de atum grelhado, em The Tuna Truth.",
    presenterHeading: "Apresentado por Serena Appleby",
    // HOLDING COPY — the journey sentence requires approval.
    presenterBio: "Serena é chef e apresentadora filipino-britânica, conhecida do programa <em>Hungry For It</em> da BBC Three e criadora do pop-up Kring Kringz. Começa o filme como apreciadora de pescado com uma pergunta simples: o que sabemos sobre o atum que comemos? A sua viagem leva-a das cozinhas e supermercados às comunidades piscatórias e a especialistas.",

    hostingTitle: "Organizar uma sessão",
    // LENGTH: this is a one-line standfirst. A literal translation ran
    // past the width and wrapped, so it is tightened here.
    formatsLine: "Exiba o filme só por si, ou seguido de um debate, de uma atividade letiva ou de um painel local.",
    whoCanHost: "Quem pode organizar?",
    supportHeading: "Apoio da IPNLF",
    organiseHeading: "O que organiza",
    posterAria: "Ampliar o cartaz de exemplo (abre num novo separador)",
    posterAlt: "Cartaz de sessão de exemplo: logótipos da IPNLF e de The Tuna Truth, Serena Appleby e um evento de exemplo — organizado pela Harbour Point University, segunda-feira, 8 de junho, 18h30",
    posterEnlarge: "Ampliar cartaz de exemplo ↗",
    // LENGTH: "Faça dele o seu evento" wrapped to two lines in the
    // 190px caption column where the English sits on one.
    posterCaptionLead: "Torne-o seu evento",
    posterCaption: "Modelos promocionais editáveis.",

    howTitle: "Como funciona",
    steps: [
      { title: "Fale-nos dos seus planos", body: "Partilhe alguns detalhes sobre a sessão e o público." },
      { title: "Confirmamos os pormenores", body: "Acordamos o acesso ao filme para o seu evento e enviamos o kit digital." },
      { title: "Realize a sua sessão", body: "Exiba o filme e use as questões de debate para iniciar a conversa." },
    ],

    requestTitle: "Contacte-nos",
    requestLede: "Diga-nos o que precisa. Entraremos em contacto para ajudar.",
    emailFallbackBefore: "Prefere email? Escreva para ",
    emailFallbackAfter: ".",

    footerNavAria: "Ligações relacionadas",
    privacyUrl: "https://ipnlf.org/privacy-policy/",
    privacyLabel: "Política de privacidade",
    supportFilmLabel: "Apoiar o filme",
  },

  brandOrder: {
    primary: "tunatruth",
    secondary: "ipnlf",
  },

  // The form is Beacon's and renders in whatever language it is
  // configured in on their side. It is the same form as the English
  // page, so it currently appears in English here.
  beacon: {
    account: "ipnlf",
    formId: "cc02962e",
    sdkUrl: "https://static.beaconproducts.co.uk/js-sdk/production/beaconcrm.min.js",
  },

  fallbackEmail: "info@ipnlf.org",

  award: {
    status: "finalista",
    headline: "Finalista dos Jackson Wild Media Awards",
    detail: "The Tuna Truth foi nomeado finalista dos Jackson Wild Media Awards 2026, um dos principais prémios internacionais de narrativa ambiental e de natureza.",
    category: "Serena Appleby é finalista na categoria Onscreen Personality, a par de produções com Sir David Attenborough, Benedict Cumberbatch e Will Smith.",
  },

  trailer: {
    enabled: true,
    youtubeId: "KVdUoFiMHRA",
    poster: "assets/img/trailer-poster.jpg",
  },

  weProvide: [
    "Acesso ao filme e autorização para o seu evento",
    "Um kit digital com questões de debate, cartazes promocionais editáveis e convites",
    "Orientação prática para planear a sua sessão",
  ],

  youOrganise: [
    "Espaço adequado, ecrã e equipamento de som",
    "Convidar o público e divulgar a sessão",
    "Apresentar o filme e conduzir o evento",
  ],

  extraSupportNote: "Interessado num orador ou em conteúdos adicionais? Diga-nos ao contactar. A disponibilidade depende da capacidade da equipa.",

  hostAudience: "Qualquer pessoa. Empresas e locais de trabalho, escolas e universidades, ONG e grupos comunitários, equipas do setor do pescado e da hotelaria, conferências e associações de cinema ou de ambiente podem contactar-nos.",

  formats: [
    "um debate moderado",
    "um painel local",
    "uma sessão de equipa ou de turma",
  ],
};
