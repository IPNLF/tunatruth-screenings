/* ============================================================
   TUNATRUTH SCREENINGS — COMPONENTS
   Plain functions returning HTML strings — same lightweight,
   no-framework, no-build-step pattern as the donation page, so
   anyone who can maintain that can maintain this.

   Brand hierarchy reads from SCREENINGS_CONFIG.brandOrder, award
   wording from .award, the form from .beacon. Nothing here
   hard-codes any of those — see config.js.

   STRUCTURE (restructured 2026-10-01, from a review):
     1 Host a screening    the invitation and the primary action
     2 The film            trailer, synopsis, Serena, award, credits
     3 Hosting a screening who it suits, what each side does, formats
     4 How it works        three steps, then the after-event note
     5 Request a screening the Beacon form

   The reader's path is: understand the film -> judge whether this is
   feasible for us -> understand the process -> enquire. The previous
   eight-section version answered feasibility only after the film
   background, six audience cards and four benefit cards, which on
   mobile put it roughly 3,700px down the page.

   EMPHASIS IS DELIBERATELY UNEVEN. Sections 1, 2 and 5 carry the
   display type and the generous spacing; 3 and 4 are quieter and
   tighter. The old version gave all eight the same weight and the
   same alternating-background treatment, so every one read as a fresh
   chapter and the page felt stop-start.
   ============================================================ */
const TTS = (() => {

  const cfg = SCREENINGS_CONFIG;
  const isTunaTruthPrimary = cfg.brandOrder.primary === "tunatruth";

  // ---- small building blocks ----------------------------------

  function wordmarkIpnlf(size) {
    return `<a href="https://ipnlf.org" target="_blank" rel="noopener" aria-label="IPNLF — for one-by-one fishers (opens ipnlf.org)">
      <img class="tt-logo tt-logo--ipnlf tt-logo--${size}" src="assets/img/ipnlf-logo.png" alt="IPNLF — for one-by-one fishers">
    </a>`;
  }

  function wordmarkTunaTruth(size, linked = false) {
    const img = `<img class="tt-logo tt-logo--tunatruth tt-logo--${size}" src="assets/img/tunatruth-logo.png" alt="The Tuna Truth, with Serena Appleby">`;
    if (!linked) return img;
    return `<a href="https://www.tunatruth.com/" target="_blank" rel="noopener" aria-label="The Tuna Truth (opens tunatruth.com)">${img}</a>`;
  }

  function brandLockup() {
    const primary = isTunaTruthPrimary ? wordmarkTunaTruth("sm", true) : wordmarkIpnlf("sm");
    const joiner = isTunaTruthPrimary ? "presented by" : "supports";
    const secondary = isTunaTruthPrimary ? wordmarkIpnlf("xs") : wordmarkTunaTruth("xs", true);
    return `<div class="tt-lockup">
      ${primary}
      <span class="tt-lockup__joiner">${joiner}</span>
      ${secondary}
    </div>`;
  }

  function header() {
    return `<header class="tt-header">
      <div class="tt-container tt-header__inner">
        ${brandLockup()}
        <a class="tt-header__link" href="#request">Request a screening</a>
      </div>
    </header>`;
  }

  // ---- 1. Host a screening -------------------------------------
  // Answers the brief's three first-viewport questions: what this is,
  // who can host, what to do. The primary CTA is an in-page anchor to
  // the form, so a visitor who already knows the film skips the lot
  // while a cold one reads on.
  function hero() {
    return `<section class="tts-hero">
      <img class="tts-hero__photo-mobile" src="assets/img/hero-photo.jpg" alt="A still from The Tuna Truth" loading="eager">
      <div class="tt-container tts-hero__inner">
        <h1 class="tts-hero__title">Host a screening of ${cfg.filmName}</h1>
        <!-- HOLDING COPY — requires IPNLF/production approval -->
        <p class="tts-hero__lede">Bring the film to your workplace, school, university or community — and use it to start a conversation about the hidden impacts behind the tuna we buy.</p>
        <div class="tts-hero__actions">
          <a class="tts-btn tts-btn--primary" href="#request">Host a screening</a>
          <a class="tts-btn tts-btn--ghost" href="mailto:${cfg.fallbackEmail}?subject=${encodeURIComponent("Question about hosting a screening of " + cfg.filmName)}">Ask us a question</a>
        </div>
        <!-- Scoped on purpose. The screening pack does not exist yet,
             so this says we can send materials, not that a polished kit
             is waiting. Do not upgrade this wording until it is real —
             see README "Content requiring approval". -->
        <p class="tts-hero__note">We'll send materials to help you plan it.</p>
      </div>
    </section>`;
  }

  // ---- trailer -------------------------------------------------
  // Click-to-play facade: a still and a play button, with the iframe
  // created only on click. Nothing from YouTube is requested until the
  // viewer asks for it — see config.js trailer for why that matters.
  //
  // The poster is a film still, NOT the title card: the card carries
  // the film's name in large type, so the play button landed on top of
  // lettering and the whole block read as clutter.
  //
  // "Open it on YouTube" is not decoration: it is the fallback for any
  // context where the iframe cannot load (a strict corporate network,
  // a preview that blocks iframes). It always works.
  function trailer() {
    const t = cfg.trailer;
    if (!t || !t.enabled || !t.youtubeId) return "";
    return `<figure class="tts-trailer">
      <button type="button" class="tts-trailer__play" data-role="trailer-play" data-youtube-id="${t.youtubeId}" aria-label="Play the trailer for ${cfg.filmName}">
        <img src="${t.poster}" alt="" loading="lazy" width="1600" height="899">
        <span class="tts-trailer__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
        </span>
      </button>
      <figcaption class="tts-trailer__caption">Watch the trailer, or <a href="https://www.youtube.com/watch?v=${t.youtubeId}" target="_blank" rel="noopener">open it on YouTube</a>.</figcaption>
    </figure>`;
  }

  // ---- 2. The film ---------------------------------------------
  // Trailer, synopsis, Serena, award and credits in one section
  // rather than the three bands they used to occupy.
  //
  // ORDER WITHIN THE SECTION MATTERS, and it changed on 2026-10-01:
  // the synopsis now leads and the production credits follow, inside a
  // collapsed <details>. Previously the first thing a prospective host
  // read about the film was a list of production companies and roles.
  // Those credits are important but they are not what helps someone
  // decide to put the film in front of 200 colleagues, so they are
  // available rather than in the way.
  //
  // <details> is deliberate: native, keyboard-accessible, announced
  // correctly, and needs no JavaScript.
  function filmSection() {
    const a = cfg.award;
    return `<section class="tts-section tts-film" id="film">
      <div class="tt-container">
        <h2 class="tts-section__title">The film</h2>
        ${trailer()}

        <div class="tts-film__grid">
          <div class="tts-film__synopsis">
            <!-- HOLDING COPY — requires production/IPNLF approval. Also
                 unapproved on the donation page, where it came from, so
                 approving it there settles both. -->
            <p class="tts-lede-para">Filmed in the Azores, Portugal, ${cfg.filmName} shines a light on troubling aspects of the seafood industry and invites viewers on a journey towards more sustainable, responsible choices.</p>
            <!-- HOLDING COPY — requires IPNLF approval. Same provenance. -->
            <p>IPNLF supports the film as part of its work to promote thriving coastal communities and environmentally and socially responsible tuna fisheries.</p>

            <!-- Compact credibility, not a second reading task. All
                 wording comes from config.js award, so finalist ->
                 winner stays a one-object edit (brief §10). -->
            <p class="tts-award-line">
              <img src="assets/img/jackson-wild-logo.png" alt="Jackson Wild" loading="lazy">
              <span><strong>2026 Jackson Wild Media Awards ${a.status}.</strong> ${a.category}</span>
            </p>

            <details class="tts-credits">
              <summary>Film credits</summary>
              <!-- CONFIRMED factual credit — from the official poster
                   asset, carried over unchanged from the donation page. -->
              <p>${cfg.filmName} is a Sunline Films production, commissioned and executive produced by IPNLF, presented by chef Serena Appleby and produced and directed by Sara Pipernos, with support from Human Rights at Sea, Blue Marine Foundation and Sustainable Communities and Fisheries Trust.</p>
            </details>
          </div>

          <!-- Serena, folded into the film section rather than sitting
               as her own band between "How it works" and the form,
               where she interrupted the run towards the enquiry.
               Still supplied 2026-10-01, cropped 4:5 from a 3840x2160
               frame. A CREDIT LINE may still be needed. -->
          <aside class="tts-serena">
            <figure class="tts-serena__media">
              <img src="assets/img/serena-still.jpg" alt="Serena Appleby holding a platter of grilled tuna, from ${cfg.filmName}." loading="lazy" width="900" height="1125">
            </figure>
            <h3>Serena's journey</h3>
            <!-- HOLDING COPY — requires factual/production approval -->
            <p>Chef and presenter Serena Appleby begins the film as a seafood lover asking a simple question: how much do we really know about the tuna we eat? Her journey takes her from kitchens and supermarkets to fishing communities and fisheries experts.</p>
            <!-- Public biographical facts, from tunatruth.com/about-1 -->
            <p class="tts-serena__bio">Serena is a Filipino-British chef and presenter, known from BBC Three's <em>Hungry For It</em> and ITV's <em>Ainsley Harriott's National Trust Cook Off</em>, and the creator of the Kring Kringz pop-up.</p>
          </aside>
        </div>
      </div>
    </section>`;
  }

  // ---- 3. Hosting a screening ----------------------------------
  // Quieter treatment than sections 1, 2 and 5 on purpose: this is
  // reference material someone scans to answer "could we actually do
  // this?", not something read start to finish.
  //
  // The separate "Why host" card grid that used to sit above this is
  // gone. It largely restated the audience examples, and one of its
  // four points ("Take the film further") was a benefit to the
  // campaign rather than a reason for the host to take part. Those
  // reasons now live inside the audience lines — see config.js
  // hostTypes.
  function hostingSection() {
    const audience = cfg.hostTypes.map((t) => `
      <li>
        <h4>${t.title}</h4>
        <p>${t.body}</p>
      </li>`).join("");
    const provide = cfg.weProvide.map((i) => `<li>${i}</li>`).join("");
    const organise = cfg.youOrganise.map((i) => `<li>${i}</li>`).join("");
    const formats = cfg.formats.map((f) => `<li>${f}</li>`).join("");

    return `<section class="tts-section tts-section--soft tts-hosting" id="hosting">
      <div class="tt-container">
        <h2 class="tts-section__title">Hosting a screening</h2>
        <p class="tts-section__lede">A screening can be ten people in a meeting room or two hundred in a lecture theatre. If you can gather an audience, you can host one.</p>

        <h3 class="tts-sub">Who it suits</h3>
        <!-- HOLDING COPY — category descriptions require IPNLF approval -->
        <ul class="tts-audience">${audience}</ul>

        <!-- The split that answers the real question: how much work is
             this for us? Describing only our side left that unanswered,
             and left dead space on the right at desktop widths. -->
        <h3 class="tts-sub">What each side does</h3>
        <div class="tts-split">
          <div class="tts-split__col">
            <h4>We provide</h4>
            <!-- HOLDING COPY — the screening pack does not exist yet.
                 Do not publish this list until the materials are real. -->
            <ul class="tts-checklist">${provide}</ul>
            <p class="tts-split__note">Depending on the event and our team's availability, we may also be able to help with a speaker or additional content.</p>
          </div>
          <div class="tts-split__col">
            <h4>You organise</h4>
            <ul class="tts-checklist tts-checklist--alt">${organise}</ul>
          </div>
        </div>

        <h3 class="tts-sub">Ways to run it</h3>
        <ul class="tts-formats">${formats}</ul>
        <p class="tts-formats__note">None of these are required. A straightforward screening is a perfectly good screening.</p>
      </div>
    </section>`;
  }

  // ---- 4. How it works -----------------------------------------
  // Three steps, not four. "Tell us how it went" was never a step in
  // arranging a screening and did not deserve equal weight with the
  // three that are — it is a short line underneath instead.
  function howItWorks() {
    const steps = [
      {
        n: "1",
        title: "Tell us about your screening",
        body: "Complete the short form below with a rough plan of your screening.",
      },
      {
        n: "2",
        title: "We'll confirm the details",
        body: "We'll advise on screening access and permissions for your type of event, and send you the host materials.",
      },
      {
        n: "3",
        title: "Host your event",
        body: "Screen the film and use the discussion materials to keep the conversation going afterwards.",
      },
    ];
    const items = steps.map((s) => `
      <li class="tts-step">
        <span class="tts-step__n" aria-hidden="true">${s.n}</span>
        <div>
          <h3>${s.title}</h3>
          <p>${s.body}</p>
        </div>
      </li>`).join("");

    return `<section class="tts-section tts-how" id="how">
      <div class="tt-container">
        <h2 class="tts-section__title">How it works</h2>
        <ol class="tts-steps">${items}</ol>
        <p class="tts-after">Afterwards, share photos or feedback if you are happy to. It helps us understand where the film is reaching.</p>
        <!-- The primary action, repeated. Someone convinced by this
             point should not have to scroll back up or hunt for the
             header link. -->
        <p class="tts-how__cta"><a class="tts-btn tts-btn--primary" href="#request">Request a screening</a></p>
      </div>
    </section>`;
  }

  // ---- 5. Request a screening (Beacon CRM) ---------------------
  // The form itself is Beacon's, rendered into the container below by
  // their SDK. Its fields, validation and appearance are configured in
  // Beacon, not here — see config.js beacon for why, and for the
  // privacy trade-off that comes with it.
  //
  // IMPORTANT ORDERING: this page builds <main> with innerHTML at
  // runtime, so the container does not exist when the document first
  // parses. The Beacon SDK is therefore loaded AFTER the sections are
  // rendered (see loadBeacon(), called from index.html), not from a
  // <script> tag in the markup. Load it earlier and the SDK can scan
  // for .beacon-form before this container exists, and the form never
  // appears.
  function requestForm() {
    const b = cfg.beacon;
    if (!b || !b.account || !b.formId) return "";
    return `<section class="tts-section tts-section--form" id="request">
      <div class="tt-container tts-form-wrap">
        <h2 class="tts-section__title">Request a screening</h2>
        <p class="tts-section__lede">Tell us roughly what you have in mind. Nothing here commits you to anything — we'll reply with what's possible.</p>

        <!-- Beacon renders into this div. Do not add children: the SDK
             replaces its contents. -->
        <div class="beacon-form" data-account="${b.account}" data-form="${b.formId}"></div>

        <!-- Always visible, not a fallback that only appears on failure:
             if the SDK is blocked by a privacy extension (Beacon's own
             guidance warns this happens) the container stays empty and
             silent, so this line is the only thing left. -->
        <p class="tts-form__alt">Prefer email? Write to <a href="mailto:${cfg.fallbackEmail}">${cfg.fallbackEmail}</a>.</p>
      </div>
    </section>`;
  }

  // Injects the Beacon SDK. Called from index.html AFTER the sections
  // are in the DOM — see the ordering note on requestForm(). Guarded on
  // the script id, exactly as Beacon's own snippet is, so it is safe to
  // call more than once.
  function loadBeacon() {
    const b = cfg.beacon;
    if (!b || !b.sdkUrl) return;
    const id = "beacon-js-sdk";
    if (document.getElementById(id)) return;
    const el = document.createElement("script");
    el.id = id;
    el.src = b.sdkUrl;
    document.head.appendChild(el);
  }

  function footer() {
    const year = new Date().getFullYear();
    return `<footer class="tt-footer">
      <div class="tt-container tt-footer__inner">
        <div class="tt-footer__brands">
          ${wordmarkTunaTruth("xs", true)}
          <span class="tt-footer__x">×</span>
          <span class="tt-logo-chip">${wordmarkIpnlf("xs")}</span>
        </div>
        <nav class="tt-footer__links" aria-label="Related links">
          <a href="https://www.tunatruth.com/" target="_blank" rel="noopener">tunatruth.com</a>
          <a href="https://ipnlf.org" target="_blank" rel="noopener">ipnlf.org</a>
          <a href="https://ipnlf.org/privacy-policy/" target="_blank" rel="noopener">Privacy policy</a>
          <!-- One quiet link to the donation page, in the footer only. A
               fundraising ask anywhere higher would compete with the
               single action this page exists for. -->
          <a href="https://donate.tunatruth.com/" target="_blank" rel="noopener">Support the film</a>
        </nav>
        <p class="tt-footer__copy">© ${year} IPNLF.</p>
      </div>
    </footer>`;
  }

  // ---- behaviour --------------------------------------------------

  function initInteractions() {
    // Trailer: swap the facade for the real player on click. Nothing is
    // requested from YouTube before this runs.
    const trailerBtn = document.querySelector('[data-role="trailer-play"]');
    if (!trailerBtn) return;
    trailerBtn.addEventListener("click", () => {
      const id = trailerBtn.dataset.youtubeId;
      if (!id) return;
      const frame = document.createElement("iframe");
      // youtube-nocookie + autoplay (the click IS the gesture that
      // permits it) + rel=0 so the end screen does not fill with
      // unrelated channels' videos.
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      frame.title = `Trailer for ${cfg.filmName}`;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      frame.allowFullscreen = true;
      frame.className = "tts-trailer__frame";
      trailerBtn.replaceWith(frame);
      frame.focus();
    });
  }

  return {
    header, hero, filmSection, hostingSection, howItWorks,
    requestForm, footer, initInteractions, loadBeacon,
  };
})();
