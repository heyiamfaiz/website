/* ===============================
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

const tabs = document.querySelectorAll('.tab');
const cards = document.querySelectorAll('.service-card');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const type = tab.dataset.type;

    // tab active state
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    cards.forEach(card => {
  const cardTypes = card.dataset.type.split(',').map(t => t.trim());

  if (type === 'all' || cardTypes.includes(type)) {
    card.style.removeProperty('display'); // ✅ SHOW (use CSS default)
  } else {
    card.style.display = 'none'; // ❌ HIDE
  }
});
