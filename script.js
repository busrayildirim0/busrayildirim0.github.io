document.addEventListener('DOMContentLoaded', () => {
    // --- Navigation Scroll Handling ---
    const navbar = document.querySelector('.navbar');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Change navbar padding/shadow on scroll
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active link highlighting
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    });

    // --- Mobile Menu Toggle ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinksContainer = document.querySelector('.nav-links');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            mobileNavToggle.classList.toggle('open');
            navLinksContainer.classList.toggle('open');
        });
    }

    // Close menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navLinksContainer.classList.contains('open')) {
                mobileNavToggle.classList.remove('open');
                navLinksContainer.classList.remove('open');
            }
        });
    });

    // --- Typist Animation (Hero Section) ---
    const typingElement = document.querySelector('.typing-text');
    if (typingElement) {
        const roles = ['Software Engineer', 'AI Researcher', 'Data Scientist'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 150;

        function type() {
            const currentRole = roles[roleIndex];
            if (isDeleting) {
                typingElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                delay = 75; // speed up backspace
            } else {
                typingElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                delay = 150; // standard typing speed
            }

            if (!isDeleting && charIndex === currentRole.length) {
                isDeleting = true;
                delay = 2000; // pause at full word
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                delay = 500; // brief pause before next word
            }

            setTimeout(type, delay);
        }

        setTimeout(type, 1000);
    }

    // --- Project Filtering ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active state of button
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                
                // Animating out
                card.style.opacity = '0';
                card.style.transform = 'scale(0.95)';
                
                setTimeout(() => {
                    if (category === 'all' || cardCategory === category) {
                        card.style.display = 'flex';
                        // Trigger reflow to restart transition
                        card.offsetHeight;
                        card.style.opacity = '1';
                        card.style.transform = 'scale(1)';
                    } else {
                        card.style.display = 'none';
                    }
                }, 300);
            });
        });
    });

    // --- Certificate Modal ---
    const certCards = document.querySelectorAll('.cert-card');
    const modal = document.querySelector('.modal');
    const modalImg = document.querySelector('.modal-img');
    const modalTitle = document.querySelector('.modal-title');
    const modalDesc = document.querySelector('.modal-desc');
    const modalClose = document.querySelector('.modal-close');

    certCards.forEach(card => {
        card.addEventListener('click', () => {
            const title = card.querySelector('.cert-title').textContent;
            const org = card.querySelector('.cert-org').textContent;
            const imgSrc = card.getAttribute('data-image') || '';
            
            modalTitle.textContent = title;
            modalDesc.textContent = org;
            
            if (imgSrc) {
                modalImg.src = imgSrc;
                modalImg.style.display = 'block';
            } else {
                modalImg.style.display = 'none';
            }
            
            modal.classList.add('active');
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }
    
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close modal on Escape key press
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    // --- Form Submission Alert ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;
            
            // Simulate form submission
            setTimeout(() => {
                alert('Thank you for your message, Büşra will get back to you soon!');
                contactForm.reset();
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
});
