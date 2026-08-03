document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");

  if (toggle && links) {
    toggle.addEventListener("click", () => {
      const isOpen = links.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });

    links.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        links.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const mailForm = document.querySelector(".mail-form");
  if (mailForm) {
    const note = mailForm.querySelector(".mail-note");
    mailForm.addEventListener("submit", (event) => {
      // Swap this handler for a real submit once the mailing-list provider endpoint is set on the <form action>.
      event.preventDefault();
      const email = mailForm.querySelector('input[type="email"]').value;
      if (!email) return;
      note.dataset.state = "success";
      note.textContent = "You're on the list — thank you!";
      mailForm.reset();
    });
  }
});
