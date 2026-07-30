(function () {
  const STORAGE_KEY = "portfolio-theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.textContent =
        theme === "dark" ? "\u2600\uFE0F Light Mode" : "\u{1F319} Dark Mode";
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
      );
    }
  }

  const saved = localStorage.getItem(STORAGE_KEY);
  const prefersDark =
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches;
  applyTheme(saved || (prefersDark ? "dark" : "light"));

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const next =
        root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }

  if (window.matchMedia) {
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
          applyTheme(e.matches ? "dark" : "light");
        }
      });
  }

  const menuIcon = document.querySelector(".menu-icon");
  const navLinks = document.querySelector(".nav-links");
  if (menuIcon && navLinks) {
    menuIcon.addEventListener("click", function () {
      navLinks.classList.toggle("open");
    });
  }
})();
