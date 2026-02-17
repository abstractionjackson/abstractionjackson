const adjectives = [
  "San Francisco",
  "Full-Stack",
  "C",
  "Python",
  "Go",
];

let current = 0;

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hero h1 .adjective");
  if (!el) return;

  setInterval(() => {
    el.classList.remove("visible");
    el.classList.add("hidden");

    setTimeout(() => {
      current = (current + 1) % adjectives.length;
      el.textContent = adjectives[current];
      el.classList.remove("hidden");
      el.classList.add("visible");
    }, 400); // matches fade-out duration
  }, 3000);

  // initialise visible state
  el.classList.add("visible");
});
