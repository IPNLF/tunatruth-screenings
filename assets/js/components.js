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
    return `<section class="tts-section" id="who">
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
        <!-- IMAGE SLOT — AWAITING ASSET (review 2026-10-01).
             The "More than a screening" aside that sat here was removed
             at the user's request; an image from the starter pack goes
             in its place once it is supplied. The column is deliberately
             left blank until then rather than filled with a placeholder
             box, which would read as broken.

             NOTE: removing that aside also removed the only copy on the
             page covering brief §12 — the "a screening is a starting
             point" framing and the four optional event formats
             (screening only / + facilitated discussion / + local panel /
             + team or classroom session). That content now appears
             nowhere. Worth a deliberate decision about whether it
             returns elsewhere. -->
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
          <!-- HOLDING COPY — requires production/IPNLF approval -->
          <p>${cfg.filmName} follows chef and presenter Serena Appleby as she investigates what sits behind one of the world's most familiar foods. Through conversations with fishers, scientists, campaigners and seafood experts, the film explores the environmental and human impacts of tuna fishing — and what more responsible choices can look like.</p>

          <!-- CONFIRMED factual credit — sourced from the official poster
               asset, carried over unchanged from the donation page. -->
          <p class="tts-about__credit">A Sunline Films production, commissioned and executive produced by IPNLF, presented by Serena Appleby and produced and directed by Sara Pipernos, with support from Human Rights at Sea, Blue Marine Foundation and Sustainable Communities and Fisheries Trust.</p>
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
        <figure class="tts-serena__media">
          <img src="assets/img/og-image.jpg" alt="A still from The Tuna Truth" loading="lazy">
          <!-- ASSET PLACEHOLDER — replace with a Serena portrait/still -->
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

  // ---- 8. the enquiry form -------------------------------------
  // See the long comment above renderFormState() for why the submit
  // button is disabled while cfg.formEndpoint is null, and what has
  // to happen before this form can receive anything at all.
  function requestForm() {
    const orgOptions = cfg.orgTypes.map((o) => `<option value="${o}">${o}</option>`).join("");
    const bandOptions = cfg.audienceBands.map((b) => `<option value="${b}">${b}</option>`).join("");
    const kindOptions = cfg.screeningKinds.map((k) => `<option value="${k}">${k}</option>`).join("");
    const isLive = Boolean(cfg.formEndpoint);

    // PROTOTYPE NOTICE — rendered only while formEndpoint is null.
    // Deleting this block and setting formEndpoint are the two (and
    // only two) steps to go live; they are kept adjacent on purpose.
    const previewNotice = isLive ? "" : `
      <p class="tts-form__preview" role="status">
        <strong>Preview only.</strong>
        This form is not yet connected — nothing submitted here would be received by anyone.
        To ask about a screening today, email <a href="mailto:${cfg.fallbackEmail}">${cfg.fallbackEmail}</a>.
      </p>`;

    return `<section class="tts-section tts-section--form" id="request">
      <div class="tt-container tts-form-wrap">
        <h2 class="tts-section__title">Request a screening</h2>
        <p class="tts-section__lede">A short form, not an application. Nothing here commits you to anything — it just gives us enough to reply usefully.</p>
        ${previewNotice}

        <form class="tts-form" novalidate ${isLive ? `action="${cfg.formEndpoint}" method="POST"` : ""}>
          <div class="tts-field">
            <label for="f-name">Your name <span class="tts-req">*</span></label>
            <input id="f-name" name="name" type="text" autocomplete="name" required>
          </div>

          <div class="tts-field">
            <label for="f-email">Email <span class="tts-req">*</span></label>
            <input id="f-email" name="email" type="email" autocomplete="email" required>
          </div>

          <div class="tts-field">
            <label for="f-org">Organisation <span class="tts-req">*</span></label>
            <input id="f-org" name="organisation" type="text" autocomplete="organization" required>
          </div>

          <div class="tts-field">
            <label for="f-orgtype">Type of organisation <span class="tts-req">*</span></label>
            <select id="f-orgtype" name="organisationType" required>
              <option value="">Please choose…</option>
              ${orgOptions}
            </select>
          </div>

          <div class="tts-field">
            <label for="f-country">Country <span class="tts-req">*</span></label>
            <input id="f-country" name="country" type="text" autocomplete="country-name" required>
          </div>

          <div class="tts-field">
            <label for="f-audience">Approximate audience size <span class="tts-req">*</span></label>
            <select id="f-audience" name="audienceSize" required>
              <option value="">Please choose…</option>
              ${bandOptions}
            </select>
          </div>

          <div class="tts-field">
            <label for="f-kind">Is the screening… <span class="tts-req">*</span></label>
            <select id="f-kind" name="screeningKind" required>
              <option value="">Please choose…</option>
              ${kindOptions}
            </select>
            <p class="tts-field__hint">This is the part that decides which permissions apply.</p>
          </div>

          <!-- Free text, not a date picker, on purpose: most hosts do
               not have a date at enquiry stage, and a picker forces a
               false precision that then has to be unpicked by email. -->
          <div class="tts-field">
            <label for="f-when">Preferred date or timeframe</label>
            <input id="f-when" name="timeframe" type="text" placeholder="e.g. &quot;some time in the spring term&quot;">
          </div>

          <div class="tts-field tts-field--wide">
            <label for="f-notes">Anything else we should know?</label>
            <textarea id="f-notes" name="notes" rows="4"></textarea>
          </div>

          <!-- OPEN QUESTION (README-screenings.md): this asks about
               something IPNLF has not yet decided it can offer. It is
               worded as interest, not a request, and the copy above it
               in "We'll help you get started" is scoped to match — but
               if the answer turns out to be "we cannot offer speakers",
               remove this field rather than reword it. -->
          <div class="tts-field tts-field--wide tts-field--check">
            <label>
              <input type="checkbox" name="speakerInterest" value="yes">
              I'd be interested in a post-screening discussion or speaker, if one is available
            </label>
          </div>

          <!-- Honeypot: named innocuously, hidden from sight and from
               assistive tech, never focusable. Most form services also
               look for a field named _gotcha. -->
          <div class="tts-honeypot" aria-hidden="true">
            <label for="f-website">Website</label>
            <input id="f-website" name="_gotcha" type="text" tabindex="-1" autocomplete="off">
          </div>

          <div class="tts-form__foot">
            <button type="submit" class="tts-btn tts-btn--primary" ${isLive ? "" : "disabled"}>
              Request a screening
            </button>
            <!-- PRIVACY: this is the point of collection, so the notice
                 belongs here. The link target is IPNLF's existing
                 privacy policy; whether it already covers enquiries
                 handled by a third-party form processor is an OPEN
                 QUESTION — see README-screenings.md. -->
            <p class="tts-form__privacy">
              We'll use these details only to reply to you about a screening.
              See the <a href="https://ipnlf.org/privacy-policy/" target="_blank" rel="noopener">IPNLF privacy policy</a>.
            </p>
          </div>

          <!-- tabindex="-1" so initInteractions() can move focus here
               programmatically; role="alert" so it is announced. -->
          <p class="tts-form__error" data-role="form-error" role="alert" tabindex="-1" hidden></p>
        </form>

        <p class="tts-form__alt">Prefer email? Write to <a href="mailto:${cfg.fallbackEmail}">${cfg.fallbackEmail}</a>.</p>
      </div>
    </section>`;
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
    const form = document.querySelector(".tts-form");
    if (!form) return;
    const errorEl = form.querySelector('[data-role="form-error"]');

    // Native validity is used for the rules themselves (required,
    // type=email) — no re-implemented email regex — but the messages
    // are rendered inline rather than left to the browser's bubbles,
    // which are inconsistent and disappear on scroll.
    function fieldError(field, message) {
      const wrap = field.closest(".tts-field");
      if (!wrap) return;
      wrap.classList.add("is-invalid");
      field.setAttribute("aria-invalid", "true");
      let msg = wrap.querySelector(".tts-field__error");
      if (!msg) {
        msg = document.createElement("p");
        msg.className = "tts-field__error";
        wrap.appendChild(msg);
      }
      msg.textContent = message;
      // Tie the message to the field so a screen reader hears it.
      const id = `${field.id}-error`;
      msg.id = id;
      field.setAttribute("aria-describedby", id);
    }

    function clearError(field) {
      const wrap = field.closest(".tts-field");
      if (!wrap) return;
      wrap.classList.remove("is-invalid");
      field.removeAttribute("aria-invalid");
      const msg = wrap.querySelector(".tts-field__error");
      if (msg) msg.remove();
    }

    const fields = [...form.querySelectorAll("input, select, textarea")]
      .filter((f) => f.name !== "_gotcha");

    fields.forEach((f) => {
      // Validate on blur, not on every keystroke — flagging an email
      // as invalid while it is still being typed is just noise.
      f.addEventListener("blur", () => {
        if (f.checkValidity()) clearError(f);
      });
      f.addEventListener("input", () => {
        if (f.checkValidity()) clearError(f);
      });
    });

    form.addEventListener("submit", (e) => {
      let firstInvalid = null;
      fields.forEach((f) => {
        clearError(f);
        if (!f.checkValidity()) {
          const message = f.validity.valueMissing
            ? "This one is needed."
            : f.type === "email"
              ? "That doesn't look like an email address."
              : "Please check this.";
          fieldError(f, message);
          if (!firstInvalid) firstInvalid = f;
        }
      });

      if (firstInvalid) {
        e.preventDefault();
        firstInvalid.focus();
        return;
      }

      // PROTOTYPE GUARD — while cfg.formEndpoint is null there is
      // nowhere for this to go, so the submit is stopped and the
      // preview notice is pointed at. It deliberately does NOT show a
      // success state: a demo that appears to work is how real
      // enquiries end up silently binned. The payload is logged so the
      // field shape can be reviewed without a live endpoint.
      if (!cfg.formEndpoint) {
        e.preventDefault();
        const payload = Object.fromEntries(new FormData(form).entries());
        delete payload._gotcha;
        console.info("[screenings prototype] form is valid; this is what would be sent:", payload);
        if (errorEl) {
          errorEl.hidden = false;
          errorEl.textContent = "This form is not connected yet, so nothing was sent. Please email " + cfg.fallbackEmail + " instead.";
          errorEl.focus();
        }
        return;
      }
      // Live: the form posts natively to cfg.formEndpoint. No fetch
      // wrapper — a native POST still works if this script fails to
      // run, and the form service renders its own confirmation.
    });
  }

  return {
    header, hero, whoCanHost, whyHost, whatWeProvide, howItWorks,
    aboutFilm, serena, requestForm, footer, initInteractions,
  };
})();
