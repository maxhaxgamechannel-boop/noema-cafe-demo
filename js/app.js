/* NOEMA – DEMO-Entwurf.
   Mobiles Menü, geschriebener Name, Einblenden beim Scrollen und scrollabhängige Deko
   (Hintergrund-Formen, Laufband, Fortschrittsbalken).
   Ohne JavaScript ist alles sichtbar und bedienbar. Keine Nutzereingaben, kein innerHTML. */
(function () {
  "use strict";

  var root = document.documentElement;
  root.classList.remove("no-js");
  root.classList.add("js");
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Sicherheitsnetz: Falls weiter unten ein Fehler auftritt, Inhalte trotzdem zeigen
  window.addEventListener("error", function () {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("seen"); });
    var s = document.getElementById("script");
    if (s) s.classList.add("write");
  });

  /* ---------- Mobiles Menü ---------- */
  var burger = document.getElementById("burger");
  var nav = document.getElementById("nav");
  var desktop = window.matchMedia("(min-width: 960px)");

  function setOpen(open) {
    nav.classList.toggle("open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.querySelector(".burger-lbl").textContent = open ? "Schließen" : "Menü";
    document.body.classList.toggle("lock", open);
  }
  burger.addEventListener("click", function () { setOpen(!nav.classList.contains("open")); });
  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && !desktop.matches) setOpen(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) { setOpen(false); burger.focus(); }
  });
  desktop.addEventListener("change", function () { setOpen(false); });

  /* ---------- Geschriebener Name ----------
     viewBox an die tatsächliche Textgröße anpassen (nach dem Laden der Schrift),
     dann die Schreib-Animation starten. Spätestens nach 1,5 s startet sie trotzdem. */
  var script = document.getElementById("script");
  var group = document.getElementById("script-g");
  var started = false;
  function fitBox() {
    if (!script) return;
    try {
      var b = group.getBBox();
      if (b.width > 0) {
        var pad = 12;
        script.setAttribute("viewBox", [b.x - pad, b.y - pad, b.width + pad * 2, b.height + pad * 2].join(" "));
      }
    } catch (e) { /* Standard-viewBox behalten */ }
  }
  function startWriting() {
    if (started || !script) return;
    started = true;
    fitBox();
    script.classList.add("write");
  }
  if (document.fonts && document.fonts.ready) {
    // Auch wenn die Animation per Zeitlimit schon lief: nach dem Laden der Schrift neu einpassen
    document.fonts.ready.then(function () { fitBox(); startWriting(); });
  } else {
    startWriting();
  }
  setTimeout(startWriting, 1500);

  /* ---------- Einblenden beim Scrollen ---------- */
  var items = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("seen"); io.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add("seen"); });
  }

  /* ---------- Scrollabhängige Bewegung ---------- */
  var progress = document.getElementById("progress");
  var band = document.getElementById("band");
  var movers = Array.prototype.slice.call(document.querySelectorAll("[data-speed]")).map(function (el) {
    return {
      el: el,
      speed: parseFloat(el.getAttribute("data-speed")) || 0,
      rot: parseFloat(el.getAttribute("data-rot")) || 0,
      // Formen der festen Hintergrund-Ebene „wandern“ endlos durchs Bild (Wrap-around),
      // alle anderen bewegen sich nur leicht (Parallaxe)
      wrap: !!el.closest(".deco"),
      base: 0
    };
  });
  var rangeH = window.innerHeight;
  function measureBases() {
    rangeH = window.innerHeight;
    movers.forEach(function (m) {
      if (!m.wrap) return;
      m.el.style.transform = "none";
      m.base = m.el.getBoundingClientRect().top % (rangeH + 200);
    });
  }
  measureBases();
  var ticking = false;
  // Laufband: Text steht 3× im HTML – eine Wiederholung ist ein Drittel der Breite
  var cycle = 900;
  function measure() { if (band) cycle = Math.max(1, band.scrollWidth / 3); }
  measure();

  function update() {
    ticking = false;
    var y = window.scrollY || window.pageYOffset || 0;
    var max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    if (progress) progress.style.transform = "scaleX(" + Math.min(1, y / max).toFixed(4) + ")";
    if (reduce) return;
    var range = rangeH + 200;
    for (var i = 0; i < movers.length; i++) {
      var m = movers[i];
      var dy = -y * m.speed;
      if (m.wrap) {
        // Position im Bereich −100 px … Bildschirmhöhe + 100 px halten; Sprung passiert außerhalb des Sichtfelds
        var pos = (((m.base + dy + 100) % range) + range) % range - 100;
        dy = pos - m.base;
      }
      m.el.style.transform = "translate3d(0," + dy.toFixed(1) + "px,0) rotate(" + (y * m.rot).toFixed(2) + "deg)";
    }
    if (band) band.style.transform = "translate3d(" + (-((y * 0.35) % cycle)).toFixed(1) + "px,0,0)";
  }
  function onScroll() {
    if (!ticking) { ticking = true; window.requestAnimationFrame(update); }
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  // Nur bei Breitenänderung neu messen – auf dem Handy ändert die Adressleiste ständig die Höhe
  var lastW = window.innerWidth;
  window.addEventListener("resize", function () {
    if (window.innerWidth !== lastW) { lastW = window.innerWidth; measure(); measureBases(); }
    onScroll();
  }, { passive: true });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { measure(); onScroll(); });
  update();
})();
