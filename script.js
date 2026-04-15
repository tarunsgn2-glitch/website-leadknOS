// =========================
// MOBILE MENU TOGGLE
// =========================
const menuToggle = document.getElementById("menuToggle");
const mobileMenu = document.getElementById("mobileMenu");

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
  });

  const mobileLinks = mobileMenu.querySelectorAll("a");
  mobileLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
    });
  });
}

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
  {
    threshold: 0.15,
  }
);

revealElements.forEach((element) => {
  revealObserver.observe(element);
});

// =========================
// COUNTER ANIMATION
// =========================
const counters = document.querySelectorAll("[data-count]");
let counterStarted = false;

function animateCounters() {
  if (counterStarted) return;
  counterStarted = true;

  counters.forEach((counter) => {
    const target = Number(counter.getAttribute("data-count")) || 0;
    let current = 0;
    const duration = 1800;
    const stepTime = Math.max(20, Math.floor(duration / target));

    const interval = setInterval(() => {
      current += 1;
      counter.textContent = current;

      if (current >= target) {
        counter.textContent = `${target}+`;
        clearInterval(interval);
      }
    }, stepTime);
  });
}

const statsSection = document.querySelector(".hero-stats");

if (statsSection) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCounters();
        }
      });
    },
    { threshold: 0.4 }
  );

  statsSection && statsObserver.observe(statsSection);
}

// =========================
// CONTACT FORM DEMO HANDLER
// =========================
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name")?.value.trim();
    const business = document.getElementById("business")?.value.trim();
    const email = document.getElementById("email")?.value.trim();
    const phone = document.getElementById("phone")?.value.trim();
    const message = document.getElementById("message")?.value.trim();

    if (!name || !business || !email || !phone || !message) {
      formMessage.textContent = "Please fill all required fields properly.";
      formMessage.style.color = "#ffb3c1";
      return;
    }

    formMessage.textContent =
      "Thanks! Your enquiry has been captured successfully. Team LeadKnight will contact you soon.";
    formMessage.style.color = "#bfffe0";

    contactForm.reset();
  });
}

// =========================
// HEADER SHADOW ON SCROLL
// =========================
const siteHeader = document.querySelector(".site-header");

window.addEventListener("scroll", () => {
  if (!siteHeader) return;

  if (window.scrollY > 20) {
    siteHeader.style.boxShadow = "0 12px 30px rgba(0,0,0,0.25)";
  } else {
    siteHeader.style.boxShadow = "none";
  }
});

// =========================
// PROPERTY CARD MOUSE MOVE EFFECT
// =========================
const propertyCards = document.querySelectorAll(".property-card");

propertyCards.forEach((card) => {
  card.addEventListener("mousemove", (event) => {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * 4;
    const rotateY = ((x - centerX) / centerX) * 4;

    card.style.transform = `translateY(-14px) scale(1.02) rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "";
  });
});
