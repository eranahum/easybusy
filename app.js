// SPA Application Class
class SPA {
    constructor() {
        this.currentSection = 'intro';
        this.sections = ['intro', 'about', 'services', 'faq', 'contact'];
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
        
        hamburger?.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
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
                    console.log('Element intersecting:', entry.target.id || entry.target.className);
                    entry.target.classList.add('fade-in-up');
                    
                    // Update active navigation
                    const sectionId = entry.target.id;
                    if (this.sections.includes(sectionId)) {
                        this.updateActiveNavigation(sectionId);
                    }
                }
            });
        }, observerOptions);

        // Observe all sections by their IDs
        this.sections.forEach(sectionId => {
            const section = document.getElementById(sectionId);
            if (section) {
                observer.observe(section);
                console.log('Observing section:', sectionId);
            } else {
                console.warn('Section not found:', sectionId);
            }
        });

        // Also observe any elements with section classes for backward compatibility
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
            console.log('Observing section element:', section.id || section.className);
        });

        // Observe service cards for staggered animation
        const serviceObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    console.log('Service card intersecting:', index);
                    setTimeout(() => {
                        entry.target.classList.add('fade-in-up');
                    }, index * 100);
                }
            });
        }, { threshold: 0.1 });

        const serviceCards = document.querySelectorAll('.service-card');
        serviceCards.forEach((card, index) => {
            serviceObserver.observe(card);
            console.log(`Observing service card ${index + 1}`);
        });
        
        console.log(`Total service cards found: ${serviceCards.length}`);
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
            const serviceId = card.getAttribute('data-service');
            const serviceDetails = document.getElementById(serviceId);
            const toggle = card.querySelector('.service-toggle');
            
            if (!serviceDetails) {
                console.error(`Service details not found for ID: ${serviceId}`);
                return;
            }
            
            // Add click event listener to the entire card
            card.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();
                
                console.log(`Service card clicked: ${serviceId}`);
                
                // Close all other service cards first
                serviceCards.forEach(otherCard => {
                    if (otherCard !== this) {
                        const otherId = otherCard.getAttribute('data-service');
                        const otherDetails = document.getElementById(otherId);
                        if (otherDetails) {
                            otherDetails.classList.remove('active');
                            otherCard.classList.remove('active');
                            otherCard.style.transform = 'translateY(0) scale(1)';
                        }
                    }
                });
                
                // Toggle current service details
                const isActive = serviceDetails.classList.contains('active');
                serviceDetails.classList.toggle('active');
                
                if (serviceDetails.classList.contains('active')) {
                    this.classList.add('active');
                    this.style.transform = 'translateY(-5px) scale(1.01)';
                    console.log(`Service ${serviceId} opened`);
                } else {
                    this.classList.remove('active');
                    this.style.transform = 'translateY(0) scale(1)';
                    console.log(`Service ${serviceId} closed`);
                }
            });
            
            // Add hover effects
            card.addEventListener('mouseenter', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(-8px) scale(1.02)';
                }
            });
            
            card.addEventListener('mouseleave', function() {
                if (!this.classList.contains('active')) {
                    this.style.transform = 'translateY(0) scale(1)';
                }
            });
            
            console.log(`Service card ${index + 1} initialized with ID: ${serviceId}`);
        });
        
        console.log(`Total service cards initialized: ${serviceCards.length}`);
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

// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize SPA
        const spa = new SPA();
        
        // Initialize animations
        const animations = new AnimationController();
        
        // Initialize performance optimizations
        const performance = new PerformanceOptimizer();
        
        // Test service card functionality
        setTimeout(() => {
            const serviceCards = document.querySelectorAll('.service-card');
            console.log('Found service cards:', serviceCards.length);
            
            serviceCards.forEach((card, index) => {
                const details = card.querySelector('.service-details');
                const toggle = card.querySelector('.service-toggle');
                console.log(`Service card ${index + 1}:`, {
                    hasDetails: !!details,
                    hasToggle: !!toggle,
                    detailsId: details?.id
                });
            });
        }, 1000);
        
        console.log('SPA initialized successfully!');
    } catch (error) {
        console.error('Error initializing SPA:', error);
    }
});

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

// FAQ Toggle Functionality
function toggleFAQ(faqItem) {
    const isActive = faqItem.classList.contains('active');
    
    // Close all other FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        if (item !== faqItem) {
            item.classList.remove('active');
        }
    });
    
    // Toggle current FAQ item
    faqItem.classList.toggle('active');
} 