document.addEventListener("DOMContentLoaded", () => {
  const fadeElements = document.querySelectorAll(".fade-up");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.3 });

  fadeElements.forEach(el => observer.observe(el));
});


// Scrolling change header background

window.addEventListener('scroll', function () {
  const header = document.querySelector('.header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});


// Total number of steps
const totalSteps = 4;

// Track direction of flow (true = filling, false = unfilling)
let filling = true;

// Current step index
let current = 1;

// Time between each step animation
const speed = 1200; // milliseconds

/**
 * Handles filling and unfilling animation logic
 */
function updateSteps() {
  const stepEl = document.getElementById(`step${current}`);
  const circle = stepEl.querySelector(".circle");

  if (filling) {
    // Fill the current circle
    circle.style.background = "#f4a460"; // Sandy brown base color


    // Add flowing connector to the next step
    if (current < totalSteps) {
      stepEl.classList.add("active");
    }

    // Move to next step
    current++;

    // If we’ve filled the last step, reverse direction
    if (current > totalSteps) {
      filling = false;
      current = totalSteps; // Start unfilling from last
    }

  } else {
    // Unfill the current circle
    circle.style.background = "#ccc";

    // Remove connector from this step
    if (current < totalSteps) {
      document.getElementById(`step${current}`).classList.remove("active");
    }

    // Move to previous step
    current--;

    // If we’ve unfilling the first step, reverse direction
    if (current < 1) {
      filling = true;
      current = 1; // Start filling again from first
    }
  }
}

// Run updateSteps repeatedly to create loop effect
setInterval(updateSteps, speed);


// Wait until DOM is ready so elements exist
document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.faq-item');

  items.forEach(item => {
    const btn = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    const icon = item.querySelector('.toggle-icon');

    // Click handler for each question
    btn.addEventListener('click', () => {
      const isOpen = item.classList.contains('active');

      // Accordion behaviour: close others
      items.forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
          const otherAns = other.querySelector('.faq-answer');
          otherAns.style.maxHeight = null;           // collapse
          other.querySelector('.toggle-icon').textContent = '+';
          other.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });

      if (!isOpen) {
        // Open this item: set class and dynamic max-height to animate
        item.classList.add('active');
        // set maxHeight to content height so transition works
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.opacity = 1;
        icon.textContent = '−'; // use unicode minus
        btn.setAttribute('aria-expanded', 'true');
      } else {
        // Close this item
        item.classList.remove('active');
        answer.style.maxHeight = null;
        answer.style.opacity = 0;
        icon.textContent = '+';
        btn.setAttribute('aria-expanded', 'false');
      }
    });

    // Optional: if content can change height (images etc.), close on load and adjust height when opened
    // (not necessary for simple text answers)
  });
});


const contactLink = document.getElementById('contactLink');
const contactSidebar = document.getElementById('contactSidebar');
const closeSidebar = document.getElementById('closeSidebar');

contactLink.addEventListener('click', (e) => {
  e.preventDefault();
  contactSidebar.classList.add('active');
});

closeSidebar.addEventListener('click', () => {
  contactSidebar.classList.remove('active');
});

// Optional: Close when clicking outside
document.addEventListener('click', (e) => {
  if (!contactSidebar.contains(e.target) && !contactLink.contains(e.target)) {
    contactSidebar.classList.remove('active');
  }
});

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navMenu.classList.toggle('active');
});

// Fix for mobile browsers: set --vh to 1% of the innerHeight
function setVh() {
  document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
}
setVh();
window.addEventListener('resize', setVh);
