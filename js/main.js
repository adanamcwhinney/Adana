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
    const submitBtn = mailForm.querySelector('button[type="submit"]');

    mailForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      submitBtn.disabled = true;
      note.dataset.state = "pending";
      note.textContent = "Sending…";

      try {
        const response = await fetch(mailForm.action, {
          method: "POST",
          body: new FormData(mailForm),
          headers: { Accept: "application/json" },
        });

        if (response.ok) {
          note.dataset.state = "success";
          note.textContent = "You're on the list — thank you!";
          mailForm.reset();
        } else {
          const data = await response.json().catch(() => null);
          const message = data?.errors?.map((e) => e.message).join(", ");
          note.dataset.state = "error";
          note.textContent = message || "Something went wrong — please try again.";
        }
      } catch {
        note.dataset.state = "error";
        note.textContent = "Something went wrong — please try again.";
      } finally {
        submitBtn.disabled = false;
      }
    });
  }
});
