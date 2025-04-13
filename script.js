// Parse farm name from URL
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const farmId = params.get("farm");

  // Dummy farm data
  const farms = {
    "big-lake-ranch": {
      logo: "images/biglakeranch.jpg",
      name: "Big Lake Ranch",
      location: ["", "Chetwynd, BC"],
      website: "https://www.facebook.com/profile.php?id=100057530045962#",
      products: ["<span>🥩 Beef</span>", "<span>🥔 Potatoes</span>"],
      description:
        "Big Lake Ranch is a multi-generational, Nichols family farm near Chetwynd, BC. We specialize in healthy, happy, grass-fed Black and Red Angus Beef, delicious produce and other unique and yummy seasonal farm products!",
      hours: ["Sun-Fri: Appointment Only", "Sat: Closed"],
      images: [""],
    },
    "lilac-acres": {
      logo: "images/logo.jpg",
      name: "Lilac Acres Farm",
      location: ["250-401-3117", "Chetwynd, BC"],
      website: "https://ixoekea.github.io/lilacacresfarm/",
      products: [
        "<span>🧄 Garlic</span>",
        "<span>🍅 Tomatoes</span>",
        "<span>🥔🌻 Jerusalem Artichoke</span>",
      ],
      description:
        "Lilac Acres Farm is a family-run farm offering garlic and tomatoes",
      hours: ["Sun-Fri: Appointment Only", "Sat: Closed"],
      images: [
        "images/Lilacacres-persian-star.jpg",
        "images/woodchips.jpg",
        "images/lilacs.jpg",
      ],
    },
    "kealy-farm": {
      logo: "images/comingsoon.jpg",
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
      images: ["images/comingsoon.jpg"],
    },
  };

  //let currentIndex = 0;

  //function changeImage(farmId) {
  //  const farm = farms[farmId];
  // if (farm) {
  //   currentIndex = (currentIndex + 1) % farm.images.length; // Loop through the images array
  //     document.getElementById("farm-gallery").src = farm.images[currentIndex];
  //   }
  // }

  // Change the image every 3 seconds for a specific farm
  //setInterval(() => changeImage("lilac-acres"), 3000);

  // Set the initial image when the page loads
  //changeImage("lilac-acres");

  // Load farm info
  if (farmId) {
    const farm = farms[farmId];
    if (farm) {
      sessionStorage.setItem("currentFarm", JSON.stringify(farm));

      document.getElementById("farm-name").textContent = farm.name;
      document.getElementById("farm-logo").src = farm.logo;
      document.getElementById("farm-location").innerHTML =
        farm.location.join(`<br>`);
      document.getElementById("farm-products").innerHTML =
        farm.products.join(" ");
      document.getElementById("farm-description").textContent =
        farm.description;
      document.getElementById("farm-hours").innerHTML = farm.hours.join(`<br>`);
      //  document.getElementById("farm-images").src = farm.images;
      // Update the website link dynamically
      const websiteLink = document.getElementById("farm-website");
      websiteLink.href = farm.website;
      websiteLink.textContent = "Visit " + farm.name; // Dynamically change the link text
    } else {
      document.getElementById("farm-name").textContent = "Farm not found.";
    }
  }
});

//Stores Previous Page Data
window.onload = function () {
  // Check if farm data is stored in sessionStorage
  const storedFarmData = sessionStorage.getItem("currentFarm");

  if (storedFarmData) {
    const farm = JSON.parse(storedFarmData);

    document.getElementById("farm-name").textContent = farm.name;
    document.getElementById("farm-logo").src = farm.logo;
    document.getElementById("farm-location").innerHTML =
      farm.location.join(`<br>`);
    document.getElementById("farm-products").innerHTML =
      farm.products.join(" ");
    document.getElementById("farm-description").textContent = farm.description;
    document.getElementById("farm-hours").innerHTML = farm.hours.join(`<br>`);
    //   document.getElementById("farm-images").src = farm.images;
    document.getElementById("farm-website").href = farm.website;
    document.getElementById("farm-website").textContent = "Visit " + farm.name;
  } else {
    document.getElementById("farm-name").textContent = "Farm not found.";
  }
};

// Signup form
document
  .getElementById("farm-signup-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const formData = new FormData(e.target); // includes file too!

    // Optional: for debugging text fields only
    console.log("Text fields:", {
      name: formData.get("farmName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      location: formData.get("location"),
      website: formData.get("website"),
      product: formData.get("product"),
      logo: formData.get("logo")?.name,
    });

    try {
      const response = await fetch("https://farmpage.onrender.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      alert("Farm submitted successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
      alert("There was an error submitting the form.");
    }
  });
