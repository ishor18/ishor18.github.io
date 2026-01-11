// Change navbar background on scroll
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#070c1a'; // Darker on scroll
        navbar.style.padding = '15px 10%';
    } else {
        navbar.style.background = '#0f172a';
        navbar.style.padding = '20px 10%';
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
if(datePicker) {
    const today = new Date().toISOString().split('T')[0];
    datePicker.setAttribute('min', today);
}

// Check if user just returned from a successful booking
window.onload = function() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('status') === 'success') {
        const msg = document.getElementById('successMessage');
        if(msg) {
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


