const siteHeader = document.querySelector(".site-header");
const navToggle = document.querySelector("[data-nav-toggle]");
const siteNav = document.querySelector("[data-site-nav]");

if (siteHeader) {
  const syncHeaderShadow = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 12);
  };
  syncHeaderShadow();
  window.addEventListener("scroll", syncHeaderShadow, { passive: true });
}

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });
}

const featureTabs = [...document.querySelectorAll("[data-feature-tab]")];
const featurePanels = [...document.querySelectorAll("[data-feature-panel]")];

function activateTab(tab) {
  const target = tab.dataset.featureTab;

  featureTabs.forEach((item) => {
    item.setAttribute("aria-selected", String(item === tab));
  });

  featurePanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.featurePanel === target);
  });
}

featureTabs.forEach((tab, index) => {
  tab.addEventListener("click", () => activateTab(tab));
  tab.addEventListener("keydown", (event) => {
    if (event.key !== "ArrowRight" && event.key !== "ArrowLeft") return;
    event.preventDefault();
    const nextIndex = event.key === "ArrowRight"
      ? (index + 1) % featureTabs.length
      : (index - 1 + featureTabs.length) % featureTabs.length;
    featureTabs[nextIndex].focus();
    activateTab(featureTabs[nextIndex]);
  });
});

const revealItems = [...document.querySelectorAll(".reveal")];
if ("IntersectionObserver" in window && revealItems.length) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.04 }
  );
  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
