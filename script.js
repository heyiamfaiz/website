<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Faiz",
  "jobTitle": "Digital Strategist",
  "description": "I will help you creating an online marketing strategy, which makes you achieve your both professional and personal goals.",
  "url": "https://heyiamfaiz.com/",
  "image": "https://heyiamfaiz.com/logo.jpg",
  "sameAs": [
    "https://www.youtube.com/@heyiamfaiz",
    "https://www.instagram.com/heyiamfaiz"
  ],
  "knowsAbout": [
    "Digital Marketing",
"online marketing",
    "Meta Ads",
    "WhatsApp API",
    "Online Marketing Strategy",
    "Content Marketing",
    "WooCommerce"
  ],
  "worksFor": {
    "@type": "Organization",
    "name": "Self-employed"
  }
}
</script>/*
   ===============================
   DARK MODE — CORRECT & RELIABLE
================================ */

const toggleBtn = document.getElementById("theme-toggle");
const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

function applyTheme(theme) {
  if (theme === "dark") {
    document.body.classList.add("dark");
    toggleBtn.textContent = "☀️";
  } else {
    document.body.classList.remove("dark");
    toggleBtn.textContent = "🌙";
  }
}

// 1️⃣ INITIAL LOAD — system or saved preference
const savedTheme = localStorage.getItem("theme");

if (savedTheme) {
  applyTheme(savedTheme);
} else {
  applyTheme(mediaQuery.matches ? "dark" : "light");
}

// 2️⃣ MANUAL TOGGLE — overrides system
toggleBtn.addEventListener("click", () => {
  const isDark = document.body.classList.contains("dark");
  const newTheme = isDark ? "light" : "dark";

  applyTheme(newTheme);
  localStorage.setItem("theme", newTheme);
});

// 3️⃣ SYSTEM THEME CHANGE — ONLY if user never toggled
mediaQuery.addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    applyTheme(e.matches ? "dark" : "light");
  }
});

/* ===============================
   TABS FILTERING
================================ */

const tabs = document.querySelectorAll(".tab");
const cards = document.querySelectorAll(".service-card");

tabs.forEach(tab => {
  tab.addEventListener("click", () => {
    tabs.forEach(t => t.classList.remove("active"));
    tab.classList.add("active");

    const filter = tab.dataset.filter;

    cards.forEach(card => {
      card.style.display =
        filter === "all" || card.dataset.type === filter
          ? "block"
          : "none";
    });
  });
});
