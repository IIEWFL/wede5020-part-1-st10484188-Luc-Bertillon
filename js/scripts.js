// Image Zoom Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all images that should be zoomable
    const images = document.querySelectorAll('.responsive-image');
    const modal = document.getElementById('zoomModal');
    const zoomedImage = document.getElementById('zoomedImage');
    const imageCaption = document.getElementById('imageCaption');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    
    let currentImageIndex = 0;
    const zoomableImages = Array.from(images);

    // Function to open modal with clicked image
    function openModal(index) {
        currentImageIndex = index;
        const clickedImage = zoomableImages[currentImageIndex];
        
        zoomedImage.src = clickedImage.src;
        zoomedImage.alt = clickedImage.alt;
        imageCaption.textContent = clickedImage.alt;
        
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    // Function to close modal
    function closeModal() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    }

    // Function to navigate to next image
    function nextImage() {
        currentImageIndex = (currentImageIndex + 1) % zoomableImages.length;
        openModal(currentImageIndex);
    }

    // Function to navigate to previous image
    function prevImage() {
        currentImageIndex = (currentImageIndex - 1 + zoomableImages.length) % zoomableImages.length;
        openModal(currentImageIndex);
    }

    // Add click event to all images
    images.forEach((image, index) => {
        image.addEventListener('click', () => {
            openModal(index);
        });
    });

    // Close modal when clicking X
    closeBtn.addEventListener('click', closeModal);

    // Navigation buttons
    nextBtn.addEventListener('click', nextImage);
    prevBtn.addEventListener('click', prevImage);

    // Close modal when clicking outside the image
    modal.addEventListener('click', function(event) {
        if (event.target === modal) {
            closeModal();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (modal.style.display === 'block') {
            switch(event.key) {
                case 'Escape':
                    closeModal();
                    break;
                case 'ArrowRight':
                    nextImage();
                    break;
                case 'ArrowLeft':
                    prevImage();
                    break;
            }
        }
    });

    // Touch gestures for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    modal.addEventListener('touchstart', function(event) {
        touchStartX = event.changedTouches[0].screenX;
    });

    modal.addEventListener('touchend', function(event) {
        touchEndX = event.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        
        if (touchEndX < touchStartX - swipeThreshold) {
            // Swipe left - next image
            nextImage();
        }
        
        if (touchEndX > touchStartX + swipeThreshold) {
            // Swipe right - previous image
            prevImage();
        }
    }

    // Prevent modal from closing when clicking on the image itself
    zoomedImage.addEventListener('click', function(event) {
        event.stopPropagation();
    });
});