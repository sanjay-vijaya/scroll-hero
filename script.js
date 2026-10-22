// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Select elements
const headlineLines = document.querySelectorAll(".headline-line");
const statCards = document.querySelectorAll(".stat-card");
const heroDescription = document.querySelector(".hero-description");
const can = document.querySelector("#fizz-can");
const visualLabels = document.querySelectorAll(".floating-label");

// Respect reduced-motion preferences
const prefersReducedMotion = window.matchMedia(
  "(prefers-reduced-motion: reduce)",
).matches;

// INTRO ANIMATION
if (!prefersReducedMotion) {
  const intro = gsap.timeline({
    defaults: {
      ease: "power3.out",
    },
  });

  // Headline reveal
  intro.from(headlineLines, {
    y: 65,
    opacity: 0,
    duration: 1,
    stagger: 0.18,
  });

  // Description reveal
  intro.from(
    heroDescription,
    {
      y: 20,
      opacity: 0,
      duration: 0.7,
    },
    "-=0.5",
  );

  // Statistics appear one by one
  intro.from(
    statCards,
    {
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.15,
    },
    "-=0.35",
  );

  // Floating labels appear
  intro.from(
    visualLabels,
    {
      opacity: 0,
      y: 12,
      duration: 0.6,
      stagger: 0.15,
    },
    "-=0.4",
  );

  // Scroll-driven can animation
  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=900",
      scrub: 1,
      pin: true,
      anticipatePin: 1,
    },
  });

  scrollTimeline
    .to(can, {
      rotation: 20,
      y: -100,
      x: 70,
      scale: 1.08,
      ease: "none",
      duration: 1,
    })
    .to(can, {
      rotation: -15,
      y: 35,
      x: -65,
      scale: 0.92,
      ease: "none",
      duration: 1,
    });

  // Background glow reacts to scroll
  gsap.to(".visual-glow", {
    scale: 1.5,
    opacity: 0.65,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=900",
      scrub: 1,
    },
  });

  // Orbit movement
  gsap.to(".orbit-one", {
    rotation: 45,
    scale: 1.15,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=900",
      scrub: 1,
    },
  });

  gsap.to(".orbit-two", {
    rotation: -30,
    scale: 0.9,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "+=900",
      scrub: 1,
    },
  });
} else {
  // Keep content visible for reduced-motion users
  gsap.set([headlineLines, statCards, heroDescription, visualLabels], {
    clearProps: "all",
  });
}

// Animate About section when it enters the viewport
if (!prefersReducedMotion) {
  gsap.from(
    ".about-section .eyebrow, .about-section h2, .about-section p, .back-button",
    {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".about-section",
        start: "top 75%",
        once: true,
      },
    },
  );
}

// Refresh trigger positions after images and fonts load
window.addEventListener("load", () => {
  ScrollTrigger.refresh();
});
