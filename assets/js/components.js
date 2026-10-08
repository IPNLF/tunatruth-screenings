/* ============================================================
   TUNATRUTH SCREENINGS — COMPONENTS
   Plain functions returning HTML strings — same lightweight,
   no-framework, no-build-step pattern as the donation page, so
   anyone who can maintain that can maintain this.

   Brand hierarchy reads from SCREENINGS_CONFIG.brandOrder, award
   wording from .award, the form from .beacon. Nothing here
   hard-codes any of those — see config.js.

   FIVE SECTIONS, each answering one visitor question in order:
     1 Host a screening    what am I being invited to do?
     2 The film            what is it, and why would my audience care?
     3 Hosting a screening what does it involve, what support is there?
     4 How it works        what happens after I enquire?
     5 Enquire             how do I express interest?

   ONE PRIMARY ACTION, worded the same in the header and the hero:
   "More Info", anchored to #request. Nothing else on the page
   competes with it.
   ============================================================ */
const TTS = (() => {

  const cfg = SCREENINGS_CONFIG;
  const isTunaTruthPrimary = cfg.brandOrder.primary === "tunatruth";

  // ---- small building blocks ----------------------------------

  function wordmarkIpnlf(size, onDark = false) {
    return `<a href="https://ipnlf.org" target="_blank" rel="noopener" aria-label="IPNLF — for one-by-one fishers (opens ipnlf.org)">
      <img class="tt-logo tt-logo--ipnlf tt-logo--${size}" src="assets/img/${onDark ? "ipnlf-logo-white.png" : "ipnlf-logo.png"}" alt="IPNLF — for one-by-one fishers">
    </a>`;
  }

  function wordmarkTunaTruth(size, linked = false) {
    const img = `<img class="tt-logo tt-logo--tunatruth tt-logo--${size}" src="assets/img/tunatruth-logo.png" alt="The Tuna Truth, with Serena Appleby">`;
    if (!linked) return img;
    return `<a href="https://www.tunatruth.com/" target="_blank" rel="noopener" aria-label="The Tuna Truth (opens tunatruth.com)">${img}</a>`;
  }

  // The joiner used to read "presented by", which was wrong: Serena
  // presents the film, IPNLF commissioned and executive produced it.
  // Corrected 2026-10-01 against the official poster asset, whose
  // credit block reads "EXECUTIVE PRODUCER INTERNATIONAL POLE & LINE
  // FOUNDATION ... PRESENTER SERENA APPLEBY". The wording stays
  // accurate whichever way brandOrder is flipped.
  function brandLockup() {
    const primary = isTunaTruthPrimary ? wordmarkTunaTruth("sm", true) : wordmarkIpnlf("sm");
    const secondary = isTunaTruthPrimary ? wordmarkIpnlf("xs") : wordmarkTunaTruth("xs", true);
    // No joiner word (removed 2026-10-01). The marks sit adjacent and
    // the relationship is stated accurately in the film credits
    // instead, which avoids compressing "commissioned and executive
    // produced by" into a two-word label that was previously wrong.
    return `<div class="tt-lockup">
      ${primary}
      ${secondary}
    </div>`;
  }

  function header() {
    return `<header class="tt-header">
      <div class="tt-container tt-header__inner">
        ${brandLockup()}
        <a class="tt-header__link" href="#request" aria-label="More Info about hosting a screening">More Info</a>
      </div>
    </header>`;
  }

  // ---- 1. Host a screening -------------------------------------
  // One invitation, one action. The primary CTA anchors to the form,
  // so someone who already knows the film skips straight to it.
  function hero() {
    return `<section class="tts-hero">
      <img class="tts-hero__photo-mobile" src="assets/img/hero-photo.jpg" alt="A still from The Tuna Truth" loading="eager">
      <div class="tt-container tts-hero__inner">
        <h1 class="tts-hero__title"><span class="tts-hero__title-lead">Host a screening</span> of ${cfg.filmName}</h1>
        <!-- HOLDING COPY — requires IPNLF/production approval -->
        <p class="tts-hero__lede">Explore where your seafood comes from</p>
        <div class="tts-hero__actions">
          <a class="tts-btn tts-btn--primary" href="#request" aria-label="More Info about hosting a screening">More Info</a>
        </div>
      </div>
    </section>`;
  }

  // ---- trailer -------------------------------------------------
  // Progressive enhancement, in three layers:
  //   1. The poster is a real link to the video on YouTube. With no
  //      JavaScript, or if this script fails, it still works.
  //   2. With JavaScript, the click is intercepted and the embed is
  //      swapped in, so the trailer plays in place.
  //   3. If the embed does not load (corporate networks, school
  //      filters, and previews that block iframes all do this), the
  //      poster is restored and reverts to being a plain link, so the
  //      trailer never fails silently.
  //
  // Nothing from YouTube is requested until someone clicks — see
  // config.js trailer for why that matters.
  //
  // The poster is a film still, NOT the title card: the card carries
  // the film's name in large type, so the play button landed on top of
  // lettering and the block read as clutter.
  function trailer() {
    const t = cfg.trailer;
    if (!t || !t.enabled || !t.youtubeId) return "";
    const watchUrl = `https://www.youtube.com/watch?v=${t.youtubeId}`;
    return `<figure class="tts-trailer">
      <a class="tts-trailer__play" href="${watchUrl}" target="_blank" rel="noopener" data-role="trailer-play" data-youtube-id="${t.youtubeId}" aria-label="Play the trailer for ${cfg.filmName}">
        <img src="${t.poster}" alt="" loading="lazy" width="1600" height="899">
        <span class="tts-trailer__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="28" height="28"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
        </span>
      </a>
    </figure>`;
  }

  // ---- 2. The film ---------------------------------------------
  // Two rows rather than one tall column plus a column of empty space:
  //   row 1  trailer beside the synopsis and the award line
  //   row 2  a compact presenter row — small photo, short paragraph
  // The previous version stacked an oversized trailer above an uneven
  // synopsis/portrait split, which ran to excessive height and left a
  // large empty area on the left.
  //
  // The synopsis leads and the production credits stay in a
  // disclosure. The first thing a prospective host reads about the
  // film should be what it is, not a list of companies and roles.
  function filmSection() {
    const a = cfg.award;
    return `<section class="tts-section tts-film" id="film">
      <div class="tt-container">
        <h2 class="tts-section__title">The film</h2>

        <div class="tts-film__top">
          ${trailer()}
          <div class="tts-film__synopsis">
            <!-- HOLDING COPY — requires production/IPNLF approval. Also
                 unapproved on the donation page, where it came from, so
                 approving it there settles both. -->
            <p class="tts-lede-para">Filmed in Bristol, Cornwall, and the Azores (Portugal), <em>${cfg.filmName}</em> shines a light on troubling aspects of the seafood industry and invites viewers on a journey towards more sustainable, responsible choices.</p>
            <!-- HOLDING COPY — requires IPNLF approval. Same provenance. -->
            <p>IPNLF supports the film as part of its work to promote thriving coastal communities and environmentally and socially responsible tuna fisheries.</p>

            <!-- Restrained credibility detail, not a second reading
                 task. Status VERIFIED 2026-10-01 against the official
                 poster asset, whose laurel reads "FINALIST 2026".
                 All wording comes from config.js award, so finalist ->
                 winner stays a one-object edit (brief §10). -->
            <p class="tts-award-line">
              <img src="assets/img/jackson-wild-logo.png" alt="Jackson Wild" loading="lazy">
              <span>Jackson Wild Media Awards 2026 ${a.status} — Onscreen Personality.</span>
            </p>

            <!-- Film credits sit here, with the film, rather than
                 nested under Serena's biography: they describe the
                 production, not the presenter. -->
            <details class="tts-disclosure">
              <summary>Film credits</summary>
              <!-- CONFIRMED factual credit — from the official poster
                   asset, carried over unchanged from the donation page. -->
              <p><em>${cfg.filmName}</em> is a Sunline Films production, commissioned and executive produced by IPNLF, presented by chef Serena Appleby and produced and directed by Sara Pipernos, with support from Human Rights at Sea, Blue Marine Foundation and Sustainable Communities and Fisheries Trust.</p>
            </details>
          </div>
        </div>

        <!-- Compact presenter row. The photo is a deliberate 4:3 crop
             of a landscape frame, keeping her face clear — not a
             landscape still forced into a tall portrait to fill a
             column, which is what it was before. -->
        <div class="tts-presenter">
          <img class="tts-presenter__photo" src="assets/img/serena-presenter.jpg" alt="Serena Appleby holding a platter of grilled tuna, from ${cfg.filmName}." loading="lazy" width="600" height="450">
          <div class="tts-presenter__text">
            <h3>Presented by Serena Appleby</h3>
            <!-- Credentials moved up from the "More about Serena"
                 disclosure (2026-10-07) so they are visible rather than
                 hidden behind a click: they are what establishes her to
                 a host who does not know the film. The ITV credit was
                 cut at the user's request, which left the disclosure
                 holding one clause, so it was folded in here and
                 removed rather than left as a component containing a
                 single sentence.
                 Public biographical facts, from tunatruth.com/about-1.
                 HOLDING COPY — the journey sentence still requires
                 factual/production approval. -->
            <p>Serena is a Filipino-British chef and presenter, known from BBC Three's <em>Hungry For It</em> and creator of the Kring Kringz pop-up. She begins the film as a seafood lover asking a simple question: how much do we really know about the tuna we eat? Her journey takes her from kitchens and supermarkets to fishing communities and fisheries experts.</p>
          </div>
        </div>
      </div>
    </section>`;
  }

  // ---- 3. Hosting a screening ----------------------------------
  // Feasibility first. "What IPNLF provides" and "what you organise"
  // are the main content here; the audience categories follow,
  // compactly, rather than six equally prominent blocks standing
  // between the visitor and the practical answer.
  function hostingSection() {
    const provide = cfg.weProvide.map((i) => `<li>${i}</li>`).join("");
    const organise = cfg.youOrganise.map((i) => `<li>${i}</li>`).join("");
    return `<section class="tts-section tts-section--soft tts-hosting" id="hosting">
      <div class="tt-container">
        <h2 class="tts-section__title">Hosting a screening</h2>
        <div class="tts-hosting-grid">
          <!-- Opens the section as a one-line standfirst under the
               heading. It has its own grid area, and it is also FIRST in
               the markup so the order a screen reader announces matches
               the order on screen. -->
          <p class="tts-formats-line">Show the film on its own, or follow it with a discussion, classroom activity or locally organised panel.</p>
          <!-- "Who can host?" opens the section: a one-line qualifier,
               so the two practical columns below it read as a matched
               pair. It used to sit underneath them, where it left a
               wide empty column to its right and broke the section's
               structure halfway down. -->
          <div class="tts-hosting-audience">
            <h3 class="tts-sub">Who can host?</h3>
            <p class="tts-audience-copy">${cfg.hostAudience}</p>
          </div>
          <div class="tts-hosting-support">
            <h3 class="tts-sub">Support from IPNLF</h3>
            <ul class="tts-checklist">${provide}</ul>
            <p class="tts-split__note">${cfg.extraSupportNote}</p>
          </div>
          <figure class="tts-template-preview">
            <a href="assets/img/screening-poster-preview.png?v=20261008-panel" target="_blank" rel="noopener" aria-label="Enlarge the sample screening poster (opens in a new tab)">
              <img src="assets/img/screening-poster-preview.png?v=20261008-panel" alt="Sample screening poster: IPNLF and The Tuna Truth logos, Serena Appleby, and an example event — hosted by Harbour Point University, Monday 8 June, 6.30pm" width="842" height="1191">
              <span class="tts-template-preview__link">Enlarge sample poster ↗</span>
            </a>
            <figcaption><strong>Make it your event</strong>Editable promotional templates included.</figcaption>
          </figure>
          <div class="tts-hosting-organise">
            <h3 class="tts-sub">What you organise</h3>
            <ul class="tts-checklist tts-checklist--alt">${organise}</ul>
          </div>
        </div>
      </div>
    </section>`;
  }
  // ---- 4. How it works -----------------------------------------
  // Three short steps that do not restate the support lists above.
  // No repeated CTA at the end: the enquiry section begins a few
  // hundred pixels later, so a button here only moved people a short
  // distance down the same page.
  function howItWorks() {
    const steps = [
      {
        n: "1",
        title: "Tell us about your plans",
        body: "Share a few details about your screening and audience.",
      },
      {
        n: "2",
        title: "Confirm the arrangements",
        body: "We'll agree film access for your event and send you the digital host pack.",
      },
      {
        n: "3",
        title: "Host your screening",
        body: "Show the film and use the discussion prompts to start a conversation.",
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
      </div>
    </section>`;
  }

  // ---- 5. Enquire ----------------------------------------------
  // The form is Beacon's, rendered into the container below by their
  // SDK. Its fields, labels, validation and appearance are configured
  // in Beacon, NOT here — see config.js beacon, and the README's
  // "Configuration" list for the changes that belong on that side.
  // Do not add page CSS to compensate for something Beacon controls.
  //
  // IMPORTANT ORDERING: this page builds <main> with innerHTML at
  // runtime, so the container does not exist when the document first
  // parses. The SDK is loaded AFTER the sections render (loadBeacon(),
  // called from index.html), not from a <script> tag in the markup.
  // Load it earlier and it can scan for .beacon-form before this
  // container exists, and the form never appears.
  function requestForm() {
    const b = cfg.beacon;
    if (!b || !b.account || !b.formId) return "";
    return `<section class="tts-section tts-section--form" id="request">
      <div class="tt-container">
        <h2 class="tts-section__title">Enquire</h2>
        <p class="tts-section__lede">Let us know your requirements. We will then get in touch to assist.</p>

        <div class="tts-form-wrap">
          <!-- Beacon renders into this div. Do not add children: the
               SDK replaces its contents. -->
          <div class="beacon-form" data-account="${b.account}" data-form="${b.formId}"></div>

          <!-- Always visible, not a fallback that only appears on
               failure: if the SDK is blocked by a privacy extension
               (Beacon's own guidance warns this happens) the container
               stays empty and silent, so this line is all that is left. -->
          <p class="tts-form__alt">Prefer email? Write to <a href="mailto:${cfg.fallbackEmail}">${cfg.fallbackEmail}</a>.</p>
        </div>
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
        <!-- Both marks stay together wherever either is used as
             branding. -->
        <div class="tt-footer__brands">
          ${wordmarkTunaTruth("xs", true)}
          <span class="tt-footer__x">×</span>
          ${wordmarkIpnlf("xs", true)}
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
    const play = document.querySelector('[data-role="trailer-play"]');
    if (!play) return;

    play.addEventListener("click", (e) => {
      // Once the embed has been shown not to load, stop intercepting:
      // the click follows the href to YouTube like any other link.
      if (play.dataset.embedBlocked === "true") return;

      const id = play.dataset.youtubeId;
      if (!id) return;
      e.preventDefault();

      const frame = document.createElement("iframe");
      // youtube-nocookie + autoplay (the click IS the gesture that
      // permits it) + rel=0 so the end screen does not fill with
      // unrelated channels' videos.
      frame.src = `https://www.youtube-nocookie.com/embed/${encodeURIComponent(id)}?autoplay=1&rel=0`;
      frame.title = `Trailer for ${cfg.filmName}`;
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
      frame.allowFullscreen = true;
      frame.className = "tts-trailer__frame";

      let loaded = false;
      frame.addEventListener("load", () => { loaded = true; });

      play.replaceWith(frame);
      frame.focus();

      // A blocked frame usually never fires "load" at all, so a timeout
      // is the only reliable signal available cross-origin. If nothing
      // has loaded by now, put the poster back and let it behave as the
      // link it started as.
      setTimeout(() => {
        if (loaded || !frame.isConnected) return;
        play.dataset.embedBlocked = "true";
        frame.replaceWith(play);
        play.focus();
      }, 4000);
    });
  }

  return {
    header, hero, filmSection, hostingSection, howItWorks,
    requestForm, footer, initInteractions, loadBeacon,
  };
})();
