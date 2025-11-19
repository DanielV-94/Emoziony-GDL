// --- EMOZIONI MAIN.JS ---

document.addEventListener('DOMContentLoaded', function () {

    console.log("Emozioni site loaded. Ready for magic!");

    // --- GSAP HERO TITLE ANIMATION (with SplitType) ---
    const animatedTitle = document.querySelector('[animate]');
    if (animatedTitle && typeof SplitType !== 'undefined') {

        // Dividir el texto en caracteres
        let mySplitText = new SplitType(animatedTitle, {
            types: 'chars',
            tagName: 'span'
        });

        // Crear una línea de tiempo para controlar la secuencia de animación
        const tl = gsap.timeline({
            repeat: -1,         // Repetir infinitamente
            repeatDelay: 1      // Esperar 1 segundos antes de cada repetición
        });

        // Seleccionar los sub-elementos
        const subElements = gsap.utils.toArray('.animate-hero-element');

        // Animación de ENTRADA del TÍTULO
        tl.from(mySplitText.chars, {
            y: '110%',
            opacity: 0,
            rotationZ: '10',
            duration: 1.4,
            ease: 'bounce.out',
            stagger: 0.05,
        });

        // Animación de ENTRADA para subtítulo y botón (después de la del título)
        if (subElements.length > 0) {
            tl.from(subElements, {
                opacity: 0,
                y: 50,
                duration: 1.4,
                ease: 'bounce.out',
                stagger: 0.2,
            }, "-=1"); // Inicia 1s antes de que termine la animación de los caracteres
        }

        // Animación de SALIDA para subtítulo y botón
        if (subElements.length > 0) {
            tl.to(subElements, {
                opacity: 0,
                y: -50,
                duration: 1,
                ease: 'power2.in',
                stagger: 0.2,
            }, "+=1.5"); // Espera 1.5s después de la entrada
        }

        // Animación de SALIDA del TÍTULO
        tl.to(mySplitText.chars, {
            opacity: 0,
            y: '-110%',
            rotationZ: '-10',
            duration: 1,
            ease: 'power2.in',
            stagger: 0.05,
        }, ">"); // Inicia justo después de la animación anterior
    }



    // --- GSAP TESTIMONIALS ANIMATION (Simple Fade-in Effect) ---
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        const testimonials = gsap.utils.toArray('.testimonial-item');
        const testimonialsSection = document.querySelector('.testimonials-section');

        if (testimonialsSection && testimonials.length > 0) {
            console.log(`Found ${testimonials.length} testimonials`);

            // Set initial state - make first testimonial visible, others hidden
            testimonials.forEach((testimonial, i) => {
                const video = testimonial.querySelector('.testimonial-video');

                if (i === 0) {
                    // First testimonial visible
                    testimonial.classList.remove('testimonial-hidden');
                    testimonial.classList.add('testimonial-visible');
                    gsap.set(testimonial, {
                        zIndex: testimonials.length,
                        opacity: 1,
                        y: 0
                    });
                    if (video) {
                        video.play().catch(err => console.log('Video autoplay blocked:', err));
                    }
                } else {
                    // Others hidden initially
                    testimonial.classList.add('testimonial-hidden');
                    gsap.set(testimonial, {
                        zIndex: testimonials.length - i,
                        opacity: 0,
                        y: 50
                    });
                }

                // Create individual ScrollTrigger for each testimonial
                if (i > 0) {
                    ScrollTrigger.create({
                        trigger: testimonial,
                        start: "top 80%",
                        end: "bottom 20%",
                        onEnter: () => {
                            console.log(`Testimonial ${i + 1} entering`);
                            gsap.to(testimonial, {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: "power2.out",
                                onStart: () => {
                                    testimonial.classList.remove('testimonial-hidden');
                                    testimonial.classList.add('testimonial-visible');
                                    gsap.set(testimonial, { zIndex: testimonials.length });
                                    if (video) {
                                        video.play().catch(err => console.log('Video play error:', err));
                                    }
                                }
                            });
                        },
                        onLeave: () => {
                            if (video) video.pause();
                        },
                        onEnterBack: () => {
                            gsap.to(testimonial, {
                                opacity: 1,
                                y: 0,
                                duration: 0.8,
                                ease: "power2.out"
                            });
                            if (video) {
                                video.play().catch(err => console.log('Video play error:', err));
                            }
                        },
                        onLeaveBack: () => {
                            gsap.to(testimonial, {
                                opacity: 0,
                                y: 50,
                                duration: 0.5,
                                ease: "power2.in"
                            });
                            if (video) video.pause();
                        }
                    });
                }
            });
        } else {
            console.error("Testimonials section or items not found!");
        }

    } else {
        console.error("GSAP or ScrollTrigger is not loaded!");
    }

    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileNavToggle) {
        mobileNavToggle.addEventListener('click', () => {
            document.body.classList.toggle('nav-open');
        });
    }

    // Cerrar menú al hacer clic en un enlace
    if (navLinks) {
        navLinks.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                document.body.classList.remove('nav-open');
            }
        });
    }

    // --- MODAL DE DETALLES DE PRODUCTO ---
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
            // Poblar datos básicos
            modalImg.src = imgSrc;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Formatear precio con MXN más pequeño
            if (price) {
                const priceMatch = price.match(/\$?([\d,]+)\s*(MXN)?/i);
                if (priceMatch) {
                    const amount = priceMatch[1];
                    modalPrice.innerHTML = `$${amount} <span class="currency">MXN</span>`;
                } else {
                    modalPrice.textContent = price;
                }
            } else {
                modalPrice.textContent = '';
            }

            // Limpiar y poblar la lista de "incluye"
            modalIncludesList.innerHTML = '';
            if (includes && includes.length > 0) {
                includes.forEach(item => {
                    const li = document.createElement('li');
                    li.textContent = item;
                    modalIncludesList.appendChild(li);
                });
            }

            // Mostrar el modal del producto
            modalOverlay.style.display = 'flex';
            setTimeout(() => {
                modalOverlay.style.opacity = '1';
            }, 10);
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

                // Extraer datos de la tarjeta
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
            // Si se hace clic en el fondo oscuro y no en el contenido
            if (e.target === modalOverlay) {
                closeModal();
            }
        });

        // Cerrar con la tecla Escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modalOverlay.style.display === 'flex') {
                closeModal();
            }
        });

        // Cerrar modal al hacer clic en "¡Lo Quiero!" y llevar al formulario
        const modalCtaBtn = modalOverlay.querySelector('.modal-cta');
        if (modalCtaBtn) {
            modalCtaBtn.addEventListener('click', (e) => {
                closeModal();
                // El href="#contacto" se encargará de llevar al formulario
            });
        }
    }

    // --- FORMULARIO DE CONTACTO ---
    const contactForm = document.getElementById('contact-form');
    const totalAmountEl = document.getElementById('total-amount');
    const successModal = document.getElementById('success-modal');
    const confettiCanvas = document.getElementById('confetti-canvas');

    // Precios de los productos
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

    // Función para calcular el total
    function calculateTotal() {
        let total = 0;

        // Obtener precio del producto seleccionado
        const productSelect = contactForm.querySelector('[name="product_interest"]');
        if (productSelect.value) {
            total += productPrices[productSelect.value] || 0;
        }

        // Sumar extras seleccionados
        const extraCheckboxes = contactForm.querySelectorAll('[name="extra"]:checked');
        extraCheckboxes.forEach(checkbox => {
            // Extraer el precio del valor (ej: "Carta Personalizada - $150")
            const match = checkbox.value.match(/\$(\d+)/);
            if (match) {
                total += parseInt(match[1]);
            }
        });

        // Actualizar display del total
        totalAmountEl.innerHTML = `$${total.toLocaleString('es-MX')} <span class="currency-small">MXN</span>`;
        return total;
    }

    // Actualizar total cuando cambie el producto o los extras
    if (contactForm) {
        const productSelect = contactForm.querySelector('[name="product_interest"]');
        const extraCheckboxes = contactForm.querySelectorAll('[name="extra"]');

        productSelect.addEventListener('change', calculateTotal);
        extraCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', calculateTotal);
        });

        // Manejar envío del formulario
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Recopilar datos del formulario
            const formData = new FormData(contactForm);
            const recipientName = formData.get('recipient_name');
            const deliveryAddress = formData.get('delivery_address');
            const deliveryDate = formData.get('delivery_date');
            const deliveryTime = formData.get('delivery_time');
            const product = formData.get('product_interest');
            const recipientPhone = formData.get('recipient_phone');
            const email = formData.get('email');
            const occasion = formData.get('occasion');
            const message = formData.get('message') || 'Sin mensaje adicional';

            // Recopilar extras seleccionados
            const selectedExtras = [];
            const extraCheckboxes = contactForm.querySelectorAll('[name="extra"]:checked');
            extraCheckboxes.forEach(checkbox => {
                selectedExtras.push(checkbox.value);
            });

            const extrasText = selectedExtras.length > 0 ? selectedExtras.join('\n• ') : 'Ninguno';
            const total = calculateTotal();

            // Formatear fecha
            const dateObj = new Date(deliveryDate);
            const formattedDate = dateObj.toLocaleDateString('es-MX', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            });

            // Crear mensaje para WhatsApp
            const whatsappMessage = `🎁 *NUEVA COTIZACIÓN - EMOZIONI* 🎁

📦 *DETALLES DEL PEDIDO:*
👤 Destinatario: ${recipientName}
📍 Dirección: ${deliveryAddress}
📅 Fecha de entrega: ${formattedDate}
⏰ Hora de entrega: ${deliveryTime}

🛍️ *PRODUCTO:*
${product}

✨ *EXTRAS:*
• ${extrasText}

📞 *CONTACTO:*
Teléfono destinatario: ${recipientPhone}
Email: ${email}

🎉 *MOTIVO:*
${occasion}

💬 *MENSAJE ESPECIAL:*
${message}

💰 *TOTAL A DEPOSITAR:*
$${total.toLocaleString('es-MX')} MXN

---
Enviado desde www.emozioni.com`;

            // Número de WhatsApp del negocio
            const phoneNumber = '5213313310327';
            const whatsappURL = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(whatsappMessage)}`;

            // Abrir WhatsApp
            window.open(whatsappURL, '_blank');

            // Mostrar modal de éxito y confeti
            showSuccessModal();

            // Limpiar formulario
            contactForm.reset();
            calculateTotal();
        });
    }

    // Función para mostrar el modal de éxito con confeti
    function showSuccessModal() {
        document.body.classList.add('success-modal-open');
        successModal.style.display = 'flex';
        setTimeout(() => {
            successModal.style.opacity = '1';
        }, 10);

        // Iniciar animación de confeti
        startConfetti();

        // Cerrar modal al hacer clic en la X
        const successCloseBtn = successModal.querySelector('.modal-close');
        successCloseBtn.addEventListener('click', closeSuccessModal);

        // Cerrar modal al hacer clic fuera
        successModal.addEventListener('click', (e) => {
            if (e.target === successModal) {
                closeSuccessModal();
            }
        });

        // Auto-cerrar después de 5 segundos
        setTimeout(closeSuccessModal, 5000);
    }

    function closeSuccessModal() {
        successModal.style.opacity = '0';
        setTimeout(() => {
            successModal.style.display = 'none';
            document.body.classList.remove('success-modal-open');
            stopConfetti();
        }, 300);
    }

    // --- ANIMACIÓN DE CONFETI ---
    let confettiAnimationId;
    let confettiParticles = [];

    function startConfetti() {
        confettiCanvas.classList.add('active');
        const ctx = confettiCanvas.getContext('2d');
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;

        // Crear partículas de confeti
        const particleCount = 150;
        const colors = ['#56ABCF', '#444243', '#FFD700', '#FF69B4', '#00FF00', '#FF6347'];

        for (let i = 0; i < particleCount; i++) {
            confettiParticles.push({
                x: Math.random() * confettiCanvas.width,
                y: Math.random() * confettiCanvas.height - confettiCanvas.height,
                r: Math.random() * 6 + 2,
                d: Math.random() * particleCount,
                color: colors[Math.floor(Math.random() * colors.length)],
                tilt: Math.random() * 10 - 10,
                tiltAngleIncremental: Math.random() * 0.07 + 0.05,
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

                // Actualizar posición
                p.tiltAngle += p.tiltAngleIncremental;
                p.y += (Math.cos(p.d) + 3 + p.r / 2) / 2;
                p.tilt = Math.sin(p.tiltAngle - index / 3) * 15;

                // Si la partícula sale de la pantalla, eliminarla
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

    // --- HERO REVEAL ANIMATION (Cortina de Introducción) ---
    gsap.registerPlugin(ScrollTrigger);

    const heroReveal = document.querySelector('.hero-reveal');

    if (heroReveal) {
        const curtainTop = heroReveal.querySelector('.hero-reveal__curtain-top');
        const curtainBottom = heroReveal.querySelector('.hero-reveal__curtain-bottom');
        const logos = heroReveal.querySelectorAll('.hero-reveal__logo');

        // Timeline principal con ScrollTrigger
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: 'body',
                start: 'top top',
                end: '+=200%',
                scrub: 1.5,
                onComplete: () => {
                    heroReveal.classList.add('completed');
                }
            }
        });

        // Fase 1: Crecimiento del logo (0% - 50%)
        tl.to(logos, {
            scale: 3.5,
            duration: 0.5,
            ease: 'power2.out'
        });

        // Fase 2: Separación de cortinas (50% - 100%)
        tl.to(curtainTop, {
            yPercent: -100,
            duration: 0.5,
            ease: 'power3.inOut'
        }, '-=0.1')
            .to(curtainBottom, {
                yPercent: 100,
                duration: 0.5,
                ease: 'power3.inOut'
            }, '<');
    }
});
