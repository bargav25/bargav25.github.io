// Typing Animation
const phrases = [
    "Machine Learning Scientist",
    "Deep Learning Expert",
    "AI Researcher"
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 100;
const deletingSpeed = 50;
const pauseDuration = 2000;

function typeText() {
    const currentPhrase = phrases[phraseIndex];
    const typedText = document.getElementById('typed-text');

    if (isDeleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typedText.textContent = currentPhrase.substring(0, charIndex);

    let typeSpeed = isDeleting ? deletingSpeed : typingSpeed;

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = pauseDuration;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
    }

    setTimeout(typeText, typeSpeed);
}

// Start typing animation
document.addEventListener('DOMContentLoaded', typeText);

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
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
            entry.target.classList.add('fade-in');
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .project-card, .article-card').forEach((el) => {
    observer.observe(el);
});

// Parallax effect for gradient circles
document.addEventListener('mousemove', (e) => {
    const circles = document.querySelectorAll('.gradient-circle');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    circles.forEach((circle, index) => {
        const speed = index + 1;
        const x = (mouseX - 0.5) * speed * 30;
        const y = (mouseY - 0.5) * speed * 30;
        circle.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navigationLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });

    navigationLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const mobileNavLinks = document.querySelector('.nav-links');

hamburger?.addEventListener('click', () => {
    mobileNavLinks.classList.toggle('show');
    hamburger.classList.toggle('active');
});

// Experience tab switching
const tabButtons = document.querySelectorAll('.tab-btn');
const experiencePanels = document.querySelectorAll('.experience-panel');

function switchTab(company) {
    console.log('Switching to:', company);
    
    // Update active tab button
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.company === company) {
            btn.classList.add('active');
        }
    });

    // Update active panel with fade effect
    experiencePanels.forEach(panel => {
        if (panel.dataset.company === company) {
            panel.style.opacity = '0';
            panel.classList.add('active');
            setTimeout(() => {
                panel.style.opacity = '1';
            }, 50);
        } else {
            panel.classList.remove('active');
            panel.style.opacity = '0';
        }
    });
}

// Add click event listeners to tab buttons
tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const company = btn.dataset.company;
        console.log('Tab clicked:', company);
        switchTab(company);
    });
});

// Initialize the first tab as active
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded');
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        const company = firstTab.dataset.company;
        console.log('Initializing first tab:', company);
        switchTab(company);
    }
});

// Project category filtering
const categoryButtons = document.querySelectorAll('.category-btn');
const projectCards = document.querySelectorAll('.project-card');

function filterProjects(category) {
    projectCards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.opacity = '0';
            card.style.display = 'block';
            setTimeout(() => {
                card.style.opacity = '1';
            }, 50);
        } else {
            card.style.opacity = '0';
            setTimeout(() => {
                card.style.display = 'none';
            }, 300);
        }
    });
}

categoryButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        categoryButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        filterProjects(btn.dataset.category);
    });
}); 