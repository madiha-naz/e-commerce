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

  const load = key => {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (error) {
      console.error(`Could not load ${key}.`, error);
      return [];
    }
  };

  const favorites = load("ecommerce-wishlist");
  const cart = load("ecommerce-cart");
  const wishlistCount = document.getElementById("wishlist-count");
  const cartLink = document.querySelector('.nav-icon-link[href="cart.html"]');
  const cartCount = document.createElement("span");

  cartCount.id = "cart-count";
  if (cartLink) cartLink.appendChild(cartCount);

  const updateCounts = () => {
    if (wishlistCount) wishlistCount.textContent = favorites.length;
    cartCount.textContent = cart.reduce(
      (count, item) => count + (item.quantity || 1),
      0
    );
  };

  document.querySelectorAll(".product-card").forEach(card => {
    const id = card.querySelector("img")?.getAttribute("src");

    card.querySelectorAll(".wishlist-btn .material-symbols-outlined").forEach(icon => {
      icon.addEventListener("click", () => {
        const list = icon.textContent.trim() === "favorite" ? favorites : cart;

        if (list === favorites) {
          const index = favorites.indexOf(id);
          if (index === -1) favorites.push(id);
          else favorites.splice(index, 1);
          localStorage.setItem("ecommerce-wishlist", JSON.stringify(favorites));
        } else {
          const product = cart.find(item => item.id === id);
          if (product) product.quantity++;
          else cart.push({
            id,
            name: card.querySelector("h2")?.textContent.trim() || "Product",
            price: Number(card.dataset.price) || 0,
            quantity: 1
          });
          localStorage.setItem("ecommerce-cart", JSON.stringify(cart));
        }

        updateCounts();
      });
    });
  });

  updateCounts();
});
var $grid = $('.grid').isotope({
  layoutMode: 'fitRows'
});
// filter items on button click
$('.filter-button-group').on( 'click', 'button', function() {
  var filterValue = $(this).attr('data-filter');
  $grid.isotope({ filter: filterValue });
});
