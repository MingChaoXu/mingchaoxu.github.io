const root = document.documentElement;
const languageButtons = document.querySelectorAll("[data-set-language]");
const menuButton = document.querySelector(".menu-button");
const primaryNavigation = document.querySelector(".primary-nav");
const navigationLinks = document.querySelectorAll('.primary-nav a[href^="#"]');

const pageMetadata = {
  en: {
    title: "Mingchao Xu — Applied AI Researcher",
    description:
      "Mingchao Xu is an applied AI researcher and engineer working on multimodal language models, autonomous-driving perception, and computer vision.",
  },
  zh: {
    title: "许铭潮 — 应用 AI 算法研究员",
    description:
      "许铭潮专注于多模态大模型、自动驾驶感知与计算机视觉，推动 AI 算法研究在真实业务中的落地。",
  },
};

function setLanguage(language, persist = true) {
  const nextLanguage = language === "zh" ? "zh" : "en";
  root.lang = nextLanguage === "zh" ? "zh-CN" : "en";
  root.dataset.language = nextLanguage;
  document.title = pageMetadata[nextLanguage].title;
  document.querySelector('meta[name="description"]').content = pageMetadata[nextLanguage].description;

  languageButtons.forEach((button) => {
    const isActive = button.dataset.setLanguage === nextLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (persist) localStorage.setItem("preferred-language", nextLanguage);
}

const storedLanguage = localStorage.getItem("preferred-language");
const browserLanguage = navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en";
setLanguage(storedLanguage || browserLanguage, false);

languageButtons.forEach((button) => {
  button.addEventListener("click", () => setLanguage(button.dataset.setLanguage));
});

function closeMenu() {
  menuButton.setAttribute("aria-expanded", "false");
  primaryNavigation.classList.remove("is-open");
}

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  primaryNavigation.classList.toggle("is-open", !isOpen);
});

navigationLinks.forEach((link) => link.addEventListener("click", closeMenu));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});

const observedSections = document.querySelectorAll("#about, #news, #projects, #publications, #experience");

if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navigationLinks.forEach((link) => {
          link.classList.toggle("is-active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    },
    { rootMargin: "-25% 0px -65% 0px" },
  );

  observedSections.forEach((section) => sectionObserver.observe(section));
}

document.querySelector("#current-year").textContent = new Date().getFullYear();
