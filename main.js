// ── Floating hieroglyph symbols ──
const symbols = [
  "𓀀",
  "𓀁",
  "𓀂",
  "𓀃",
  "𓀄",
  "𓀅",
  "𓀆",
  "𓀇",
  "𓀈",
  "𓀉",
  "𓀊",
  "𓀋",
  "𓀌",
  "𓀍",
  "𓁀",
  "𓁁",
  "𓁂",
  "𓁃",
  "𓁄",
  "𓁅",
  "𓂀",
  "𓂁",
  "𓂂",
  "𓃀",
  "𓃁",
  "𓃂",
  "𓃃",
  "𓄀",
  "𓄁",
  "𓄂",
];
const container = document.getElementById("hieroContainer");
if (container) {
  for (let i = 0; i < 40; i++) {
    const el = document.createElement("div");
    el.className = "hiero-sym";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    el.style.left = Math.random() * 100 + "vw";
    el.style.animationDuration = 12 + Math.random() * 20 + "s";
    el.style.animationDelay = Math.random() * 20 + "s";
    el.style.fontSize = 16 + Math.random() * 28 + "px";
    container.appendChild(el);
  }
}

const cursor = document.querySelector(".cursor");
if (cursor) {
  document.addEventListener("mousemove", (event) => {
    cursor.style.left = `${event.clientX}px`;
    cursor.style.top = `${event.clientY}px`;
  });
}

// ── Ramsees image cycler ──
const ramseesImages = [
  "img/pharaoh o sedza phanda.png",
  "img/pharaoh o sedza thundo.png",
  "img/pharaoh side view.png",
];
let ramseesIdx = 0;
function updateRamseesImg() {
  const img = document.getElementById("ramseesImg");
  img.style.opacity = "0";
  setTimeout(() => {
    img.src = ramseesImages[ramseesIdx];
    img.style.opacity = "1";
  }, 400);
}
function nextRamseesImg(event) {
  if (event) event.preventDefault();
  ramseesIdx = (ramseesIdx + 1) % ramseesImages.length;
  updateRamseesImg();
}
function prevRamseesImg(event) {
  if (event) event.preventDefault();
  ramseesIdx = (ramseesIdx - 1 + ramseesImages.length) % ramseesImages.length;
  updateRamseesImg();
}

// ── Book slideshow ──
let currentSlide = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".sdot");

function showSlide(n) {
  slides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  currentSlide = (n + slides.length - 1) % (slides.length - 1); // exclude controls div
  // slides includes the controls div as last child so only count real slides
}

// Rebuild — only img slides, not the controls div
const realSlides = Array.from(document.querySelectorAll(".slide"));
let slideIdx = 0;

function goSlide(n) {
  realSlides.forEach((s) => s.classList.remove("active"));
  dots.forEach((d) => d.classList.remove("active"));
  slideIdx = n;
  realSlides[slideIdx].classList.add("active");
  dots[slideIdx].classList.add("active");
}
function nextSlide() {
  goSlide((slideIdx + 1) % realSlides.length);
}
function prevSlide() {
  goSlide((slideIdx - 1 + realSlides.length) % realSlides.length);
}

// ── Poster detail ──
const posterSrcs = [
  "img/poster 3.jpeg",
  "img/poster 2.jpeg",
  "img/poster 1.jpeg",
];
function openPoster(i) {
  document.getElementById("poster-detail-img").src = posterSrcs[i];
  document.getElementById("poster-detail").classList.add("open");
  document.body.style.overflow = "hidden";
}
function closePoster() {
  document.getElementById("poster-detail").classList.remove("open");
  document.body.style.overflow = "";
}

// Close on backdrop click
document
  .getElementById("poster-detail")
  .addEventListener("click", function (e) {
    if (e.target === this) closePoster();
  });

function openThroneModal() {
  const src = document.querySelector(".throne-img").src;
  const detail = document.getElementById("throne-detail");
  document.getElementById("throne-detail-img").src = src;
  detail.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeThroneModal() {
  document.getElementById("throne-detail").classList.remove("open");
  document.body.style.overflow = "";
}

document
  .getElementById("throne-detail")
  .addEventListener("click", function (e) {
    if (e.target === this) closeThroneModal();
  });

const ramseesTriptychOverlay = document.getElementById(
  "ramseesTriptychOverlay",
);
const ramseesTriptychOverlayImg = document.getElementById(
  "ramseesTriptychOverlayImg",
);
const ramseesTriptychCards = document.querySelectorAll(
  ".ramsees-triptych .poster-card",
);

function openRamseesTriptychImage(src, alt) {
  if (!ramseesTriptychOverlayImg || !ramseesTriptychOverlay) return;
  ramseesTriptychOverlayImg.src = src;
  ramseesTriptychOverlayImg.alt = alt;
  ramseesTriptychOverlay.classList.add("open");
}

function closeRamseesTriptychOverlay() {
  if (ramseesTriptychOverlay) {
    ramseesTriptychOverlay.classList.remove("open");
  }
}

ramseesTriptychCards.forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    if (img) {
      openRamseesTriptychImage(img.src, img.alt);
    }
  });
});

if (ramseesTriptychOverlay) {
  ramseesTriptychOverlay.addEventListener("click", (e) => {
    if (e.target === ramseesTriptychOverlay) {
      closeRamseesTriptychOverlay();
    }
  });
}

const overlayClose = document.querySelector(".overlay-close");
if (overlayClose) {
  overlayClose.addEventListener("click", closeRamseesTriptychOverlay);
}

// Keyboard ESC to close
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closePoster();
    closeRamseesTriptychOverlay();
  }
});

// ── Smooth section navigation without reload ──
const pageNavLinks = document.querySelectorAll("nav a[href^='#']");
pageNavLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetHash = link.getAttribute("href");
    document.querySelector(targetHash)?.scrollIntoView({ behavior: "smooth" });
    history.pushState(null, "", targetHash);
  });
});

// ── Scroll reveal for sections ──
const revealSections = document.querySelectorAll("section");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.18,
    rootMargin: "-10% 0px -10% 0px",
  },
);

revealSections.forEach((section) => {
  section.classList.add("reveal");
  revealObserver.observe(section);
});

const themeToggle = document.getElementById("themeToggle");
const audioToggle = document.getElementById("audioToggle");
const backgroundAudio = document.getElementById("backgroundAudio");

function applyTheme(theme) {
  document.body.setAttribute("data-theme", theme);
  if (themeToggle) {
    themeToggle.setAttribute("aria-pressed", String(theme === "light"));
    themeToggle.textContent = theme === "light" ? "Dark Mode" : "Light Mode";
    themeToggle.setAttribute(
      "aria-label",
      theme === "light" ? "Switch to dark mode" : "Switch to light mode",
    );
  }
  localStorage.setItem("site-theme", theme);
}

if (themeToggle) {
  themeToggle.addEventListener("click", () => {
    const nextTheme =
      document.body.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(nextTheme);
  });
}

const savedTheme = localStorage.getItem("site-theme");
const initialTheme = savedTheme || "dark";
applyTheme(initialTheme);

function updateAudioToggle() {
  if (!audioToggle || !backgroundAudio) return;
  const isPlaying = !backgroundAudio.paused;
  audioToggle.classList.toggle("active", isPlaying);
  audioToggle.setAttribute("aria-pressed", String(isPlaying));
  audioToggle.title = isPlaying ? "Mute sound" : "Play sound";
}

if (audioToggle && backgroundAudio) {
  audioToggle.addEventListener("click", () => {
    if (backgroundAudio.paused) {
      backgroundAudio.play().catch(() => {
        // Autoplay may be blocked; allow toggle state only after interaction
      });
    } else {
      backgroundAudio.pause();
    }
    updateAudioToggle();
  });
}

updateAudioToggle();
