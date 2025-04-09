// Header scroll effect
const header = document.querySelector('.header');
const mobileNav = document.querySelector('.nav-mobile');
const menuToggle = document.querySelector('.menu-toggle');
let isMenuOpen = false;

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile menu toggle
menuToggle.addEventListener('click', () => {
    isMenuOpen = !isMenuOpen;
    mobileNav.style.display = isMenuOpen ? 'flex' : 'none';
    
    // Animate hamburger to X
    const spans = menuToggle.querySelectorAll('span');
    if (isMenuOpen) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            if (isMenuOpen) {
                menuToggle.click();
            }
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Stats counter animation
const stats = document.querySelectorAll('.stat-card h3');
stats.forEach(stat => {
    const target = parseInt(stat.textContent);
    let count = 0;
    const duration = 2000; // 2 seconds
    const increment = target / (duration / 16); // 60fps

    function updateCount() {
        if (count < target) {
            count += increment;
            stat.textContent = Math.ceil(count) + '+';
            requestAnimationFrame(updateCount);
        } else {
            stat.textContent = target + '+';
        }
    }

    const statObserver = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            updateCount();
            statObserver.unobserve(entries[0].target);
        }
    });

    statObserver.observe(stat);
});