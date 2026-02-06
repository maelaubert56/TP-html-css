//*//Pour ce que j'ai retiré
//cor = partie corrigé

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

let current = 0;
const total = slides.length;

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

/* Flèche droite */
if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    //Du coup ça on enlève
    // nextBtn.classList.add("is-clicked");
    // setTimeout(() => nextBtn.classList.remove("is-clicked"), 300);
    goToSlide(current + 1);
    reset();
  });
}

/* Flèche gauche */
if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    //Pareil ici
    // prevBtn.classList.add("is-clicked");
    // setTimeout(() => prevBtn.classList.remove("is-clicked"), 300);
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

//créé un interval auquel on donne un nom pour pouvoir le reset plus tard
const autoplay = setInterval(() => {
  goToSlide(current + 1);
}, 5000);

function reset() {
  //annule l'interval 'autoplay'
  clearInterval(autoplay);
  //réaffirme la valeur d'autoplay à sa valeur de base
  autoplay = setInterval(() => {
    goToSlide(current + 1);
  }, 5000);
}
/* Init slider */
goToSlide(0);

//Bon, pour le slider je vais pas vous mentir, le js est immonde
//Tout se répète, rien n'est défini dans une fonction claire et y'a des trucs qui servent à rien
//Du coup j'ai déjà réarrangé le css mais pour le js j'avais vraiment la flemme
//En soi, la fonction goToSlide et la logique pour la sélection au click et bonne
//Mais y'avait pas de setInterval pour passer automatiquement à la slide suivante
//Là j'ai juste créé l'autoplay, qui, étant un intervalle, va juste lancé son interval même si c'est une variable
//L'autoplay utilise donc la même logique que les addEventListener au click
//Et reset() sert à relancer l'intervalle quand tu cliques sur les puces ou sur les flèches
//Si j'avais été moins flemmard j'aurais tout commenter et refais une belle fonction au propre pour ne rien répéter mais là ce code me fait honnêtement mal aux yeux, au crane, et à l'âme
//Pour la théorie, on aurait pu faire une grosse fonction qui englobe toute les autres et l'appelait une seule fois
//On aurait également pu fusionner le if(prev), if(next) et le dots.forEach en une seule fonction aussi

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

//Même chose, c'est beaucoup de lignes pour unn truc qui peut se régler bien plus simplement
//Mais ça marche, donc je vais rien dire

/* ===== HEADER CHANGE AU SCROLL ===== */
document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
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

  //C'est pareil, y'a beaucoup de ligne qui sont pas forcément utile mais bon ça marche et on vous en demande pas plus
});
