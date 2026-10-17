/**
 * StintikVPN - MEGA Beautiful Design
 * All interactive functionality and visual effects
 */

// ============================================
// Theme Management
// ============================================

function getPreferredTheme() {
  const stored = localStorage.getItem('theme');
  if (stored) return stored;
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

function applyTheme(theme) {
  const html = document.documentElement;
  const body = document.body;
  
  // Remove existing theme classes
  html.classList.remove('theme-light', 'theme-dark');
  body.classList.remove('theme-light', 'theme-dark');
  
  // Add new theme class
  const themeClass = `theme-${theme}`;
  html.classList.add(themeClass);
  body.classList.add(themeClass);
  
  // Update data attribute
  html.setAttribute('data-theme', theme);
  body.setAttribute('data-theme', theme);
  
  // Save to localStorage
  localStorage.setItem('theme', theme);
  
  // Reinitialize particles with new theme
  initParticles();
  
  // Recreate floating elements
  createFloatingElements();
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
  const next = current === 'light' ? 'dark' : 'light';
  applyTheme(next);
}

// ============================================
// Particles.js Integration
// ============================================

function initParticles() {
  const isLight = document.body.classList.contains('theme-light');
  const particleColor = isLight ? '#666666' : '#6a6a8a';
  const lineColor = isLight ? '#cccccc' : '#3a3a5a';
  
  if (window.particlesJS) {
    particlesJS('particles-js', {
      particles: {
        number: {
          value: 40,
          density: {
            enable: true,
            value_area: 800
          }
        },
        color: {
          value: particleColor
        },
        shape: {
          type: 'circle',
          stroke: {
            width: 0,
            color: '#000000'
          }
        },
        opacity: {
          value: 0.5,
          random: true,
          anim: {
            enable: true,
            speed: 1,
            opacity_min: 0.1,
            sync: false
          }
        },
        size: {
          value: 3,
          random: true,
          anim: {
            enable: true,
            speed: 2,
            size_min: 0.1,
            sync: false
          }
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: lineColor,
          opacity: 0.1,
          width: 1
        },
        move: {
          enable: true,
          speed: 1,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out',
          bounce: false,
          attract: {
            enable: true,
            rotateX: 600,
            rotateY: 1200
          }
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: {
            enable: true,
            mode: 'grab'
          },
          onclick: {
            enable: true,
            mode: 'push'
          },
          resize: true
        },
        modes: {
          grab: {
            distance: 140,
            line_linked: {
              opacity: 1
            }
          },
          bubble: {
            distance: 400,
            size: 40,
            duration: 2,
            opacity: 8,
            speed: 3
          },
          repulse: {
            distance: 200,
            duration: 0.4
          },
          push: {
            particles_nb: 4
          },
          remove: {
            particles_nb: 2
          }
        }
      },
      retina_detect: true
    });
  }
}

// ============================================
// Floating Elements (Animated Orbs)
// ============================================

function createFloatingElements() {
  const container = document.getElementById('floating-elements');
  if (!container) return;
  
  container.innerHTML = '';
  
  const isLight = document.body.classList.contains('theme-light');
  const colors = isLight 
    ? ['rgba(0, 212, 255, 0.1)', 'rgba(255, 42, 109, 0.1)', 'rgba(212, 0, 255, 0.1)']
    : ['rgba(0, 212, 255, 0.15)', 'rgba(255, 42, 109, 0.15)', 'rgba(212, 0, 255, 0.15)'];
  
  const positions = [
    { top: '10%', left: '5%' },
    { top: '60%', right: '5%' },
    { bottom: '10%', left: '20%' },
    { top: '30%', right: '20%' }
  ];
  
  positions.forEach((pos, index) => {
    const orb = document.createElement('div');
    orb.className = 'floating-orb';
    orb.style.cssText = `
      width: ${100 + index * 30}px;
      height: ${100 + index * 30}px;
      top: ${pos.top};
      left: ${pos.left};
      right: ${pos.right || 'auto'};
      bottom: ${pos.bottom || 'auto'};
      background: ${colors[index % colors.length]};
      animation-delay: ${-index * 2.5}s;
      filter: blur(${40 + index * 10}px);
    `;
    container.appendChild(orb);
  });
}

// ============================================
// Scroll Reveal Animation
// ============================================

function initScrollReveal() {
  const reveals = document.querySelectorAll('.reveal');
  
  const revealOnScroll = () => {
    reveals.forEach(reveal => {
      const rect = reveal.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Reveal when element is 100px from bottom of viewport
      if (rect.top < windowHeight - 100) {
        reveal.classList.add('in');
      }
    });
  };
  
  // Initial check
  revealOnScroll();
  
  // Check on scroll
  window.addEventListener('scroll', revealOnScroll);
  
  // Check on resize
  window.addEventListener('resize', revealOnScroll);
}

// ============================================
// Animated Counters
// ============================================

function initAnimatedCounters() {
  const counters = document.querySelectorAll('.stat-number[data-target]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(target.dataset.target);
        animateCounter(target, targetValue);
        observer.unobserve(target);
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element, target) {
  const duration = 2000;
  const startTime = performance.now();
  const startValue = 0;
  
  function updateCounter(currentTime) {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Easing function (ease-out)
    const easeOut = 1 - Math.pow(1 - progress, 3);
    const currentValue = Math.floor(startValue + (target - startValue) * easeOut);
    
    element.textContent = currentValue;
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter);
    }
  }
  
  requestAnimationFrame(updateCounter);
}

// ============================================
// Navigation
// ============================================

function toggleNav() {
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  
  burger.classList.toggle('active');
  links.classList.toggle('open');
  
  // Prevent body scroll when nav is open
  if (links.classList.contains('open')) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
}

function closeNav() {
  const burger = document.querySelector('.nav-burger');
  const links = document.querySelector('.nav-links');
  
  burger.classList.remove('active');
  links.classList.remove('open');
  document.body.style.overflow = '';
}

// Scroll effect for nav
function initNavScroll() {
  const nav = document.querySelector('.nav');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });
}

// Smooth scroll for anchor links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const navHeight = document.querySelector('.nav').offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        closeNav();
      }
    });
  });
}

// ============================================
// Subscription Filtering
// ============================================

function filt(category) {
  const subs = document.querySelectorAll('.sub');
  const filters = document.querySelectorAll('.filter');
  
  // Update active filter
  filters.forEach(f => f.classList.remove('active'));
  event.target.classList.add('active');
  
  // Filter subs
  subs.forEach(sub => {
    const subCategory = sub.dataset.c;
    
    if (category === 'all' || subCategory === category) {
      sub.style.display = 'flex';
      sub.classList.add('reveal');
    } else {
      sub.style.display = 'none';
    }
  });
  
  // Re-initialize scroll reveal for filtered items
  setTimeout(() => {
    initScrollReveal();
  }, 100);
}

// ============================================
// Clipboard & Share
// ============================================

function cp(button, text) {
  const toast = document.getElementById('toast');
  
  // Modern clipboard API
  if (navigator.clipboard) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(toast);
    }).catch(err => {
      console.error('Failed to copy:', err);
      fallbackCopy(button, text, toast);
    });
  } else {
    // Fallback for older browsers
    fallbackCopy(button, text, toast);
  }
}

function fallbackCopy(button, text, toast) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  
  try {
    document.execCommand('copy');
    showToast(toast);
  } catch (err) {
    console.error('Fallback copy failed:', err);
  }
  
  document.body.removeChild(textarea);
}

function shareUrl(button, url) {
  if (navigator.share) {
    navigator.share({
      title: 'StintikVPN',
      text: 'Проверьте это VPN-подписку',
      url: url
    }).catch(err => {
      console.error('Share failed:', err);
      // Fallback to copy
      cp(button, url);
    });
  } else {
    // Fallback to copy
    cp(button, url);
  }
}

function showToast(toast) {
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2000);
}

// ============================================
// QR Code Modal
// ============================================

let currentQRCode = null;

function showQR(button, url) {
  const modal = document.getElementById('qr-modal');
  const qrContainer = document.getElementById('qrcode');
  
  // Clear previous QR code
  qrContainer.innerHTML = '';
  
  // Create new QR code
  currentQRCode = new QRCode(qrContainer, {
    text: url,
    width: 200,
    height: 200,
    colorDark: '#000000',
    colorLight: '#ffffff',
    correctLevel: QRCode.CorrectLevel.H
  });
  
  // Show modal
  modal.removeAttribute('hidden');
  document.body.style.overflow = 'hidden';
}

function closeQR() {
  const modal = document.getElementById('qr-modal');
  modal.setAttribute('hidden', '');
  document.body.style.overflow = '';
  
  if (currentQRCode) {
    currentQRCode.clear();
    currentQRCode = null;
  }
}

// Close modal on escape key
function initModalKeyboard() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeQR();
      closeNav();
    }
  });
}

// Close modal on backdrop click
function initModalBackdrop() {
  document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
    backdrop.addEventListener('click', () => {
      closeQR();
    });
  });
}

// ============================================
// FAQ/Guide Toggle
// ============================================

function toggleFaq(button) {
  const item = button.parentElement;
  const isOpen = item.classList.contains('open');
  
  // Close all other items
  document.querySelectorAll('.faq-item').forEach(otherItem => {
    if (otherItem !== item) {
      otherItem.classList.remove('open');
    }
  });
  
  // Toggle current item
  if (isOpen) {
    item.classList.remove('open');
  } else {
    item.classList.add('open');
  }
}

// ============================================
// Proxy Date Update
// ============================================

function updateProxyDate() {
  const dateElement = document.getElementById('proxy-date');
  if (dateElement) {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    dateElement.textContent = `${day}.${month}.${year}`;
  }
}

// ============================================
// Keyboard Navigation
// ============================================

function initKeyboardNav() {
  // Add visible focus styles for keyboard users
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      document.body.classList.add('keyboard-nav');
    }
  });
  
  document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
  });
}

// ============================================
// Touch Support
// ============================================

function initTouchSupport() {
  let touchStartX = 0;
  let touchEndX = 0;
  
  document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, false);
  
  document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, false);
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - close nav if open
        closeNav();
      } else {
        // Swipe right - could open nav, but we'll leave this to the burger button
      }
    }
  }
}

// ============================================
// Performance Optimizations
// ============================================

function initPerformance() {
  // Lazy load images
  document.querySelectorAll('img[data-src]').forEach(img => {
    img.setAttribute('src', img.dataset.src);
    img.removeAttribute('data-src');
  });
  
  // Reduce animations on low-end devices
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.body.classList.add('reduce-motion');
    const style = document.createElement('style');
    style.textContent = `
      *, *::before, *::after {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    `;
    document.head.appendChild(style);
  }
}

// ============================================
// Initialize Everything
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Apply theme
  applyTheme(getPreferredTheme());
  
  // Initialize particles
  initParticles();
  
  // Create floating elements
  createFloatingElements();
  
  // Initialize scroll reveal
  initScrollReveal();
  
  // Initialize animated counters
  initAnimatedCounters();
  
  // Initialize navigation
  initNavScroll();
  initSmoothScroll();
  
  // Initialize modal
  initModalKeyboard();
  initModalBackdrop();
  
  // Initialize keyboard navigation
  initKeyboardNav();
  
  // Initialize touch support
  initTouchSupport();
  
  // Initialize performance optimizations
  initPerformance();
  
  // Update proxy date
  updateProxyDate();
  
  // Add loaded class to body for initial animations
  document.body.classList.add('loaded');
});

// Handle theme changes from system preferences
window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', (e) => {
  if (!localStorage.getItem('theme')) {
    applyTheme(e.matches ? 'light' : 'dark');
  }
});

// Handle window resize
window.addEventListener('resize', () => {
  // Recreate floating elements on resize for better responsiveness
  if (window.innerWidth > 768) {
    createFloatingElements();
  }
});

// Export functions for inline event handlers
window.toggleNav = toggleNav;
window.closeNav = closeNav;
window.toggleTheme = toggleTheme;
window.filt = filt;
window.cp = cp;
window.shareUrl = shareUrl;
window.showQR = showQR;
window.closeQR = closeQR;
window.toggleFaq = toggleFaq;
