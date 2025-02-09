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

// Mobile Menu Toggle - NEW JAVASCRIPT - ENHANCED
const mobileMenuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

mobileMenuButton.addEventListener("click", () => {
  mobileMenu.classList.toggle("hidden"); // Toggle 'hidden' class to show/hide menu
  mobileMenuButton.classList.toggle("active"); // Toggle 'active' class for button style
});

// Close Mobile Menu on Click Outside
document.addEventListener("click", function (event) {
  const isClickInsideMenu = mobileMenu.contains(event.target);
  const isClickOnButton = mobileMenuButton.contains(event.target);
  const isMenuHidden = mobileMenu.classList.contains("hidden");

  if (!isClickInsideMenu && !isClickOnButton && !isMenuHidden) {
    mobileMenu.classList.add("hidden"); // Hide menu
    mobileMenuButton.classList.remove("active"); // Deactivate burger button style
  }
});
