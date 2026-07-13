const navLinks = document.querySelectorAll(".nav-link");

const targetIds = Array.from(navLinks).map((link) =>
  link.getAttribute("href").replace("#", "").trim(),
);
const sections = targetIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);

function getAbsoluteTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

function updateActiveLink() {
  const scrollPos = window.scrollY + 150;
  let current = ""; // default kosong: saat di Beranda, tidak ada yang aktif

  sections.forEach((section) => {
    if (scrollPos >= getAbsoluteTop(section)) {
      current = section.id;
    }
  });

  if (
    window.innerHeight + window.scrollY >=
    document.documentElement.scrollHeight - 5
  ) {
    current = sections[sections.length - 1].id;
  }

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (current !== "" && link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveLink);
updateActiveLink();

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.15 },
);

document
  .querySelectorAll(".fade-in")
  .forEach((el) => revealObserver.observe(el));