var width = window.innerWidth; // Store the initial window width
const maxDistance = 405500; // Maximum distance to the Moon in kilometers
const minDistance = 363300; // Minimum distance to the Moon in kilometers

$(document).ready(function() {
    // Make the moon draggable using jQuery UI
    $('.moon-draggable').draggable(); 
    $('#moonSizeSlider').on('input', function() {
        // Get the current value of the slider
        const sliderValue = parseInt($(this).val());

        // Calculate the new moon size based on the slider value and window width
        const newMoonSize = ((sliderValue * 2 / 30000) + 0.994) * (width * 0.35);

        // Update the moon's size based on the slider value and window width
        const moon = document.getElementById('moon');
        moon.style.width = newMoonSize + 'px';
        moon.style.height = newMoonSize + 'px';
        updateDistanceDisplay(sliderValue);
    });
    $('.moon-draggable').on('drag', function() {
        updateEclipsePhase(); // Call a function to update the eclipse phase
    });

    let isTotalEclipse = false; // Variable to track if it's a total eclipse
    function updateEclipsePhase() {
        const sun = document.querySelector('.sun');
        const moon = document.querySelector('.moon');
        const sunRect = sun.getBoundingClientRect();
        const moonRect = moon.getBoundingClientRect();
        const margin = 7;
        if (
            moonRect.left <= sunRect.left + margin &&
            moonRect.right >= sunRect.right - margin &&
            moonRect.top <= sunRect.top + margin &&
            moonRect.bottom >= sunRect.bottom - margin
        ) {
            // Total eclipse
            document.getElementById('eclipsePhase').textContent = 'Phase: Total Eclipse';
            sun.classList.add('total-eclipse');
            if (!isTotalEclipse) {
                // Eclipse phase changed to total eclipse, show the explanation container with fade-in effect
                const explanationContainer = document.getElementById('explanationContainer');
                explanationContainer.style.display = 'block';
                setTimeout(() => {
                    explanationContainer.style.opacity = '1';
                }, 10); // Adding a small delay to ensure the fade-in effect is applied
                isTotalEclipse = true;
            }
        } else if (
            moonRect.right > sunRect.left &&
            moonRect.left < sunRect.right &&
            moonRect.bottom > sunRect.top &&
            moonRect.top < sunRect.bottom
        ) {
            // Partial eclipse
            document.getElementById('eclipsePhase').textContent = 'Phase: Partial Eclipse';
            sun.classList.remove('total-eclipse');
            if (isTotalEclipse) {
                // Eclipse phase changed from total eclipse, hide the explanation container
                const explanationContainer = document.getElementById('explanationContainer');
                explanationContainer.style.opacity = '0'; // Apply fade-out effect
                setTimeout(() => {
                    explanationContainer.style.display = 'none';
                }, 500); // Delay hiding the container until the fade-out effect is complete
                isTotalEclipse = false;
            }
        } else {
            // No eclipse
            document.getElementById('eclipsePhase').textContent = 'Phase: None';
            sun.classList.remove('total-eclipse');
            if (isTotalEclipse) {
                // Eclipse phase changed from total eclipse, hide the explanation container
                const explanationContainer = document.getElementById('explanationContainer');
                explanationContainer.style.opacity = '0'; // Apply fade-out effect
                setTimeout(() => {
                    explanationContainer.style.display = 'none';
                }, 500); // Delay hiding the container until the fade-out effect is complete
                isTotalEclipse = false;
            }
        }
    }

    function updateDistanceDisplay(sliderValue) {
        const currentDistance = maxDistance - (sliderValue / 100) * (maxDistance - minDistance);
        const distanceDisplay = document.getElementById('distanceDisplay');
        distanceDisplay.textContent = `Distance from Moon to Earth: ${currentDistance} kilometers`;
    }
    // Function to update the moon's position based on the sun's position
    function updateMoonPosition() {
        const sun = document.querySelector('.sun');
        const moon = document.querySelector('.moon');
        const sunRect = sun.getBoundingClientRect();
        // Calculate the moon's position relative to the sun's position
        const moonX = sunRect.left + sunRect.width / 2 - moon.offsetWidth / 2;
        const moonY = sunRect.top + sunRect.height / 2 - moon.offsetHeight / 2;

        width = window.innerWidth; // Update the stored window width
        
        // Set the moon's position
        moon.style.left = moonX + 'px';
        moon.style.top = moonY + 'px';
        $('#moonSizeSlider').trigger('input');
    }
    // Add an event listener to update the moon's position when the window is resized
    window.addEventListener('resize', updateMoonPosition);
    window.addEventListener('resize', updateEclipsePhase);
    function resetMoonPosition() {
        const moon = document.getElementById('moon');
        const sun = document.querySelector('.sun');
        const sunRect = sun.getBoundingClientRect();

        // Calculate the moon's position to be in the center
        const moonX = sunRect.left + sunRect.width / 2 - moon.offsetWidth / 2;
        const moonY = sunRect.top + sunRect.height / 2 - moon.offsetHeight / 2;

        // Set the moon's position
        moon.style.left = moonX + 'px';
        moon.style.top = moonY + 'px';

        // Reset the slider value to the default (if needed)
        $('#moonSizeSlider').val(10);
        $('#moonSizeSlider').trigger('input');
    }

    resetMoonPosition();
    // Add a click event listener to the reset button
    $('#resetButton').on('click', resetMoonPosition);

    updateEclipsePhase();
});
