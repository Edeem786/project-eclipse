// Get references to the Earth, Moon, and Sun elements
const earth = document.querySelector('.earth');
const moon = document.querySelector('.moon');
const sun = document.querySelector('.sun');

// Get a reference to the reset button
const resetButton = document.getElementById('resetButton');

// Function to reset the objects' positions
function resetObjects() {
    // Reset the Earth, Moon, and Sun positions to their initial state
    earth.style.left = '50%';
    earth.style.bottom = '10%';

    moon.style.left = '50%';
    moon.style.top = '50%';

    sun.style.left = '50%';
    sun.style.top = '10%';
}

// Add a click event listener to the reset button
resetButton.addEventListener('click', resetObjects);