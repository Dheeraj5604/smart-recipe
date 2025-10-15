document.addEventListener('DOMContentLoaded', () => {
    const imageUpload = document.getElementById('image-upload');
    const imageFilename = document.getElementById('image-filename');
    const form = document.querySelector('form');
    const loadingSpinner = document.getElementById('loading-spinner');

    if (imageUpload) {
        imageUpload.addEventListener('change', (event) => {
            const file = event.target.files[0];
            if (file) {
                imageFilename.textContent = file.name;
                imageFilename.classList.remove('hidden');
            } else {
                imageFilename.textContent = '';
                imageFilename.classList.add('hidden');
            }
        });
    }

    if (form) {
        form.addEventListener('submit', () => {
            if (loadingSpinner) {
                loadingSpinner.classList.remove('hidden');
                loadingSpinner.classList.add('flex');
            }
        });
    }
});