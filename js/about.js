/* =========================================================
   WANDERLY TRAVELS
   ABOUT PAGE JAVASCRIPT
   about.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       PRELOADER
    ===================================================== */

  const preloader = document.getElementById("preloader");

  let preloaderHidden = false;

  const hidePreloader = () => {
    if (!preloader || preloaderHidden) return;

    preloaderHidden = true;

    preloader.classList.add("hide");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  };

  if (document.readyState === "complete") {
    setTimeout(hidePreloader, 200);
  } else {
    window.addEventListener("load", hidePreloader, { once: true });
  }

  /* Fallback so the page never stays blocked */

  setTimeout(hidePreloader, 2500);

  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  const menuToggle = document.getElementById("menuToggle");

  const navMenu = document.getElementById("navMenu");

  const closeMenu = () => {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.remove("active");

    menuToggle.classList.remove("active");

    menuToggle.setAttribute("aria-expanded", "false");

    menuToggle.setAttribute("aria-label", "Open navigation menu");

    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!navMenu || !menuToggle) return;

    navMenu.classList.add("active");

    menuToggle.classList.add("active");

    menuToggle.setAttribute("aria-expanded", "true");

    menuToggle.setAttribute("aria-label", "Close navigation menu");

    document.body.classList.add("menu-open");
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", (event) => {
      event.stopPropagation();

      const isOpen = navMenu.classList.contains("active");

      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    /* Close menu when clicking navigation links */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    /* Close menu when clicking outside */

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });

    /* Close with Escape */

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("active")) {
        closeMenu();

        menuToggle.focus();
      }
    });
  }

  /* =====================================================
       HEADER SCROLL EFFECT
    ===================================================== */

  const header = document.getElementById("header");

  const updateHeader = () => {
    if (!header) return;

    if (window.scrollY > 35) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  updateHeader();

  window.addEventListener("scroll", updateHeader, { passive: true });

  /* =====================================================
       ACTIVE NAVIGATION LINK
    ===================================================== */

  if (navMenu) {
    const currentPage =
      window.location.pathname.split("/").pop().toLowerCase() || "index.html";

    const navLinks = navMenu.querySelectorAll(".nav-link");

    navLinks.forEach((link) => {
      const href = link.getAttribute("href");

      if (!href) return;

      const linkPage = href.split("#")[0].split("/").pop().toLowerCase();

      if (
        linkPage === currentPage ||
        (currentPage === "" && linkPage === "index.html")
      ) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  }

  /* =====================================================
       REVEAL ANIMATIONS
    ===================================================== */

  const revealElements = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window && revealElements.length) {
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

        rootMargin: "0px 0px -50px 0px",
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
       STAT COUNTERS
    ===================================================== */

  const counters = document.querySelectorAll(".counter");

  const animateCounter = (counter) => {
    if (counter.dataset.counted === "true") {
      return;
    }

    counter.dataset.counted = "true";

    const target = Number(counter.dataset.target);

    if (!Number.isFinite(target)) {
      counter.textContent = "0";

      return;
    }

    const duration = 1600;

    const startTime = performance.now();

    const updateCounter = (currentTime) => {
      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /*
       * Ease-out effect:
       * starts quickly and slows down
       * near the final number.
       */

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * target);

      counter.textContent = currentValue.toLocaleString("en-IN");

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString("en-IN");
      }
    };

    requestAnimationFrame(updateCounter);
  };

  if ("IntersectionObserver" in window && counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateCounter(entry.target);

            counterObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.45,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  } else {
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);

      counter.textContent = Number.isFinite(target)
        ? target.toLocaleString("en-IN")
        : "0";
    });
  }

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId || targetId === "#") {
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
       IMAGE LOAD EFFECT
    ===================================================== */

  const images = document.querySelectorAll("img");

  images.forEach((image) => {
    if (image.complete) {
      image.classList.add("loaded");

      return;
    }

    image.addEventListener(
      "load",
      () => {
        image.classList.add("loaded");
      },
      { once: true },
    );

    image.addEventListener(
      "error",
      () => {
        image.classList.add("image-error");
      },
      { once: true },
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
       RESIZE HANDLING
    ===================================================== */

  let resizeTimer;

  window.addEventListener(
    "resize",
    () => {
      clearTimeout(resizeTimer);

      resizeTimer = setTimeout(() => {
        /*
         * Reset mobile navigation
         * when switching to desktop.
         */

        if (window.innerWidth > 850) {
          closeMenu();
        }
      }, 150);
    },
    { passive: true },
  );

  /* =====================================================
       BACK / FORWARD CACHE SUPPORT
    ===================================================== */

  window.addEventListener("pageshow", () => {
    updateHeader();

    /*
     * Ensure reveal elements don't remain
     * hidden when the browser restores the
     * page from its back-forward cache.
     */

    revealElements.forEach((element) => {
      if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
        element.classList.add("visible");
      }
    });
  });

  /* =====================================================
       REDUCED MOTION SUPPORT
    ===================================================== */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  );

  if (prefersReducedMotion.matches) {
    revealElements.forEach((element) => {
      element.classList.add("visible");
    });

    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);

      if (Number.isFinite(target)) {
        counter.textContent = target.toLocaleString("en-IN");

        counter.dataset.counted = "true";
      }
    });
  }
});
