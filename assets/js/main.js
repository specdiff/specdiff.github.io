(() => {
  const toggle = document.querySelector(".nav__toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const next = !nav.classList.contains("is-open");
      nav.classList.toggle("is-open", next);
      toggle.setAttribute("aria-expanded", String(next));
    });

    nav.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLAnchorElement) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  const copyButtons = document.querySelectorAll(".js-copy");
  copyButtons.forEach((btn) => {
    btn.addEventListener("click", async () => {
      const selector = btn.getAttribute("data-copy-target");
      if (!selector) return;
      const el = document.querySelector(selector);
      if (!el) return;
      const text = el.textContent || "";
      try {
        await navigator.clipboard.writeText(text);
        const prev = btn.textContent;
        btn.textContent = "Copied";
        btn.disabled = true;
        window.setTimeout(() => {
          btn.textContent = prev;
          btn.disabled = false;
        }, 900);
      } catch {
        // Clipboard API can be blocked; fall back to selection.
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    });
  });
})();

