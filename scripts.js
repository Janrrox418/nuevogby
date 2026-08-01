document.addEventListener("DOMContentLoaded", function () {
  // ===== ANIMACIÓN LÍNEAS WELCOME =====
  const leftLines = document.querySelectorAll(".welcome-box-left .line");
  const rightLines = document.querySelectorAll(".welcome-box-right .line");

  leftLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.3}s`;
  });
  rightLines.forEach((line, index) => {
    line.style.animationDelay = `${index * 0.3}s`;
  });

  // ===== CERRAR MENÚ EN MÓVIL AL CLICAR LINK (solo si NO tiene submenú) =====
  const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      const parentLi = link.closest(".nav-item.dropdown");

      if (parentLi) {
        if (window.innerWidth < 992) {
          // 🔹 En móvil → abrir submenu sin navegar
          e.preventDefault();
          const menu = parentLi.querySelector(".dropdown-menu");
          menu.classList.toggle("show");
          return;
        }
        // 🔹 En PC → dejar que el enlace funcione normal
      }

      // Link normal → cerrar menú (solo en móvil)
      const navbarCollapse = document.querySelector(".navbar-collapse");
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
      if (bsCollapse) bsCollapse.hide();
    });
  });

  // ===== FORMULARIO =====
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      alert("Thank you for contacting us! We will get back to you soon.");
      this.reset();
    });
  }


  // ===== SUBMENÚS: CLICK EN MÓVIL / HOVER EN PC =====
const dropdowns = document.querySelectorAll(".dropdown");
dropdowns.forEach((dropdown) => {
  const toggle = dropdown.querySelector(".dropdown-toggle");
  const menu = dropdown.querySelector(".dropdown-menu");
  if (!toggle || !menu) return;

  // Clic: en móvil abre el submenú; en PC navega al href
  toggle.addEventListener("click", function (e) {
    const href = this.getAttribute("href");

    if (window.innerWidth < 992) {
      // Móvil → abrir/cerrar dropdown y NO navegar
      e.preventDefault();
      menu.classList.toggle("show");
      return;
    }

    // Desktop → navegar si el href es real
    if (href && href !== "#" && href !== "javascript:void(0)") {
      e.preventDefault();                  // anula el preventDefault de Bootstrap
      window.location.assign(href);        // navega a la página de Procedures
    }
  });

  // Hover en PC
  dropdown.addEventListener("mouseenter", function () {
    if (window.innerWidth >= 992) menu.classList.add("show");
  });
  dropdown.addEventListener("mouseleave", function () {
    if (window.innerWidth >= 992) menu.classList.remove("show");
  });
});


  // ===== RESET ESTADOS AL CAMBIAR TAMAÑO =====
  window.addEventListener("resize", function () {
    const menus = document.querySelectorAll(".dropdown-menu");
    menus.forEach((menu) => menu.classList.remove("show"));
  });

  // ===== IMAGEN FLOTANTE (decorativa) =====
  const floatingImage = document.querySelector(".imagen-flotante");
  if (floatingImage) {
    setTimeout(() => {
      floatingImage.classList.add("visible");
    }, 500);
  }

  // ===== FADE-IN EN SECCIONES AL SCROLL =====
  const fadeElems = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        }
      });
    },
    { threshold: 0.2 }
  );
  fadeElems.forEach((el) => observer.observe(el));

  // ===== CARDS DE PROCEDURES (animación) =====
  const procedureCards = document.querySelectorAll(".procedure-card");
  procedureCards.forEach((card) => {
    card.addEventListener("mouseenter", () => card.classList.add("hovered"));
    card.addEventListener("mouseleave", () => card.classList.remove("hovered"));
  });

  // ===== SUBMENÚS DE SEGUNDO NIVEL EN MÓVIL =====
  document.querySelectorAll('.dropdown-submenu > .dropdown-toggle').forEach((toggle) => {
    toggle.addEventListener('click', function (e) {
      if (window.innerWidth < 992) {
        e.preventDefault();
        e.stopPropagation();
        const submenu = this.nextElementSibling;
        if (submenu) submenu.classList.toggle('show');
      }
    });
  });

  // Evitar que el clic en submenu cierre el menú principal
  document.querySelectorAll('.dropdown-menu').forEach((menu) => {
    menu.addEventListener('click', function (e) {
      if (window.innerWidth < 992) e.stopPropagation();
    });
  });

  // ===== FLOATING REVIEW WIDGET TOGGLE =====
  const toggleReviewBtn = document.getElementById('toggle-review-panel');
  const closeReviewBtn = document.getElementById('close-review-panel');
  const reviewPanel = document.getElementById('review-panel');

  if (toggleReviewBtn && reviewPanel) {
    toggleReviewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      reviewPanel.classList.toggle('show');
    });
  }

  if (closeReviewBtn && reviewPanel) {
    closeReviewBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      reviewPanel.classList.remove('show');
    });
  }

  // Close panel when clicking outside
  document.addEventListener('click', (e) => {
    if (reviewPanel && reviewPanel.classList.contains('show') && !reviewPanel.contains(e.target)) {
      reviewPanel.classList.remove('show');
    }
  });

});

// ===== NAVBAR: ESCONDER EN SCROLL HACIA ABAJO, MOSTRAR EN SCROLL HACIA ARRIBA =====
const navbar = document.querySelector(".navbar");
const navCollapse = document.getElementById("navbarNavDropdown");
let lastY = window.scrollY;
let ticking = false;

function navbarOnScroll() {
  const y = window.scrollY;
  const goingDown = y > lastY;
  const pastTop = y > 50;
  const isHomePage = !!document.getElementById('heroCarousel');

  // Si el menú móvil está abierto, no esconder navbar
  if (navCollapse && navCollapse.classList.contains("show")) {
    navbar.classList.remove("hide");
    navbar.classList.remove("navbar-hidden");
    lastY = y <= 0 ? 0 : y;
    return;
  }

  if (pastTop) {
    navbar.classList.remove("navbar-hidden");
    navbar.classList.add("scrolled");
    
    if (goingDown) navbar.classList.add("hide");
    else navbar.classList.remove("hide");
  } else {
    // Estamos en la parte superior (Top)
    if (isHomePage) {
      navbar.classList.add("navbar-hidden");
    }
    navbar.classList.remove("scrolled");
    navbar.classList.remove("hide");
  }

  lastY = y <= 0 ? 0 : y;
  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    requestAnimationFrame(navbarOnScroll);
    ticking = true;
  }
}, { passive: true });

// Ejecutar al cargar para establecer estado inicial
navbarOnScroll();

// ===== AJUSTAR PADDING DEL BODY SEGÚN ALTURA DEL NAVBAR =====
function adjustBodyPadding() {
  const navbar = document.querySelector('.navbar');
  if (navbar) {
    const navbarHeight = navbar.offsetHeight;
    const welcomeSection = document.getElementById('welcome');
    const isHomePage = !!document.getElementById('heroCarousel');

    if (isHomePage && welcomeSection) {
      // En el index no queremos padding superior para que el carrusel sea full-screen
      welcomeSection.style.paddingTop = "0";
      document.body.style.paddingTop = "0";
    } else {
      document.body.style.paddingTop = `${navbarHeight}px`;
    }
  }
}

window.addEventListener('load', adjustBodyPadding);
window.addEventListener('resize', adjustBodyPadding);
    
    // Selecciona el elemento del cursor (si existe)
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
      // Selecciona todos los elementos interactivos que activarán el efecto
      const interactiveElements = document.querySelectorAll('a, button, .btn, .nav-link, .dropdown-item, .treatment-box'); 

      // --- 1. Mover el cursor personalizado ---
      document.addEventListener('mousemove', (e) => {
        // Actualiza la posición del cursor con la posición del ratón
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
      });

      // --- 2. Gestionar el efecto hover (expandir/reducir) ---
      interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
          // Añade la clase 'expanded' al entrar
          cursor.classList.add('expanded');
        });

        element.addEventListener('mouseleave', () => {
          // Remueve la clase 'expanded' al salir
          cursor.classList.remove('expanded');
        });
      });
    }
/*
// ===== EFECTO DE NIEVE (GLOBAL) =====
(function() {
  var canvas = document.createElement('canvas');
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.pointerEvents = 'none';
  canvas.style.zIndex = '9999';
  document.body.appendChild(canvas);

  var ctx = canvas.getContext('2d');
  var width = window.innerWidth;
  var height = window.innerHeight;
  canvas.width = width;
  canvas.height = height;

  var flakes = [];
  for (var i = 0; i < 100; i++) {
    flakes.push({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 3 + 1,
      d: Math.random() * 100
    });
  }

  var angle = 0;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "rgba(255, 255, 255, 0.8)";
    ctx.beginPath();
    angle += 0.01;
    for (var i = 0; i < flakes.length; i++) {
      var f = flakes[i];
      f.y += Math.cos(angle + f.d) + 1 + f.r / 2;
      f.x += Math.sin(angle) * 2;
      ctx.moveTo(f.x, f.y);
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
      if (f.x > width + 5 || f.x < -5 || f.y > height) {
        flakes[i] = { x: Math.random() * width, y: -10, r: f.r, d: f.d };
      }
    }
    ctx.fill();
    requestAnimationFrame(animate);
  }
  animate();
  window.addEventListener('resize', function() { width = window.innerWidth; height = window.innerHeight; canvas.width = width; canvas.height = height; });
})();
*/

/* ==========================
   LÓGICA DEL SISTEMA DE RESERVAS
=========================== */
let bookingData = {};

function nextStep(currentStep, targetStep) {
  // Validación estricta del Paso 1 (Campos requeridos)
  if (currentStep === 1) {
    const name = document.getElementById('client-name').value;
    const date = document.getElementById('client-date').value;
    const time = document.getElementById('client-time').value;
    
    if (!name || !date || !time) {
      alert("Please complete your Name, Date, and Time to proceed.");
      return;
    }
  }

  // Transición de contenedores (el CSS keyframes se encarga de la opacidad)
  document.getElementById(`step-${currentStep}`).classList.add('d-none');
  document.getElementById(`step-${currentStep}`).classList.remove('active');
  
  document.getElementById(`step-${targetStep}`).classList.remove('d-none');
  document.getElementById(`step-${targetStep}`).classList.add('active');

  // Actualización dinámica de la Barra de Progreso
  document.querySelectorAll('.step-indicator').forEach(indicator => {
    if (parseInt(indicator.getAttribute('data-step')) <= targetStep) {
      indicator.classList.add('active');
    } else {
      indicator.classList.remove('active');
    }
  });
  
  // Retorno al tope del contenedor para mejor UX
  document.getElementById('booking-system').scrollIntoView({ behavior: 'smooth' });
}

function prepareConfirmation() {
  // Recolección de datos del Paso 1
  bookingData.name = document.getElementById('client-name').value;
  bookingData.date = document.getElementById('client-date').value;
  bookingData.time = document.getElementById('client-time').value;

  // Recolección de datos iterativa del Paso 2
  const getCheckedValue = (name) => {
    const ele = document.querySelector(`input[name="${name}"]:checked`);
    return ele ? ele.value : 'Not Selected';
  };

  bookingData.ambiance = getCheckedValue('ambiance');
  bookingData.music = getCheckedValue('music');
  bookingData.aroma = getCheckedValue('aroma');
  bookingData.beverage = getCheckedValue('beverage');
  bookingData.temperature = getCheckedValue('temperature');
  bookingData.intention = getCheckedValue('intention');
  bookingData.feeling = getCheckedValue('feeling');

  // Inyección de variables en el DOM del Paso 3 (Resumen)
  document.getElementById('summary-name').innerText = bookingData.name;
  document.getElementById('summary-ambiance').innerText = bookingData.ambiance;
  document.getElementById('summary-music').innerText = bookingData.music;
  document.getElementById('summary-aroma').innerText = bookingData.aroma;
  document.getElementById('summary-beverage').innerText = bookingData.beverage;
  document.getElementById('summary-temp').innerText = bookingData.temperature;
  document.getElementById('summary-intention').innerText = bookingData.intention;
  document.getElementById('summary-feeling').innerText = bookingData.feeling;
  
  // Formateo de Fecha (Evitando saltos de zona horaria local)
  const dateObj = new Date(bookingData.date + 'T00:00:00'); 
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('summary-date').innerText = dateObj.toLocaleDateString('en-US', options);
  
  // Formateo de Hora a formato 12h (AM/PM)
  const timeSplit = bookingData.time.split(':');
  let hours = parseInt(timeSplit[0]);
  const minutes = timeSplit[1];
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12;
  hours = hours ? hours : 12; 
  document.getElementById('summary-time').innerText = hours + ':' + minutes + ' ' + ampm;

  // Transición al Paso 3
  nextStep(2, 3);
}

function submitBookingData() {
  // Bloqueo de botón para prevenir peticiones múltiples
  const btn = document.getElementById('btn-save-experience');
  btn.innerText = "Processing...";
  btn.disabled = true;

  // Petición HTTP (POST) hacia el Gateway de Formspree
  fetch("https://formspree.io/f/xdkdvrky", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      subject: `New Signature Experience Booking: ${bookingData.name}`,
      Name: bookingData.name,
      Date: bookingData.date,
      Time: bookingData.time,
      Ambiance: bookingData.ambiance,
      Music: bookingData.music,
      Aroma: bookingData.aroma,
      Beverage: bookingData.beverage,
      Temperature: bookingData.temperature,
      Intention: bookingData.intention,
      DesiredFeeling: bookingData.feeling
    })
  })
  .then(response => {
    if (response.ok) {
      document.getElementById('final-name').innerText = bookingData.name;
      nextStep(3, 4); // Éxito: Avanzar al Paso 4
    } else {
      alert("Oops! There was a problem submitting your form. Please try again.");
    }
  })
  .catch(error => {
    alert("Oops! There was a problem submitting your form.");
  })
  .finally(() => {
    // Restauración del estado del botón
    btn.innerText = "Save My Experience";
    btn.disabled = false;
  });
}

/* =======================================================
   REDIRECCIÓN FORZADA DEL FORMULARIO DE CONTACTO A LA APP NATIVA (BOOKING.HTML)
======================================================== */
document.addEventListener("DOMContentLoaded", function () {
  const contactAppForm = document.getElementById('contact-app-form');
  
  if (contactAppForm) {
    contactAppForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Detiene la recarga nativa de la página
      
      const btn = this.querySelector('button[type="submit"]');
      btn.innerText = "Redirecting to Booking...";
      btn.disabled = true;

      const formData = new FormData(this);
      
      // 1. Envía los datos del formulario a Formspree silenciosamente
      fetch("https://formspree.io/f/xdkdvrky", {
        method: "POST",
        body: formData,
        headers: { 'Accept': 'application/json' }
      }).then(() => {
        // 2. Éxito: Redirige internamente a nuestra aplicación de reservas
        window.location.href = "Booking.html"; 
      }).catch(() => {
        // Fallo de red: Fuerza la redirección a la app de todos modos para no frenar al cliente
        window.location.href = "Booking.html";
      });
    });
  }
});

/* =======================================================
   CARGA PEREZOSA (LAZY LOAD) DEL WIDGET DE CHERRY EN MODALS
======================================================== */
document.addEventListener("DOMContentLoaded", function () {
  let cherryScriptLoaded = false;

  // Función maestra para cargar Cherry solo cuando se necesite
  function loadCherryWidget() {
    if (cherryScriptLoaded) return; // Evita cargarlo dos veces
    
    // 1. Creamos la función base requerida por Cherry
    window._hw = window._hw || function () {
      (window._hw.q = window._hw.q || []).push(arguments);
    };

    // 2. Inyectamos tus configuraciones exactas
    window._hw("init", {
      debug: false,
      variables: {
          slug: 'gby-skincare-health-wellness',
          name: "Gbyskincare",
          images: [26],
          customLogo: '',
          defaultPurchaseAmount: 750,
          customImage: '', 
          imageCategory: 'medspa',
          language: 'en',
      },
      styles: {
          primaryColor: '#1a8cff',
          secondaryColor: '#1a8cff10',
          fontFamily: 'Montserrat',
          headerFontFamily: 'Montserrat',
      }
    }, ['hero','calculator','howitworks','faq']);

    // 3. Descargamos el script dinámicamente
    const script = document.createElement('script');
    script.src = "https://files.withcherry.com/widgets/widget.js";
    script.async = true;
    document.body.appendChild(script);

    cherryScriptLoaded = true;
  }

  // Detectar apertura del Modal en index.html
  const modalIndex = document.getElementById('cherryModalIndex');
  if (modalIndex) {
    modalIndex.addEventListener('shown.bs.modal', loadCherryWidget);
  }

  // Detectar apertura del Modal en booking.html
  const modalBooking = document.getElementById('cherryModal');
  if (modalBooking) {
    modalBooking.addEventListener('shown.bs.modal', loadCherryWidget);
  }
});