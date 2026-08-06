// Photo credits, used anywhere on the site a photo needs a "Photo: @handle" caption.
//
// To credit a photo:
//   1. Wrap its <img> in a <figure> with a <figcaption class="photo-credit"></figcaption>,
//      and give the <img> a data-photo="some-filename.jpg" attribute (see the Gallery
//      and About section in index.html for examples).
//   2. Add a "some-filename.jpg": { name, handle, url } entry below, or point it
//      at an existing photographer object (like GABBY_Q) if they took multiple photos.
// Images without a matching entry simply render no caption.
const GABBY_Q = { name: "Gabby Q", handle: "@geqfilmm", url: "https://www.instagram.com/geqfilmm" };

const photoCredits = {
  "stage-purple.jpg": GABBY_Q,
  "close-up-1.jpg": GABBY_Q,
  "gig-6A3A4645.jpg": GABBY_Q,
  "about-6A3A4395.jpg": GABBY_Q,
  "red-blue.jpg": GABBY_Q,
  "vanity-square.jpg": GABBY_Q,
  "adana-guitar.jpg": GABBY_Q,
  "close-up-3.jpg": GABBY_Q,
  "moon-4g.jpeg": GABBY_Q,
};

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

  document.querySelectorAll("img[data-photo]").forEach((img) => {
    const caption = img.closest("figure")?.querySelector(".photo-credit");
    const credit = photoCredits[img.dataset.photo];
    if (!credit || !caption) return;

    caption.textContent = "Photo: ";
    const link = document.createElement("a");
    link.href = credit.url;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = credit.handle;
    caption.appendChild(link);
  });

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
