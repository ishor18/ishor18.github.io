// Mobile Menu Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

if (mobileMenu) {
    mobileMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
}

// Close mobile menu when a link is clicked
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        if (navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
        }
    });
});

// Change navbar background on scroll
window.addEventListener('scroll', function () {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#070c1a'; // Darker on scroll
        navbar.style.padding = '8px 8%';      // Keep compact
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = '#0f172a';  // Original Color
        navbar.style.padding = '8px 8%';      // Match CSS initial state
        navbar.style.boxShadow = 'none';
    }
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Prevent selecting past dates
const datePicker = document.getElementById('bookingDate');
if (datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.setAttribute('min', today);
}

// Check if user just returned from a successful booking
window.onload = function () {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const msg = document.getElementById('successMessage');
        if (msg) {
            msg.style.display = 'block';

            // Hide the message automatically after 5 seconds
            setTimeout(() => {
                msg.style.display = 'none';
                // Clean the URL so the message doesn't pop up if they refresh
                window.history.replaceState({}, document.title, "/");
            }, 5000);
        }
    }
}
// EmailJS Form Handling
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const btn = contactForm.querySelector('button');
        const statusMsg = contactForm.querySelector('.status-msg');
        const originalBtnText = btn.innerText;

        // Show loading state
        btn.innerText = 'Sending...';
        btn.disabled = true;

        // Prepare template parameters with redundant keys for maximum compatibility
        const templateParams = {
            from_name: document.getElementById('name').value,
            from_email: document.getElementById('email').value,
            reply_to: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value,
            // Dynamically set receiver if you want to send a confirmation to the visitor
            to_email: document.getElementById('email').value,
            to_name: document.getElementById('name').value
        };

        console.log('Attempting to send email with params:', templateParams);

        // Send to Google Sheets (Message Storage)
        const scriptURL = 'https://script.google.com/macros/s/AKfycbxh-G4VO7JE5uWHq-AzvxUEbum9d0F0O5SN5q21HKR80Jvt92arp7vKUXO_LABFiDpZ/exec';

        // Using URLSearchParams for better compatibility with Apps Script
        const formData = new URLSearchParams();
        formData.append('from_name', templateParams.from_name);
        formData.append('from_email', templateParams.from_email);
        formData.append('subject', templateParams.subject);
        formData.append('message', templateParams.message);

        fetch(scriptURL, {
            method: 'POST',
            mode: 'no-cors',
            body: formData
        }).catch(err => console.error('Sheet Storage Error:', err));

        // Send email using EmailJS
        emailjs.send('service_edjxp4e', 'template_khlnxeb', templateParams)
            .then(function (response) {
                // Success
                console.log('EmailJS Success:', response.status, response.text);
                statusMsg.style.display = 'block';
                statusMsg.style.color = '#22c55e';
                statusMsg.innerText = 'Message sent successfully! I will get back to you soon.';
                contactForm.reset();
                setTimeout(() => {
                    statusMsg.style.display = 'none';
                }, 5000);
            }, function (error) {
                // Error
                console.error('EmailJS Error Details:', error);
                statusMsg.style.display = 'block';
                statusMsg.style.color = '#ef4444';
                statusMsg.innerText = 'Failed to send message. Please try again or email directly.';
            })
            .finally(function () {
                // Reset button
                btn.innerText = originalBtnText;
                btn.disabled = false;
            });
    });
}


// Typewriter Effect
const typewriterElement = document.getElementById('typewriter-text');
if (typewriterElement) {
    const textToType = "I am Ishor";
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentText = isDeleting
            ? textToType.substring(0, charIndex - 1)
            : textToType.substring(0, charIndex + 1);

        typewriterElement.textContent = currentText;
        charIndex = isDeleting ? charIndex - 1 : charIndex + 1;

        let typeSpeed = isDeleting ? 70 : 150;

        if (!isDeleting && charIndex === textToType.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at the end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            typeSpeed = 500; // Pause before restarting
        }

        setTimeout(type, typeSpeed);
    }

    setTimeout(type, 1000);
}

// Scroll to Top Button Logic
const scrollTopBtn = document.getElementById("scrollTopBtn");

if (scrollTopBtn) {
    window.onscroll = function () {
        scrollFunction();
    };

    function scrollFunction() {
        if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
            scrollTopBtn.style.display = "block";
        } else {
            scrollTopBtn.style.display = "none";
        }
    }

    scrollTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Scroll Reveal Animation
window.addEventListener('scroll', reveal);
// Run on load to show sections already in view
window.addEventListener('DOMContentLoaded', reveal);
window.addEventListener('load', reveal);

function reveal() {
    var reveals = document.querySelectorAll('.reveal');

    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var revealPoint = 100;

        if (elementTop < windowHeight - revealPoint) {
            reveals[i].classList.add('active');
        }
    }
}
// Example helper function to generate the badge HTML
function getStatusBadgeHTML(statusValue) {
    // statusValue is coming from your <select> value: 'completed', 'progress', or 'planning'
    
    let badgeClass = '';
    let statusText = '';
    if (statusValue === 'completed') {
        badgeClass = 'completed'; // matches the .status-badge.completed CSS
        statusText = 'Completed';
    } else if (statusValue === 'progress') {
        badgeClass = 'in-progress'; // matches the .status-badge.in-progress CSS
        statusText = 'In Progress';
    } else if (statusValue === 'planning') {
        badgeClass = 'planning'; // We can add a style for this too if needed
        statusText = 'Planning';
    }
    return `<span class="status-badge ${badgeClass}">${statusText}</span>`;
}

