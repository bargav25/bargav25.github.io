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

// Experience tab functionality
const tabButtons = document.querySelectorAll('.tab-btn');
const experiencePanels = document.querySelectorAll('.experience-panel');

function switchTab(company) {
    // Update active states
    tabButtons.forEach(btn => {
        btn.classList.toggle('active', btn.dataset.company === company);
    });

    experiencePanels.forEach(panel => {
        if (panel.dataset.company === company) {
            panel.classList.add('active');
            panel.style.opacity = '1';
        } else {
            panel.classList.remove('active');
            panel.style.opacity = '0';
        }
    });
}

// Initialize first tab
document.addEventListener('DOMContentLoaded', () => {
    const firstTab = document.querySelector('.tab-btn');
    if (firstTab) {
        switchTab(firstTab.dataset.company);
    }
});

// Handle click events
tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        switchTab(btn.dataset.company);
    });
});

// Handle hover events
tabButtons.forEach(btn => {
    btn.addEventListener('mouseenter', () => {
        switchTab(btn.dataset.company);
    });
});

// Return to active tab when not hovering
const experienceContainer = document.querySelector('.experience-container');
experienceContainer.addEventListener('mouseleave', () => {
    const activeTab = document.querySelector('.tab-btn.active');
    if (activeTab) {
        switchTab(activeTab.dataset.company);
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

// Remove or comment out the experience tab click handlers
/*
tabButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        const company = btn.dataset.company;
        console.log('Tab clicked:', company);
        switchTab(company);
    });
});
*/

// Resume Modal Functionality
const modal = document.getElementById('resume-modal');
const resumeBtn = document.getElementById('resume-btn');
const closeBtn = document.querySelector('.close-modal');

resumeBtn.onclick = function() {
    modal.style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

closeBtn.onclick = function() {
    modal.style.display = "none";
    document.body.style.overflow = "auto"; // Re-enable scrolling
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Close modal on escape key
document.addEventListener('keydown', function(event) {
    if (event.key === "Escape" && modal.style.display === "block") {
        modal.style.display = "none";
        document.body.style.overflow = "auto";
    }
}); 