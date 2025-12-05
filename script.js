// ============ MODAL FUNCTIONS ============
function openModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    modal.focus();
}

function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Close modal on backdrop click
document.getElementById('modal').addEventListener('click', (e) => {
    if (e.target.id === 'modal') {
        closeModal();
    }
});

// Close on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// ============ FORM HANDLING ============
function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const formData = {
        name: form.querySelector('#name').value,
        email: form.querySelector('#email').value,
        phone: form.querySelector('#phone').value,
        message: form.querySelector('#message').value
    };
    
    console.log('Consultation form submitted:', formData);
    alert('✓ Спасибо! Мы получили ваш запрос и свяжемся в течение 24 часов.');
    
    form.reset();
    closeModal();
}

// ============ NEWSLETTER FORM ============
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    console.log('Newsletter subscription:', email);
    alert('✓ Спасибо за подписку! Проверьте почту.');
    e.target.reset();
}

// ============ MOBILE MENU TOGGLE ============
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-link:not(.dropdown-toggle), .dropdown-item').forEach(link => {
    link.addEventListener('click', (e) => {
        // Don't close for dropdown toggles on desktop
        if (!link.classList.contains('dropdown-toggle') || window.innerWidth <= 768) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
});

// ============ DROPDOWN MENU MOBILE ============
const navItems = document.querySelectorAll('.nav-item');

navItems.forEach(item => {
    const link = item.querySelector('.nav-link');
    if (link && link.classList.contains('dropdown-toggle')) {
        link.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                item.classList.toggle('active');
                
                // Close other dropdowns
                navItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            }
        });
    }
});

// ============ SMOOTH SCROLL FUNCTION ============
function scrollTo(id) {
    const element = document.getElementById(id);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
    }
}

// ============ ACTIVE LINK HIGHLIGHT ============
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        if (href && href.slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// ============ INTERSECTION OBSERVER FOR ANIMATIONS ============
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// ============ PERFORMANCE: Preload critical images ============
if ('requestIdleCallback' in window) {
    requestIdleCallback(() => {
        // Lazy load non-critical resources
    });
}

// ============ ACCESSIBILITY: Trap focus in modal when open ============
const modal = document.getElementById('modal');
const focusableElements = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

modal.addEventListener('keydown', (e) => {
    if (e.key !== 'Tab') return;
    
    const focusables = Array.from(modal.querySelectorAll(focusableElements));
    const firstFocusable = focusables[0];
    const lastFocusable = focusables[focusables.length - 1];
    
    if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
        }
    } else {
        if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
        }
    }
});
