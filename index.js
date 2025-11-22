document.addEventListener("DOMContentLoaded", () => {
    // COUNTDOWN TIMER FUNCTIONALITY
    const targetDate = new Date("October 8, 2025").getTime();
    const countdownTimer = document.getElementById("countdown-timer");

    if (countdownTimer) {
        function updateCountdown() {
            const now = new Date().getTime();
            const timeLeft = targetDate - now;

            if (timeLeft > 0) {
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

                countdownTimer.innerHTML = `
                    <div class="countdown-wrapper">
                        <div class="count-item">
                            <span class="count-number">${days}</span>
                            <span class="count-label">♡DAYS</span>
                        </div>
                        <span class="colon">:</span>
                        <div class="count-item">
                            <span class="count-number">${hours}</span>
                            <span class="count-label">HOURS</span>
                        </div>
                        <span class="colon">:</span>
                        <div class="count-item">
                            <span class="count-number">${minutes}</span>
                            <span class="count-label">MINUTES</span>
                        </div>
                        <span class="colon">:</span>
                        <div class="count-item">
                            <span class="count-number">${seconds}</span>
                            <span class="count-label">SECONDS♡</span>
                        </div>
                    </div>
                `;


                
            } else {
                countdownTimer.textContent = "The Big Day is Here!";
            }
        }

        updateCountdown(); // Initial update
        setInterval(updateCountdown, 1000); // Update every second
    } else {
        console.error("Countdown element not found in the DOM.");
    }

    // HAMBURGER MENU FUNCTIONALITY
    const hamburger = document.querySelector(".mobile-hamburger");
    const navContainer = document.querySelector(".nav-container");
    const navLinks = document.querySelector(".nav-links");
    const closeNav = document.querySelector(".close-nav");

    if (hamburger && navContainer && navLinks && closeNav) {
        hamburger.addEventListener("click", () => {
            navLinks.classList.add("open");
            navContainer.classList.add("open");
            document.body.classList.add("menu-open");
        });

        closeNav.addEventListener("click", () => {
            navLinks.classList.remove("open");
            navContainer.classList.remove("open");
            document.body.classList.remove("menu-open");
        });
    }


    // REGISTRY BUTTON FUNCTIONALITY
    const registries = [
        { name: "Crate & Barrel", url: "https://www.crateandbarrel.com/gift-registry/brianna-garay-and-patrick-rubio/r7316631" },
        // { name: "Target Registry", url: "https://www.target.com/" },
        { name: "Zola", url: "https://www.zola.com/registry/brianna-and-patrick" }
    ];

    const registryContainer = document.getElementById("registry-container");

    if (registryContainer) {
        registries.forEach(registry => {
            const button = document.createElement("button");
            button.classList.add("registry-btn");
            button.textContent = registry.name;

            button.onclick = function () {
                window.open(registry.url, "_blank");
            };

            registryContainer.appendChild(button);
        });
    } else {
        console.error("Registry container not found in the DOM.");
    }

    // MAUI MAP BUTTON FUNCTIONALITY
    const mauiMap = [
        { name: "MAUI MAP", url: "https://earth.google.com/earth/d/1paGsrjkJ_YoITMsJXWrcs-AXn-M5cMIz?usp=sharing" }
    ];

    const mapContainer = document.getElementById("map-container");

    if (mapContainer) {
        const button = document.createElement("button");
        button.textContent = mauiMap[0].name;
        button.classList.add("map-button");

        button.addEventListener("click", function () {
            window.open(mauiMap[0].url, "_blank");
        });

        mapContainer.appendChild(button);
    } else {
        console.error("Map container not found in the DOM.");
    }
});

// COLLECTING DATA TO SEND TO AWS LAMBDA

document.getElementById("rsvpForm").addEventListener("submit", async function (e) {
    e.preventDefault();
  
    const data = {
      firstName: document.getElementById("first-name").value,
      lastName: document.getElementById("last-name").value,
      guestFirstName: document.getElementById("guestFirstName").value,
      guestLastName: document.getElementById("guestLastName").value,
      email: document.getElementById("email").value,
      weddingAttending: document.querySelector("input[name='weddingAttending']:checked").value,
      mealPreference: document.getElementById("meal").value,
      guestMealPreference: document.getElementById("guestMeal").value,
      dietaryRestrictions: document.getElementById("dietary").value,
      welcomePartyAttending: document.querySelector("input[name='welcomePartyAttending']:checked").value,
      lodgingLocation: document.getElementById("location").value
    };
  
    try {
      const response = await fetch("https://2h8bd6yw74.execute-api.us-west-1.amazonaws.com/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      });
  
      const result = await response.json();
  
      if (response.ok) {
        alert("RSVP submitted successfully!");
      } else {
        alert("Error: " + result.message);
      }
    } catch (error) {
      console.error("Error submitting RSVP:", error);
      alert("There was a problem submitting your RSVP. Please use Google Chrome to submit form if error continues and type https://briannapluspatrick.com");
    }
  });


// MAKING SURE EACH PAGE FOR MOBILE STARTS AT THE TOP

window.onload = function () {
    window.scrollTo(0, 0);
};
