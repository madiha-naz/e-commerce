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
var $grid = $('.grid').isotope({
  layoutMode: 'fitRows'
});
// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
