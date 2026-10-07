/* =========================================================
   WANDERLY TRAVELS
   CUSTOM TRIP PAGE JAVASCRIPT
   PREMIUM + RESPONSIVE + INTERACTIVE
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       PRELOADER
    ===================================================== */

  const preloader = document.querySelector(".preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hide");
      }, 500);
    });

    // Fallback
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 1800);
  }

  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const body = document.body;

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);
      menuToggle.setAttribute("aria-expanded", isOpen);
      body.classList.toggle("menu-open", isOpen);
    });

    // Close menu when clicking a navigation link
    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("active");
        menuToggle.classList.remove("active");
        menuToggle.setAttribute("aria-expanded", "false");
        body.classList.remove("menu-open");
      }
    });
  }

  /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

  const header = document.querySelector(".header");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* =====================================================
       STAGGER ANIMATION
    ===================================================== */

  const staggerGroups = document.querySelectorAll(
    ".feature-card, .benefit-card, .step-card, .journey-card",
  );

  staggerGroups.forEach((card, index) => {
    card.style.transitionDelay = `${index * 80}ms`;
  });

  /* =====================================================
       DATE INPUTS
    ===================================================== */

  const startDate = document.querySelector("#startDate");
  const endDate = document.querySelector("#endDate");

  const setMinimumDates = () => {
    const today = new Date();

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");

    const todayString = `${year}-${month}-${day}`;

    if (startDate) {
      startDate.min = todayString;
    }

    if (endDate) {
      endDate.min = todayString;
    }
  };

  setMinimumDates();

  if (startDate && endDate) {
    startDate.addEventListener("change", () => {
      if (!startDate.value) return;

      endDate.min = startDate.value;

      if (endDate.value && endDate.value < startDate.value) {
        endDate.value = "";
      }
    });
  }

  /* =====================================================
       TRIP TYPE SELECTION
    ===================================================== */

  const tripTypes = document.querySelectorAll('input[name="tripType"]');

  const tripTypeCards = document.querySelectorAll(".trip-type-card");

  const updateTripType = () => {
    tripTypeCards.forEach((card) => {
      card.classList.remove("selected");
    });

    tripTypes.forEach((input) => {
      if (input.checked) {
        const parentCard = input.closest(".trip-type-card");

        if (parentCard) {
          parentCard.classList.add("selected");
        }
      }
    });
  };

  tripTypes.forEach((input) => {
    input.addEventListener("change", updateTripType);
  });

  updateTripType();

  /* =====================================================
       BUDGET SELECT
    ===================================================== */

  const budgetSelect = document.querySelector("#budget");

  if (budgetSelect) {
    budgetSelect.addEventListener("change", () => {
      budgetSelect.classList.toggle("has-value", budgetSelect.value !== "");
    });
  }

  /* =====================================================
       FORM VALIDATION
    ===================================================== */

  const tripForm = document.querySelector("#customTripForm");

  if (tripForm) {
    tripForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const destination = document.querySelector("#destination");

      const travellers = document.querySelector("#travellers");

      const start = document.querySelector("#startDate");

      const end = document.querySelector("#endDate");

      const tripType = document.querySelector('input[name="tripType"]:checked');

      const budget = document.querySelector("#budget");

      let isValid = true;

      // Clear previous errors
      tripForm.querySelectorAll(".input-error").forEach((element) => {
        element.classList.remove("input-error");
      });

      /* Destination */

      if (destination && destination.value.trim() === "") {
        destination.classList.add("input-error");
        isValid = false;
      }

      /* Travellers */

      if (travellers && travellers.value === "") {
        travellers.classList.add("input-error");
        isValid = false;
      }

      /* Start date */

      if (start && start.value === "") {
        start.classList.add("input-error");
        isValid = false;
      }

      /* End date */

      if (end && end.value === "") {
        end.classList.add("input-error");
        isValid = false;
      }

      /* Date comparison */

      if (start && end && start.value && end.value && end.value < start.value) {
        end.classList.add("input-error");
        isValid = false;

        showMessage("End date must be after the start date.", "error");

        end.focus();

        return;
      }

      /* Trip type */

      if (!tripType) {
        isValid = false;

        showMessage("Please select the type of trip you want.", "error");
      }

      /* Budget */

      if (budget && budget.value === "") {
        budget.classList.add("input-error");
        isValid = false;
      }

      if (!isValid) {
        showMessage("Please complete the required trip details.", "error");

        return;
      }

      /* Successful submission */

      const button = tripForm.querySelector('button[type="submit"]');

      if (button) {
        const originalText = button.innerHTML;

        button.disabled = true;

        button.innerHTML = `<i class="fa-solid fa-circle-notch fa-spin"></i>
                     Creating Your Trip...`;

        setTimeout(() => {
          button.disabled = false;
          button.innerHTML = originalText;

          showMessage(
            "Your trip request has been received! We'll help you plan something unforgettable.",
            "success",
          );
        }, 1200);
      }
    });
  }

  /* =====================================================
       INPUT ERROR CLEANUP
    ===================================================== */

  document.querySelectorAll("input, select, textarea").forEach((input) => {
    input.addEventListener("input", () => {
      input.classList.remove("input-error");
    });

    input.addEventListener("change", () => {
      input.classList.remove("input-error");
    });
  });

  /* =====================================================
       MESSAGE SYSTEM
    ===================================================== */

  function showMessage(message, type = "success") {
    let messageBox = document.querySelector(".trip-message");

    if (!messageBox) {
      messageBox = document.createElement("div");

      messageBox.className = "trip-message";

      document.body.appendChild(messageBox);
    }

    messageBox.className = `trip-message ${type}`;

    messageBox.innerHTML = `
            <span class="trip-message-icon">
                ${
                  type === "success"
                    ? '<i class="fa-solid fa-circle-check"></i>'
                    : '<i class="fa-solid fa-circle-exclamation"></i>'
                }
            </span>

            <span class="trip-message-text">
                ${message}
            </span>

            <button
                type="button"
                class="trip-message-close"
                aria-label="Close message"
            >
                <i class="fa-solid fa-xmark"></i>
            </button>
        `;

    requestAnimationFrame(() => {
      messageBox.classList.add("show");
    });

    const closeButton = messageBox.querySelector(".trip-message-close");

    if (closeButton) {
      closeButton.addEventListener("click", () => {
        hideMessage();
      });
    }

    clearTimeout(window.wanderlyMessageTimer);

    window.wanderlyMessageTimer = setTimeout(() => {
      hideMessage();
    }, 5000);
  }

  function hideMessage() {
    const messageBox = document.querySelector(".trip-message");

    if (!messageBox) return;

    messageBox.classList.remove("show");
  }

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", (event) => {
      const targetId = anchor.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       SCROLL TO FORM BUTTONS
    ===================================================== */

  document
    .querySelectorAll('[data-scroll-to="trip-form"]')
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();

        const form = document.querySelector("#customTripForm");

        if (!form) return;

        const headerHeight = header ? header.offsetHeight : 0;

        const position =
          form.getBoundingClientRect().top + window.scrollY - headerHeight - 30;

        window.scrollTo({
          top: position,
          behavior: "smooth",
        });
      });
    });

  /* =====================================================
       BACK TO TOP
    ===================================================== */

  const backToTop = document.querySelector(".back-to-top");

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    };

    toggleBackToTop();

    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =====================================================
       ESCAPE KEY
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");

        if (menuToggle) {
          menuToggle.classList.remove("active");
          menuToggle.setAttribute("aria-expanded", "false");
        }

        body.classList.remove("menu-open");
      }
    }
  });

  /* =====================================================
       TOUCH DEVICE FIX
    ===================================================== */

  if ("ontouchstart" in window) {
    document.body.classList.add("touch-device");
  }

  /* =====================================================
       CURRENT YEAR
    ===================================================== */

  const currentYear = document.querySelector("#currentYear");

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       FORM AUTOSAVE
       Saves entered details temporarily
    ===================================================== */

  const autosaveForm = document.querySelector("#customTripForm");

  if (autosaveForm) {
    const storageKey = "wanderlyCustomTrip";

    const savedData = localStorage.getItem(storageKey);

    if (savedData) {
      try {
        const data = JSON.parse(savedData);

        Object.keys(data).forEach((key) => {
          const field = autosaveForm.elements[key];

          if (!field) return;

          if (field.type === "radio" || field.type === "checkbox") {
            const option = autosaveForm.querySelector(
              `[name="${key}"][value="${data[key]}"]`,
            );

            if (option) {
              option.checked = true;
            }
          } else {
            field.value = data[key];
          }
        });

        updateTripType();
      } catch (error) {
        console.warn("Wanderly saved trip data could not be restored.");
      }
    }

    const saveForm = () => {
      const formData = {};

      Array.from(autosaveForm.elements).forEach((field) => {
        if (!field.name) return;

        if (field.type === "radio" || field.type === "checkbox") {
          if (field.checked) {
            formData[field.name] = field.value;
          }
        } else {
          formData[field.name] = field.value;
        }
      });

      localStorage.setItem(storageKey, JSON.stringify(formData));
    };

    autosaveForm.addEventListener("input", saveForm);

    autosaveForm.addEventListener("change", saveForm);

    autosaveForm.addEventListener("submit", () => {
      setTimeout(() => {
        localStorage.removeItem(storageKey);
      }, 1500);
    });
  }

  /* =====================================================
       INITIALIZE
    ===================================================== */

  document.body.classList.add("custom-trip-ready");
});
