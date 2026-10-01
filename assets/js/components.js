/* ============================================================
   TUNATRUTH SCREENINGS — COMPONENTS
   Plain functions returning HTML strings — same lightweight,
   no-framework, no-build-step pattern as the donation page, so
   anyone who can maintain that can maintain this.

   Brand hierarchy reads from SCREENINGS_CONFIG.brandOrder; award
   wording reads from SCREENINGS_CONFIG.award; the form endpoint
   reads from SCREENINGS_CONFIG.formEndpoint. Nothing here
   hard-codes any of those — see config.js.
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

  // ---- 1. hero -------------------------------------------------
  // Answers the brief's three first-viewport questions in order:
  // what is this (title + support line), who can host (the support
  // line names the settings explicitly), what do I do (the two CTAs,
  // both above any synopsis).
  //
  // The primary CTA is an in-page anchor to the form, not a new page:
  // a visitor who already knows the film skips straight to it, while
  // a cold visitor scrolls through the case first. One primary action
  // on the page, stated twice.
  function hero() {
    return `<section class="tts-hero">
      <img class="tts-hero__photo-mobile" src="assets/img/hero-photo.jpg" alt="A still from The Tuna Truth" loading="eager">
      <div class="tt-container tts-hero__inner">
        <!-- REVIEW 2026-10-01 — the eyebrow row (TunaTruth wordmark +
             "Screenings") was removed to free vertical space. The same
             wordmark already sits in the header directly above, so it
             was a duplicate. -->
        <h1 class="tts-hero__title">Host a screening of ${cfg.filmName}</h1>
        <!-- HOLDING COPY — requires IPNLF/production approval -->
        <p class="tts-hero__lede">Bring the film to your workplace, school, university or community — and use it to start a conversation about the hidden impacts behind the tuna we buy.</p>
        <div class="tts-hero__actions">
          <a class="tts-btn tts-btn--primary" href="#request">Host a screening</a>
          <a class="tts-btn tts-btn--ghost" href="mailto:${cfg.fallbackEmail}?subject=${encodeURIComponent("Question about hosting a screening of " + cfg.filmName)}">Ask us a question</a>
        </div>
        <!-- REVIEW 2026-10-01 — the "who is welcome to ask" line was
             removed from the hero. "Who can host" immediately below
             answers the same question in more useful detail. -->
      </div>
    </section>`;
  }

  // ---- 2. who can host -----------------------------------------
  // Job: let a visitor recognise themselves in about four seconds.
  // Deliberately a plain two/three-column list, NOT icon cards —
  // "Why host" below is the card grid, and three consecutive card
  // grids is exactly the information-dump feel the brief warns off.
  function whoCanHost() {
    const items = cfg.hostTypes.map((t) => `
      <li class="tts-hostlist__item">
        <h3>${t.title}</h3>
        <p>${t.body}</p>
      </li>`).join("");
    // Soft-foam surface (review 2026-10-01): with "About the film"
    // promoted to sit directly under the hero, this section follows a
    // white one. Two consecutive white sections lose the separation the
    // page relies on, since the alternating surfaces ARE the section
    // differentiation here.
    return `<section class="tts-section tts-section--soft" id="who">
      <div class="tt-container">
        <h2 class="tts-section__title">Who can host</h2>
        <p class="tts-section__lede">A screening can be ten people in a meeting room or two hundred in a lecture theatre. If you can gather an audience, you can host one.</p>
        <!-- HOLDING COPY — category descriptions require IPNLF approval -->
        <ul class="tts-hostlist">${items}</ul>
      </div>
    </section>`;
  }

  // ---- 3. why host ---------------------------------------------
  // Job: the benefit to THEM. Rule held throughout: this section is
  // outcomes for the host; "What we provide" below is deliverables
  // from IPNLF. If a line names a thing we send, it belongs there.
  //
  // Carefully NOT claiming that screening the film changes behaviour
  // or policy (brief §2) — every line here is about convening an
  // audience and prompting discussion, which is what a screening
  // actually does.
  function whyHost() {
    const points = [
      {
        title: "Start a conversation",
        body: "Give your audience a shared experience that opens discussion around food, oceans and responsible sourcing.",
      },
      {
        title: "Engage your community",
        body: "Use the film inside a workplace, classroom, university, conference or public event you are already running.",
      },
      {
        title: "Take the film further",
        body: "Every screening helps the documentary reach audiences beyond conventional film distribution.",
      },
      {
        title: "Connect the film to what happens next",
        body: "Use discussion prompts and follow-up resources to help your audience explore the questions the film raises.",
      },
    ];
    const cards = points.map((p) => `
      <li class="tts-why__card">
        <h3>${p.title}</h3>
        <p>${p.body}</p>
      </li>`).join("");
    return `<section class="tts-section tts-section--dark" id="why">
      <div class="tt-container">
        <h2 class="tts-section__title">Why host ${cfg.filmName}</h2>
        <!-- HOLDING COPY — requires IPNLF approval -->
        <ul class="tts-why">${cards}</ul>
      </div>
    </section>`;
  }

  // ---- 4. what we provide --------------------------------------
  // MERGE (deliberate deviation from brief §15): this is the brief's
  // section 4 ("We'll help you get started") and section 10 ("More
  // than a screening") combined. Both answer the same question —
  // "what do I actually get, and how much work is this for me?" —
  // and split across two sections each had to be padded, so the
  // reader hit the same reassurance twice and it read thinner, not
  // more generous. One checklist plus one short "more than a
  // screening" note is stronger. See README-screenings.md.
  //
  // Wording is scoped hard (brief §5): "we can provide", "where
  // feasible", "depending on availability". Nothing here promises a
  // speaker, travel, AV support, filmmaker attendance, bespoke
  // production, or that screenings are free.
  function whatWeProvide() {
    const packItems = [
      "Guidance on screening access and permissions for your type of event",
      "A short host checklist and a suggested event format",
      "A discussion guide and post-screening questions",
      "Promotional assets, social graphics and sample invitation copy",
      "Links to further information and ways your audience can find out more",
    ];
    const list = packItems.map((i) => `<li>${i}</li>`).join("");
    return `<section class="tts-section" id="support">
      <div class="tt-container tts-provide">
        <div class="tts-provide__main">
          <h2 class="tts-section__title">We'll help you get started</h2>
          <!-- HOLDING COPY — the screening pack does not exist yet; see
               README-screenings.md "Assets still needed". Do not publish
               this list until the materials it describes are real. -->
          <p>We can provide a simple screening pack to help you plan and promote your event:</p>
          <ul class="tts-checklist">${list}</ul>
          <p class="tts-provide__caveat">Depending on the event and our team's availability, we may also be able to help with a speaker or additional content.</p>
        </div>
        <!-- IMAGE SLOT — AWAITING ASSET.
             Held open and drawn as nothing until an image is supplied,
             rather than filled with a placeholder box, which would read
             as broken. Delete the --empty class and swap in a <figure>
             (see serena() for the pattern) when one arrives.

             NOTE: removing the "More than a screening" aside that used
             to sit here also removed the only copy on the page covering
             brief §12 — the "a screening is a starting point" framing
             and the four optional event formats. That content still
             appears nowhere. -->
        <aside class="tts-provide__aside tts-provide__aside--empty" aria-hidden="true"></aside>
      </div>
    </section>`;
  }

  // ---- 5. how it works -----------------------------------------
  // Four steps per brief §6. Step 2 carries the licensing note
  // (brief §14) rather than giving it a section of its own — it is
  // the answer to "what happens after I ask", which is exactly where
  // someone wonders about it.
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
      {
        n: "4",
        title: "Tell us how it went",
        // REVIEW 2026-10-01 — "rough attendance" was cut from this line at
        // the user's request. Note the consequence: the form collects an
        // EXPECTED audience band at enquiry stage, but nothing now asks
        // for ACTUAL attendance afterwards, so the brief's §18 measure
        // "estimated audience reached" can no longer be reported from
        // what this page gathers. Flagged, not reinstated.
        body: "Share photos or feedback if you are happy to. It helps us understand where the film is reaching.",
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
    return `<section class="tts-section tts-section--soft" id="how">
      <div class="tt-container">
        <h2 class="tts-section__title">How it works</h2>
        <ol class="tts-steps">${items}</ol>
        <!-- REVIEW 2026-10-01 — the standalone "A note on permissions"
             block that sat here was cut at the user's request.
             IMPORTANT: step 2 above ("We'll advise on screening access
             and permissions for your type of event") is now the ONLY
             place on the page that tells a host permissions depend on
             the event. Brief §14 is explicit that the page must not
             imply anyone may simply show the film, and who controls
             public-performance rights is still an open question in the
             README. Do not reword step 2 without putting the point
             back somewhere. -->
      </div>
    </section>`;
  }

  // ---- trailer -------------------------------------------------
  // Click-to-play facade: a still and a play button, with the iframe
  // created only on click. Nothing from YouTube is requested until the
  // viewer asks for it — see config.js trailer for why that matters.
  //
  // The "Watch on YouTube" link is not decoration: it is the fallback
  // for any context where the iframe cannot load (a strict corporate
  // network, an embedded preview that blocks iframes). It always works.
  function trailer() {
    const t = cfg.trailer;
    if (!t || !t.enabled || !t.youtubeId) return "";
    return `<figure class="tts-trailer">
      <button type="button" class="tts-trailer__play" data-role="trailer-play" data-youtube-id="${t.youtubeId}" aria-label="Play the trailer for ${cfg.filmName}">
        <img src="${t.poster}" alt="" loading="lazy" width="1200" height="630">
        <span class="tts-trailer__icon" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="30" height="30"><path fill="currentColor" d="M8 5v14l11-7z"/></svg>
        </span>
        <span class="tts-trailer__label">Watch the trailer</span>
      </button>
      <figcaption class="tts-trailer__caption">
        <a href="https://www.youtube.com/watch?v=${t.youtubeId}" target="_blank" rel="noopener">Watch on YouTube</a>
      </figcaption>
    </figure>`;
  }

  // ---- 6. about the film (+ award) -----------------------------
  // Placed BEFORE the form, which is a deliberate change from the
  // brief's order (§15 puts the form at 6 and the film at 7). A
  // sustainability manager who has never heard of the film cannot
  // decide to put it in front of 200 colleagues on the strength of
  // the hosting logistics alone — credibility has to land before the
  // ask. The hero CTA anchors past all of this for anyone who is
  // already sold. See README-screenings.md.
  function aboutFilm() {
    const a = cfg.award;
    return `<section class="tts-section" id="about">
      <div class="tt-container tts-about">
        <div class="tts-about__body">
          <h2 class="tts-section__title">About ${cfg.filmName}</h2>
          ${trailer()}
          <!-- REVIEW 2026-10-01 — these three paragraphs were supplied by
               the user and match the donation page's "Behind the film"
               copy, replacing the holding synopsis that was here before. -->

          <!-- CONFIRMED factual credit — sourced from the official poster
               asset, carried over unchanged from the donation page. -->
          <p>${cfg.filmName} is a Sunline Films production, commissioned and executive produced by IPNLF, presented by chef Serena Appleby and produced and directed by Sara Pipernos, with support from Human Rights at Sea, Blue Marine Foundation and Sustainable Communities and Fisheries Trust.</p>

          <!-- HOLDING COPY — requires production/IPNLF approval. Also
               unapproved on the donation page, where it came from, so
               approving it there settles it for both. -->
          <p>Filmed in the Azores, Portugal, ${cfg.filmName} shines a light on troubling aspects of the seafood industry and invites viewers on a journey towards more sustainable, responsible choices.</p>

          <!-- HOLDING COPY — requires IPNLF approval. Same provenance. -->
          <p>IPNLF supports the film as part of its work to promote thriving coastal communities and environmentally and socially responsible tuna fisheries.</p>
        </div>

        <!-- Award block. ALL wording comes from the config.js award
             object — to
             change finalist -> winner, edit that object and nothing
             else. Nothing about the award is hard-coded here or in the
             CSS (brief §10). -->
        <aside class="tts-award">
          <p class="tts-award__badge">
            <img src="assets/img/jackson-wild-logo.png" alt="Jackson Wild" loading="lazy">
            <span>2026 ${a.status}</span>
          </p>
          <h3>${a.headline}</h3>
          <p>${a.detail}</p>
          <p>${a.category}</p>
        </aside>
      </div>
    </section>`;
  }

  // ---- 7. Serena's journey -------------------------------------
  // Brief §9 asks for one strong portrait rather than a lot of text.
  // ASSET GAP: there is no Serena portrait in this repo. Rather than
  // shipping a grey placeholder box or a broken image, this uses the
  // existing documentary still and says what it is — and the section
  // is built so swapping in a real portrait is a src change. Flagged
  // in README-screenings.md "Assets still needed".
  function serena() {
    return `<section class="tts-section tts-section--dark" id="serena">
      <div class="tt-container tts-serena">
        <!-- Still supplied by the user 2026-10-01, replacing the
             og-image.jpg stand-in. Resized from a 3024px / 7.5MB PNG to
             1200px / 93KB JPEG — the original is far too heavy to serve.
             ALT TEXT NEEDS CONFIRMING: it describes the scene without
             naming anyone, because who appears in the frame has not been
             confirmed. Replace with a proper description (and a credit,
             if one is required) before launch. -->
        <figure class="tts-serena__media">
          <img src="assets/img/serena-still.jpg" alt="A still from The Tuna Truth: people sharing a meal together at a table." loading="lazy" width="1200" height="673">
        </figure>
        <div class="tts-serena__body">
          <h2 class="tts-section__title">Serena's journey</h2>
          <!-- HOLDING COPY — requires factual/production approval -->
          <p>Chef and presenter Serena Appleby begins the film as a seafood lover asking a simple question: how much do we really know about the tuna we eat? Her journey takes her from kitchens and supermarkets to fishing communities and fisheries experts, exploring the choices behind the products on our shelves.</p>
          <!-- Public biographical facts, from tunatruth.com/about-1 -->
          <p class="tts-serena__bio">Serena is a Filipino-British chef and presenter, known from BBC Three's <em>Hungry For It</em> and ITV's <em>Ainsley Harriott's National Trust Cook Off</em>, and the creator of the Kring Kringz pop-up.</p>
        </div>
      </div>
    </section>`;
  }

  // ---- 8. the enquiry form (Beacon CRM) ------------------------
  // The form itself is Beacon's, rendered into the container below by
  // their SDK. Its fields, validation and appearance are configured in
  // Beacon, not here — see config.js `beacon` for why, and for the
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
  // are in the DOM — see the ordering note on requestForm().
  // Guarded on the script id, exactly as Beacon's own snippet is, so it
  // is safe to call more than once.
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
          <!-- One quiet link to the donation page, in the footer only.
               A fundraising ask anywhere higher would compete with the
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
    header, hero, whoCanHost, whyHost, whatWeProvide, howItWorks,
    aboutFilm, serena, requestForm, footer, initInteractions, loadBeacon,
  };
})();
