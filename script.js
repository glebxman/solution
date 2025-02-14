document.addEventListener('DOMContentLoaded', () => {
    const jokes = document.querySelectorAll('.joke');
    const stats = document.querySelectorAll('.stat');
    const title = document.querySelector('h1');
    
    // Плавная прокрутка
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Эффект при наведении на шутки
    jokes.forEach(joke => {
        joke.addEventListener('mouseenter', () => {
            const otherJokes = Array.from(jokes).filter(j => j !== joke);
            joke.style.transform = 'translateX(10px) scale(1.02)';
            otherJokes.forEach(j => {
                j.style.opacity = '0.5';
            });
        });

        joke.addEventListener('mouseleave', () => {
            jokes.forEach(j => {
                j.style.opacity = '1';
                j.style.transform = 'translateX(0) scale(1)';
            });
        });
    });

    // Анимация статистики при скролле
    const animateStats = () => {
        stats.forEach(stat => {
            const rect = stat.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                stat.style.transform = 'translateY(0)';
                stat.style.opacity = '1';
            }
        });
    };

    // Параллакс эффект для заголовка
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX - window.innerWidth / 2) / 50;
        const y = (e.clientY - window.innerHeight / 2) / 50;
        
        title.style.transform = `translate(${x}px, ${y}px)`;
        title.style.textShadow = `${x/5}px ${y/5}px 10px rgba(100, 181, 246, 0.3)`;
    });

    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.joke, .stat, .quote').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.5s ease-out';
        observer.observe(el);
    });

    window.addEventListener('scroll', animateStats);
    animateStats();
});
