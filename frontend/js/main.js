// --- EMOZIONI MAIN.JS ---

document.addEventListener('DOMContentLoaded', function () {

    // --- HERO TITLE ANIMATION (INFINITE LOOP) ---
    if (typeof gsap !== 'undefined' && typeof SplitType !== 'undefined') {
        const heroTitle = document.querySelector('.hero-title');
        const heroSubtitle = document.querySelector('.hero-subtitle');
        const heroButton = document.querySelector('.hero-content .cta-button');

        if (heroTitle) {
            const split = new SplitType(heroTitle, { types: 'chars' });
            const chars = split.chars;

            gsap.fromTo(chars, {
                opacity: 0,
                y: 100,
                rotationX: -90
            }, {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 1,
                ease: "back.out(1.7)",
                stagger: 0.03,
                delay: 0.5,
                repeat: -1,
                repeatDelay: 3,
                yoyo: true
            });
        }

        if (heroSubtitle) {
            gsap.fromTo(heroSubtitle, {
                opacity: 0,
                y: 30
            }, {
                opacity: 1,
                y: 0,
                duration: 1,
                ease: "power2.out",
                delay: 1.5,
                repeat: -1,
                repeatDelay: 3.5,
                yoyo: true
            });
        }

        if (heroButton) {
            gsap.fromTo(heroButton, {
                opacity: 0,
                scale: 0.8
            }, {
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: "back.out(1.7)",
                delay: 2,
                repeat: -1,
                repeatDelay: 3.7,
                yoyo: true
            });
        }
    }

    // --- LAZY LOAD VIDEOS ---
    const lazyLoadVideo = (video) => {
        const source = video.querySelector('source[data-src]');
        if (source) {
            source.src = source.dataset.src;
            source.removeAttribute('data-src');
            video.load();
        }
    };

    // --- TESTIMONIALS SCROLL ANIMATION ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const testimonials = gsap.utils.toArray('.testimonial-item');

        if (testimonials.length > 0) {
            testimonials.forEach((testimonial, i) => {
                const video = testimonial.querySelector('.testimonial-video');

                if (i === 0) {
                    testimonial.classList.remove('testimonial-hidden');
                    gsap.set(testimonial, { opacity: 1, y: 0 });
                    if (video) {
                        lazyLoadVideo(video);
                        video.play().catch(() => { });
                    }
                } else {
                    gsap.set(testimonial, { opacity: 0, y: 50 });

                    ScrollTrigger.create({
                        trigger: testimonial,
                        start: "top 80%",
                        onEnter: () => {
                            gsap.to(testimonial, {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: "power2.out"
                            });
                            testimonial.classList.remove('testimonial-hidden');
                            if (video) {
                                lazyLoadVideo(video);
                                video.play().catch(() => { });
                            }
                        },
                        onLeave: () => {
                            if (video) video.pause();
                        },
                        onEnterBack: () => {
                            gsap.to(testimonial, { opacity: 1, y: 0, duration: 0.8 });
                            if (video) video.play().catch(() => { });
                        },
                        onLeaveBack: () => {
                            gsap.to(testimonial, { opacity: 0, y: 50, duration: 0.5 });
                            if (video) video.pause();
                        }
                    });
                }
            });
        }
    }

    // --- MOBILE NAVIGATION ---
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                document.body.classList.remove('nav-open');
            }
        });
    }

    // --- PRODUCT MODAL ---
    const modalOverlay = document.getElementById('product-modal');

    if (modalOverlay) {
        const modalCloseBtn = modalOverlay.querySelector('.modal-close');
        const modalImg = modalOverlay.querySelector('.modal-img');
        const modalTitle = modalOverlay.querySelector('.modal-title');
        const modalDescription = modalOverlay.querySelector('.modal-description');
        const modalIncludesList = modalOverlay.querySelector('.modal-includes');
        const modalPrice = modalOverlay.querySelector('.modal-price');
        const detailTriggers = document.querySelectorAll('.product-details-trigger');

        const openModal = (imgSrc, title, description, includes, price) => {
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            if (price) {
                const priceMatch = price.match(/\$?([\d,]+)\s*(MXN)?/i);
                if (priceMatch) {
                    modalPrice.innerHTML = `$${priceMatch[1]} <span class="currency">MXN</span>`;
                } else {
                    modalPrice.textContent = price;
                }
            } else {
                modalPrice.textContent = '';
            }

            modalIncludesList.innerHTML = '';
            if (includes && includes.length > 0) {
                includes.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    modalIncludesList.appendChild(li);
                });
            }

            modalOverlay.style.display = 'flex';
            setTimeout(() => modalOverlay.style.opacity = '1', 10);
            document.body.classList.add('modal-open');
        };

        const closeModal = () => {
            modalOverlay.style.opacity = '0';
            setTimeout(() => {
                modalOverlay.style.display = 'none';
                document.body.classList.remove('modal-open');
            }, 300);
        };

        detailTriggers.forEach(trigger => {
            trigger.addEventListener('click', (e) => {
                e.preventDefault();
                const card = trigger.closest('.product-card');
                const imgSrc = card.querySelector('img').src;
                const title = card.querySelector('h3').textContent;
                const description = card.querySelector('p').textContent;
                const price = card.dataset.price || '';
                const includesString = card.dataset.includes || '';
                const includes = includesString ? includesString.split(',') : [];

                openModal(imgSrc, title, description, includes, price);
            });
        });

        modalCloseBtn.addEventListener('click', closeModal);
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                closeModal();
            }
        });

        const modalCtaBtn = modalOverlay.querySelector('.modal-cta');
        if (modalCtaBtn) {
            modalCtaBtn.addEventListener('click', closeModal);
        }
    }

    // --- CONTACT FORM ---
    const contactForm = document.getElementById('contact-form');
    const totalAmountEl = document.getElementById('total-amount');
    const successModal = document.getElementById('success-modal');

    const productPrices = {
        'Desayuno Premium': 1278,
        'Brunch Especial': 1704,
        'Tarde de Snacks': 959,
        'Cena Romántica': 2556,
        'Box de Frutas': 746,
        'Kit de Vino y Quesos': 1811,
        'Mañana Infantil': 1172,
        'Detalle Corporativo': 852,
        'Celebración Especial': 2024
    };

    function calculateTotal() {
        let total = 0;
        const productSelect = contactForm.querySelector('[name="product_interest"]');

        if (productSelect.value) {
            total += productPrices[productSelect.value] || 0;
        }

        const extraCheckboxes = contactForm.querySelectorAll('[name="extra"]:checked');
        extraCheckboxes.forEach(checkbox => {
            const match = checkbox.value.match(/\$(\d+)/);
            if (match) total += parseInt(match[1]);
        });

        totalAmountEl.innerHTML = `$${total.toLocaleString('es-MX')} <span class="currency-small">MXN</span>`;
        return total;
    }

    if (contactForm) {
        const productSelect = contactForm.querySelector('[name="product_interest"]');
        const extraCheckboxes = contactForm.querySelectorAll('[name="extra"]');

        productSelect.addEventListener('change', calculateTotal);
        extraCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const formData = new FormData(contactForm);
            const selectedExtras = [];

            contactForm.querySelectorAll('[name="extra"]:checked').forEach(checkbox => {
                selectedExtras.push(checkbox.value);
            });

            const total = calculateTotal();
            const dateObj = new Date(formData.get('delivery_date'));
            const formattedDate = dateObj.toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            const whatsappMessage = `🎁 *NUEVA COTIZACIÓN - EMOZIONI* 🎁

📦 *DETALLES DEL PEDIDO:*
👤 Destinatario: ${formData.get('recipient_name')}
📍 Dirección: ${formData.get('delivery_address')}
📅 Fecha de entrega: ${formattedDate}
⏰ Hora de entrega: ${formData.get('delivery_time')}

🛍️ *PRODUCTO:*
${formData.get('product_interest')}

✨ *EXTRAS:*
• ${selectedExtras.length > 0 ? selectedExtras.join('\n• ') : 'Ninguno'}

📞 *CONTACTO:*
Teléfono destinatario: ${formData.get('recipient_phone')}
Email: ${formData.get('email')}

🎉 *MOTIVO:*
${formData.get('occasion')}

💬 *MENSAJE ESPECIAL:*
${formData.get('message') || 'Sin mensaje adicional'}

💰 *TOTAL A DEPOSITAR:*
$${total.toLocaleString('es-MX')} MXN

---
Enviado desde www.emozioni.com`;

            const phoneNumber = '5213313310327';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // window.open(whatsappURL, '_blank');

            showSuccessModal();
            contactForm.reset();
            calculateTotal();
        });
    }

    function showSuccessModal() {
        document.body.classList.add('success-modal-open');
        successModal.style.display = 'flex';
        setTimeout(() => successModal.style.opacity = '1', 10);

        startConfetti();

        const successCloseBtn = successModal.querySelector('.modal-close');
        successCloseBtn.addEventListener('click', closeSuccessModal);
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) closeSuccessModal();
        });
    }

    function closeSuccessModal() {
        successModal.style.opacity = '0';
        setTimeout(() => {
            successModal.style.display = 'none';
            document.body.classList.remove('success-modal-open');
            stopConfetti();
        }, 300);
    }

    // --- CONFETTI ANIMATION ---
    const confettiCanvas = document.getElementById('confetti-canvas');
    let confettiAnimationId;
    let confettiParticles = [];

    function startConfetti() {
        confettiCanvas.classList.add('active');
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        const particleCount = 500;
        const colors = ['#56ABCF', '#444243', '#FFD700', '#FF69B4', '#00FF00', '#FF6347'];

        for (let i = 0; i < particleCount; i++) {
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                r: Math.random() * 15 + 8,
                d: Math.random() * particleCount,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 6 - 3,
                tiltAngleIncremental: Math.random() * 0.03 + 0.02,
                tiltAngle: 0
            });
        }

        function drawConfetti() {
            ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

            confettiParticles.forEach((p, index) => {
                ctx.beginPath();
                ctx.lineWidth = p.r / 2;
                ctx.strokeStyle = p.color;
                ctx.moveTo(p.x + p.tilt + p.r, p.y);
                ctx.lineTo(p.x + p.tilt, p.y + p.tilt + p.r);
                ctx.stroke();

                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 6 + p.r / 2);
                p.tilt = Math.sin(p.tiltAngle - index / 3) * 8;

                if (p.y > confettiCanvas.height) {
                    confettiParticles.splice(index, 1);
                }
            });

            if (confettiParticles.length > 0) {
                confettiAnimationId = requestAnimationFrame(drawConfetti);
            } else {
                stopConfetti();
            }
        }

        drawConfetti();
    }

    function stopConfetti() {
        if (confettiAnimationId) {
            cancelAnimationFrame(confettiAnimationId);
        }
        confettiCanvas.classList.remove('active');
        confettiParticles = [];
    }
});
