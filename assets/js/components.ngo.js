/* ============================================================
   NGO PARTNER PAGE — page-specific sections.

   The shared chrome (header, hero, enquiry form, footer) comes from
   components.js, which is already config-driven and needs no changes.
   Only the sections unique to this page live here, so the main page's
   JavaScript does not grow to carry markup it never renders.

   Load AFTER components.js. Reads the same SCREENINGS_CONFIG.
   ============================================================ */
const TTSN = (() => {
  const cfg = SCREENINGS_CONFIG;
  const n = cfg.ngo;
  const asset = (path) => (cfg.assetBase || "") + path;

  // ---- 1. What the film is for ---------------------------------
  // Three equal columns, because the three subjects are presented as
  // equally important. The film's own argument is that they are the
  // same subject seen from different angles.
  function goalSection() {
    const cards = n.goals.map((g) => `
      <li class="ngo-goal">
        <h3>${g.heading}</h3>
        <p>${g.body}</p>
      </li>`).join("");
    return `<section class="tts-section tts-section--soft" id="goal">
      <div class="tt-container">
        <h2 class="tts-section__title">${n.goalTitle}</h2>
        <ul class="ngo-goals">${cards}</ul>
      </div>
    </section>`;
  }

  // ---- 2. The film ----------------------------------------------
  // Trailer, a plain facts table, the presenter, then contributors.
  // The facts are a definition list rather than prose: a partner
  // organisation is scanning for runtime and locations, not reading.
  function filmSection() {
    const facts = n.facts.map((f) => `
      <div class="ngo-fact">
        <dt>${f.label}</dt>
        <dd>${f.value}</dd>
      </div>`).join("");

    // A missing headshot renders as a visibly unfinished tile with the
    // person's initials, NOT as a generic avatar: a neutral silhouette
    // would look like a decision, and this is a gap.
    // Honorifics are skipped, or "Professor Callum Roberts" initials
    // as PC rather than CR.
    const TITLES = /^(prof(essor)?|dr|mr|mrs|ms|mx|sir|dame)\.?$/i;
    const initials = (name) => name.split(/\s+/).filter(Boolean)
      .filter((w) => !TITLES.test(w))
      .slice(0, 2).map((w) => w[0]).join("").toUpperCase();

    const people = n.contributors.map((c) => {
      const portrait = c.photo
        ? `<img class="ngo-person__photo" src="${asset("assets/img/contributors/" + c.photo)}" alt="${c.name}" loading="lazy" width="64" height="64">`
        : `<span class="ngo-person__photo ngo-person__photo--missing" role="img" aria-label="No photograph of ${c.name} yet">
             <span class="ngo-person__initials" aria-hidden="true">${initials(c.name)}</span>
             <span class="ngo-person__missing" aria-hidden="true">Photo to source</span>
           </span>`;
      return `
      <li class="ngo-person">
        ${portrait}
        <div class="ngo-person__text">
          <p class="ngo-person__name">${c.name}</p>
          <p class="ngo-person__role">${c.role}</p>
          ${c.credit ? `<p class="ngo-person__credit">Photo: <a href="${c.creditUrl}" target="_blank" rel="noopener">${c.credit}</a>, ${c.licence}</p>` : ""}
          ${c.note ? `<p class="ngo-person__note">${c.note}</p>` : ""}
        </div>
      </li>`;
    }).join("");

    return `<section class="tts-section" id="film">
      <div class="tt-container">
        <h2 class="tts-section__title">${n.filmTitle}</h2>

        <div class="ngo-film-top">
          ${TTS.trailer()}
          <div class="ngo-facts-wrap">
            <h3 class="tts-sub">${n.factsHeading}</h3>
            <dl class="ngo-facts">${facts}</dl>
          </div>
        </div>

        <div class="ngo-presenter">
          <!-- ONE portrait, not two. The two stills available of
               Serena (serena-presenter.jpg and serena-still.jpg) are
               different crops of the same moment, so side by side they
               read as a duplicated image rather than as a set. A second
               genuinely different still would make this a pair. -->
          <div class="ngo-presenter__photos">
            <img src="${asset("assets/img/serena-still.jpg")}" alt="${n.presenterPhotoAlt}" loading="lazy" width="900" height="1125">
          </div>
          <div class="ngo-presenter__text">
            <h3>${n.presenterHeading}</h3>
            <p>${n.presenterBody}</p>
          </div>
        </div>

        <div class="ngo-people">
          <h3 class="tts-sub">${n.contributorsHeading}</h3>
          <ul class="ngo-people__list">${people}</ul>
        </div>
      </div>
    </section>`;
  }

  // ---- 3. Ways to work together ---------------------------------
  function collaborationSection() {
    const items = n.collaborations.map((c, i) => `
      <li class="tts-step ngo-collab">
        <span class="tts-step__n" aria-hidden="true">${i + 1}</span>
        <div>
          <h3>${c.heading}</h3>
          <p>${c.body}</p>
        </div>
      </li>`).join("");
    return `<section class="tts-section tts-section--soft" id="collaborate">
      <div class="tt-container">
        <h2 class="tts-section__title">${n.collabTitle}</h2>
        <ol class="tts-steps ngo-collabs">${items}</ol>
      </div>
    </section>`;
  }

  // ---- 4. The offer ----------------------------------------------
  // Deliberately the loudest block on the page, and deliberately the
  // one carrying a visible DRAFT flag: it is the only part that
  // promises something IPNLF has not yet agreed to give.
  function offerSection() {
    const points = n.offerPoints.map((p) => `<li>${p}</li>`).join("");
    return `<section class="tts-section ngo-offer-section" id="offer">
      <div class="tt-container">
        <div class="ngo-offer">
          <p class="ngo-offer__flag">${n.offerFlag}</p>
          <h2 class="ngo-offer__title">${n.offerTitle}</h2>
          <p class="ngo-offer__lede">${n.offerLede}</p>
          <ul class="tts-checklist ngo-offer__list">${points}</ul>
          <p class="ngo-offer__small">${n.offerSmallPrint}</p>
        </div>
      </div>
    </section>`;
  }

  return { goalSection, filmSection, collaborationSection, offerSection };
})();
