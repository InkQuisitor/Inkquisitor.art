// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Set the dynamic year in the footer
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 2. Simple Scroll Reveal Effect using IntersectionObserver
    // This makes elements fade in nicely as the user scrolls down
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Trigger when 15% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add an inline style or a class to animate
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Only animate once
            }
        });
    }, observerOptions);

    // Select all sections (art, animations, contact) and article cards to animate
    const elementsToReveal = document.querySelectorAll('section#art, section#animations, article');
    
    elementsToReveal.forEach(el => {
        // Initial state before reveal
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // 3. Optional: Add a subtle click effect on interactive elements
    const interactiveElements = document.querySelectorAll('.nav-link, button, article');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mousedown', () => {
            el.style.transform = 'scale(0.98)';
        });
        
        el.addEventListener('mouseup', () => {
            // Reset transform or let hover states take over
            el.style.transform = ''; 
        });
        
        el.addEventListener('mouseleave', () => {
            el.style.transform = '';
        });
    });

    console.log("InkQuisitor.art loaded successfully!");
});
