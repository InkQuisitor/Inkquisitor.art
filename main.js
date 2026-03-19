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

    // 4. Image Lightbox for Art Section
    const artArticles = document.querySelectorAll('section#art article');
    if (artArticles.length > 0) {
        // Create full-screen overlay elements
        const lightbox = document.createElement('div');
        lightbox.className = 'fixed inset-0 bg-black/95 z-50 hidden flex-col items-center justify-center backdrop-blur-md opacity-0 transition-opacity duration-300 cursor-zoom-out';
        
        const lightboxImg = document.createElement('img');
        lightboxImg.className = 'max-w-[90vw] max-h-[90vh] object-contain shadow-2xl rounded border border-zinc-800 scale-95 transition-transform duration-300';
        
        const closeText = document.createElement('p');
        closeText.className = 'text-zinc-500 mt-6 font-light text-xs tracking-widest uppercase';
        closeText.textContent = 'Click anywhere or press Esc to close';
        
        lightbox.appendChild(lightboxImg);
        lightbox.appendChild(closeText);
        document.body.appendChild(lightbox);
        
        // Functions to open and close the lightbox smoothly
        const closeLightbox = () => {
            lightbox.classList.remove('opacity-100');
            lightboxImg.classList.remove('scale-100');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                lightbox.classList.remove('flex');
            }, 300);
        };

        const openLightbox = (src, alt) => {
            lightboxImg.src = src;
            lightboxImg.alt = alt;
            lightbox.classList.remove('hidden');
            lightbox.classList.add('flex');
            
            // Trigger reflow to ensure the transition animations play
            void lightbox.offsetWidth;
            
            lightbox.classList.add('opacity-100');
            lightboxImg.classList.add('scale-100');
        };

        // Attach click listeners to all artworks
        artArticles.forEach(article => {
            const img = article.querySelector('img');
            if (img) {
                article.classList.add('cursor-zoom-in');
                article.addEventListener('click', (e) => {
                    e.preventDefault();
                    openLightbox(img.src, img.alt);
                });
            }
        });

        // Event listeners for closing
        lightbox.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
                closeLightbox();
            }
        });
    }

    // 5. Click-to-play for Animations
    const animArticles = document.querySelectorAll('.animation-card');
    animArticles.forEach(article => {
        const video = article.querySelector('video');
        const overlay = article.querySelector('.play-overlay');
        
        if (video && overlay) {
            article.addEventListener('click', () => {
                if (video.paused) {
                    video.play();
                    overlay.style.opacity = '0'; // Hide the play button
                } else {
                    video.pause();
                    overlay.style.opacity = '1'; // Show the play button
                }
            });
        }
    });

    console.log("InkQuisitor.art loaded successfully!");
});
