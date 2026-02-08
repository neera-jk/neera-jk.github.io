// ===================== THEME TOGGLE FUNCTIONALITY =====================
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const body = document.body;

// ===================== TIMELINE DATE FORMATTING =====================
function formatTimelineDate(dateStr) {
  // Handle year-only format (e.g., "2023")
  if (/^\d{4}$/.test(dateStr)) {
    return dateStr;
  }
  
  // Handle YYYY-MM format (e.g., "2024-05")
  if (/^\d{4}-\d{2}$/.test(dateStr)) {
    const [year, month] = dateStr.split('-');
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${months[parseInt(month) - 1]} ${year}`;
  }
  
  // Handle "present" or "current"
  if (dateStr.toLowerCase() === 'present' || dateStr.toLowerCase() === 'current') {
    return 'Present';
  }
  
  return dateStr;
}

function populateTimelineDates() {
  const timelineItems = document.querySelectorAll('.timeline-item[data-start]');
  
  timelineItems.forEach(item => {
    const startDate = item.dataset.start;
    const endDate = item.dataset.end;
    const dateElement = item.querySelector('.timeline-date');
    
    if (dateElement && startDate) {
      const formattedStart = formatTimelineDate(startDate);
      const formattedEnd = endDate ? formatTimelineDate(endDate) : 'Present';
      
      // Create structured date display: start date, "to", end date
      dateElement.innerHTML = `
        <span class="date-start">${formattedStart}</span>
        <span class="date-separator">to</span>
        <span class="date-end">${formattedEnd}</span>
      `;
    }
  });
}

// Load theme preference from localStorage
function loadThemePreference() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    themeToggle.textContent = '☀️';
  } else {
    body.classList.remove('light-mode');
    themeToggle.textContent = '🌙';
  }
}

// Toggle theme and save preference
themeToggle.addEventListener('click', () => {
  body.classList.toggle('light-mode');
  
  const isLightMode = body.classList.contains('light-mode');
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  
  // Update button emoji
  themeToggle.textContent = isLightMode ? '☀️' : '🌙';
});

// Load theme and populate dates on page load
document.addEventListener('DOMContentLoaded', () => {
  loadThemePreference();
  populateTimelineDates();
});

// ===================== SMOOTH SCROLL NAVIGATION =====================
const navLinks = document.querySelectorAll('.custom-nav-link');
const sections = document.querySelectorAll('[id]');

// Smooth scroll on nav link click
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    
    if (targetId && targetId !== '#') {
      const targetSection = document.querySelector(targetId);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// Update active nav link based on scroll position
function updateActiveNavLink() {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    
    if (window.pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink);

// ===================== INTERSECTION OBSERVER FOR ANIMATIONS =====================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeIn 0.6s ease-out forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe project cards, education cards, and contact buttons
document.querySelectorAll('.projectCard1, .projectCard2, .projectCard3, .educationCard1, .educationCard2, .contactButton').forEach(element => {
  element.style.opacity = '0';
  observer.observe(element);
});

// ===================== KEYBOARD NAVIGATION =====================
document.addEventListener('keydown', (e) => {
  // Alt + H = Home
  if (e.altKey && e.key === 'h') {
    document.querySelector('#home').scrollIntoView({ behavior: 'smooth' });
  }
  // Alt + P = Projects
  if (e.altKey && e.key === 'p') {
    document.querySelector('#projects').scrollIntoView({ behavior: 'smooth' });
  }
  // Alt + C = Contact
  if (e.altKey && e.key === 'c') {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
  }
});
