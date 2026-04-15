// =========================
// PRELOADER
// =========================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  setTimeout(() => {
    preloader?.classList.add("hidden");
  }, 700);
});

// =========================
// MOBILE MENU
// =========================
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  mobileMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

// =========================
// THEME TOGGLE
// =========================
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("leadknight-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

themeToggle?.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");
  const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
  localStorage.setItem("leadknight-theme", theme);
});

// =========================
// REVEAL ON SCROLL
// =========================
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.15 }
);

revealElements.forEach((el) => revealObserver.observe(el));

// =========================
// COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll("[data-count]");
let countersStarted = false;

function animateCounter(counter, target) {
  let current = 0;
  const duration = 1800;
  const increment = Math.max(1, Math.ceil(target / (duration / 16)));

  function update() {
    current += increment;
    if (current >= target) {
      current = target;
    }

    counter.textContent = `${current}${target > 99 ? "+" : "%"}`;

    if (current < target) {
      requestAnimationFrame(update);
    }
  }

  update();
}

function startCounters() {
  if (countersStarted) return;
  countersStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-count")) || 0;
    animateCounter(counter, target);
  });
}

const heroStats = document.querySelector(".hero-stats");

if (heroStats) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          startCounters();
        }
      });
    },
    { threshold: 0.35 }
  );

  statsObserver.observe(heroStats);
}

// =========================
// HEADER SHADOW + BACK TO TOP
// =========================
const siteHeader = document.querySelector(".site-header");
const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {
  if (siteHeader) {
    if (window.scrollY > 20) {
      siteHeader.style.boxShadow = "0 12px 32px rgba(0,0,0,0.18)";
    } else {
      siteHeader.style.boxShadow = "none";
    }
  }

  if (backToTop) {
    if (window.scrollY > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }

  updateActiveNav();
});

backToTop?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

// =========================
// ACTIVE NAV LINK
// =========================
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll("#desktopNav a");

function updateActiveNav() {
  let currentId = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (window.scrollY >= sectionTop) {
      currentId = section.getAttribute("id") || "";
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    const href = link.getAttribute("href");
    if (href === `#${currentId}`) {
      link.classList.add("active");
    }
  });
}

// =========================
// PROPERTY CARD TILT EFFECT
// =========================
const propertyCards = document.querySelectorAll(".property-card");

propertyCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;

    card.style.transform = `perspective(900px) rotateX(${-rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});

// =========================
// TESTIMONIAL SLIDER
// =========================
const testimonialCards = document.querySelectorAll(".testimonial-card");
const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");

let testimonialIndex = 0;

function showTestimonial(index) {
  testimonialCards.forEach((card, i) => {
    card.classList.toggle("active", i === index);
  });
}

prevTestimonial?.addEventListener("click", () => {
  testimonialIndex =
    (testimonialIndex - 1 + testimonialCards.length) % testimonialCards.length;
  showTestimonial(testimonialIndex);
});

nextTestimonial?.addEventListener("click", () => {
  testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
  showTestimonial(testimonialIndex);
});

setInterval(() => {
  if (testimonialCards.length > 0) {
    testimonialIndex = (testimonialIndex + 1) % testimonialCards.length;
    showTestimonial(testimonialIndex);
  }
}, 5000);

// =========================
// FAQ ACCORDION
// =========================
const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");

  question?.addEventListener("click", () => {
    const isOpen = item.classList.contains("open");

    faqItems.forEach((faq) => faq.classList.remove("open"));

    if (!isOpen) {
      item.classList.add("open");
    }
  });
});

// =========================
// PRICING TOGGLE
// =========================
const pricingButtons = document.querySelectorAll(".toggle-option");
const priceElements = document.querySelectorAll(".price");

pricingButtons.forEach((button) => {
  button.addEventListener("click", () => {
    pricingButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const planType = button.getAttribute("data-plan");

    priceElements.forEach((priceEl) => {
      const monthly = priceEl.getAttribute("data-monthly");
      const yearly = priceEl.getAttribute("data-yearly");

      if (planType === "yearly") {
        priceEl.innerHTML = `₹${Number(yearly).toLocaleString()}<span>/year</span>`;
      } else {
        priceEl.innerHTML = `₹${Number(monthly).toLocaleString()}<span>/month</span>`;
      }
    });
  });
});

// =========================
// CONTACT FORM VALIDATION
// =========================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim() || "";
    const business = document.getElementById("business")?.value.trim() || "";
    const email = document.getElementById("email")?.value.trim() || "";
    const phone = document.getElementById("phone")?.value.trim() || "";
    const message = document.getElementById("message")?.value.trim() || "";

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneValid = /^[0-9+\-\s]{8,15}$/.test(phone);

    if (!name || !business || !email || !phone || !message) {
      formMessage.textContent = "Please fill all fields.";
      formMessage.style.color = "#ff9fb2";
      return;
    }

    if (!emailValid) {
      formMessage.textContent = "Please enter a valid email address.";
      formMessage.style.color = "#ff9fb2";
      return;
    }

    if (!phoneValid) {
      formMessage.textContent = "Please enter a valid phone number.";
      formMessage.style.color = "#ff9fb2";
      return;
    }

    formMessage.textContent =
      "Thanks! Your enquiry has been submitted successfully.";
    formMessage.style.color = "#88f0c3";

    contactForm.reset();
  });
}

// =========================
// CUSTOM CURSOR
// =========================
const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

window.addEventListener("mousemove", (event) => {
  mouseX = event.clientX;
  mouseY = event.clientY;

  if (cursorDot) {
    cursorDot.style.left = `${mouseX}px`;
    cursorDot.style.top = `${mouseY}px`;
  }
});

function animateCursor() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;

  if (cursorOutline) {
    cursorOutline.style.left = `${outlineX}px`;
    cursorOutline.style.top = `${outlineY}px`;
  }

  requestAnimationFrame(animateCursor);
}

animateCursor();

const hoverTargets = document.querySelectorAll("a, button, .property-card, .feature-card");

hoverTargets.forEach((item) => {
  item.addEventListener("mouseenter", () => {
    if (cursorOutline) {
      cursorOutline.style.width = "52px";
      cursorOutline.style.height = "52px";
    }
  });

  item.addEventListener("mouseleave", () => {
    if (cursorOutline) {
      cursorOutline.style.width = "34px";
      cursorOutline.style.height = "34px";
    }
  });
});

// =========================
// PARTICLE BACKGROUND
// =========================
const canvas = document.getElementById("particleCanvas");
const ctx = canvas?.getContext("2d");

if (canvas && ctx) {
  let particles = [];
  const particleCount = 80;

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < particleCount; i += 1) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 2 + 1,
        dx: (Math.random() - 0.5) * 0.5,
        dy: (Math.random() - 0.5) * 0.5,
      });
    }
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    particles.forEach((particle, i) => {
      particle.x += particle.dx;
      particle.y += particle.dy;

      if (particle.x < 0 || particle.x > canvas.width) particle.dx *= -1;
      if (particle.y < 0 || particle.y > canvas.height) particle.dy *= -1;

      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(140, 180, 255, 0.35)";
      ctx.fill();

      for (let j = i + 1; j < particles.length; j += 1) {
        const p2 = particles[j];
        const dist = Math.hypot(particle.x - p2.x, particle.y - p2.y);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particle.x, particle.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.strokeStyle = `rgba(120, 180, 255, ${0.12 - dist / 1200})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    });

    requestAnimationFrame(drawParticles);
  }

  resizeCanvas();
  createParticles();
  drawParticles();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createParticles();
  });
}
