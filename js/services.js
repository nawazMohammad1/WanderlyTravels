/* =========================================================
   WANDERLY TRAVELS
   SERVICES PAGE JAVASCRIPT
   Responsive + Animated
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =========================================================
     PRELOADER
  ========================================================= */

  const preloader = document.querySelector(".preloader");

  if (preloader) {
    window.addEventListener("load", () => {
      setTimeout(() => {
        preloader.classList.add("hide");
      }, 450);
    });

    // Fallback in case load event has already fired
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 1800);
  }

  /* =========================================================
     MOBILE NAVIGATION
  ========================================================= */

  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.classList.toggle("active");

      navMenu.classList.toggle("active", isOpen);
      document.body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    // Close menu when clicking a navigation link
    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    // Close menu when clicking outside
    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("active") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    });

    // Close menu with Escape
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        menuToggle.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================================================
     REVEAL ANIMATIONS
  ========================================================= */

  const revealElements = document.querySelectorAll(".reveal");

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            // Reveal only once
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

  /* =========================================================
     SERVICE CARDS - STAGGERED REVEAL
  ========================================================= */

  const serviceCards = document.querySelectorAll(
    ".service-card, .services-card, .service-item",
  );

  serviceCards.forEach((card, index) => {
    if (!card.classList.contains("reveal")) {
      card.classList.add("reveal");
    }

    card.style.transitionDelay = `${Math.min(index * 0.08, 0.5)}s`;
  });

  /* =========================================================
     SERVICE CARD HOVER EFFECT
  ========================================================= */

  const interactiveCards = document.querySelectorAll(
    ".service-card, .services-card, .service-item",
  );

  interactiveCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.classList.add("is-hovered");
    });

    card.addEventListener("mouseleave", () => {
      card.classList.remove("is-hovered");
    });
  });

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const targetId = link.getAttribute("href");

      if (!targetId) return;

      const target = document.querySelector(targetId);

      if (!target) return;

      event.preventDefault();

      const header = document.querySelector(".header");

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 15;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    });
  });

  /* =========================================================
     ACTIVE NAVIGATION LINK
  ========================================================= */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  const navigationLinks = document.querySelectorAll(
    ".nav-menu a, .nav-links a",
  );

  navigationLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) return;

    const cleanHref = href.split("#")[0].split("?")[0];

    if (
      cleanHref === currentPage ||
      (currentPage === "" && cleanHref === "index.html")
    ) {
      link.classList.add("active");
    }
  });

  /* =========================================================
     HEADER SCROLL EFFECT
  ========================================================= */

  const header = document.querySelector(".header");

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* =========================================================
     BACK TO TOP BUTTON
  ========================================================= */

  const backToTop = document.querySelector(".back-to-top, #backToTop");

  if (backToTop) {
    const toggleBackToTop = () => {
      if (window.scrollY > 500) {
        backToTop.classList.add("show");
      } else {
        backToTop.classList.remove("show");
      }
    };

    window.addEventListener("scroll", toggleBackToTop, { passive: true });

    backToTop.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  /* =========================================================
     SERVICE BUTTONS
  ========================================================= */

  const serviceButtons = document.querySelectorAll(
    ".service-card a, .services-card a, .service-item a",
  );

  serviceButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const href = button.getAttribute("href");

      if (!href || href === "#" || href.startsWith("javascript:")) {
        event.preventDefault();
      }
    });
  });

  /* =========================================================
     IMAGE LOADING
  ========================================================= */

  const serviceImages = document.querySelectorAll(
    ".service-card img, .services-card img, .service-item img",
  );

  serviceImages.forEach((image) => {
    image.addEventListener("load", () => {
      image.classList.add("loaded");
    });

    image.addEventListener("error", () => {
      image.classList.add("image-error");
    });

    if (image.complete) {
      image.classList.add("loaded");
    }
  });

  /* =========================================================
     PARALLAX EFFECT FOR HERO
  ========================================================= */

  const hero = document.querySelector(".services-hero, .service-hero");

  const heroImage = document.querySelector(
    ".services-hero-bg img, .service-hero-bg img",
  );

  if (hero && heroImage && window.innerWidth > 768) {
    let ticking = false;

    const updateParallax = () => {
      const scrollY = window.scrollY;

      if (scrollY < hero.offsetHeight) {
        heroImage.style.transform = `translateY(${scrollY * 0.12}px) scale(1.03)`;
      }

      ticking = false;
    };

    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          window.requestAnimationFrame(updateParallax);
          ticking = true;
        }
      },
      { passive: true },
    );
  }

  /* =========================================================
     BUTTON RIPPLE EFFECT
  ========================================================= */

  const buttons = document.querySelectorAll(
    ".btn, .service-btn, .services-btn, .primary-btn, .secondary-btn",
  );

  buttons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const rect = button.getBoundingClientRect();

      const ripple = document.createElement("span");

      ripple.classList.add("button-ripple");

      const size = Math.max(rect.width, rect.height);

      ripple.style.width = `${size}px`;
      ripple.style.height = `${size}px`;

      ripple.style.left = `${event.clientX - rect.left - size / 2}px`;

      ripple.style.top = `${event.clientY - rect.top - size / 2}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 650);
    });
  });

  /* =========================================================
     COUNTER ANIMATION
     Works with elements such as:
     <span class="counter" data-target="25">0</span>
  ========================================================= */

  const counters = document.querySelectorAll(".counter");

  if (counters.length) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          const counter = entry.target;
          const target = parseInt(counter.dataset.target || "0", 10);

          let current = 0;

          const duration = 1400;
          const startTime = performance.now();

          const updateCounter = (currentTime) => {
            const progress = Math.min((currentTime - startTime) / duration, 1);

            const eased = 1 - Math.pow(1 - progress, 3);

            current = Math.floor(target * eased);

            counter.textContent = current;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          };

          requestAnimationFrame(updateCounter);

          counterObserver.unobserve(counter);
        });
      },
      {
        threshold: 0.5,
      },
    );

    counters.forEach((counter) => {
      counterObserver.observe(counter);
    });
  }

  /* =========================================================
     CURRENT YEAR
  ========================================================= */

  const yearElements = document.querySelectorAll("#currentYear, .current-year");

  yearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
  });

  /* =========================================================
     REDUCED MOTION SUPPORT
  ========================================================= */

  const prefersReducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  if (prefersReducedMotion) {
    document.documentElement.classList.add("reduce-motion");

    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("visible");
      element.style.transitionDelay = "0s";
    });
  }

  /* =========================================================
     PAGE READY
  ========================================================= */

  document.body.classList.add("page-ready");
});
