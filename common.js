// Custom Cursor - Horizontal and Vertical Lines with Circles
document.addEventListener("DOMContentLoaded", () => {
  const cursorHorizontal = document.getElementById("customCursorHorizontal");
  const cursorVertical = document.getElementById("customCursorVertical");
  const cursorOuterCircle = document.getElementById("customCursorOuterCircle");
  const cursorInnerCircle = document.getElementById("customCursorInnerCircle");

  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Update horizontal line position
    cursorHorizontal.style.top = `${mouseY}px`;
    cursorHorizontal.style.transform = `translateY(-50%)`;

    // Update vertical line position
    cursorVertical.style.left = `${mouseX}px`;
    cursorVertical.style.transform = `translateX(-50%)`;

    // Update circles positions - to follow mouse
    cursorOuterCircle.style.left = `${mouseX}px`;
    cursorOuterCircle.style.top = `${mouseY}px`;
    cursorInnerCircle.style.left = `${mouseX}px`;
    cursorInnerCircle.style.top = `${mouseY}px`;
  });

  // Click Animation - SHOT EFFECT
  document.addEventListener("click", (e) => {
    // Check if the clicked element is a link or button (or any interactive element you want)
    if (e.target.tagName === "A" || e.target.tagName === "BUTTON") {
      const shotCircle = document.createElement("div");
      shotCircle.className = "custom-cursor-circle click-shot-circle";
      shotCircle.style.left = `${e.clientX}px`;
      shotCircle.style.top = `${e.clientY}px`;
      document.body.appendChild(shotCircle);

      // Remove the shot circle after animation completes
      shotCircle.addEventListener("animationend", () => {
        shotCircle.remove();
      });
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");
  const body = document.body;
  const modelsDropdownButton = document.getElementById(
    "models-dropdown-button"
  );
  const modelsDropdown = document.getElementById("models-dropdown");
  const mobileModelsDropdownButton = document.getElementById(
    "mobile-models-dropdown-button"
  );
  const mobileModelsDropdownContent = document.getElementById(
    "mobile-models-dropdown-content"
  );
  const mobileDropdownArrow = document.querySelector(
    "#mobile-models-dropdown-button .mobile-dropdown-arrow"
  );

  // --- Mobile Menu Toggle ---
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", function () {
      const menuOpen = !mobileMenu.classList.contains("translate-x-full"); // Check if menu is currently open

      mobileMenu.classList.toggle("translate-x-full");
      mobileMenu.classList.toggle("translate-x-0");
      mobileMenuButton.classList.toggle("active");
      body.classList.toggle("overflow-hidden", !menuOpen); // Disable body scroll when opening, enable when closing

      // Close mobile dropdown when mobile menu toggles (optional, for cleaner UX)
      if (
        mobileModelsDropdownContent &&
        !mobileModelsDropdownContent.classList.contains("hidden")
      ) {
        mobileModelsDropdownContent.classList.add("hidden");
        mobileDropdownArrow.classList.remove("-rotate-180");
        mobileModelsDropdownContent.style.maxHeight = "0px";
        mobileModelsDropdownButton.setAttribute("aria-expanded", "false");
      }
    });
  } else {
    console.error("Mobile menu button or menu not found");
  }

  // --- Desktop Dropdown Hover Logic ---
  if (modelsDropdownButton && modelsDropdown) {
    modelsDropdownButton.addEventListener("mouseover", function () {
      modelsDropdown.classList.remove("hidden");
    });

    modelsDropdownButton.addEventListener("mouseleave", function () {
      // Slight delay to prevent accidental closing
      setTimeout(() => {
        if (!modelsDropdown.matches(":hover")) {
          modelsDropdown.classList.add("hidden");
        }
      }, 300);
    });

    modelsDropdown.addEventListener("mouseover", function () {
      modelsDropdown.classList.remove("hidden"); // Keep open if mouse is over dropdown
    });

    modelsDropdown.addEventListener("mouseleave", function () {
      modelsDropdown.classList.add("hidden"); // Close when mouse leaves dropdown area
    });
  } else {
    console.error(
      "Desktop Models dropdown button or dropdown element not found"
    );
  }

  // --- Mobile Dropdown Toggle ---
  if (
    mobileModelsDropdownButton &&
    mobileModelsDropdownContent &&
    mobileDropdownArrow
  ) {
    mobileModelsDropdownButton.addEventListener("click", function () {
      const expanded =
        mobileModelsDropdownButton.getAttribute("aria-expanded") === "true" ||
        false;
      mobileModelsDropdownButton.setAttribute("aria-expanded", !expanded);
      mobileModelsDropdownContent.classList.toggle("hidden");
      mobileDropdownArrow.classList.toggle("-rotate-180");

      if (expanded) {
        mobileModelsDropdownContent.style.maxHeight = "0px"; // Animate close
      } else {
        mobileModelsDropdownContent.style.maxHeight =
          mobileModelsDropdownContent.scrollHeight + "px"; // Animate open
      }
    });
  }

  // --- Close Mobile Menu on Click Outside ---
  document.addEventListener("click", function (event) {
    if (
      mobileMenu &&
      mobileMenuButton &&
      !mobileMenu.contains(event.target) &&
      !mobileMenuButton.contains(event.target) &&
      !mobileMenu.classList.contains("translate-x-full")
    ) {
      mobileMenu.classList.add("translate-x-full");
      mobileMenu.classList.remove("translate-x-0");
      mobileMenuButton.classList.remove("active");
      body.classList.remove("overflow-hidden");
    }
  });

  // --- User Country Detection (No changes needed from your provided script, assuming it works) ---
  function detectUserCountry() {
    /* ... your detectUserCountry function ... */
  }
  function updateUIForUnavailable(locationBox) {
    /* ... your updateUIForUnavailable function ... */
  }
  detectUserCountry(); // Call on DOMContentLoaded
});
