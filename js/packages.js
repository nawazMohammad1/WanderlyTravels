/* =========================================================
   WANDERLY TRAVELS
   PACKAGES PAGE JAVASCRIPT
   packages.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       PRELOADER
    ===================================================== */

  const preloader = document.getElementById("preloader");

  const hidePreloader = () => {
    if (!preloader) return;

    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  };

  window.addEventListener("load", hidePreloader);

  /* Fallback in case the load event has already fired */
  setTimeout(hidePreloader, 2500);

  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));

      document.body.classList.toggle("menu-open", isOpen);
    });

    /* Close menu after clicking a navigation link */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");
      });
    });

    /* Close when clicking outside */

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        navMenu.classList.remove("active");

        menuToggle.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");

        document.body.classList.remove("menu-open");
      }
    });
  }

  /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

  const header = document.getElementById("header");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 30) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =====================================================
       CURRENT YEAR
    ===================================================== */

  const yearElements = document.querySelectorAll("[data-current-year]");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =====================================================
       REVEAL ANIMATIONS
       
       IMPORTANT:
       Reveals are controlled with .visible.
       Filtering below also restores visibility so
       filtered cards do not remain permanently hidden.
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  let revealObserver = null;

  if ("IntersectionObserver" in window) {
    revealObserver = new IntersectionObserver(
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
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       PACKAGE FILTERING
    ===================================================== */

  const filterButtons = document.querySelectorAll(".package-filter");

  const packageCards = document.querySelectorAll(".package-card");

  const showCard = (card) => {
    card.classList.remove("filter-hidden");

    /*
     * Force the card to remain reveal-visible.
     * This prevents a card that was hidden by the
     * reveal system from appearing invisible after
     * filtering.
     */

    card.classList.add("visible");

    /*
     * Remove the old animation class first so the
     * animation can restart every time.
     */

    card.classList.remove("filter-show");

    /*
     * Force browser reflow.
     */

    void card.offsetWidth;

    card.classList.add("filter-show");
  };

  const hideCard = (card) => {
    card.classList.remove("filter-show", "visible");

    card.classList.add("filter-hidden");
  };

  const filterPackages = (category) => {
    packageCards.forEach((card) => {
      const cardCategory = card.dataset.packageCategory;

      if (category === "all" || cardCategory === category) {
        showCard(card);
      } else {
        hideCard(card);
      }
    });
  };

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.packageFilter;

      if (!selectedCategory) return;

      /* Update active button */

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");

        btn.setAttribute("aria-selected", "false");
      });

      button.classList.add("active");

      button.setAttribute("aria-selected", "true");

      /* Apply filter */

      filterPackages(selectedCategory);
    });
  });

  /*
   * Make the default "All Packages" state visible.
   */

  packageCards.forEach((card) => {
    card.classList.add("visible");
  });

  /* =====================================================
       WISHLIST BUTTONS
    ===================================================== */

  const wishlistButtons = document.querySelectorAll(".package-wishlist");

  wishlistButtons.forEach((button) => {
    button.setAttribute("aria-pressed", "false");

    button.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      const icon = button.querySelector("i");

      const isActive = button.classList.toggle("active");

      button.setAttribute("aria-pressed", String(isActive));

      if (icon) {
        if (isActive) {
          icon.classList.remove("fa-regular");

          icon.classList.add("fa-solid");
        } else {
          icon.classList.remove("fa-solid");

          icon.classList.add("fa-regular");
        }
      }
    });
  });

  /* =====================================================
       PACKAGE CARD IMAGE LAZY LOADING
    ===================================================== */

  const packageImages = document.querySelectorAll(".package-image img");

  packageImages.forEach((image) => {
    image.addEventListener(
      "load",
      () => {
        image.classList.add("loaded");
      },
      { once: true },
    );
  });

  /* =====================================================
       SMOOTH SCROLL FOR INTERNAL HASH LINKS
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  });

  /* =====================================================
       KEYBOARD ACCESSIBILITY FOR FILTERS
    ===================================================== */

  filterButtons.forEach((button) => {
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        button.click();
      }
    });
  });

  /* =====================================================
       RESET FILTER ON PAGE BACK / FORWARD CACHE
    ===================================================== */

  window.addEventListener("pageshow", () => {
    const activeFilter = document.querySelector(".package-filter.active");

    if (!activeFilter) {
      const allButton = document.querySelector('[data-package-filter="all"]');

      if (allButton) {
        allButton.classList.add("active");
      }
    }
  });

  /* =====================================================
       RESIZE HANDLING
    ===================================================== */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        /*
         * If the mobile menu is open and the
         * viewport becomes desktop-sized,
         * reset the menu state.
         */

        if (
          window.innerWidth > 850 &&
          navMenu &&
          navMenu.classList.contains("active")
        ) {
          navMenu.classList.remove("active");

          if (menuToggle) {
            menuToggle.classList.remove("active");

            menuToggle.setAttribute("aria-expanded", "false");
          }

          document.body.classList.remove("menu-open");
        }
      }, 150);
    },
    { passive: true },
  );
});
