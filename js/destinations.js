/* =========================================================
   WANDERLY TRAVELS
   DESTINATIONS PAGE JAVASCRIPT
   destinations.js
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

  const filterButtons = document.querySelectorAll(".filter-btn");

  const destinationItems = document.querySelectorAll(".destination-item");

  const favoriteButtons = document.querySelectorAll(".destination-favorite");

  const loadMoreBtn = document.getElementById("loadMoreBtn");

  const revealElements = document.querySelectorAll(".reveal");

  /* =====================================================
       PRELOADER
    ===================================================== */

  window.addEventListener("load", () => {
    setTimeout(() => {
      if (preloader) {
        preloader.classList.add("hide");
      }

      document.documentElement.classList.add("page-loaded");
    }, 500);
  });

  /* =====================================================
       HEADER SCROLL
    ===================================================== */

  function handleHeaderScroll() {
    if (!header) return;

    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  }

  handleHeaderScroll();

  window.addEventListener("scroll", handleHeaderScroll, { passive: true });

  /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("active");

      menuToggle.classList.toggle("active", isOpen);

      body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    /* Close menu after clicking a link */

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
       ACTIVE NAVIGATION
    ===================================================== */

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (href && href.includes("destinations.html")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  /* =====================================================
       SCROLL REVEAL
       ---------------------------------------------
       Important:
       We store revealed state in data-revealed.
       This allows filtering to preserve visibility.
    ===================================================== */

  if (revealElements.length) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");

            /*
             * Remember that this element
             * has already been revealed.
             */

            entry.target.dataset.revealed = "true";

            /*
             * Once revealed, stop observing
             * the element.
             */

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
      /*
       * Every reveal element starts as
       * not revealed.
       */

      element.dataset.revealed = "false";

      revealObserver.observe(element);
    });
  }

  /* =====================================================
       DESTINATION FILTER
       ---------------------------------------------
       Filtering preserves .visible state.
    ===================================================== */

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const selectedFilter = button.dataset.filter;

      /* -----------------------------------------
                   Active filter button
                ----------------------------------------- */

      filterButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      /* -----------------------------------------
                   Filter destination cards
                ----------------------------------------- */

      destinationItems.forEach((item) => {
        const category = item.dataset.category;

        const shouldShow =
          selectedFilter === "all" || category === selectedFilter;

        /*
         * Remove previous filter animation.
         */

        item.classList.remove("filter-show");

        if (shouldShow) {
          /*
           * Show the matching card.
           */

          item.classList.remove("filter-hidden");

          /*
           * Preserve its existing
           * reveal visibility.
           *
           * We intentionally DO NOT
           * remove .visible.
           */

          if (item.dataset.revealed === "true") {
            item.classList.add("visible");
          }

          /*
           * Restart filter animation.
           */

          void item.offsetWidth;

          item.classList.add("filter-show");
        } else {
          /*
           * Hide cards that do not
           * match the selected category.
           */

          item.classList.add("filter-hidden");
        }
      });

      /* -----------------------------------------
                   Ensure revealed cards stay visible
                   ----------------------------------------- */

      requestAnimationFrame(() => {
        destinationItems.forEach((item) => {
          if (
            !item.classList.contains("filter-hidden") &&
            item.dataset.revealed === "true"
          ) {
            item.classList.add("visible");
          }
        });
      });

      /* -----------------------------------------
                   Mobile: scroll to destination grid
                ----------------------------------------- */

      if (window.innerWidth <= 760) {
        const list = document.querySelector(".destination-list");

        if (list) {
          setTimeout(() => {
            list.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 100);
        }
      }
    });
  });

  /* =====================================================
       WISHLIST / FAVORITE BUTTONS
    ===================================================== */

  favoriteButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();

      event.stopPropagation();

      const icon = button.querySelector("i");

      const isActive = button.classList.toggle("active");

      /* -----------------------------------------
                   Change heart icon
                ----------------------------------------- */

      if (icon) {
        if (isActive) {
          icon.classList.remove("fa-regular");

          icon.classList.add("fa-solid");
        } else {
          icon.classList.remove("fa-solid");

          icon.classList.add("fa-regular");
        }
      }

      /* -----------------------------------------
                   Get destination name
                ----------------------------------------- */

      const card = button.closest(".destination-item");

      const destinationName = card ? card.querySelector("h3") : null;

      const name = destinationName
        ? destinationName.textContent.trim()
        : "Destination";

      /* -----------------------------------------
                   Notification
                ----------------------------------------- */

      if (isActive) {
        showToast(`${name} added to your wishlist.`);
      } else {
        showToast(`${name} removed from your wishlist.`);
      }
    });
  });

  /* =====================================================
       DESTINATION LINKS
    ===================================================== */

  const destinationLinks = document.querySelectorAll(".destination-link");

  destinationLinks.forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");

      if (!href || href === "#") {
        event.preventDefault();

        showToast("Destination packages coming soon.");
      }
    });
  });

  /* =====================================================
       LOAD MORE BUTTON
    ===================================================== */

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", () => {
      const buttonText = loadMoreBtn.querySelector("span");

      const icon = loadMoreBtn.querySelector("i");

      if (buttonText) {
        buttonText.textContent = "More Destinations Coming Soon";
      }

      if (icon) {
        icon.className = "fa-solid fa-check";
      }

      loadMoreBtn.disabled = true;

      loadMoreBtn.style.opacity = "0.75";

      loadMoreBtn.style.cursor = "default";

      showToast("More exciting destinations are coming soon!");
    });
  }

  /* =====================================================
       SMOOTH SCROLL
    ===================================================== */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetId = this.getAttribute("href");

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
        target.getBoundingClientRect().top + window.scrollY - headerHeight - 15;

      window.scrollTo({
        top: targetPosition,

        behavior: "smooth",
      });
    });
  });

  /* =====================================================
       ESCAPE KEY
    ===================================================== */

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") {
      return;
    }

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
       RESIZE
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
       IMAGE ERROR HANDLING
    ===================================================== */

  const images = document.querySelectorAll(
    ".destination-image img, " +
      ".destinations-hero-bg img, " +
      ".destination-cta-bg img",
  );

  images.forEach((image) => {
    image.addEventListener(
      "error",
      () => {
        image.classList.add("image-error");
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
       TOAST NOTIFICATION
    ===================================================== */

  let toastTimer = null;

  function showToast(message) {
    let toast = document.querySelector(".destination-toast");

    /*
     * Create toast only once.
     */

    if (!toast) {
      toast = document.createElement("div");

      toast.className = "destination-toast";

      toast.innerHTML = `
                <span class="toast-icon">
                    <i class="fa-solid fa-circle-check"></i>
                </span>

                <span class="toast-message"></span>

                <button
                    class="toast-close"
                    aria-label="Close notification">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            `;

      document.body.appendChild(toast);

      const closeButton = toast.querySelector(".toast-close");

      if (closeButton) {
        closeButton.addEventListener("click", () => {
          toast.classList.remove("show");
        });
      }
    }

    const messageElement = toast.querySelector(".toast-message");

    if (messageElement) {
      messageElement.textContent = message;
    }

    clearTimeout(toastTimer);

    requestAnimationFrame(() => {
      toast.classList.add("show");
    });

    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 3200);
  }

  /* =====================================================
       TOAST STYLES
       Dynamically added so no additional CSS file
       is required for notifications.
    ===================================================== */

  const toastStyle = document.createElement("style");

  toastStyle.textContent = `

        .destination-toast {
            position: fixed;
            right: 25px;
            bottom: 25px;
            z-index: 99999;

            display: flex;
            align-items: center;
            gap: 12px;

            max-width:
                calc(100vw - 40px);

            padding: 14px 16px;

            border:
                1px solid
                rgba(226, 232, 240, 0.8);

            border-radius: 14px;

            background: #ffffff;

            color: #102a2a;

            box-shadow:
                0 18px 45px
                rgba(15, 23, 42, 0.16);

            opacity: 0;

            transform:
                translateY(25px)
                scale(0.96);

            pointer-events: none;

            transition:
                opacity 0.3s ease,
                transform 0.3s ease;
        }


        .destination-toast.show {
            opacity: 1;

            transform:
                translateY(0)
                scale(1);

            pointer-events: auto;
        }


        .destination-toast .toast-icon {
            width: 34px;
            height: 34px;

            flex: 0 0 34px;

            display: flex;
            align-items: center;
            justify-content: center;

            border-radius: 50%;

            background:
                rgba(15, 118, 110, 0.1);

            color: #0f766e;
        }


        .destination-toast .toast-message {
            font-family:
                "DM Sans",
                sans-serif;

            font-size: 13px;
            font-weight: 700;

            line-height: 1.4;
        }


        .destination-toast .toast-close {
            width: 28px;
            height: 28px;

            display: flex;
            align-items: center;
            justify-content: center;

            border: 0;

            background: transparent;

            color: #64748b;

            cursor: pointer;

            border-radius: 50%;
        }


        .destination-toast .toast-close:hover {
            background: #f1f5f9;
            color: #102a2a;
        }


        @media (max-width: 480px) {

            .destination-toast {
                right: 12px;
                left: 12px;
                bottom: 15px;

                max-width: none;
            }

        }

    `;

  document.head.appendChild(toastStyle);

  /* =====================================================
       INITIAL JAVASCRIPT STATE
    ===================================================== */

  document.documentElement.classList.add("js-enabled");

  /* =====================================================
       PAGE READY
    ===================================================== */

  setTimeout(() => {
    document.body.classList.add("destinations-ready");
  }, 100);
});
