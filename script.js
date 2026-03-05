document.addEventListener('DOMContentLoaded', () => {
    // Current Year for footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // Hamburger Menu functionality
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.classList.toggle('no-scroll');
        });

        // Close menu when a link is clicked
        document.querySelectorAll('.nav-links a').forEach(n => n.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.classList.remove('no-scroll');
        }));
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80; // Offset for fixed navbar
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
  
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Simple Intersection Observer for scroll animations (fade in from bottom)
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.glass-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out, border 0.3s ease, box-shadow 0.3s ease';
        observer.observe(el);
    });

    // Add CSS for the visible class dynamically, or it could be in style.css.
    // Since it's simple, we'll just inject it for the intersection observer effect
    const style = document.createElement('style');
    style.innerHTML = `
        .glass-card.visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
        .glass-card.visible:hover {
            transform: translateY(-5px) !important;
        }
        body.no-scroll {
            overflow: hidden;
        }
    `;
    document.head.appendChild(style);
});
