// Main JavaScript file for photographer landing page
document.addEventListener('DOMContentLoaded', function() {
    // WhatsApp phone number
    const whatsappNumber = '+5493454019821';
    
    // Initialize all functionality
    initScrollAnimations();
    initWhatsAppIntegration();
    initSmoothScrolling();
    initNavbarScrollEffect();
    
    // Scroll animations using Intersection Observer API
    function initScrollAnimations() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        // Observe all elements with animation class
        const animatedElements = document.querySelectorAll('.animate-on-scroll');
        animatedElements.forEach(element => {
            observer.observe(element);
        });
    }
    
    // WhatsApp integration
    function initWhatsAppIntegration() {
        const whatsappButtons = document.querySelectorAll('.whatsapp-btn');
        
        whatsappButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                openWhatsApp();
            });
        });
    }
    
    function openWhatsApp() {
        const message = encodeURIComponent('Hello! I am interested in your photography services. Could you please provide more information?');
        const whatsappURL = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${message}`;
        
        // Try to open WhatsApp app first, fallback to web version
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        
        if (isMobile) {
            // Mobile: try to open WhatsApp app
            window.location.href = whatsappURL;
        } else {
            // Desktop: open WhatsApp Web
            window.open(whatsappURL, '_blank');
        }
        
        // Analytics tracking (if needed)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
                event_category: 'WhatsApp',
                event_label: 'Contact Button'
            });
        }
    }
    
    // Smooth scrolling for navigation links
    function initSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
        
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    const offsetTop = targetElement.offsetTop - 80; // Account for fixed navbar
                    
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                    
                    // Close mobile menu if open
                    const navbarCollapse = document.querySelector('.navbar-collapse');
                    if (navbarCollapse.classList.contains('show')) {
                        const navbarToggler = document.querySelector('.navbar-toggler');
                        navbarToggler.click();
                    }
                }
            });
        });
    }
    
    // Navbar scroll effect
    function initNavbarScrollEffect() {
        const navbar = document.querySelector('.navbar');
        let lastScrollTop = 0;
        
        window.addEventListener('scroll', function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(44, 62, 80, 0.98)';
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(44, 62, 80, 0.95)';
                navbar.style.boxShadow = 'none';
            }
            
            // Hide/show navbar on scroll (optional)
            if (scrollTop > lastScrollTop && scrollTop > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = scrollTop;
        });
    }
    
    // Portfolio item hover effects
    function initPortfolioEffects() {
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        
        portfolioItems.forEach(item => {
            item.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            item.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
    
    // Service card interactions
    function initServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px)';
                this.style.boxShadow = '0 15px 40px rgba(0, 0, 0, 0.2)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0)';
                this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
            });
        });
    }
    
    // Initialize additional effects
    initPortfolioEffects();
    initServiceCards();
    
    // Lazy loading for better performance
    function initLazyLoading() {
        const lazyElements = document.querySelectorAll('[data-src]');
        
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    element.src = element.getAttribute('data-src');
                    element.removeAttribute('data-src');
                    lazyObserver.unobserve(element);
                }
            });
        });
        
        lazyElements.forEach(element => {
            lazyObserver.observe(element);
        });
    }
    
    // Initialize lazy loading
    initLazyLoading();
    
    // Contact form validation (if needed)
    function initContactValidation() {
        const contactForm = document.querySelector('#contactForm');
        
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Basic validation
                const name = document.querySelector('#name').value.trim();
                const email = document.querySelector('#email').value.trim();
                const message = document.querySelector('#message').value.trim();
                
                if (!name || !email || !message) {
                    alert('Please fill in all fields');
                    return;
                }
                
                if (!isValidEmail(email)) {
                    alert('Please enter a valid email address');
                    return;
                }
                
                // If validation passes, redirect to WhatsApp
                const whatsappMessage = `Hello! My name is ${name}. Email: ${email}. Message: ${message}`;
                const encodedMessage = encodeURIComponent(whatsappMessage);
                const whatsappURL = `https://wa.me/${whatsappNumber.replace(/\D/g, '')}?text=${encodedMessage}`;
                
                window.open(whatsappURL, '_blank');
            });
        }
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Initialize contact validation
    initContactValidation();
    
    // Performance optimization - debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Optimize scroll event listeners
    const debouncedScrollHandler = debounce(function() {
        // Additional scroll-based functionality can be added here
    }, 100);
    
    window.addEventListener('scroll', debouncedScrollHandler);
    
    // Accessibility improvements
    function initAccessibility() {
        // Skip link functionality
        const skipLink = document.querySelector('.skip-link');
        if (skipLink) {
            skipLink.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.focus();
                }
            });
        }
        
        // Keyboard navigation for portfolio items
        const portfolioItems = document.querySelectorAll('.portfolio-item');
        portfolioItems.forEach(item => {
            item.setAttribute('tabindex', '0');
            item.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }
    
    // Initialize accessibility features
    initAccessibility();
    
    // Loading screen (optional)
    function initLoadingScreen() {
        const loadingScreen = document.querySelector('.loading-screen');
        if (loadingScreen) {
            window.addEventListener('load', function() {
                loadingScreen.style.opacity = '0';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            });
        }
    }
    
    // Initialize loading screen
    initLoadingScreen();
    
    // Error handling for critical functions
    window.addEventListener('error', function(e) {
        console.error('JavaScript error:', e.error);
        // Could send error to monitoring service
    });
    
    // Performance monitoring
    if ('performance' in window) {
        window.addEventListener('load', function() {
            const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
            console.log('Page load time:', loadTime + 'ms');
        });
    }
});

// Additional utility functions
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Expose utility functions globally if needed
window.photographyUtils = {
    scrollToTop: scrollToTop,
    openWhatsApp: function() {
        const message = encodeURIComponent('Hello! I am interested in your photography services.');
        const whatsappURL = `https://wa.me/5493454019821?text=${message}`;
        window.open(whatsappURL, '_blank');
    }
};
