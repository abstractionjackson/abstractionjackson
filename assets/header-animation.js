document.addEventListener("DOMContentLoaded", function () {
  const branding = document.querySelector(".branding");

  if (!branding) return;

  const text = branding.textContent;
  branding.innerHTML = "";

  text.split("").forEach((char, index) => {
    const span = document.createElement("span");
    span.textContent = char;
    span.className = "letter";
    span.style.animationDelay = `${index * 0.05}s`;
    let mR = 7;
    // the last 7 letters are a word
    if (index >= text.length - 7) {
      mR = 3;
      span.classList.add("neutral");
      span.style.fontWeight = 400;
    }
    span.style.marginRight = `${mR}px`;
    branding.appendChild(span);
  });

  // Calculate when branding animation finishes
  const brandingDelay = (text.length - 1) * 0.05 + 0.6;

  // Animate menu items
  const menuItems = document.querySelectorAll("nav ul:last-child li");
  menuItems.forEach((item, index) => {
    item.classList.add("menu-item");
    item.style.animationDelay = `${brandingDelay + index * 0.1}s`;
  });
});
