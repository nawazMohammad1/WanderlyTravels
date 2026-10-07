/* =========================================================
   WANDERLY TRAVELS
   OFFERS PAGE JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ====================================================== */

  const preloader = document.getElementById("preloader");
  const header = document.getElementById("header");

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navClose = document.getElementById("navClose");
  const navOverlay = document.getElementById("navOverlay");

  const backToTop = document.getElementById("backToTop");
  const currentYear = document.getElementById("currentYear");

  const filterButtons = document.querySelectorAll(".filter-btn");
  const offerCards = document.querySelectorAll(".offer-card");

  const revealElements = document.querySelectorAll(".reveal");

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* =====================================================
       PRELOADER
    ====================================================== */

  let preloaderHidden = false;

  function hidePreloader() {
    if (preloaderHidden || !preloader) {
      return;
    }

    preloaderHidden = true;

    preloader.classList.add("hidden");

    document.body.classList.remove("loading");
  }

  window.addEventListener("load", hidePreloader);

  /* Safety fallback */
  setTimeout(hidePreloader, 1800);

  /* =====================================================
       CURRENT YEAR
    ====================================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

  function openMenu() {
    if (!navMenu) {
      return;
    }

    navMenu.classList.add("active");

    if (navOverlay) {
      navOverlay.classList.add("active");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }

    document.body.classList.add("menu-open");

    if (navClose) {
      setTimeout(() => {
        navClose.focus();
      }, 100);
    }
  }

  function closeMenu() {
    if (!navMenu) {
      return;
    }

    navMenu.classList.remove("active");

    if (navOverlay) {
      navOverlay.classList.remove("active");
    }

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }

    document.body.classList.remove("menu-open");
  }

  if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
  }

  if (navClose) {
    navClose.addEventListener("click", closeMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  /* Close menu after clicking a navigation link */

  const navLinks = document.querySelectorAll(".nav-menu a");

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 900) {
        closeMenu();
      }
    });
  });

  /* Escape key closes menu */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (navMenu && navMenu.classList.contains("active")) {
        closeMenu();

        if (menuToggle) {
          menuToggle.focus();
        }
      }
    }
  });

  /* Close mobile menu when resizing to desktop */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

  function handleHeaderScroll() {
    if (!header) {
      return;
    }

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  handleHeaderScroll();

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* =====================================================
       SCROLL REVEAL
    ====================================================== */

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
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
        rootMargin: "0px 0px -45px 0px",
      },
    );

    revealElements.forEach((element, index) => {
      /*
       * Small stagger effect for cards.
       */

      if (
        element.classList.contains("offer-card") ||
        element.classList.contains("benefit-card")
      ) {
        element.style.transitionDelay = `${Math.min(index * 0.06, 0.3)}s`;
      }

      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       OFFER FILTERING
    ====================================================== */

  function filterOffers(category) {
    offerCards.forEach((card) => {
      const cardCategory = card.dataset.category || "";

      const shouldShow = category === "all" || cardCategory === category;

      if (shouldShow) {
        /*
         * display is restored first so the card can
         * participate in layout.
         */

        card.classList.remove("hidden");

        /*
         * Preserve reveal visibility after filtering.
         * This prevents cards from becoming invisible
         * simply because they were filtered.
         */

        requestAnimationFrame(() => {
          card.classList.add("visible");
        });
      } else {
        card.classList.remove("visible");
        card.classList.add("hidden");
      }
    });
  }

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedCategory = button.dataset.filter || "all";

      /* Update active button */

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      /* Filter offers */

      filterOffers(selectedCategory);

      /* Accessibility */

      filterButtons.forEach((btn) => {
        btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
      });
    });
  });

  /* Set initial ARIA state */

  filterButtons.forEach((button) => {
    button.setAttribute(
      "aria-pressed",
      button.classList.contains("active") ? "true" : "false",
    );
  });

  /* =====================================================
       BACK TO TOP
    ====================================================== */

  function handleBackToTop() {
    if (!backToTop) {
      return;
    }

    if (window.scrollY > 600) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  handleBackToTop();

  window.addEventListener("scroll", handleBackToTop, { passive: true });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* =====================================================
       SMOOTH SCROLL FOR SAME-PAGE LINKS
    ====================================================== */

  const samePageLinks = document.querySelectorAll('a[href^="#"]');

  samePageLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
        return;
      }

      const target = document.querySelector(targetId);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 10;

      window.scrollTo({
        top: targetPosition,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  });

  /* =====================================================
       IMAGE FALLBACK
    ====================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      /*
       * Avoid repeated fallback loops.
       */

      if (image.dataset.fallbackApplied === "true") {
        return;
      }

      image.dataset.fallbackApplied = "true";

      image.src =
        "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80";
    });
  });

  /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  navLinks.forEach((link) => {
    const linkHref = link.getAttribute("href");

    if (!linkHref) {
      return;
    }

    const linkPage = linkHref.split("/").pop().split("#")[0].toLowerCase();

    if (linkPage === currentPage && currentPage !== "") {
      navLinks.forEach((item) => {
        item.classList.remove("active");
        item.removeAttribute("aria-current");
      });

      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });

  /* =====================================================
       CARD MICRO-INTERACTION
    ====================================================== */

  if (!prefersReducedMotion) {
    const cards = document.querySelectorAll(".offer-card, .benefit-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.setProperty("--card-hover", "1");
      });

      card.addEventListener("mouseleave", () => {
        card.style.setProperty("--card-hover", "0");
      });
    });
  }

  /* =====================================================
       KEYBOARD FOCUS STATE
    ====================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Tab") {
      document.body.classList.add("keyboard-user");
    }
  });

  document.addEventListener("mousedown", () => {
    document.body.classList.remove("keyboard-user");
  });

  /* =====================================================
       HERO SUBTLE PARALLAX
    ====================================================== */

  if (!prefersReducedMotion && window.innerWidth > 900) {
    const hero = document.querySelector(".offers-hero");

    if (hero) {
      let ticking = false;

      window.addEventListener(
        "scroll",
        () => {
          if (ticking) {
            return;
          }

          window.requestAnimationFrame(() => {
            const scrollY = window.scrollY;

            if (scrollY < 800) {
              hero.style.backgroundPosition = `center calc(50% + ${scrollY * 0.12}px)`;
            }

            ticking = false;
          });

          ticking = true;
        },
        { passive: true },
      );
    }
  }

  /* =====================================================
       FILTER BUTTON KEYBOARD SUPPORT
    ====================================================== */

  filterButtons.forEach((button) => {
    button.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        button.click();
      }
    });
  });

  /* =====================================================
       INITIAL STATE
    ====================================================== */

  /*
   * Make sure the initial offer cards remain visible even
   * if the observer has not fired yet.
   */

  if (prefersReducedMotion) {
    offerCards.forEach((card) => {
      card.classList.add("visible");
    });
  }

  /* =====================================================
       CONSOLE MESSAGE
    ====================================================== */

  console.log("Wanderly Travels — Offers page loaded successfully.");
});
