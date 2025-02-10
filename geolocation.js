// --- Feature: User Country, City, and Device Detection based on IP Address ---

/**
 * Enhanced feature to detect user's country and city based on IP, and basic device info.
 * Uses 'ip-api.com' free geolocation API.
 * Displays information on the page.
 *
 *  ... (Privacy and API Considerations from previous response remain valid) ...
 */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * Function to fetch user's location and device info.
   * Updates HTML elements with the detected information or error messages.
   */
  function detectUserLocationAndDevice() {
    const countryNameElement = document.getElementById("user-country-name"); // Get span elements for updates
    const cityNameElement = document.getElementById("user-city-name");
    const deviceInfoElement = document.getElementById("user-device-info");
    const locationBox = document.getElementById("user-country-info"); // The container box

    if (
      !countryNameElement ||
      !cityNameElement ||
      !deviceInfoElement ||
      !locationBox
    ) {
      console.error(
        "Error: One or more HTML elements for location/device info not found. Check your HTML."
      );
      return;
    }

    locationBox.style.display = "inline-block"; // Ensure box is visible when starting detection (if hidden initially)
    locationBox.querySelector("p").textContent = "Detecting your location..."; // Update initial text

    fetch("https://ip-api.com/json")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (data.status === "success") {
          const countryName = data.country || "Unknown Country"; // Fallback if country is not provided
          const cityName = data.city || "Unknown City"; // Fallback if city is not provided
          const deviceInfo = getDeviceInfo(); // Get device info using separate function

          countryNameElement.textContent = countryName;
          cityNameElement.textContent = cityName;
          deviceInfoElement.textContent = deviceInfo;
          locationBox.querySelector("p").textContent =
            "Your approximate location & device:"; // Update intro text
        } else {
          console.warn(
            "IP Geolocation API request was successful, but returned an error:",
            data.message
          );
          updateUIForUnavailable(locationBox);
        }
      })
      .catch((error) => {
        console.error("Error fetching user location:", error);
        updateUIForUnavailable(locationBox);
      });
  }

  /**
   * Helper function to get basic device information from User-Agent string.
   * (More advanced device detection might require a dedicated library)
   */
  function getDeviceInfo() {
    const userAgent = navigator.userAgent;
    if (
      /Mobile|Android|iP(hone|od|ad)|BlackBerry|IEMobile|Kindle|Silk-Accelerated/.test(
        userAgent
      )
    ) {
      return "Mobile Device";
    } else {
      return "Desktop Device";
    }
  }

  /**
   * Helper function to update UI when location detection is unavailable.
   */
  function updateUIForUnavailable(locationBox) {
    locationBox.querySelector("p").textContent =
      "Location & device info unavailable."; // Update intro text
    const detailList = locationBox.querySelector("#user-location-details");
    if (detailList) {
      detailList.style.display = "none"; // Optionally hide the detail list if unavailable
    }
  }

  detectUserLocationAndDevice(); // Call the enhanced function
});

// --- End of Enhanced Feature Code ---
