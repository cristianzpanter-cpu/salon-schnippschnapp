(function () {
  'use strict';

  // ---- Mobile navigation toggle ----------------------------------------
  var navToggle = document.getElementById('nav-toggle');
  var mainNav = document.getElementById('main-nav');

  function closeNav() {
    mainNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
    navToggle.setAttribute('aria-label', 'Menü öffnen');
    document.body.style.overflow = '';
  }

  function openNav() {
    mainNav.classList.add('is-open');
    navToggle.setAttribute('aria-expanded', 'true');
    navToggle.setAttribute('aria-label', 'Menü schließen');
    document.body.style.overflow = 'hidden';
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      var isOpen = mainNav.classList.contains('is-open');
      if (isOpen) {
        closeNav();
      } else {
        openNav();
      }
    });

    // Close the mobile menu after choosing a section, so the smooth
    // scroll to the anchor is visible instead of being hidden behind it.
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', closeNav);
    });
  }

  // ---- Smooth scroll for all in-page anchors (incl. Safari/older browsers) --
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (event) {
      var targetId = link.getAttribute('href');
      if (!targetId || targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });

      if (history.pushState) {
        history.pushState(null, '', targetId);
      }
    });
  });

  // ---- Reveal-on-scroll animation ---------------------------------------
  var revealTargets = document.querySelectorAll(
    '.section-eyebrow, .section h2, .about-grid, .services-grid, .team-grid, .jobs-list, .contact-grid'
  );

  revealTargets.forEach(function (el) {
    el.classList.add('reveal');
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealTargets.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
