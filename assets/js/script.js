/* ================= BURGER ================= */
const burger = document.querySelector(".burger");
const mobileMenu = document.querySelector("#mobileMenu");

if (burger && mobileMenu) {
  burger.addEventListener("click", () => {
    const isOpen = mobileMenu.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(isOpen));
  });

  // Fermer le menu quand on clique sur un lien
  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    });
  });

  // Fermer si on clique en dehors
  document.addEventListener("click", (e) => {
    const clickedInside =
      mobileMenu.contains(e.target) || burger.contains(e.target);

    if (!clickedInside) {
      mobileMenu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
    }
  });
}

/* ================= SLIDER ================= */
const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".slide");
const prevBtn = document.querySelector(".slider-arrow.prev");
const nextBtn = document.querySelector(".slider-arrow.next");
const dots = document.querySelectorAll(".dot");

if (track && slides.length > 0) {
  let current = 0;
  const total = slides.length;
  let autoplay;

  function goToSlide(index) {
    if (index < 0) {
      current = total - 1;
    } else if (index >= total) {
      current = 0;
    } else {
      current = index;
    }

    track.style.transform = `translateX(-${current * 100}%)`;

    dots.forEach((dot) => dot.classList.remove("is-active"));
    if (dots[current]) dots[current].classList.add("is-active");
  }

  function reset() {
    clearInterval(autoplay);
    autoplay = setInterval(() => {
      goToSlide(current + 1);
    }, 5000);
  }

  /* Flèche droite */
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(current + 1);
      reset();
    });
  }

  /* Flèche gauche */
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(current - 1);
      reset();
    });
  }

  /* Puces */
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      goToSlide(index);
      reset();
    });
  });

  /* Init slider et autoplay */
  goToSlide(0);
  autoplay = setInterval(() => {
    goToSlide(current + 1);
  }, 5000);
}

/* ================= PROJETS (FILTRE) ================= */
const tabs = document.querySelectorAll(".projects-tab");
const items = document.querySelectorAll(".project-item");

function filterProjects(filter) {
  items.forEach((img) => {
    const tags = (img.dataset.tags || "").split(" ");
    const show = filter === "tout" ? true : tags.includes(filter);
    img.classList.toggle("is-hidden", !show);
  });
}

tabs.forEach((btn) => {
  btn.addEventListener("click", () => {
    tabs.forEach((t) => t.classList.remove("is-active"));
    btn.classList.add("is-active");
    filterProjects(btn.dataset.filter);
  });
});

/* état initial */
filterProjects("tout");

/* ===== HEADER CHANGE AU SCROLL ===== */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector("header");
  const logoImg = document.querySelector(".logo img");

  if (!header) return;

  const LOGO_BLUE = "assets/img/logo.svg";
  const LOGO_BLACK = "assets/img/logo-black.svg";

  function updateHeaderOnScroll() {
    const scrolled = window.scrollY > 20;
    header.classList.toggle("is-scrolled", scrolled);

    if (logoImg) {
      logoImg.src = scrolled ? LOGO_BLACK : LOGO_BLUE;
    }
  }

  window.addEventListener("scroll", updateHeaderOnScroll, { passive: true });
  updateHeaderOnScroll();
});
