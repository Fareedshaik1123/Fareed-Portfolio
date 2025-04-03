// Three.js 3D Starfield (unchanged)
let scene, camera, renderer, stars;
let scrollPos = 0;

function initStarfield() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('starfield').appendChild(renderer.domElement);

    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const starCount = 5000;

    for (let i = 0; i < starCount; i++) {
        const x = (Math.random() - 0.5) * 2000;
        const y = (Math.random() - 0.5) * 2000;
        const z = (Math.random() - 0.5) * 2000;
        vertices.push(x, y, z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    stars = new THREE.Points(geometry, material);
    scene.add(stars);

    camera.position.z = 500;

    animateStarfield();
}

function animateStarfield() {
    requestAnimationFrame(animateStarfield);
    stars.rotation.y += 0.001;
    stars.rotation.x = scrollPos * 0.0005;
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Scroll Animation for Sections
function handleScroll() {
    scrollPos = window.scrollY;
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const sectionBottom = section.getBoundingClientRect().bottom;
        const windowHeight = window.innerHeight;
        if (sectionTop < windowHeight && sectionBottom > 0) {
            section.classList.add('visible');
        }
    });
}

// EmailJS Form Submission with Auto-Reply
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        message: this.message.value
    };

    // Send email to you (original email)
    const sendToMe = emailjs.send("service_2suexqo", "template_yt1dnh5", {
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: "fareedshaik1123@gmail.com"
    });

    // Send auto-reply to the sender
    const sendAutoReply = emailjs.send("service_2suexqo", "template_lkicbeg", { // Replace with your auto-reply template ID
        from_name: formData.name,
        from_email: formData.email,
        phone: formData.phone,
        message: formData.message,
        to_email: formData.email // Send to the sender's email
    });

    // Handle both promises
    Promise.all([sendToMe, sendAutoReply])
        .then(() => {
            alert('Got your message, will reach you back soon. ');
            this.reset();
        })
        .catch((error) => {
            console.error('EmailJS Error:', error);
            alert('Failed to send message: ' + (error.text || 'Unknown error. Please try again later.'));
        });
});

// Back to Top Functionality
const backToTopButton = document.getElementById('back-to-top');

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function toggleBackToTopButton() {
    if (window.scrollY > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
}

// Event Listeners
backToTopButton.addEventListener('click', scrollToTop);
window.addEventListener('scroll', toggleBackToTopButton);

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (typeof emailjs === 'undefined') {
        console.error('EmailJS not loaded.');
        alert('Contact form is unavailable due to a loading issue.');
        return;
    }
    emailjs.init("jhP0SX-1duVAa75ZR"); // Your EmailJS Public Key
    initStarfield();
    handleScroll();
    toggleBackToTopButton();
});

window.addEventListener('scroll', handleScroll);