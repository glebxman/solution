document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const toggleBioBtn = document.querySelector('.toggle-bio-btn');
    const bio = document.querySelector('.bio');
    const links = document.querySelector('.links');

    toggleBioBtn.addEventListener('click', () => {
        container.classList.toggle('bio-hidden');
        if (container.classList.contains('bio-hidden')) {
            bio.style.maxHeight = '0';
            bio.style.opacity = '0';
            links.style.maxHeight = '0';
            links.style.opacity = '0';
        } else {
            bio.style.maxHeight = bio.scrollHeight + 'px';
            bio.style.opacity = '1';
            links.style.maxHeight = links.scrollHeight + 'px';
            links.style.opacity = '1';
        }
    });
});