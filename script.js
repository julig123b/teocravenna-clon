// Inicializamos AOS cuando la página está cargada
document.addEventListener('DOMContentLoaded', function () {
  AOS.init({ once: true, duration: 800 });

  // Animación de contadores
  const counters = document.querySelectorAll('.stat-count');
  const speed = 200; // mayor = más lento
  const animateCounters = () => {
    counters.forEach(counter => {
      const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = Math.ceil(target / speed);
        if (count < target) {
          counter.innerText = count + increment;
          setTimeout(updateCount, 50);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
  };
  const statsSection = document.querySelector('#comunidad');
  if (statsSection) {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        animateCounters();
        observer.disconnect();
      }
    }, { threshold: 0.5 });
    observer.observe(statsSection);
  }

  // Swiper slider para testimonios
  const swiperEl = document.querySelector('.mySwiper');
  if (swiperEl) {
    new Swiper('.mySwiper', {
      loop: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      autoplay: {
        delay: 5000,
      },
    });
  }

  // Gráfico de progreso
  const chartEl = document.getElementById('progressChart');
  if (chartEl) {
    const ctx = chartEl.getContext('2d');
    const gradientStroke1 = ctx.createLinearGradient(0, 0, 0, 400);
    gradientStroke1.addColorStop(0, 'rgba(247, 197, 103, 0.8)');
    gradientStroke1.addColorStop(1, 'rgba(247, 197, 103, 0.1)');
    const gradientStroke2 = ctx.createLinearGradient(0, 0, 0, 400);
    gradientStroke2.addColorStop(0, 'rgba(215, 182, 90, 0.8)');
    gradientStroke2.addColorStop(1, 'rgba(215, 182, 90, 0.1)');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'],
        datasets: [
          {
            label: 'Peso (kg)',
            data: [80, 78, 77, 76, 75, 74],
            borderColor: gradientStroke1,
            backgroundColor: gradientStroke1,
            fill: true,
            tension: 0.4,
          },
          {
            label: 'Fuerza (repeticiones)',
            data: [10, 12, 14, 15, 16, 18],
            borderColor: gradientStroke2,
            backgroundColor: gradientStroke2,
            fill: true,
            tension: 0.4,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            ticks: { color: '#9a9aa3' },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
          y: {
            ticks: { color: '#9a9aa3' },
            grid: { color: 'rgba(255,255,255,0.05)' },
          },
        },
        plugins: {
          legend: {
            labels: { color: '#d7b65a' },
          },
        },
      },
    });
  }

  // Formulario de cuestionario
  const quizForm = document.getElementById('quizForm');
  const quizResult = document.getElementById('quizResult');
  if (quizForm && quizResult) {
    quizForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const objetivo = quizForm.objetivo.value;
      const dias = parseInt(quizForm.dias.value, 10);
      let recomendacion = '';
      if (objetivo === 'masa') {
        recomendacion = dias >= 4 ? 'Plan Powerbuilding' : 'Plan Modo Oso 2.0';
      } else if (objetivo === 'fuerza') {
        recomendacion = dias >= 4 ? 'Plan Modo Oso 2.0' : 'Plan Modo Oso 1.0';
      } else {
        recomendacion = 'Recetario Anabólico';
      }
      quizResult.textContent = `Recomendamos: ${recomendacion}`;
    });
  }

  // FAQ toggle
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = answer.style.display === 'block';
      document.querySelectorAll('.faq-answer').forEach(el => (el.style.display = 'none'));
      if (!isOpen) {
        answer.style.display = 'block';
      }
    });
  });
});
