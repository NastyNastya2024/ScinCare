// FAQ Toggle
document.querySelectorAll('.faq-item').forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// Smooth Scroll
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

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    lastScroll = currentScroll;
});

// Chat button interactions
document.querySelectorAll('.chat-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        // Reset all buttons
        document.querySelectorAll('.chat-btn').forEach(b => {
            b.style.background = 'white';
            b.style.color = '';
            b.style.borderColor = '';
        });
        // Highlight clicked button
        this.style.background = 'linear-gradient(135deg, #6366f1, #8b5cf6)';
        this.style.color = 'white';
        this.style.borderColor = 'transparent';
    });
});

// Animation on scroll
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

document.querySelectorAll('.feature-card, .cosmetic-card, .member-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Restart hero animation when section comes into view
const heroSection = document.querySelector('.hero');
let animationStarted = false;

const heroAnimationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !animationStarted) {
            animationStarted = true;
            
            // Reset all animated elements to initial state
            const preloader = document.querySelector('.preloader-overlay');
            const skinStatus = document.querySelector('.skin-status-text');
            const recommendation = document.querySelector('.recommendation-text');
            const badges = document.querySelectorAll('.skin-badge');
            const heroImage2 = document.querySelector('.hero-image-2');
            
            // Reset preloader
            if (preloader) {
                preloader.style.opacity = '1';
                preloader.style.visibility = 'visible';
                preloader.style.animation = 'none';
                void preloader.offsetWidth;
                preloader.style.animation = 'fadeOut 0.5s ease-out 3s forwards';
            }
            
            // Reset skin status
            if (skinStatus) {
                skinStatus.style.opacity = '0';
                skinStatus.style.visibility = 'visible';
                skinStatus.style.animation = 'none';
                void skinStatus.offsetWidth;
                skinStatus.style.animation = 'fadeIn 0.5s ease-out 3s forwards, fadeOut 0.5s ease-out 7.5s forwards';
            }
            
            // Reset recommendation
            if (recommendation) {
                recommendation.style.opacity = '0';
                recommendation.style.visibility = 'visible';
                recommendation.style.animation = 'none';
                void recommendation.offsetWidth;
                recommendation.style.animation = 'fadeIn 0.5s ease-out 7.5s forwards';
            }
            
            // Reset badges
            badges.forEach((badge, index) => {
                badge.style.opacity = '0';
                badge.style.transform = 'translateX(-20px)';
                badge.style.visibility = 'visible';
                badge.style.animation = 'none';
                void badge.offsetWidth;
                const delay = 4 + (index * 0.5);
                badge.style.animation = `slideInBadge 0.5s ease-out ${delay}s forwards, fadeOutBadge 0.5s ease-out 7s forwards`;
            });
            
            // Reset hero image 2
            if (heroImage2) {
                heroImage2.style.opacity = '0';
                heroImage2.style.visibility = 'visible';
                heroImage2.style.animation = 'none';
                void heroImage2.offsetWidth;
                heroImage2.style.animation = 'fadeInImage 0.5s ease-out 7.5s forwards';
            }
        } else if (!entry.isIntersecting) {
            // Reset flag when section leaves viewport
            animationStarted = false;
        }
    });
}, {
    threshold: 0.1
});

if (heroSection) {
    heroAnimationObserver.observe(heroSection);
}

