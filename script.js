// Parse farm name from URL
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const farmId = params.get("farm");

  //Gallery
  let currentImageIndex = 0;
  let currentGallery = [];

  // Dummy farm data
  const farms = {
    "lilac-acres": {
      images: "images/logo.jpg",
      name: "Lilac Acres Farm",
      location: ["250-401-3117", "Chetwynd, BC"],
      products: [
        "<span>🧄 Garlic</span>",
        "<span>🍅 Tomatoes</span>",
        "<span>🥔🌻 Jerusalem Artichoke</span>",
      ],
      description:
        "Lilac Acres Farm is a family-run farm offering garlic and tomatoes",
      hours: ["Sun-Fri: Appointment Only", "Sat: Closed"],
      gallery: "images/Lilacacres-persian-star.jpg",
    },
    "kealy-farm": {
      images: "images/comingsoon.jpg",
      name: "Kealy Farm",
      location: ["Cecil Lake, BC"],
      products: [
        "<span>🥩 Beef</span>",
        "<span>🪿 Geese</span>",
        "<span>🐐 Goats</span>",
        "<span>🥬 Vegetables</span>",
      ],
      description: "Animal and produce farm",
      hours: ["Sun-Sat: Appointment Only"],
      gallery: "images/comingsoon.jpg",
    },
  };

  // Load farm info
  if (farmId) {
    const farm = farms[farmId];
    if (farm) {
      document.getElementById("farm-name").textContent = farm.name;
      document.getElementById("farm-location").innerHTML =
        farm.location.join(`<br>`);
      document.getElementById("farm-products").innerHTML =
        farm.products.join(" ");
      document.getElementById("farm-description").textContent =
        farm.description;
      document.getElementById("farm-hours").innerHTML = farm.hours.join(`<br>`);
      document.getElementById("farm-image").src = farm.images;
      document.getElementById("farm-gallery").src = farm.gallery;
    } else {
      document.getElementById("farm-name").textContent = "Farm not found.";
    }
  }
});
