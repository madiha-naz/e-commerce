document.addEventListener("DOMContentLoaded", function () {
  const navItems = document.querySelectorAll(".nav-item");

  navItems.forEach(item => {
    item.addEventListener("mouseenter", () => {
      item.classList.add("active");
    });
    item.addEventListener("mouseleave", () => {
      item.classList.remove("active");
    });
  });
});