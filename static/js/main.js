/**
 * GeoSpatial Expert - Personal Branding Website
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // Initialize AOS (Animate on Scroll)
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
    });
    
    // Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add Bootstrap validation styles to forms
    const forms = document.querySelectorAll('.needs-validation');
    Array.from(forms).forEach(form => {
        form.addEventListener('submit', event => {
            if (!form.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            form.classList.add('was-validated');
        }, false);
    });
    
    // Blog category filtering
    const filterButtons = document.querySelectorAll('.category-filters button');
    const blogItems = document.querySelectorAll('.blog-item');
    
    if (filterButtons.length > 0 && blogItems.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => {
                    btn.classList.remove('active');
                });
                
                // Add active class to clicked button
                this.classList.add('active');
                
                const filter = this.getAttribute('data-filter');
                
                // Show/hide blog items based on filter
                blogItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Masonry layout for grid items (if needed)
    const gridContainers = document.querySelectorAll('.masonry-grid');
    if (gridContainers.length > 0 && typeof Masonry !== 'undefined') {
        gridContainers.forEach(container => {
            new Masonry(container, {
                itemSelector: '.grid-item',
                columnWidth: '.grid-sizer',
                percentPosition: true
            });
        });
    }
    
    // Image lightbox for project images
    const projectImages = document.querySelectorAll('.project-image');
    if (projectImages.length > 0 && typeof GLightbox !== 'undefined') {
        GLightbox({
            selector: '.project-image',
            touchNavigation: true,
            loop: true
        });
    }
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const options = {
            rootMargin: '0px',
            threshold: 0.25
        };
        
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseInt(counter.getAttribute('data-target'));
                    const duration = 2000; // Animation duration in milliseconds
                    const step = target / (duration / 16); // 60fps
                    
                    let current = 0;
                    const updateCounter = () => {
                        current += step;
                        if (current < target) {
                            counter.textContent = Math.ceil(current);
                            requestAnimationFrame(updateCounter);
                        } else {
                            counter.textContent = target;
                        }
                    };
                    
                    updateCounter();
                    observer.unobserve(counter);
                }
            });
        }, options);
        
        counters.forEach(counter => {
            observer.observe(counter);
        });
    }
    
    // Typed.js for hero section animated text
    const typedElement = document.getElementById('typed-text');
    if (typedElement && typeof Typed !== 'undefined') {
        new Typed('#typed-text', {
            strings: [
                'Converting spatial data into knowledge',
                'Forest monitoring and analysis',
                'Sustainable resource management',
                'Environmental GIS solutions'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true
        });
    }
    
    // Background particles for hero section
    const particlesContainer = document.getElementById('particles-js');
    if (particlesContainer && typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: {
                    value: 80,
                    density: {
                        enable: true,
                        value_area: 800
                    }
                },
                color: {
                    value: '#ffffff'
                },
                opacity: {
                    value: 0.5,
                    random: false
                },
                size: {
                    value: 3,
                    random: true
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: '#ffffff',
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: 'none',
                    random: false,
                    straight: false,
                    out_mode: 'out',
                    bounce: false
                }
            },
            interactivity: {
                detect_on: 'canvas',
                events: {
                    onhover: {
                        enable: true,
                        mode: 'grab'
                    },
                    onclick: {
                        enable: true,
                        mode: 'push'
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
    
    // Handle mobile menu toggle
    const menuToggle = document.querySelector('.navbar-toggler');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    
    if (menuToggle && navbarCollapse) {
        document.addEventListener('click', function(event) {
            const isClickInsideNavbar = navbarCollapse.contains(event.target) || menuToggle.contains(event.target);
            
            if (!isClickInsideNavbar && navbarCollapse.classList.contains('show')) {
                menuToggle.click();
            }
        });
    }
    
    // Add any additional initialization here
    
});

// Handle form submissions via AJAX (if needed)
function submitContactForm(form) {
    const formData = new FormData(form);
    
    fetch(form.action, {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            form.reset();
            form.classList.remove('was-validated');
            
            // Show success message
            const successAlert = document.createElement('div');
            successAlert.className = 'alert alert-success mt-3';
            successAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> Your message has been sent successfully!';
            form.parentNode.insertBefore(successAlert, form.nextSibling);
            
            // Remove the alert after 5 seconds
            setTimeout(() => {
                successAlert.remove();
            }, 5000);
        } else {
            // Show error message
            const errorAlert = document.createElement('div');
            errorAlert.className = 'alert alert-danger mt-3';
            errorAlert.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i> ${data.message || 'Something went wrong. Please try again.'}`;
            form.parentNode.insertBefore(errorAlert, form.nextSibling);
            
            // Remove the alert after 5 seconds
            setTimeout(() => {
                errorAlert.remove();
            }, 5000);
        }
    })
    .catch(error => {
        console.error('Error:', error);
    });
    
    return false; // Prevent default form submission
}
