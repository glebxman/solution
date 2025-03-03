document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('music');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const playPauseIcon = playPauseBtn.querySelector('i');
    const progressBar = document.querySelector('.progress');
    const progressContainer = document.querySelector('.progress-bar');
    const currentTime = document.querySelector('.time.current');
    const duration = document.querySelector('.time.duration');
    const volumeSlider = document.getElementById('volumeSlider');
    const volumeIcon = document.querySelector('.volume-container i');

    // Format time in minutes:seconds
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        seconds = Math.floor(seconds % 60);
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // Update progress bar and time displays
    function updateProgress() {
        const percent = (audio.currentTime / audio.duration) * 100;
        progressBar.style.width = `${percent}%`;
        currentTime.textContent = formatTime(audio.currentTime);
    }

    // Set audio time when clicking progress bar
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }

    // Toggle play/pause
    function togglePlayPause() {
        if (audio.paused) {
            audio.play();
            playPauseIcon.className = 'fas fa-pause';
        } else {
            audio.pause();
            playPauseIcon.className = 'fas fa-play';
        }
    }

    // Update volume
    function updateVolume() {
        audio.volume = volumeSlider.value / 100;
        if (audio.volume === 0) {
            volumeIcon.className = 'fas fa-volume-mute';
        } else if (audio.volume < 0.5) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-up';
        }
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', togglePlayPause);
    audio.addEventListener('timeupdate', updateProgress);
    progressContainer.addEventListener('click', setProgress);
    volumeSlider.addEventListener('input', updateVolume);

    // Set initial duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        duration.textContent = formatTime(audio.duration);
        currentTime.textContent = '0:00';
    });

    // Update play button when song ends
    audio.addEventListener('ended', () => {
        playPauseIcon.className = 'fas fa-play';
    });
});