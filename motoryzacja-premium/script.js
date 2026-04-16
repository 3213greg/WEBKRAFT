// ========================================
// INITIALIZATION
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 100
    });
    
    // Initialize all features
    initNavigation();
    initParticles();
    initSmoothScroll();
    initFormValidation();
    initScrollEffects();
});

// ========================================
// NAVIGATION
// ========================================

function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.8)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Mobile menu toggle
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu on link click
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
}

// ========================================
// PARTICLES ANIMATION
// ========================================

function initParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;
    
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random position
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        
        // Random size
        const size = Math.random() * 4 + 1;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        
        // Random animation duration
        const duration = Math.random() * 20 + 10;
        particle.style.animationDuration = duration + 's';
        
        // Random delay
        const delay = Math.random() * 5;
        particle.style.animationDelay = delay + 's';
        
        // Styling
        particle.style.position = 'absolute';
        particle.style.background = 'rgba(255, 107, 53, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
        
        particlesContainer.appendChild(particle);
    }
    
    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0%, 100% {
                transform: translate(0, 0) scale(1);
                opacity: 0;
            }
            10% {
                opacity: 0.5;
            }
            50% {
                transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
                opacity: 0.8;
            }
            90% {
                opacity: 0.5;
            }
        }
    `;
    document.head.appendChild(style);
}

// ========================================
// SMOOTH SCROLL
// ========================================

function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just "#"
            if (href === '#') {
                e.preventDefault();
                return;
            }
            
            const target = document.querySelector(href);
            
            if (target) {
                e.preventDefault();
                const offsetTop = target.offsetTop - 80; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================================
// FORM VALIDATION
// ========================================

function initFormValidation() {
    const form = document.getElementById('contactForm');
    if (!form) return;
    
    const formSuccess = document.getElementById('formSuccess');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Clear previous errors
        const errorMessages = form.querySelectorAll('.error-message');
        errorMessages.forEach(msg => msg.textContent = '');
        
        const formGroups = form.querySelectorAll('.form-group');
        formGroups.forEach(group => group.classList.remove('error'));
        
        // Validate fields
        let isValid = true;
        
        // Name validation
        const name = form.querySelector('#name');
        if (!name.value.trim()) {
            showError(name, 'Proszę podać imię i nazwisko');
            isValid = false;
        } else if (name.value.trim().length < 3) {
            showError(name, 'Imię i nazwisko musi mieć minimum 3 znaki');
            isValid = false;
        }
        
        // Email validation
        const email = form.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email.value.trim()) {
            showError(email, 'Proszę podać adres email');
            isValid = false;
        } else if (!emailRegex.test(email.value)) {
            showError(email, 'Proszę podać prawidłowy adres email');
            isValid = false;
        }
        
        // Phone validation (optional but if provided, must be valid)
        const phone = form.querySelector('#phone');
        if (phone.value.trim()) {
            const phoneRegex = /^[\d\s\+\-\(\)]+$/;
            if (!phoneRegex.test(phone.value) || phone.value.trim().length < 9) {
                showError(phone, 'Proszę podać prawidłowy numer telefonu');
                isValid = false;
            }
        }
        
        // Message validation
        const message = form.querySelector('#message');
        if (!message.value.trim()) {
            showError(message, 'Proszę wpisać wiadomość');
            isValid = false;
        } else if (message.value.trim().length < 10) {
            showError(message, 'Wiadomość musi mieć minimum 10 znaków');
            isValid = false;
        }
        
        // Privacy checkbox validation
        const privacy = form.querySelector('#privacy');
        if (!privacy.checked) {
            showError(privacy, 'Musisz zaakceptować politykę prywatności');
            isValid = false;
        }
        
        // If valid, show success message
        if (isValid) {
            form.style.display = 'none';
            formSuccess.classList.add('active');
            
            // Reset form after 5 seconds
            setTimeout(() => {
                form.reset();
                form.style.display = 'block';
                formSuccess.classList.remove('active');
            }, 5000);
        }
    });
    
    function showError(input, message) {
        const formGroup = input.closest('.form-group');
        formGroup.classList.add('error');
        const errorMessage = formGroup.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.textContent = message;
        }
    }
}

// ========================================
// SCROLL EFFECTS
// ========================================

function initScrollEffects() {
    // Parallax effect for hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero-background');
        
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Fade in elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe service cards
    const cards = document.querySelectorAll('.service-card, .testimonial-card, .gallery-item');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ========================================
// COUNTER ANIMATION
// ========================================

function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate counters when they come into view
const statNumbers = document.querySelectorAll('.stat-number');
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
            entry.target.classList.add('animated');
            const text = entry.target.textContent;
            const number = parseInt(text.replace(/\D/g, ''));
            const suffix = text.replace(/[\d\s]/g, '');
            
            let current = 0;
            const increment = number / 100;
            const timer = setInterval(() => {
                current += increment;
                if (current >= number) {
                    entry.target.textContent = number + suffix;
                    clearInterval(timer);
                } else {
                    entry.target.textContent = Math.floor(current) + suffix;
                }
            }, 20);
        }
    });
}, { threshold: 0.5 });

statNumbers.forEach(stat => statsObserver.observe(stat));

// ========================================
// GALLERY LIGHTBOX (Simple implementation)
// ========================================

const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        if (img) {
            // Create lightbox
            const lightbox = document.createElement('div');
            lightbox.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.95);
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 10000;
                cursor: pointer;
                animation: fadeIn 0.3s ease;
            `;
            
            const lightboxImg = document.createElement('img');
            lightboxImg.src = img.src;
            lightboxImg.style.cssText = `
                max-width: 90%;
                max-height: 90%;
                object-fit: contain;
                border-radius: 1rem;
                box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            `;
            
            lightbox.appendChild(lightboxImg);
            document.body.appendChild(lightbox);
            
            // Close on click
            lightbox.addEventListener('click', () => {
                lightbox.style.animation = 'fadeOut 0.3s ease';
                setTimeout(() => lightbox.remove(), 300);
            });
            
            // Add animations
            const style = document.createElement('style');
            style.textContent = `
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes fadeOut {
                    from { opacity: 1; }
                    to { opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
    });
});

// ========================================
// BUTTON RIPPLE EFFECT
// ========================================

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            left: ${x}px;
            top: ${y}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Add ripple animation
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ========================================
// LAZY LOADING IMAGES
// ========================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => imageObserver.observe(img));
}

// ========================================
// CONSOLE MESSAGE
// ========================================

console.log('%c🚗 AutoElite - Premium Landing Page', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cZaprojektowane z pasją do motoryzacji', 'font-size: 14px; color: #64748B;');