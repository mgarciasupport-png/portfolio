// Smooth navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Carousel functionality
const carouselContainer = document.querySelector('.carousel-container');
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

if (carouselContainer && prevBtn && nextBtn) {
    let scrollPosition = 0;

    nextBtn.addEventListener('click', () => {
        const itemWidth = carouselContainer.querySelector('.carousel-item').offsetWidth + 24; // 24px is gap
        scrollPosition += itemWidth;
        carouselContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });

    prevBtn.addEventListener('click', () => {
        const itemWidth = carouselContainer.querySelector('.carousel-item').offsetWidth + 24;
        scrollPosition = Math.max(0, scrollPosition - itemWidth);
        carouselContainer.scrollTo({
            left: scrollPosition,
            behavior: 'smooth'
        });
    });
}

// Active nav link on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSection}`) {
            link.style.color = 'var(--accent-cyan)';
        } else {
            link.style.color = 'var(--bg-light)';
        }
    });
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe cards for animation
document.querySelectorAll('.bento-card, .experience-card, .cert-card, .skill-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
    observer.observe(card);
});

// Phone layout indicator
const phoneLayout = window.matchMedia('(max-width: 480px)');

function handlePhoneLayout(e) {
    if (e.matches) {
        document.body.classList.add('phone-layout');
    } else {
        document.body.classList.remove('phone-layout');
    }
}

phoneLayout.addListener(handlePhoneLayout);
handlePhoneLayout(phoneLayout);

// Load profile image fallback
window.addEventListener('load', () => {
    const profileImg = document.querySelector('.photo');
    if (profileImg) {
        profileImg.addEventListener('error', function() {
            // If image doesn't load, use a placeholder
            this.style.backgroundColor = 'var(--primary-teal)';
            this.style.color = 'white';
            this.alt = 'MG';
        });
    }
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease-in';
