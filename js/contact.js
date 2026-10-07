/* =========================================================
   WANDERLY TRAVELS
   CONTACT PAGE JAVASCRIPT
   PREMIUM + RESPONSIVE + ANIMATED
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
      }, 500);
    });

    // Safety fallback
    setTimeout(() => {
      preloader.classList.add("hide");
    }, 2500);
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
    navMenu.querySelectorAll("a").forEach((link) => {
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
     HEADER SCROLL EFFECT
  ========================================================= */

  const header = document.querySelector(".header");

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    updateHeader();

    window.addEventListener("scroll", updateHeader, { passive: true });
  }

  /* =========================================================
     ACTIVE NAVIGATION LINK
  ========================================================= */

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  document.querySelectorAll(".nav-menu a").forEach((link) => {
    const href = link.getAttribute("href");

    if (!href || href === "#") return;

    const linkPage = href.split("/").pop();

    if (linkPage === currentPage) {
      link.classList.add("active");
    }
  });

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
     STAGGERED REVEAL
  ========================================================= */

  const revealGroups = [
    ".contact-info-card",
    ".contact-method",
    ".contact-form-group",
    ".faq-item",
  ];

  revealGroups.forEach((selector) => {
    const elements = document.querySelectorAll(selector);

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${index * 80}ms`;
    });
  });

  /* =========================================================
     CONTACT FORM
  ========================================================= */

  const contactForm = document.querySelector("#contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const nameInput = contactForm.querySelector('[name="name"]');

      const emailInput = contactForm.querySelector('[name="email"]');

      const messageInput = contactForm.querySelector('[name="message"]');

      const name = nameInput ? nameInput.value.trim() : "";

      const email = emailInput ? emailInput.value.trim() : "";

      const message = messageInput ? messageInput.value.trim() : "";

      /* Basic validation */

      if (!name) {
        showContactMessage("Please enter your name.", "error");

        if (nameInput) nameInput.focus();

        return;
      }

      if (!email) {
        showContactMessage("Please enter your email address.", "error");

        if (emailInput) emailInput.focus();

        return;
      }

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!emailPattern.test(email)) {
        showContactMessage("Please enter a valid email address.", "error");

        if (emailInput) emailInput.focus();

        return;
      }

      if (!message) {
        showContactMessage("Please enter your message.", "error");

        if (messageInput) messageInput.focus();

        return;
      }

      /* Success */

      showContactMessage(
        "Thank you! Your message is ready to be sent.",
        "success",
      );
    });
  }

  /* =========================================================
     CONTACT MESSAGE HELPER
  ========================================================= */

  function showContactMessage(message, type) {
    let messageBox = document.querySelector(".contact-form-message");

    if (!messageBox) {
      messageBox = document.createElement("div");

      messageBox.className = "contact-form-message";

      if (contactForm) {
        contactForm.prepend(messageBox);
      }
    }

    messageBox.textContent = message;

    messageBox.classList.remove("success", "error");

    messageBox.classList.add(type);

    messageBox.style.display = "block";

    setTimeout(() => {
      messageBox.style.opacity = "0";

      setTimeout(() => {
        messageBox.style.display = "none";
        messageBox.style.opacity = "1";
      }, 300);
    }, 4000);
  }

  /* =========================================================
     GOOGLE FORM BUTTON
  ========================================================= */

  const googleFormButtons = document.querySelectorAll(
    "[data-google-form], .google-form-btn",
  );

  const googleFormURL =
    "https://docs.google.com/forms/d/e/1FAIpQLSeVi7H_4viI_qknM3I5aGoMzQg_nb0Ivj_2zgHNUkM_BTxi_A/viewform";

  googleFormButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const href = button.getAttribute("href");

      // If button already has the correct Google Form URL,
      // allow normal navigation.
      if (href && href.includes("docs.google.com/forms")) {
        return;
      }

      event.preventDefault();

      window.open(googleFormURL, "_blank", "noopener,noreferrer");
    });
  });

  /* =========================================================
     SMOOTH SCROLL
  ========================================================= */

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (event) {
      const targetID = this.getAttribute("href");

      if (!targetID || targetID === "#" || targetID.length <= 1) {
        return;
      }

      const target = document.querySelector(targetID);

      if (!target) return;

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

  /* =========================================================
     PHONE NUMBER LINKS
  ========================================================= */

  document.querySelectorAll('a[href^="tel:"]').forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("clicked");

      setTimeout(() => {
        link.classList.remove("clicked");
      }, 500);
    });
  });

  /* =========================================================
     EMAIL LINKS
  ========================================================= */

  document.querySelectorAll('a[href^="mailto:"]').forEach((link) => {
    link.addEventListener("click", () => {
      link.classList.add("clicked");

      setTimeout(() => {
        link.classList.remove("clicked");
      }, 500);
    });
  });

  /* =========================================================
     BACK TO TOP
  ========================================================= */

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

  /* =========================================================
     CONTACT CARDS HOVER
  ========================================================= */

  document
    .querySelectorAll(".contact-card, .contact-info-card")
    .forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.classList.add("is-hovered");
      });

      card.addEventListener("mouseleave", () => {
        card.classList.remove("is-hovered");
      });
    });

  /* =========================================================
     RESIZE FIX
  ========================================================= */

  window.addEventListener("resize", () => {
    if (window.innerWidth > 850) {
      if (menuToggle) {
        menuToggle.classList.remove("active");
      }

      if (navMenu) {
        navMenu.classList.remove("active");
      }

      document.body.classList.remove("menu-open");
    }
  });

  /* =========================================================
     PAGE READY
  ========================================================= */

  document.body.classList.add("page-ready");
});
