/* =========================================================
   WANDERLY TRAVELS
   Premium Travel Agency Homepage
   script.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ===================================================== */

  const body = document.body;
  const header = document.querySelector(".header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  const preloader = document.querySelector(".preloader");

  const searchForm = document.querySelector(".search-form");
  const newsletterForm = document.querySelector(".newsletter-form");

  const wishlistButtons = document.querySelectorAll(".wishlist-btn");

  const revealElements = document.querySelectorAll(".reveal");

  /* =====================================================
       PRELOADER
    ===================================================== */

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("hide");
      }

      document.body.classList.add("page-loaded");
    }, 500);
  });

  /* =====================================================
       STICKY HEADER
    ===================================================== */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, {
    passive: true,
  });

  /* =====================================================
       MOBILE MENU
    ===================================================== */

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* Close menu when clicking a navigation link */

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

  const sections = document.querySelectorAll("section[id]");

  const updateActiveNav = () => {
    const scrollPosition = window.scrollY + 150;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;

      const sectionHeight = section.offsetHeight;

      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        navLinks.forEach((link) => {
          link.classList.remove("active");

          const href = link.getAttribute("href");

          if (href === `#${sectionId}`) {
            link.classList.add("active");
          }
        });
      }
    });
  };

  window.addEventListener("scroll", updateActiveNav, {
    passive: true,
  });

  /* =====================================================
       SCROLL REVEAL
    ===================================================== */

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  }

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

      if (!targetId || targetId === "#" || targetId.length < 2) {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       TRIP SEARCH
    ===================================================== */

  if (searchForm) {
    searchForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const destinationField = searchForm.querySelector('[name="destination"]');

      const dateField = searchForm.querySelector('[name="date"]');

      const travelersField = searchForm.querySelector('[name="travelers"]');

      const destination = destinationField ? destinationField.value.trim() : "";

      const date = dateField ? dateField.value : "";

      const travelers = travelersField ? travelersField.value : "";

      if (!destination) {
        showToast("Please select a destination.");

        if (destinationField) {
          destinationField.focus();
        }

        return;
      }

      if (!date) {
        showToast("Please select your travel date.");

        if (dateField) {
          dateField.focus();
        }

        return;
      }

      if (!travelers) {
        showToast("Please select the number of travelers.");

        if (travelersField) {
          travelersField.focus();
        }

        return;
      }

      showToast(`Finding trips to ${destination}...`);

      /* Small delay for a smoother interaction */

      setTimeout(() => {
        const packagesSection = document.querySelector("#packages");

        if (packagesSection) {
          const headerHeight = header ? header.offsetHeight : 0;

          window.scrollTo({
            top: packagesSection.offsetTop - headerHeight - 20,
            behavior: "smooth",
          });
        }
      }, 700);
    });
  }

  /* =====================================================
       DATE INPUT — PREVENT PAST DATES
    ===================================================== */

  const dateInputs = document.querySelectorAll('input[type="date"]');

  if (dateInputs.length) {
    const today = new Date();

    const year = today.getFullYear();

    const month = String(today.getMonth() + 1).padStart(2, "0");

    const day = String(today.getDate()).padStart(2, "0");

    const formattedToday = `${year}-${month}-${day}`;

    dateInputs.forEach((input) => {
      input.setAttribute("min", formattedToday);
    });
  }

  /* =====================================================
       WISHLIST BUTTONS
    ===================================================== */

  wishlistButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const isActive = button.classList.toggle("active");

      const icon = button.querySelector("i");

      if (icon) {
        if (isActive) {
          icon.classList.remove("fa-regular");

          icon.classList.add("fa-solid");
        } else {
          icon.classList.remove("fa-solid");

          icon.classList.add("fa-regular");
        }
      }

      showToast(
        isActive
          ? "Trip added to your wishlist."
          : "Trip removed from your wishlist.",
      );
    });
  });

  /* =====================================================
       PACKAGE LINKS
    ===================================================== */

  const packageLinks = document.querySelectorAll(".package-link");

  packageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();

        showToast("Trip details will be available soon.");
      }
    });
  });

  /* =====================================================
       DESTINATION LINKS
    ===================================================== */

  const destinationLinks = document.querySelectorAll(
    ".destination-content > a",
  );

  destinationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();

        showToast("Destination details coming soon.");
      }
    });
  });

  /* =====================================================
       NEWSLETTER
    ===================================================== */

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const emailInput = newsletterForm.querySelector('input[type="email"]');

      const email = emailInput ? emailInput.value.trim() : "";

      if (!email) {
        showToast("Please enter your email address.");

        if (emailInput) {
          emailInput.focus();
        }

        return;
      }

      if (!isValidEmail(email)) {
        showToast("Please enter a valid email address.");

        if (emailInput) {
          emailInput.focus();
        }

        return;
      }

      showToast("You're subscribed! Happy travels.");

      newsletterForm.reset();
    });
  }

  /* =====================================================
       EMAIL VALIDATION
    ===================================================== */

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /* =====================================================
       TOAST NOTIFICATION
    ===================================================== */

  let toastTimer;

  function showToast(message) {
    let toast = document.querySelector(".toast");

    if (!toast) {
      toast = document.createElement("div");

      toast.className = "toast";

      toast.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                <span></span>
            `;

      document.body.appendChild(toast);
    }

    const toastText = toast.querySelector("span");

    if (toastText) {
      toastText.textContent = message;
    }

    toast.classList.add("show");

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3000);
  }

  /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;

    if (navMenu && navMenu.classList.contains("active")) {
      navMenu.classList.remove("active");

      if (menuToggle) {
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
      }

      body.classList.remove("menu-open");
    }
  });

  /* =====================================================
       RESIZE HANDLER
    ===================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850 && navMenu) {
      navMenu.classList.remove("active");

      if (menuToggle) {
        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
      }

      body.classList.remove("menu-open");
    }
  });

  /* =====================================================
       IMAGE FALLBACK
       Prevent broken image icons
    ===================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((img) => {
    img.addEventListener(
      "error",
      () => {
        img.style.opacity = "0";
      },
      {
        once: true,
      },
    );
  });

  /* =====================================================
       CURRENT YEAR
    ===================================================== */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =====================================================
       INITIAL PAGE STATE
    ===================================================== */

  document.documentElement.classList.add("js-enabled");
});
