// Inicialización de AOS (Animate On Scroll).
// AOS activa animaciones prediseñadas cuando los elementos entran en el viewport.
AOS.init({
  once: true,
  duration: 800,
  easing: 'ease-out-cubic'
});

// Animación de los contadores de estadísticas.
// Cuando cada número se hace visible, se anima desde 0 hasta su valor objetivo.
document.addEventListener('DOMContentLoaded', () => {
  const counters = document.querySelectorAll('.stat .number');
  const options = { threshold: 0.5 };
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const parent = counter.parentElement;
        const target = parseInt(parent.getAttribute('data-target'), 10);
        const suffix = parent.getAttribute('data-suffix') || '';
        animateCount(counter, target, suffix);
        observer.unobserve(counter);
      }
    });
  }, options);
  counters.forEach(counter => observer.observe(counter));
});

function animateCount(element, target, suffix) {
  const duration = 2000;
  const startTime = performance.now();
  function update(now) {
    const progress = Math.min((now - startTime) / duration, 1);
    const current = Math.floor(progress * target);
    element.textContent = current + suffix;
    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      element.textContent = target + suffix;
    }
  }
  requestAnimationFrame(update);
}

// Cambia el estilo del navbar al hacer scroll para añadir sombra.
window.addEventListener('scroll', () => {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Inicialización de Swiper para el slider de testimonios.
const testimoniosSwiper = new Swiper('.swiper-container', {
  loop: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  slidesPerView: 1,
  spaceBetween: 30,
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  },
});

// Configuración de Chart.js para mostrar un gráfico de progreso.
// Chart.js es una librería sencilla y flexible que admite múltiples tipos de gráficos y es responsiva por defecto【786990560016989†L67-L82】.
const ctx = document.getElementById('progresoChart').getContext('2d');
// Gradiente de color para la primera serie del gráfico.
function createGradient(ctx) {
  const gradient = ctx.createLinearGradient(0, 0, 0, 400);
  gradient.addColorStop(0, '#ff5c8a');
  gradient.addColorStop(1, '#ffa94d');
  return gradient;
}
const progresoChart = new Chart(ctx, {
  type: 'line',
  data: {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5', 'Semana 6'],
    datasets: [
      {
        label: 'Progreso de fuerza (kg)',
        data: [10, 20, 30, 35, 45, 50], // Placeholder de ejemplo
        fill: false,
        borderColor: createGradient(ctx),
        tension: 0.4
      },
      {
        label: 'Progreso de peso corporal (kg)',
        data: [80, 78, 77, 75, 73, 72], // Placeholder de ejemplo
        fill: false,
        borderColor: '#ff9a8a',
        tension: 0.4
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#212121'
        }
      },
      title: {
        display: false,
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Tiempo',
          color: '#212121'
        },
        ticks: {
          color: '#212121'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Valor',
          color: '#212121'
        },
        beginAtZero: true,
        ticks: {
          color: '#212121'
        }
      }
    }
  }
});
