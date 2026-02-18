const adjectives = [
  "San Francisco",
  "Full-Stack",
  "C",
  "Python",
  "Go",
  // "Agile",
  "✨AI",
  // "Systems",
  // "Web",
  // "Front-End",
  // "React",
  "HTML",
  "CSS",
  "JS",
];

let current = 0;

// Apply custom styles based on adjective content
function applyAdjectiveStyles(element, text) {
  // Reset all custom styles first
  element.style.color = "";
  element.style.fontWeight = "";
  element.style.textShadow = "";
  element.style.fontFamily = "";
  element.style.fontStyle = "";
  element.style.backgroundColor = "";
  element.style.border = "";

  // Set default text content first
  element.textContent = text;

  // Apply custom styles based on content (may override textContent with innerHTML)
  switch (text) {
    case "C":
      // element.style.fontFamily = "monospace";
      break;
    case "Go":
      element.style.color = "#00ADD8";
      element.style.fontStyle = "italic";
      break;
    case "Python":
      element.style.color = "#3776ab";
      break;
    case "HTML":
      element.style.fontFamily = "monospace";
      element.textContent = `<${text} />`;
      break;
    case "CSS":
      // Special animation: wrap last letter in span for hanging effect
      const letters = text.split("");
      const lastLetter = letters.pop();
      element.innerHTML =
        letters.join("") + `<span class="hanging-letter">${lastLetter}</span>`;
      break;
    case "JS":
      element.style.backgroundColor = "#F0DB4F";
      element.style.color = "black";
      break;
    case "React":
      element.style.color = "#58C4DC";
      break;
    case "✨AI":
      element.style.textShadow = "0 0 10px rgba(255, 107, 157, 0.5)";
      break;
    // Add more custom styles as needed
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector(".hero h1 .adjective");
  if (!el) return;

  setInterval(() => {
    el.classList.remove("visible");
    el.classList.add("hidden");

    setTimeout(() => {
      // Pick a random index that's different from current
      let next;
      do {
        next = Math.floor(Math.random() * adjectives.length);
      } while (next === current && adjectives.length > 1);

      current = next;
      const newText = adjectives[current];
      applyAdjectiveStyles(el, newText);
      el.classList.remove("hidden");
      el.classList.add("visible");
    }, 400); // matches fade-out duration
  }, 3000);

  // initialise visible state
  applyAdjectiveStyles(el, adjectives[current]);
  el.classList.add("visible");
});
