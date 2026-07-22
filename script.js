const menuButton = document.querySelector(".menu-button");
const primaryNavigation = document.querySelector(".primary-nav");
const navigationLinks = document.querySelectorAll('.primary-nav a[href^="#"]');

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
