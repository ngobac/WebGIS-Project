document.addEventListener('DOMContentLoaded', function() {
    // Current year for copyright
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
    
    // Mobile menu toggle
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const navMenu = document.querySelector('nav ul');
    
    if (hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('show');
        });
    }
    
    // FAQ accordion
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.toggle-icon i');
        
        if (question) {
            question.addEventListener('click', () => {
                // Toggle active class
                item.classList.toggle('active');
                
                // Toggle the icon
                if (icon) {
                    if (item.classList.contains('active')) {
                        icon.classList.remove('fa-plus');
                        icon.classList.add('fa-minus');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    } else {
                        icon.classList.remove('fa-minus');
                        icon.classList.add('fa-plus');
                        answer.style.maxHeight = '0px';
                    }
                }
            });
        }
    });
    
    // Blog post filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const postCards = document.querySelectorAll('.post-card');
    
    if (filterButtons.length > 0 && postCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                postCards.forEach(card => {
                    if (filter === 'all') {
                        card.style.display = 'block';
                    } else {
                        if (card.getAttribute('data-category') === filter) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    }
                });
            });
        });
    }
    
    // Project filtering
    const projectFilterButtons = document.querySelectorAll('.projects-filter .filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    if (projectFilterButtons.length > 0 && projectCards.length > 0) {
        projectFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                projectFilterButtons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                projectCards.forEach(card => {
                    const categories = card.getAttribute('data-category').split(' ');
                    
                    if (filter === 'all') {
                        card.style.display = 'block';
                        setTimeout(() => {
                            card.classList.add('animate-in');
                        }, 100);
                    } else {
                        if (categories.includes(filter)) {
                            card.style.display = 'block';
                            setTimeout(() => {
                                card.classList.add('animate-in');
                            }, 100);
                        } else {
                            card.classList.remove('animate-in');
                            setTimeout(() => {
                                card.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
    }
    
    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-bar');
    
    if (skillBars.length > 0) {
        const animateSkillBars = () => {
            skillBars.forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.width = level + '%';
            });
        }
        
        // Simple observer for skill bars
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(animateSkillBars, 200);
                    observer.unobserve(entry.target);
                }
            });
        });
        
        const skillsContainer = document.querySelector('.skills-container');
        if (skillsContainer) {
            observer.observe(skillsContainer);
        }
    }
    
    // Animate project cards on scroll
    const projectObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                projectObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    if (projectCards.length > 0) {
        projectCards.forEach(card => {
            projectObserver.observe(card);
        });
    }
    
    // Contact form validation
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            let isValid = true;
            const name = this.querySelector('#name');
            const email = this.querySelector('#email');
            const message = this.querySelector('#message');
            
            // Simple validation
            if (name && name.value.trim() === '') {
                isValid = false;
                name.classList.add('error');
            } else if (name) {
                name.classList.remove('error');
            }
            
            if (email && (email.value.trim() === '' || !isValidEmail(email.value))) {
                isValid = false;
                email.classList.add('error');
            } else if (email) {
                email.classList.remove('error');
            }
            
            if (message && message.value.trim() === '') {
                isValid = false;
                message.classList.add('error');
            } else if (message) {
                message.classList.remove('error');
            }
            
            if (!isValid) {
                e.preventDefault();
            }
        });
    }
    
    // Email validation helper
    function isValidEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Tool cards hover effect
    const toolCards = document.querySelectorAll('.tool-card');
    
    if (toolCards.length > 0) {
        toolCards.forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.classList.add('active');
            });
            
            card.addEventListener('mouseleave', function() {
                this.classList.remove('active');
            });
        });
    }
    
    // Initialize map on contact page if needed
    const contactMap = document.getElementById('contact-map');
    
    if (contactMap && typeof L !== 'undefined') {
        const map = L.map('contact-map').setView([51.505, -0.09], 13);
        
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        
        L.marker([51.505, -0.09]).addTo(map)
            .bindPopup('My Location')
            .openPopup();
    }
});

// Add classes to body based on current page
document.addEventListener('DOMContentLoaded', function() {
    const path = window.location.pathname;
    const bodyClass = path.split('/').pop().split('.')[0] || 'home';
    document.body.classList.add('page-' + bodyClass);
    
    // Add active class to current nav item
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href && path.includes(href) && href !== '/') {
            link.classList.add('active');
        } else if (href === '/' && path === '/') {
            link.classList.add('active');
        }
    });
});
