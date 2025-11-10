document.addEventListener('DOMContentLoaded', () => {
    console.log('مطعم وايرس جيمنج - جاهز!');

    const fileInput = document.getElementById('item-image');
    const fileLabel = document.querySelector('.file-input-label');

    if (fileInput && fileLabel) {
        fileLabel.addEventListener('click', function(e) {
            e.preventDefault();
            fileInput.click();
        });
    }
});

function toggleDropdown() {
    const dropdown = document.querySelector('.nav-dropdown');
    dropdown.classList.toggle('active');
}

document.addEventListener('click', (event) => {
    const dropdown = document.querySelector('.nav-dropdown');
    const dropdownToggle = document.querySelector('.nav-dropdown-toggle');

    if (dropdown && dropdownToggle) {
        if (!dropdown.contains(event.target) && !dropdownToggle.contains(event.target)) {
            dropdown.classList.remove('active');
        }
    }
});

function previewImage(input) {
    console.log('previewImage called', input.files);
    if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const preview = document.getElementById('imagePreview');
            const previewImg = document.getElementById('previewImg');
            const fileLabel = document.querySelector('.file-input-label');

            if (preview && previewImg && fileLabel) {
                previewImg.src = e.target.result;
                preview.style.display = 'block';
                fileLabel.style.display = 'none';
                console.log('Image preview shown');
            } else {
                console.error('Elements not found', { preview, previewImg, fileLabel });
            }
        }
        reader.onerror = function(error) {
            console.error('FileReader error', error);
        }
        reader.readAsDataURL(input.files[0]);
    }
}

function removeImage() {
    const input = document.getElementById('item-image');
    const preview = document.getElementById('imagePreview');
    const fileLabel = document.querySelector('.file-input-label');

    if (input && preview && fileLabel) {
        input.value = '';
        preview.style.display = 'none';
        fileLabel.style.display = 'flex';
        console.log('Image removed');
    }
}
