// Enhanced JavaScript Functionality for DeepDoxa.com

// ==========================================================================
//  Utility Functions (Keep it Clean and Reusable)
// ==========================================================================

/**
 * Debounce Function: Limits the rate at which a function can fire.
 * @param {Function} func The function to debounce.
 * @param {number} delay The delay in milliseconds.
 * @returns {Function} The debounced function.
 */
function debounce(func, delay) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}

/**
 * Smooth Scroll to Element: Animates scrolling to a specified element.
 * @param {string} targetSelector The CSS selector of the target element.
 * @param {number} duration The animation duration in milliseconds (default: 500).
 */
function smoothScrollTo(targetSelector, duration = 500) {
    const target = document.querySelector(targetSelector);
    if (!target) return; // Exit if the target doesn't exist

    const targetPosition = target.offsetTop;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }

    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return (c / 2) * t * t + b;
        t--;
        return (-c / 2) * (t * (t - 2) - 1) + b;
    }

    requestAnimationFrame(animation);
}

/**
 * Fetch JSON Data: Asynchronously fetches JSON data from a URL.
 * @param {string} url The URL to fetch.
 * @returns {Promise<object>} A promise that resolves with the JSON data or rejects with an error.
 */
async function fetchJsonData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error("Failed to fetch JSON data:", error);
        return null;
    }
}

/**
 * Load and Inject Content: Loads content from an external HTML file and injects it into a target element.
 * @param {string} url The URL of the HTML file to load.
 * @param {string} targetSelector The CSS selector of the target element.
 */
async function loadAndInjectContent(url, targetSelector) {
    const targetElement = document.querySelector(targetSelector);
    if (!targetElement) {
        console.warn(`Target element "${targetSelector}" not found.`);
        return;
    }

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const html = await response.text();
        targetElement.innerHTML = html;
    } catch (error) {
        console.error("Failed to load and inject content:", error);
        targetElement.innerHTML = "<p>Failed to load content.</p>";
    }
}

/**
 * Create Element: A utility function to dynamically create elements with attributes.
 * @param {string} tag The HTML tag name (e.g., 'div', 'p', 'a').
 * @param {object} attributes An object containing attributes to set on the element.
 * @returns {HTMLElement} The newly created HTML element.
 */
function createElement(tag, attributes = {}) {
    const element = document.createElement(tag);
    for (const key in attributes) {
        if (attributes.hasOwnProperty(key)) {
            element.setAttribute(key, attributes[key]);
        }
    }
    return element;
}

// ==========================================================================
//  Event Listeners and Initializations
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
    // 1. Smooth scrolling for navigation links (INTERNAL)
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            smoothScrollTo(this.getAttribute("href"));
        });
    });

    // 2. Sticky header effect
    const header = document.querySelector("header");
    const stickyHeader = debounce(() => {
        if (window.scrollY > 100) {
            header.classList.add("sticky");
        } else {
            header.classList.remove("sticky");
        }
    }, 15); // Debounce delay

    window.addEventListener("scroll", stickyHeader);
    stickyHeader(); // Initial check

    // 3. Fade-in elements on scroll (INTERSECTION OBSERVER)
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("show");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.15 }
    ); // Threshold: 15% of the element is visible

    const hiddenElements = document.querySelectorAll(".slide-in-left, .floating");
    hiddenElements.forEach((el) => observer.observe(el));

    // 4. Example of Dynamic Content Loading (LOAD FROM EXTERNAL FILE)
    // loadAndInjectContent('external-content.html', '#dynamic-content-target');

    // 5. Example of JSON Data Fetching and DOM Manipulation (FETCH REMOTE DATA)
    // fetchJsonData('https://api.example.com/data')
    //   .then(data => {
    //     if (data) {
    //       // Example: Create a list of items from the fetched data
    //       const listElement = document.createElement('ul');
    //       data.forEach(item => {
    //         const listItem = document.createElement('li');
    //         listItem.textContent = item.name; // Assuming each item has a 'name' property
    //         listElement.appendChild(listItem);
    //       });
    //       document.querySelector('#json-data-target').appendChild(listElement);
    //     }
    //   });

    // 6. Dynamic Form Handling - Example (CREATE AND APPEND ELEMENT)
    const contactFormTarget = document.querySelector("#contact-form-target"); // Example

    if (contactFormTarget) {
        const formElement = createElement("form", { action: "#", method: "POST", "onsubmit": "return validateForm()" });

        const nameLabel = createElement('label', { 'for': 'name' });
        nameLabel.textContent = 'Your Name:';
        const nameInput = createElement("input", {
            type: "text",
            id: "name",
            name: "name",
            placeholder: "Your Name",
            required: "true"
        });

        const emailLabel = createElement('label', { 'for': 'email' });
        emailLabel.textContent = 'Your Email:';
        const emailInput = createElement("input", {
            type: "email",
            id: "email",
            name: "email",
            placeholder: "Your Email",
            required: "true"
        });

        const messageLabel = createElement('label', { 'for': 'message' });
        messageLabel.textContent = 'Your Message:';
        const messageTextarea = createElement("textarea", {
            name: "message",
            placeholder: "Your Message",
            rows: "4",
            required: "true"
        });

        const submitButton = createElement("button", { type: "submit" });
        submitButton.textContent = "Send Message";

        formElement.appendChild(nameLabel);
        formElement.appendChild(nameInput);
        formElement.appendChild(emailLabel);
        formElement.appendChild(emailInput);
        formElement.appendChild(messageLabel);
        formElement.appendChild(messageTextarea);
        formElement.appendChild(submitButton);

        formElement.addEventListener("submit", function (event) {
            event.preventDefault();
            alert("Form submitted! (This is a placeholder)");
        });

        contactFormTarget.appendChild(formElement);
    }

    // 7. Dynamic Content Filter (for AI Perspectives)
    const aiPerspectiveFilter = document.querySelector('#ai-perspective-filter');
    if (aiPerspectiveFilter) {
        aiPerspectiveFilter.addEventListener('change', function () {
            const selectedPerspective = this.value;
            filterAIContent(selectedPerspective);
        });
    }

    function filterAIContent(perspective) {
        const allContent = document.querySelectorAll('.ai-perspective-content');
        allContent.forEach(element => {
            element.style.display = 'none'; // Hide all content
        });

        if (perspective === 'all') {
            allContent.forEach(element => {
                element.style.display = 'block'; // Show all content
            });
        } else {
            const filteredContent = document.querySelectorAll(`[data-perspective="${perspective}"]`);
            filteredContent.forEach(element => {
                element.style.display = 'block'; // Show filtered content
            });
        }
    }

  // 8. Form validation
  window.validateForm = function() {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const message = document.querySelector("textarea[name='message']").value;

      if (name === "" || email === "" || message === "") {
          alert("Please fill in all fields.");
          return false;
      }

      // Basic email validation
      if (!/^\S+@\S+\.\S+$/.test(email)) {
          alert("Please enter a valid email address.");
          return false;
      }

      return true;
  }
    // 9. Add more JavaScript functionality here, as needed
    // ... (Your Amazing Code!) ...
});

// ==========================================================================
//  Advanced Techniques and Concepts (Examples)
// ==========================================================================

// 1. Service Worker Integration (for offline support and caching)
// if ('serviceWorker' in navigator) {
//   navigator.serviceWorker.register('/service-worker.js')
//     .then(registration => console.log('Service Worker registered with scope:', registration.scope))
//     .catch(error => console.log('Service Worker registration failed:', error));
// }

// 2. Performance Monitoring (using Performance API)
// window.addEventListener('load', () => {
//   const performanceData = window.performance.getEntriesByType("navigation")[0];
//   console.log('Page Load Time:', performanceData.duration, 'ms');
// });

// 3. Accessibility Enhancements (ARIA attributes and keyboard navigation)
//   (Add ARIA attributes to relevant elements and ensure keyboard navigation is intuitive)

// 4. Advanced Animation Techniques (GSAP or other animation libraries)
//   (Use animation libraries for more complex and performant animations)

// ==========================================================================
//  Future-Proofing and Modularity
// ==========================================================================

// 1. Consider using modules (ES Modules) for better code organization
// 2. Use a build tool (Webpack, Parcel) to bundle and optimize your code
// 3. Write unit tests to ensure code quality and prevent regressions

// ==========================================================================
//  End of Code - (Illuminate the Humans!)
// ==========================================================================