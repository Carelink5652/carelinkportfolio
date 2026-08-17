/* =====================================================
   CARELINK PORTFOLIO - JAVASCRIPT
   Defensive, accessible, progressive enhancement
   ===================================================== */

(function() {
    'use strict';

    // ===== UTILITY FUNCTIONS =====

    /**
     * Safe element selector with null check
     */
    function selectElement(selector) {
        const element = document.querySelector(selector);
        return element || null;
    }

    /**
     * Safe element list selector
     */
    function selectAllElements(selector) {
        return document.querySelectorAll(selector);
    }

    /**
     * Check if element exists
     */
    function elementExists(element) {
        return element !== null && element !== undefined;
    }

    /**
     * Add event listener safely
     */
    function addEventListener(element, event, handler) {
        if (elementExists(element)) {
            element.addEventListener(event, handler);
        }
    }

    /**
     * Add class safely
     */
    function addClass(element, className) {
        if (elementExists(element)) {
            element.classList.add(className);
        }
    }

    /**
     * Remove class safely
     */
    function removeClass(element, className) {
        if (elementExists(element)) {
            element.classList.remove(className);
        }
    }

    /**
     * Toggle class safely
     */
    function toggleClass(element, className) {
        if (elementExists(element)) {
            element.classList.toggle(className);
        }
    }

    /**
     * Has class safely
     */
    function hasClass(element, className) {
        if (elementExists(element)) {
            return element.classList.contains(className);
        }
        return false;
    }

    /**
     * Set attribute safely
     */
    function setAttribute(element, attr, value) {
        if (elementExists(element)) {
            element.setAttribute(attr, value);
        }
    }

    /**
     * Get attribute safely
     */
    function getAttribute(element, attr) {
        if (elementExists(element)) {
            return element.getAttribute(attr);
        }
        return null;
    }

    // ===== MOBILE MENU =====

    function initMobileMenu() {
        const toggle = selectElement('#navbar-toggle');
        const menu = selectElement('#navbar-menu');

        if (!elementExists(toggle) || !elementExists(menu)) {
            return;
        }

        // Toggle menu on button click
        addEventListener(toggle, 'click', function() {
            const isExpanded = getAttribute(toggle, 'aria-expanded') === 'true';
            const newState = !isExpanded;

            setAttribute(toggle, 'aria-expanded', newState ? 'true' : 'false');
            menu.setAttribute('data-expanded', newState ? 'true' : 'false');

            // Prevent body scroll when menu is open (optional)
            if (newState) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        // Close menu when a link is clicked
        const links = selectAllElements('#navbar-menu a');
        links.forEach(function(link) {
            addEventListener(link, 'click', function() {
                setAttribute(toggle, 'aria-expanded', 'false');
                menu.setAttribute('data-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Close menu on escape key
        addEventListener(document, 'keydown', function(e) {
            if (e.key === 'Escape' && getAttribute(toggle, 'aria-expanded') === 'true') {
                setAttribute(toggle, 'aria-expanded', 'false');
                menu.setAttribute('data-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // ===== HEADER SCROLL STATE =====

    function initHeaderScrollState() {
        const navbar = selectElement('.navbar');

        if (!elementExists(navbar)) {
            return;
        }

        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                addClass(navbar, 'scrolled');
            } else {
                removeClass(navbar, 'scrolled');
            }
        });
    }

    // ===== INTERSECTION OBSERVER FOR REVEAL EFFECTS =====

    function initIntersectionObserver() {
        if (!('IntersectionObserver' in window)) {
            // Fallback: just show everything
            const elements = selectAllElements('.fade-in, .project-card, .service-item, .philosophy-item, .process-step, .founder-card');
            elements.forEach(function(el) {
                addClass(el, 'fade-in');
            });
            return;
        }

        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    addClass(entry.target, 'fade-in');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observe animation targets
        const animationTargets = selectAllElements('.project-card, .service-item, .philosophy-item, .process-step, .founder-card');
        animationTargets.forEach(function(target) {
            observer.observe(target);
        });
    }

    // ===== BACK TO TOP BUTTON =====

    function initBackToTopButton() {
        const button = selectElement('#back-to-top');

        if (!elementExists(button)) {
            return;
        }

        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.scrollY > 300) {
                button.style.display = 'block';
            } else {
                button.style.display = 'none';
            }
        });

        // Scroll to top on click
        addEventListener(button, 'click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ===== FORM VALIDATION AND SUBMISSION =====

    function initContactForm() {
        const form = selectElement('#contact-form');

        if (!elementExists(form)) {
            return;
        }

        /**
         * Validate email format
         */
        function isValidEmail(email) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(email);
        }

        /**
         * Show error message
         */
        function showError(fieldId, message) {
            const errorElement = selectElement('#' + fieldId + '-error');
            if (elementExists(errorElement)) {
                errorElement.textContent = message;
                addClass(errorElement, 'show');
            }
        }

        /**
         * Clear error message
         */
        function clearError(fieldId) {
            const errorElement = selectElement('#' + fieldId + '-error');
            if (elementExists(errorElement)) {
                errorElement.textContent = '';
                removeClass(errorElement, 'show');
            }
        }

        /**
         * Validate form
         */
        function validateForm() {
            let isValid = true;

            const name = selectElement('#name');
            const email = selectElement('#email');
            const projectType = selectElement('#project_type');
            const description = selectElement('#description');

            // Validate name
            if (elementExists(name)) {
                if (!name.value.trim()) {
                    showError('name', 'Name is required');
                    isValid = false;
                } else {
                    clearError('name');
                }
            }

            // Validate email
            if (elementExists(email)) {
                if (!email.value.trim()) {
                    showError('email', 'Email is required');
                    isValid = false;
                } else if (!isValidEmail(email.value)) {
                    showError('email', 'Please enter a valid email');
                    isValid = false;
                } else {
                    clearError('email');
                }
            }

            // Validate project type
            if (elementExists(projectType)) {
                if (!projectType.value) {
                    showError('project_type', 'Please select a project type');
                    isValid = false;
                } else {
                    clearError('project_type');
                }
            }

            // Validate description
            if (elementExists(description)) {
                if (!description.value.trim()) {
                    showError('description', 'Project description is required');
                    isValid = false;
                } else if (description.value.trim().length < 10) {
                    showError('description', 'Description must be at least 10 characters');
                    isValid = false;
                } else {
                    clearError('description');
                }
            }

            return isValid;
        }

        /**
         * Reset form after successful submission
         */
        function resetFormState() {
            form.reset();
            const errors = selectAllElements('.error-message');
            errors.forEach(function(error) {
                removeClass(error, 'show');
            });
        }

        /**
         * Show form message
         */
        function showFormMessage(message, type) {
            const messageElement = selectElement('#form-message');
            if (elementExists(messageElement)) {
                messageElement.textContent = message;
                messageElement.className = 'form-message show ' + type;

                // Auto-hide after 5 seconds
                setTimeout(function() {
                    removeClass(messageElement, 'show');
                }, 5000);
            }
        }

        /**
         * Show fallback message (for when Supabase is not available)
         */
        function showFallbackMessage() {
            const fallback = selectElement('#form-fallback');
            if (elementExists(fallback)) {
                fallback.style.display = 'block';
            }
            showFormMessage('Thank you for your interest! We\'ll get back to you soon.', 'success');
        }

        // Handle form submission
        addEventListener(form, 'submit', function(e) {
            e.preventDefault();

            // Validate form
            if (!validateForm()) {
                return;
            }

            // Collect form data
            const formData = {
                name: selectElement('#name')?.value || '',
                email: selectElement('#email')?.value || '',
                whatsapp: selectElement('#whatsapp')?.value || '',
                company: selectElement('#company')?.value || '',
                project_type: selectElement('#project_type')?.value || '',
                budget: selectElement('#budget')?.value || '',
                description: selectElement('#description')?.value || ''
            };

            // Try to submit to Supabase (if available)
            // If Supabase is not available or fails, show graceful fallback
            submitFormData(formData);
        });

        /**
         * Submit form data
         */
        function submitFormData(data) {
            // Check if Supabase would be available in the future
            // For now, we'll just show the fallback message
            // This allows the site to work without Supabase while being ready for integration

            // Option 1: If you add Supabase later, uncomment this block:
            /*
            const supabaseUrl = 'YOUR_SUPABASE_URL';
            const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';

            if (!supabaseUrl || !supabaseKey) {
                showFallbackMessage();
                resetFormState();
                return;
            }

            fetch(supabaseUrl + '/rest/v1/project_inquiries', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'apikey': supabaseKey,
                    'Authorization': 'Bearer ' + supabaseKey
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(result => {
                showFormMessage('Thank you! We\'ll get back to you within 24 hours.', 'success');
                resetFormState();
            })
            .catch(error => {
                console.error('Error:', error);
                showFallbackMessage();
                resetFormState();
            });
            */

            // For now, always show fallback (offline-first approach)
            showFallbackMessage();
            resetFormState();
        }
    }

    // ===== CURRENT YEAR =====

    function updateCurrentYear() {
        const yearElement = selectElement('#year');
        if (elementExists(yearElement)) {
            yearElement.textContent = new Date().getFullYear();
        }
    }

    // ===== SMOOTH SCROLL BEHAVIOR =====

    function initSmoothScroll() {
        const links = selectAllElements('a[href^="#"]');

        links.forEach(function(link) {
            addEventListener(link, 'click', function(e) {
                const href = getAttribute(link, 'href');

                if (href === '#' || href === '') {
                    return;
                }

                const target = selectElement(href);

                if (elementExists(target)) {
                    e.preventDefault();

                    // Close mobile menu if open
                    const toggle = selectElement('#navbar-toggle');
                    const menu = selectElement('#navbar-menu');

                    if (elementExists(toggle) && elementExists(menu)) {
                        setAttribute(toggle, 'aria-expanded', 'false');
                        menu.setAttribute('data-expanded', 'false');
                        document.body.style.overflow = '';
                    }

                    // Scroll to target with offset for fixed navbar
                    const navbarHeight = selectElement('.navbar')?.offsetHeight || 0;
                    const targetPosition = target.offsetTop - navbarHeight - 20;

                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // ===== KEYBOARD ACCESSIBILITY =====

    function initKeyboardAccessibility() {
        // Add focus visible styles for better accessibility
        const style = document.createElement('style');
        style.textContent = `
            *:focus {
                outline: 2px solid var(--color-accent, #4F46E5);
                outline-offset: 2px;
            }
        `;
        document.head.appendChild(style);
    }

    // ===== INITIALIZATION =====

    function init() {
        // Wait for DOM to be fully loaded
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initAll);
        } else {
            initAll();
        }
    }

    function initAll() {
        initMobileMenu();
        initHeaderScrollState();
        initIntersectionObserver();
        initBackToTopButton();
        initContactForm();
        updateCurrentYear();
        initSmoothScroll();
        initKeyboardAccessibility();
    }

    // Start initialization
    init();
})();
