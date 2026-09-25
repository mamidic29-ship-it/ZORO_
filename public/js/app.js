const navItems = document.querySelectorAll(".nav-item");

navItems.forEach((item) => {
  item.addEventListener("click", () => {

    const page = item.dataset.page;

    if (page === "chat") {
      window.location.href = "/pages/chat.html";
    }

    if (page === "vision") {
      window.location.href = "/pages/vision.html";
    }

    if (page === "settings") {
      window.location.href = "/pages/settings.html";
    }

  });
}); 
