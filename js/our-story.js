/* =========================================================
   WANDERLY TRAVELS
   OUR STORY PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ====================================================== */

  const header = document.getElementById("header");
  const preloader = document.getElementById("preloader");

  const navToggle = document.getElementById("navToggle");
  const navClose = document.getElementById("navClose");
  const navMenu = document.getElementById("navMenu");
  const navOverlay = document.getElementById("navOverlay");

  const backToTop = document.getElementById("backToTop");

  const currentYear = document.getElementById("currentYear");

  const navLinks = document.querySelectorAll(".nav-link");

  const revealElements = document.querySelectorAll(".reveal");

  /* =====================================================
       REDUCED MOTION
    ====================================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* =====================================================
       PRELOADER
    ====================================================== */

  const hidePreloader = () => {
    if (!preloader) return;

    preloader.classList.add("hide");

    document.body.classList.remove("loading");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  };

  document.body.classList.add("loading");

  window.addEventListener("load", () => {
    setTimeout(
      () => {
        hidePreloader();
      },
      prefersReducedMotion ? 0 : 450,
    );
  });

  /* =====================================================
       FALLBACK — IF PAGE LOAD EVENT IS DELAYED
    ====================================================== */

  setTimeout(() => {
    hidePreloader();
  }, 3500);

  /* =====================================================
       MOBILE NAVIGATION
    ====================================================== */

  const openMenu = () => {
    if (!navMenu) return;

    navMenu.classList.add("active");

    if (navOverlay) {
      navOverlay.classList.add("active");
    }

    document.body.classList.add("menu-open");

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "true");
    }
  };

  const closeMenu = () => {
    if (!navMenu) return;

    navMenu.classList.remove("active");

    if (navOverlay) {
      navOverlay.classList.remove("active");
    }

    document.body.classList.remove("menu-open");

    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  };

  if (navToggle) {
    navToggle.addEventListener("click", () => {
      if (navMenu.classList.contains("active")) {
        closeMenu();
      } else {
        openMenu();
      }
    });
  }

  if (navClose) {
    navClose.addEventListener("click", () => {
      closeMenu();
    });
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", () => {
      closeMenu();
    });
  }

  /* =====================================================
       CLOSE MENU AFTER CLICKING NAV LINK
    ====================================================== */

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /* =====================================================
       ESCAPE KEY
    ====================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /* =====================================================
       CLOSE MOBILE MENU WHEN RESIZING
    ====================================================== */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 45) {
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
       SCROLL REVEAL
    ====================================================== */

  if (prefersReducedMotion) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  } else if ("IntersectionObserver" in window) {
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

    revealElements.forEach((element) => {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });
  }

  /* =====================================================
       STAGGERED REVEAL FOR CARDS
    ====================================================== */

  const revealGroups = [
    ".philosophy-card",
    ".value-card",
    ".timeline-item",
    ".story-point",
  ];

  revealGroups.forEach((selector) => {
    const items = document.querySelectorAll(selector);

    items.forEach((item, index) => {
      if (!prefersReducedMotion) {
        item.style.transitionDelay = `${Math.min(index * 80, 400)}ms`;
      }
    });
  });

  /* =====================================================
       BACK TO TOP
    ====================================================== */

  const updateBackToTop = () => {
    if (!backToTop) return;

    if (window.scrollY > 500) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  };

  updateBackToTop();

  window.addEventListener("scroll", updateBackToTop, {
    passive: true,
  });

  if (backToTop) {
    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* =====================================================
       CURRENT YEAR
    ====================================================== */

  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  /* =====================================================
       SMOOTH INTERNAL LINKS
    ====================================================== */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
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

      closeMenu();

      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  });

  /* =====================================================
       IMAGE LOAD HANDLING
    ====================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    image.addEventListener("error", () => {
      image.classList.add("image-error");

      /*
       * Keep the layout intact if an external image
       * cannot be loaded.
       */

      image.style.objectFit = "cover";
    });
  });

  /* =====================================================
       ACTIVE NAVIGATION STATE
    ====================================================== */

  const currentPage = window.location.pathname.split("/").pop().toLowerCase();

  navLinks.forEach((link) => {
    const linkPage = link.getAttribute("href")?.split("/").pop().toLowerCase();

    if (linkPage === currentPage) {
      navLinks.forEach((item) => {
        item.classList.remove("active");
      });

      link.classList.add("active");
    }
  });

  /* =====================================================
       PREVENT BODY SCROLL WHEN MENU IS OPEN
    ====================================================== */

  const preventScrollWhenMenuOpen = () => {
    if (
      window.innerWidth <= 900 &&
      navMenu &&
      navMenu.classList.contains("active")
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  };

  if (navToggle) {
    navToggle.addEventListener("click", preventScrollWhenMenuOpen);
  }

  if (navClose) {
    navClose.addEventListener("click", preventScrollWhenMenuOpen);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", preventScrollWhenMenuOpen);
  }

  window.addEventListener("resize", () => {
    preventScrollWhenMenuIsOpen();
  });

  function preventScrollWhenMenuIsOpen() {
    if (
      window.innerWidth <= 900 &&
      navMenu &&
      navMenu.classList.contains("active")
    ) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }

  /* =====================================================
       HERO PARALLAX — SUBTLE ONLY
    ====================================================== */

  const heroBackground = document.querySelector(".story-hero-bg");

  if (heroBackground && !prefersReducedMotion && window.innerWidth > 900) {
    let ticking = false;

    const updateHeroParallax = () => {
      const scrollPosition = window.scrollY;

      if (scrollPosition <= 800) {
        heroBackground.style.transform = `translateY(${scrollPosition * 0.12}px)`;
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateHeroParallax);

          ticking = true;
        }
      },
      {
        passive: true,
      },
    );
  }

  /* =====================================================
       CARD HOVER MICRO-INTERACTION
       DESKTOP ONLY
    ====================================================== */

  if (!prefersReducedMotion && window.matchMedia("(hover: hover)").matches) {
    const cards = document.querySelectorAll(".philosophy-card, .value-card");

    cards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("hovered");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("hovered");
      });
    });
  }

  /* =====================================================
       ACCESSIBILITY — FOCUS WITH KEYBOARD
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
       INITIALIZE
    ====================================================== */

  updateHeader();
  updateBackToTop();
  preventScrollWhenMenuIsOpen();
});
