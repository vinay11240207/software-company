document.addEventListener('DOMContentLoaded', () => {

    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
        });
    }

    const currentPath = window.location.pathname.split('/').pop();
    const navLinkElements = document.querySelectorAll('.nav-link');
    
    navLinkElements.forEach(link => {
        if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1
    });

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const workCards = document.querySelectorAll('.work-card');
    const modal = document.getElementById('workModal');
    const closeModal = document.querySelector('.close-button');
    
    if (modal) {
        workCards.forEach(card => {
            card.addEventListener('click', () => {
                document.getElementById('modalImage').src = card.dataset.image;
                document.getElementById('modalTitle').textContent = card.dataset.title;
                document.getElementById('modalDescription').textContent = card.dataset.description;
                modal.style.display = 'block';
            });
        });

        closeModal.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (event) => {
            if (event.target == modal) {
                modal.style.display = 'none';
            }
        });
    }

    const slides = document.querySelectorAll('.review-slide');
    const nextBtn = document.querySelector('.next-btn');
    const prevBtn = document.querySelector('.prev-btn');
    
    if (slides.length > 0) {
        let currentSlide = 0;

        const showSlide = (index) => {
            slides.forEach((slide, i) => {
                slide.classList.remove('active');
                if (i === index) {
                    slide.classList.add('active');
                }
            });
        };

        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        
        showSlide(currentSlide);
    }

    const handlePlanSelection = () => {
        const websiteTypeDropdown = document.getElementById('websiteType');
        if (!websiteTypeDropdown) {
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const plan = urlParams.get('plan');

        if (plan) {
            websiteTypeDropdown.value = plan;
        }
    };
    
    handlePlanSelection();

    const paypalBtn = document.getElementById('paypal-btn');
    const razorpayBtn = document.getElementById('razorpay-btn');
    const cryptoBtn = document.getElementById('crypto-btn');

    const handleDummyPayment = (method) => {
        alert(`You have selected ${method}. This is just a demonstration.`);
    };

    if (paypalBtn) paypalBtn.addEventListener('click', () => handleDummyPayment('PayPal'));
    if (cryptoBtn) cryptoBtn.addEventListener('click', () => handleDummyPayment('Cryptocurrency'));
    
    if (razorpayBtn) {
        razorpayBtn.addEventListener('click', () => {
            const options = {
                "key": "rzp_test_iru6IhPebMRSaZ",
                "amount": "50000",
                "currency": "INR",
                "name": "Innovatech Solutions",
                "description": "Test Transaction",
                "image": "images/logo.png",
                "handler": function (response){
                    alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                },
                "prefill": {
                    "name": "Test User",
                    "email": "test.user@example.com",
                    "contact": "9999999999"
                },
                "notes": {
                    "address": "Innovatech Solutions, Jaipur"
                },
                "theme": {
                    "color": "#007bff"
                }
            };
            const rzp1 = new Razorpay(options);
            rzp1.on('payment.failed', function (response){
                alert("Payment failed. Error: " + response.error.description);
            });
            rzp1.open();
        });
    }
});