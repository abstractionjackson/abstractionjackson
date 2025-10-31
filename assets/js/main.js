// Main JavaScript entry point
import Alpine from "alpinejs";

//
window.Alpine = Alpine;

//
Alpine.data("banner", () => ({
  show: true,
  content: "Hurry Up, Please; It's Time.",
  init() {
    const hide = localStorage.getItem("banner::hide");
    if (hide) {
      const { hiddenAt } = JSON.parse(hide);
      const hiddentAtTime = new Date(hiddenAt).getTime(),
        currentTime = new Date().getTime();
      // If not elapsed 24hr
      if (currentTime - hiddenAtTime < 1000 * 60 * 60 * 24) {
        show = false;
      }
    }
  },
  dismiss() {
    const hide = {
      hiddenAt: new Date().toISOString(),
    };
    localStorage.setItem("banner::hide", hide);
    this.show = false;
  },
}));

//
Alpine.start();
