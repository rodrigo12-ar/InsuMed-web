
// main.js

// Menú responsive
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('mainNav');
toggle?.addEventListener('click', () => {
  nav.classList.toggle('active');
});

// Botón de scroll hacia arriba
const btnScroll = document.getElementById("btnScrollTop");
window.addEventListener("scroll", () => {
  btnScroll.style.display = window.scrollY > 300 ? "block" : "none";
});
btnScroll?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});
