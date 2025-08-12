// script_dark.js
// Este archivo contiene la lógica de interacción y animaciones para el clon oscuro de Teocravenna.

// Inicializar AOS para animaciones de entrada
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({
    duration: 800,
    once: true,
    easing: 'ease-out-cubic'
  });

  // Nav bar: añadir sombra al hacer scroll para separarla del fondo
  const navbar = document.getElementById('navbar');
  function handleScroll() {
    if (window.scrollY > 30) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  window.addEventListener('scroll', handleScroll);

  // Contadores animados en la sección de comunidad
  const counters = document.querySelectorAll('.stat .number');
  const counterOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = +el.getAttribute('data-target');
        const suffix = el.getAttribute('data-suffix') || '';
        const duration = 1500;
        const startTime = performance.now();
        function update(timestamp) {
          const progress = Math.min((timestamp - startTime) / duration, 1);
          const value = Math.floor(progress * target);
          el.textContent = value + suffix;
          if (progress < 1) {
            requestAnimationFrame(update);
          }
        }
        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, counterOptions);
  counters.forEach(counter => counterObserver.observe(counter));

  // Inicializar Swiper para testimonios
  const testimonialSwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    spaceBetween: 30,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
  });

  // Gráfico de progreso con Chart.js
  const ctx = document.getElementById('progresoChart');
  if (ctx) {
    const data = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
      datasets: [
        {
          label: 'Peso (kg)',
          data: [80, 78, 76, 74, 72, 70],
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-color'),
          backgroundColor: 'rgba(215, 182, 90, 0.2)',
          tension: 0.4
        },
        {
          label: 'Fuerza (repeticiones)',
          data: [10, 12, 14, 15, 16, 18],
          borderColor: getComputedStyle(document.documentElement).getPropertyValue('--primary-light'),
          backgroundColor: 'rgba(240, 210, 121, 0.2)',
          tension: 0.4
        }
      ]
    };
    const chart = new Chart(ctx, {
      type: 'line',
      data: data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            labels: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--text-color')
            }
          }
        },
        scales: {
          x: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--muted-color')
            },
            grid: {
              color: 'rgba(255,255,255,0.05)'
            }
          },
          y: {
            ticks: {
              color: getComputedStyle(document.documentElement).getPropertyValue('--muted-color')
            },
            grid: {
              color: 'rgba(255,255,255,0.05)'
            }
          }
        }
      }
    });
  }
});
