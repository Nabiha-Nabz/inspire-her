document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-links');
    const dropdowns = document.querySelectorAll('.dropdown');

    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    });

    // Dropdown menu for mobile
    dropdowns.forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        link.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                dropdown.classList.toggle('active');
            }
        });
    });

    // Close mobile menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-links li a:not(.dropdown > a)');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.classList.remove('no-scroll');
            }
        });
    });

    // Sticky header on scroll with parallax effect
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.scrollY;
        
        if (currentScroll <= 0) {
            header.classList.remove('sticky');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.classList.add('sticky');
            header.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
    });

    // Hero section slideshow
    function initSlideshow(containerClass, images) {
        const slideshow = document.querySelector(`.${containerClass}`);
        if (!slideshow) return;

        images.forEach((image, index) => {
            const slide = document.createElement('div');
            slide.className = 'slide';
            slide.style.backgroundImage = `url(${image})`;
            if (index === 0) slide.classList.add('active');
            slideshow.appendChild(slide);
        });

        const slides = document.querySelectorAll(`.${containerClass} .slide`);
        let currentSlide = 0;

        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    const heroImages = [
        'assets/images/hero-bg1.jpg',
        'assets/images/hero-bg2.jpg',
        'assets/images/hero-bg3.jpg'
    ];

    const pageImages = [
        'assets/images/page-bg1.jpg',
        'assets/images/page-bg2.jpg',
        'assets/images/page-bg3.jpg'
    ];

    initSlideshow('hero-slideshow', heroImages);
    initSlideshow('page-slideshow', pageImages);

    // Animation triggers
    const animateElements = function() {
        const elements = document.querySelectorAll('.slide-up, .fade-in, .scale-up, .feature-card');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    animateElements();

 



    const admissionForm = document.getElementById('admissionForm');
    if (admissionForm) {
        admissionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            showFormSuccess(admissionForm, 'Thank you for your interest! We will contact you shortly with admission details.');
        });
    }

    function showFormSuccess(form, message) {
        const successMsg = document.createElement('div');
        successMsg.className = 'form-success';
        successMsg.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <p>${message}</p>
        `;

        form.parentNode.insertBefore(successMsg, form);

        setTimeout(() => {
            successMsg.classList.add('show');
        }, 10);

        form.reset();

        setTimeout(() => {
            successMsg.classList.remove('show');
            setTimeout(() => {
                successMsg.remove();
            }, 300);
        }, 5000);
    }

    const downloadBtn = document.getElementById('downloadFormBtn');
    if (downloadBtn) {
        downloadBtn.addEventListener('click', function(e) {
            e.preventDefault();
            showFormSuccess(this.closest('.admission-container'), 'Form opened in another window. Please download the form and bring it to our center.');
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 100,
                    behavior: 'smooth'
                });

                if (window.innerWidth <= 768) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                    document.body.classList.remove('no-scroll');
                }
            }
        });
    });

    const floatingElements = document.querySelectorAll('.floating');
    floatingElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.2}s`;
    });

    const gradientElements = document.querySelectorAll('.gradient-animate');
    gradientElements.forEach(el => {
        el.style.backgroundImage = `linear-gradient(135deg, var(--primary-dark) 0%, var(--primary-light) 50%, var(--primary-dark) 100%)`;
    });

    const heroSections = document.querySelectorAll('.hero, .contact-hero, .page-hero, .admission-hero');
    heroSections.forEach(hero => {
        window.addEventListener('scroll', function() {
            const scrollPosition = window.scrollY;
            hero.style.backgroundPositionY = `${scrollPosition * 0.5}px`;
        });
    });

    const tooltipElements = document.querySelectorAll('[data-tooltip]');
    tooltipElements.forEach(el => {
        el.addEventListener('mouseenter', showTooltip);
        el.addEventListener('mouseleave', hideTooltip);
    });

    function showTooltip(e) {
        const tooltipText = this.getAttribute('data-tooltip');
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = tooltipText;

        document.body.appendChild(tooltip);

        const rect = this.getBoundingClientRect();
        tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2}px`;
        tooltip.style.top = `${rect.top - tooltip.offsetHeight - 10}px`;
    }

    function hideTooltip() {
        const tooltip = document.querySelector('.tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }
});

// Header show/hide on scroll
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
        header.classList.remove('hide-header');
        return;
    }

    if (currentScroll > lastScroll && !header.classList.contains('hide-header')) {
        header.classList.add('hide-header');
    } else if (currentScroll < lastScroll && header.classList.contains('hide-header')) {
        header.classList.remove('hide-header');
    }

    lastScroll = currentScroll;
});


   // Form submissions
    const whatsappBtn = document.getElementById('whatsappBtn');
if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function(e) {
        e.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const subject = document.getElementById("subject").value.trim();
        const message = document.getElementById("message").value.trim();

        if (!name || !email || !message) {
            alert("Please fill in all required fields.");
            return;
        }

        const fullMessage = `New Inquiry from Inspire-Her:\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nSubject: ${subject}\nMessage: ${message}`;
        const encodedMessage = encodeURIComponent(fullMessage);

        const whatsapp1 = "919990225430";
        const whatsapp2 = "918447381824";

        window.open(`https://wa.me/${whatsapp1}?text=${encodedMessage}`, '_blank');

        setTimeout(() => {
            window.open(`https://wa.me/${whatsapp2}?text=${encodedMessage}`, '_blank');
        }, 1000);
    });
}