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
    const navbarHeight = navbar.offsetHeight; // Obtener la altura de la barra de navegación
    const welcomeSection = document.getElementById('welcome');
    if (welcomeSection) {
      welcomeSection.style.paddingTop = `${navbarHeight + 20}px`; // Añadir padding a la sección de bienvenida + un extra
    } else { // Para otras páginas, aplicar al body
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