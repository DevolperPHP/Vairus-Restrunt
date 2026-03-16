document.addEventListener("DOMContentLoaded", () => {
  console.log("مطعم وايرس جيمنج - جاهز!");

  const fileInput = document.getElementById("item-image");
  const fileLabel = document.querySelector(".file-input-label");

  if (fileInput && fileLabel) {
    fileLabel.addEventListener("click", function (e) {
      e.preventDefault();
      fileInput.click();
    });
  }

  // Admin items search & filter
  const searchInput = document.getElementById("item-search");
  const categoryFilter = document.getElementById("category-filter");

  if (searchInput && categoryFilter) {
    const itemCards = document.querySelectorAll(".item-card-admin");
    const itemsCount = document.getElementById("items-count");
    const noResults = document.getElementById("no-results");
    const itemsGrid = document.querySelector(".items-grid-admin");
    const totalCount = itemCards.length;

    function filterItems() {
      const searchText = searchInput.value.toLowerCase().trim();
      const selectedCategory = categoryFilter.value;
      let visibleCount = 0;

      itemCards.forEach((card) => {
        const name = (card.dataset.itemName || "").toLowerCase();
        const category = card.dataset.itemCategory || "";

        const matchesName = !searchText || name.includes(searchText);
        const matchesCategory =
          !selectedCategory || category === selectedCategory;

        if (matchesName && matchesCategory) {
          card.style.display = "";
          visibleCount++;
        } else {
          card.style.display = "none";
        }
      });

      if (itemsCount) {
        itemsCount.textContent =
          visibleCount === totalCount
            ? totalCount + " منتج"
            : visibleCount + " من " + totalCount + " منتج";
      }

      if (noResults && itemsGrid) {
        if (visibleCount === 0 && totalCount > 0) {
          noResults.style.display = "block";
          itemsGrid.style.display = "none";
        } else {
          noResults.style.display = "none";
          if (totalCount > 0) itemsGrid.style.display = "";
        }
      }
    }

    searchInput.addEventListener("input", filterItems);
    categoryFilter.addEventListener("change", filterItems);
  }
});

function toggleDropdown() {
  const dropdown = document.querySelector(".nav-dropdown");
  dropdown.classList.toggle("active");
}

document.addEventListener("click", (event) => {
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  if (dropdown && dropdownToggle) {
    if (
      !dropdown.contains(event.target) &&
      !dropdownToggle.contains(event.target)
    ) {
      dropdown.classList.remove("active");
    }
  }
});

function previewImage(input) {
  console.log("previewImage called", input.files);
  if (input.files && input.files[0]) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const preview = document.getElementById("imagePreview");
      const previewImg = document.getElementById("previewImg");
      const fileLabel = document.querySelector(".file-input-label");

      if (preview && previewImg && fileLabel) {
        previewImg.src = e.target.result;
        preview.style.display = "block";
        fileLabel.style.display = "none";
        console.log("Image preview shown");
      } else {
        console.error("Elements not found", { preview, previewImg, fileLabel });
      }
    };
    reader.onerror = function (error) {
      console.error("FileReader error", error);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

function removeImage() {
  const input = document.getElementById("item-image");
  const preview = document.getElementById("imagePreview");
  const fileLabel = document.querySelector(".file-input-label");

  if (input && preview && fileLabel) {
    input.value = "";
    preview.style.display = "none";
    fileLabel.style.display = "flex";
    console.log("Image removed");
  }
}
