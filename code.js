document.addEventListener('DOMContentLoaded', function() {
    const music = document.getElementById('bgMusic');
    const musicBtn = document.getElementById('musicToggle');
    let isPlaying = false;

    music.volume = 0;

    function fadeIn() {
        let vol = 0;
        const targetVol = 0.3;
        const interval = setInterval(() => {
            if (vol < targetVol) {
                vol += 0.02;
                music.volume = vol;
            } else {
                clearInterval(interval);
            }
        }, 100);
    }

    function fadeOut() {
        let vol = music.volume;
        const interval = setInterval(() => {
            if (vol > 0) {
                vol -= 0.02;
                music.volume = vol;
            } else {
                clearInterval(interval);
                music.pause();
            }
        }, 100);
    }

    musicBtn.addEventListener('click', function() {
        if (isPlaying) {
            fadeOut();
            musicBtn.classList.remove('playing');
        } else {
            music.play();
            fadeIn();
            musicBtn.classList.add('playing');
        }
        isPlaying = !isPlaying;
    });

    function animateStats() {
        const stats = document.querySelectorAll('.stat-number');
        
        stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            let current = 0;
            const increment = target / 100;
            
            const updateCount = () => {
                if (current < target) {
                    current += increment;
                    stat.textContent = Math.ceil(current);
                    setTimeout(updateCount, 10);
                } else {
                    stat.textContent = target;
                }
            };
            
            updateCount();
        });
    }

    animateStats();
});
