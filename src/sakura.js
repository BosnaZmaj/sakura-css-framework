// Sakura CSS Framework JavaScript
// Delightful interactions and animations for financial applications

class SakuraFramework {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupAnimations();
    this.setupCounters();
  }

  // Navigation functionality
  setupNavigation() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.sakura-navbar-menu');

    if (navToggle && navMenu) {
      navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
      });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  }

  // Animation setup using Intersection Observer
  setupAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Add animation classes to elements
    document.querySelectorAll('.sakura-feature-card, .sakura-dashboard-preview').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(el);
    });
  }

  // Animated counters for hero statistics
  setupCounters() {
    const counters = document.querySelectorAll('.sakura-stat-number');

    counters.forEach(counter => {
      const target = counter.innerText;
      const numericValue = parseFloat(target.replace(/[^\d.-]/g, ''));
      const suffix = target.replace(/[\d.-]/g, '');

      if (!isNaN(numericValue)) {
        let current = 0;
        const increment = numericValue / 60; // 60 frames for smooth animation

        const updateCounter = () => {
          current += increment;
          if (current < numericValue) {
            counter.innerText = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        // Start animation when element is visible
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              updateCounter();
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        observer.observe(counter);
      }
    });
  }

  // Enhanced dashboard preview interactions
  setupDashboardPreview() {
    const preview = document.querySelector('.sakura-dashboard-preview');
    if (preview) {
      // Add subtle hover effects and interactions
      preview.addEventListener('mouseenter', () => {
        preview.style.transform = 'perspective(1200px) rotateY(-4deg) rotateX(3deg) scale(1.02)';
      });

      preview.addEventListener('mouseleave', () => {
        preview.style.transform = 'perspective(1200px) rotateY(-8deg) rotateX(6deg) scale(1)';
      });
    }
  }

  // Progress bar animations
  animateProgressBars() {
    const progressBars = document.querySelectorAll('.sakura-progress-bar');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const width = progressBar.style.width;
          progressBar.style.width = '0%';

          setTimeout(() => {
            progressBar.style.width = width;
          }, 300);

          observer.unobserve(progressBar);
        }
      });
    }, { threshold: 0.5 });

    progressBars.forEach(bar => {
      observer.observe(bar);
    });
  }
}

// Initialize framework when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new SakuraFramework();
});

// Export for modular usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SakuraFramework;
}