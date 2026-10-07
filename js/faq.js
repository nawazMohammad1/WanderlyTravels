/* =========================================================
   WANDERLY TRAVELS
   FAQ PAGE JAVASCRIPT
   faq.js
========================================================= */

document.addEventListener("DOMContentLoaded", () => {
  /* =====================================================
       ELEMENTS
    ====================================================== */

  const body = document.body;

  const preloader = document.getElementById("preloader");

  const header = document.getElementById("header");

  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navClose = document.getElementById("navClose");
  const navOverlay = document.getElementById("navOverlay");

  const currentYear = document.getElementById("currentYear");

  const backToTop = document.getElementById("backToTop");

  const faqItems = Array.from(document.querySelectorAll(".faq-item"));

  const faqQuestions = Array.from(document.querySelectorAll(".faq-question"));

  const faqFilters = Array.from(document.querySelectorAll(".faq-filter"));

  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  /* =====================================================
       REDUCED MOTION
    ====================================================== */

  const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  /* =====================================================
       PRELOADER
    ====================================================== */

  let preloaderHidden = false;

  const hidePreloader = () => {
    if (preloaderHidden || !preloader) {
      return;
    }

    preloaderHidden = true;

    preloader.classList.add("hidden");

    setTimeout(() => {
      preloader.style.display = "none";
    }, 600);
  };

  window.addEventListener("load", hidePreloader);

  /*
       Fallback in case an external resource takes too long.
    */
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

  const openMenu = () => {
    if (!navMenu) {
      return;
    }

    navMenu.classList.add("active");

    if (navOverlay) {
      navOverlay.classList.add("active");
    }

    body.classList.add("menu-open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "true");
    }
  };

  const closeMenu = () => {
    if (!navMenu) {
      return;
    }

    navMenu.classList.remove("active");

    if (navOverlay) {
      navOverlay.classList.remove("active");
    }

    body.classList.remove("menu-open");

    if (menuToggle) {
      menuToggle.setAttribute("aria-expanded", "false");
    }
  };

  if (menuToggle) {
    menuToggle.addEventListener("click", openMenu);
  }

  if (navClose) {
    navClose.addEventListener("click", closeMenu);
  }

  if (navOverlay) {
    navOverlay.addEventListener("click", closeMenu);
  }

  /*
       Close mobile menu when clicking a navigation link.
    */
  document.querySelectorAll(".nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      closeMenu();
    });
  });

  /*
       Escape closes mobile navigation.
    */
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
    }
  });

  /*
       Reset menu if window becomes desktop size.
    */
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeMenu();
    }
  });

  /* =====================================================
       HEADER SCROLL EFFECT
    ====================================================== */

  const updateHeader = () => {
    if (!header) {
      return;
    }

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
       FAQ ACCORDION
    ====================================================== */

  const closeFaqItem = (item) => {
    if (!item) {
      return;
    }

    item.classList.remove("active");

    const question = item.querySelector(".faq-question");

    if (question) {
      question.setAttribute("aria-expanded", "false");
    }
  };

  const openFaqItem = (item) => {
    if (!item) {
      return;
    }

    item.classList.add("active");

    const question = item.querySelector(".faq-question");

    if (question) {
      question.setAttribute("aria-expanded", "true");
    }
  };

  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      const currentItem = question.closest(".faq-item");

      if (!currentItem) {
        return;
      }

      const isCurrentlyOpen = currentItem.classList.contains("active");

      /*
               Close every other FAQ.
               This keeps the page clean and prevents
               multiple long answers from staying open.
            */
      faqItems.forEach((item) => {
        if (item !== currentItem) {
          closeFaqItem(item);
        }
      });

      /*
               Toggle clicked FAQ.
            */
      if (isCurrentlyOpen) {
        closeFaqItem(currentItem);
      } else {
        openFaqItem(currentItem);
      }
    });
  });

  /* =====================================================
       FAQ KEYBOARD SUPPORT
    ====================================================== */

  faqQuestions.forEach((question, index) => {
    question.addEventListener("keydown", (event) => {
      let targetIndex = null;

      if (event.key === "ArrowDown") {
        event.preventDefault();

        targetIndex = (index + 1) % faqQuestions.length;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();

        targetIndex = (index - 1 + faqQuestions.length) % faqQuestions.length;
      }

      if (event.key === "Home") {
        event.preventDefault();

        targetIndex = 0;
      }

      if (event.key === "End") {
        event.preventDefault();

        targetIndex = faqQuestions.length - 1;
      }

      if (targetIndex !== null) {
        faqQuestions[targetIndex].focus();
      }
    });
  });

  /* =====================================================
       FAQ FILTERING
    ====================================================== */

  const filterFaqs = (category) => {
    faqItems.forEach((item, index) => {
      const itemCategory = item.getAttribute("data-category");

      const shouldShow = category === "all" || itemCategory === category;

      if (shouldShow) {
        item.classList.remove("hidden");

        /*
                   Keep the reveal animation working after filtering.
                */
        if (reducedMotion) {
          item.classList.add("visible");
        } else {
          item.classList.remove("visible");

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              item.classList.add("visible");
            });
          });
        }
      } else {
        /*
                   Close hidden FAQ answers.
                */
        closeFaqItem(item);

        item.classList.remove("visible");
        item.classList.add("hidden");
      }
    });
  };

  faqFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      const category = filter.getAttribute("data-category") || "all";

      /*
               Update active filter.
            */
      faqFilters.forEach((button) => {
        button.classList.remove("active");
      });

      filter.classList.add("active");

      /*
               Filter FAQ cards.
            */
      filterFaqs(category);
    });

    /*
           Keyboard support for filter buttons.
        */
    filter.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();

        filter.click();
      }
    });
  });

  /* =====================================================
       REVEAL ANIMATIONS
    ====================================================== */

  if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          const element = entry.target;

          /*
                           Small stagger for FAQ cards.
                        */
          const faqIndex = faqItems.indexOf(element);

          if (faqIndex !== -1) {
            element.style.transitionDelay = `${Math.min(faqIndex * 0.045, 0.3)}s`;
          }

          element.classList.add("visible");

          observer.unobserve(element);
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
       SMOOTH INTERNAL LINKS
    ====================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#" || href.length <= 1) {
        return;
      }

      const target = document.querySelector(href);

      if (!target) {
        return;
      }

      event.preventDefault();

      const headerHeight = header ? header.offsetHeight : 0;

      const targetPosition =
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 15;

      window.scrollTo({
        top: targetPosition,
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
  });

  /* =====================================================
       BACK TO TOP
    ====================================================== */

  const updateBackToTop = () => {
    if (!backToTop) {
      return;
    }

    if (window.scrollY > 600) {
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
        behavior: reducedMotion ? "auto" : "smooth",
      });
    });
  }

  /* =====================================================
       IMAGE ERROR FALLBACK
    ====================================================== */

  document.querySelectorAll("img").forEach((image) => {
    image.addEventListener("error", () => {
      if (image.dataset.fallbackApplied) {
        return;
      }

      image.dataset.fallbackApplied = "true";

      image.src =
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=80";
    });
  });

  /* =====================================================
       ACTIVE NAVIGATION
    ====================================================== */

  const currentPage =
    window.location.pathname.split("/").pop().toLowerCase() || "index.html";

  document.querySelectorAll(".nav-link").forEach((link) => {
    const linkPage = (link.getAttribute("href") || "")
      .split("/")
      .pop()
      .toLowerCase();

    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* =====================================================
       FAQ FILTER BUTTON ACCESSIBILITY
    ====================================================== */

  faqFilters.forEach((filter) => {
    filter.setAttribute(
      "aria-pressed",
      filter.classList.contains("active") ? "true" : "false",
    );
  });

  /*
       Keep aria-pressed synchronized.
    */
  faqFilters.forEach((filter) => {
    filter.addEventListener("click", () => {
      faqFilters.forEach((button) => {
        button.setAttribute(
          "aria-pressed",
          button.classList.contains("active") ? "true" : "false",
        );
      });
    });
  });

  /* =====================================================
       FAQ ITEM HOVER MICRO INTERACTION
    ====================================================== */

  if (!reducedMotion) {
    faqItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        if (!item.classList.contains("active")) {
          item.style.transform = "translateY(-2px)";
        }
      });

      item.addEventListener("mouseleave", () => {
        item.style.transform = "";
      });
    });
  }

  /* =====================================================
       HERO SUBTLE PARALLAX
    ====================================================== */

  const heroBackground = document.querySelector(".faq-hero-bg");

  if (heroBackground && !reducedMotion && window.innerWidth > 900) {
    let ticking = false;

    const updateHeroParallax = () => {
      const scrollY = window.scrollY;

      if (scrollY <= 700) {
        heroBackground.style.transform = `scale(1.02) translateY(${scrollY * 0.08}px)`;
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
       PREVENT ACCORDION JUMPING
    ====================================================== */

  faqQuestions.forEach((question) => {
    question.setAttribute(
      "aria-controls",
      `faq-answer-${Math.random().toString(36).substring(2, 9)}`,
    );
  });

  /* =====================================================
       INITIAL FAQ STATE
    ====================================================== */

  /*
       Make sure all FAQ answers start closed.
       The user can open them by clicking the question.
    */
  faqItems.forEach((item) => {
    closeFaqItem(item);
  });

  /* =====================================================
       CONSOLE STATUS
    ====================================================== */

  console.log("Wanderly Travels FAQ loaded successfully.");
});
