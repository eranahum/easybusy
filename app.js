// SPA Application Class
class SPA {
    constructor() {
        this.currentSection = 'home';
        this.sections = ['home', 'about', 'services', 'packages', 'contact'];
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.setupIntersectionObserver();
        this.setupScrollEffects();
        this.loadContent();
    }

    setupEventListeners() {
        // Mobile navigation toggle
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.addEventListener('click', () => {
                navMenu.classList.toggle('active');
                hamburger.classList.toggle('active');
            });
        }

        // Close mobile menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            });
        });

        // Navigation links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetSection = link.getAttribute('href').substring(1);
                this.navigateToSection(targetSection);
                
                // Close mobile menu
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.navbar')) {
                hamburger?.classList.remove('active');
                navMenu?.classList.remove('active');
            }
        });

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

    setupIntersectionObserver() {
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-up');
                    
                    // Update active navigation
                    const sectionId = entry.target.id;
                    if (this.sections.includes(sectionId)) {
                        this.updateActiveNavigation(sectionId);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections
        document.querySelectorAll('.section').forEach(section => {
            observer.observe(section);
        });

        // Observe service cards for staggered animation
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.service-card').forEach(card => {
            serviceObserver.observe(card);
        });
    }

    setupScrollEffects() {
        let ticking = false;

        const updateNavbar = () => {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 100) {
                navbar.style.background = 'rgba(255, 255, 255, 0.98)';
                navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.15)';
            } else {
                navbar.style.background = 'rgba(255, 255, 255, 0.95)';
                navbar.style.boxShadow = '0 2px 20px rgba(139, 69, 19, 0.1)';
            }
            ticking = false;
        };

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        };

        window.addEventListener('scroll', requestTick);

        // Parallax effect for hero background
        const heroBackground = document.querySelector('.hero-background');
        if (heroBackground) {
            window.addEventListener('scroll', () => {
                const scrolled = window.pageYOffset;
                heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
            });
        }
    }

    navigateToSection(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            this.updateActiveNavigation(sectionId);
        }
    }

    updateActiveNavigation(sectionId) {
        // Remove active class from all nav links
        document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
        });

        // Add active class to current section link
        const activeLink = document.querySelector(`[href="#${sectionId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }

        this.currentSection = sectionId;
    }

    loadContent() {
        // Add loading animation to sections
        const sections = document.querySelectorAll('.section');
        sections.forEach((section, index) => {
            setTimeout(() => {
                section.classList.add('loaded');
            }, index * 200);
        });

        // Initialize service card animations
        this.initializeServiceCards();
    }

    initializeServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card');
        
        serviceCards.forEach((card, index) => {
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-10px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });

            // Add click effect and toggle functionality
            card.addEventListener('click', function(e) {
                e.stopPropagation();
                
                // Toggle active state
                const isActive = this.classList.contains('active');
                
                // Close all other service cards
                serviceCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        otherCard.classList.remove('active');
                        otherCard.style.transform = 'translateY(0) scale(1)';
                    }
                });
                
                // Toggle current card
                this.classList.toggle('active');
                
                if (this.classList.contains('active')) {
                    this.style.transform = 'translateY(-5px) scale(1.01)';
                } else {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
        });
    }
}

// Utility Functions
class Utils {
    static debounce(func, wait) {
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

    static throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
}

// Animation Controller
class AnimationController {
    constructor() {
        this.animations = new Map();
        this.init();
    }

    init() {
        this.setupCTAButtonAnimations();
        this.setupPackageCardAnimations();
        this.setupSocialIconAnimations();
    }

    setupCTAButtonAnimations() {
        const ctaButtons = document.querySelectorAll('.cta-button');
        
        ctaButtons.forEach(button => {
            button.addEventListener('mouseenter', function() {
                this.style.animation = 'pulse 1s infinite';
            });
            
            button.addEventListener('mouseleave', function() {
                this.style.animation = 'none';
            });
        });
    }

    setupPackageCardAnimations() {
        const packageCards = document.querySelectorAll('.package-card');
        
        packageCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }

    setupSocialIconAnimations() {
        const socialIcons = document.querySelectorAll('.social-icon');
        
        socialIcons.forEach(icon => {
            icon.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-2px) scale(1.1)';
            });
            
            icon.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });
    }
}

// Performance Optimizer
class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.optimizeImages();
        this.setupPreload();
    }

    setupLazyLoading() {
        const images = document.querySelectorAll('img[data-src]');
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }

    optimizeImages() {
        // Add loading="lazy" to images
        document.querySelectorAll('img').forEach(img => {
            if (!img.loading) {
                img.loading = 'lazy';
            }
        });
    }

    setupPreload() {
        // Preload critical resources
        const preloadLinks = [
            { rel: 'preload', href: 'styles.css', as: 'style' },
            { rel: 'preload', href: 'app.js', as: 'script' }
        ];

        preloadLinks.forEach(link => {
            const linkElement = document.createElement('link');
            Object.assign(linkElement, link);
            document.head.appendChild(linkElement);
        });
    }
}

// Service Cards Functionality
function initializeServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        card.addEventListener('click', function(e) {
            e.stopPropagation();
            
            // Toggle active state
            const isActive = this.classList.contains('active');
            
            // Close all other cards
            serviceCards.forEach(otherCard => {
                if (otherCard !== this) {
                    otherCard.classList.remove('active');
                    const otherDetails = otherCard.querySelector('.service-details');
                    if (otherDetails) {
                        otherDetails.classList.remove('active');
                    }
                }
            });
            
            // Toggle current card
            this.classList.toggle('active');
            const details = this.querySelector('.service-details');
            if (details) {
                details.classList.toggle('active');
            }
            
            // Adjust transform for visual feedback
            if (!isActive) {
                this.style.transform = 'translateY(-5px)';
            } else {
                this.style.transform = '';
            }
        });
        
        // Mouse enter/leave effects (only if not active)
        card.addEventListener('mouseenter', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(-5px)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = '';
            }
        });
    });
}

// FAQ Functionality
function initializeFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        item.addEventListener('click', function() {
            const isActive = this.classList.contains('active');
            
            // Close all other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== this) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            this.classList.toggle('active');
        });
    });
}

// Smooth Scrolling for Navigation Links
function initializeSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Form Handling
function initializeContactForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const data = Object.fromEntries(formData);
            
            // Basic validation
            if (!data.name || !data.email || !data.project_type || !data.message) {
                alert('אנא מלאו את כל השדות הנדרשים');
                return;
            }
            
            // Here you would typically send the data to your backend
            console.log('Form submitted:', data);
            
            // Show success message
            alert('תודה! נחזור אליכם בקרוב.');
            
            // Reset form
            this.reset();
        });
    }
}

// Intersection Observer for Animations
function initializeAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate
    const animatedElements = document.querySelectorAll('.value-prop-card, .service-card, .process-step, .portfolio-item, .testimonial-card, .pricing-card');
    animatedElements.forEach(el => {
        el.classList.add('loading');
        observer.observe(el);
    });
}

// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeServiceCards();
    initializeFAQ();
    initializeSmoothScrolling();
    initializeContactForm();
    initializeAnimations();
    
    // Add loading class to body for initial animations
    document.body.classList.add('loaded');
});

// Global function for service details toggle (for onclick in HTML)
function toggleServiceDetails(serviceId) {
    const serviceDetails = document.getElementById(serviceId);
    const serviceCard = serviceDetails.closest('.service-card');
    
    if (serviceDetails && serviceCard) {
        // Close all other service cards
        document.querySelectorAll('.service-card').forEach(card => {
            if (card !== serviceCard) {
                card.classList.remove('active');
                const details = card.querySelector('.service-details');
                if (details) {
                    details.classList.remove('active');
                }
            }
        });
        
        // Toggle current service card
        serviceCard.classList.toggle('active');
        serviceDetails.classList.toggle('active');
    }
}

// Global function for FAQ toggle (for onclick in HTML)
function toggleFAQ(faqId) {
    const faqAnswer = document.getElementById(faqId);
    const faqItem = faqAnswer.closest('.faq-item');
    
    if (faqAnswer && faqItem) {
        // Close all other FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
        
        // Toggle current FAQ item
        faqItem.classList.toggle('active');
    }
}

// Handle window resize
window.addEventListener('resize', Utils.debounce(() => {
    // Recalculate any layout-dependent elements
    const servicesGrid = document.querySelector('.services-grid');
    if (servicesGrid) {
        // Force reflow for grid layout
        servicesGrid.style.display = 'none';
        servicesGrid.offsetHeight; // Force reflow
        servicesGrid.style.display = 'grid';
    }
}, 250));

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        // Page is hidden, pause animations if needed
        document.body.classList.add('page-hidden');
    } else {
        // Page is visible, resume animations
        document.body.classList.remove('page-hidden');
    }
}); 