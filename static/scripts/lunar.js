$(document).ready(function() {
    const canvas = document.getElementById('eclipseDiagram');
    const context = canvas.getContext('2d');
    // Define the positions and sizes of the moon, earth, and sun
    const sunX = 100; // X-coordinate of the sun
    const earthX = 500; // X-coordinate of the earth
    const moonX = 700; // X-coordinate of the moon
    const centerY = canvas.height / 2; // Y-coordinate of the center line
    const sunRadius = 40; // Radius of the sun
    const earthRadius = 20; // Radius of the earth
    const moonRadius = 10; // Radius of the moon
    const penumbraWidth = 30;

    // Calculate the position of the shadow's edges
    const umbraLeft = sunX - (earthRadius * 2);
    const umbraRight = sunX + (earthRadius * 2);

    // Clear the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgba(0, 0, 30, 1)';
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Draw the sun
    context.beginPath();
    context.arc(sunX, centerY, sunRadius, 0, Math.PI * 2);
    context.fillStyle = 'yellow'; // Solid yellow color
    context.fill();

    // Calculate the slope
    var slope = (centerY - earthRadius - (centerY - sunRadius)) / (earthX - sunX);
    var extendedY = centerY - sunRadius + slope * (canvas.width - sunX);
    const umbratop = extendedY;
    // Draw the lines connecting the Sun and Earth
    context.beginPath();
    context.moveTo(sunX, centerY - sunRadius);
    context.lineTo(canvas.width, extendedY);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    context.stroke();

    slope = (centerY + earthRadius - (centerY + sunRadius)) / (earthX - sunX);
    extendedY = centerY + sunRadius + slope * (canvas.width - sunX);
    const umbrabot = extendedY;
    context.beginPath();
    context.moveTo(sunX, centerY + sunRadius);
    context.lineTo(canvas.width, extendedY);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    context.stroke();

    slope = (centerY - earthRadius - (centerY + sunRadius)) / (earthX - sunX);
    extendedY = centerY + sunRadius + slope * (canvas.width - sunX);
    const penumtop = extendedY;
    context.beginPath();
    context.moveTo(sunX, centerY + sunRadius);
    context.lineTo(canvas.width, extendedY);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    context.stroke();

    slope = (centerY + earthRadius - (centerY - sunRadius)) / (earthX - sunX);
    extendedY = centerY - sunRadius + slope * (canvas.width - sunX);
    const penumbot = extendedY;
    context.beginPath();
    context.moveTo(sunX, centerY - sunRadius);
    context.lineTo(canvas.width, extendedY);
    context.strokeStyle = 'lightgray';
    context.lineWidth = 1;
    context.stroke();

    // Draw the earth's shadow (penumbra)
    context.beginPath();
    context.moveTo(earthX, centerY - earthRadius); // Start at the first point

    // Define the points for the trapezoid
    context.lineTo(canvas.width,penumtop);
    context.lineTo(canvas.width, penumbot);
    context.lineTo(earthX, centerY + earthRadius);

    context.fillStyle = 'rgba(100, 100, 100, 0.5)'; // lgiht gray with transparency
    context.fill();

    // Draw the earth's shadow (umbra)
    context.beginPath();
    context.moveTo(earthX, centerY - earthRadius); // Start at the first point

    // Define the points for the trapezoid
    context.lineTo(canvas.width, umbratop);
    context.lineTo(canvas.width, umbrabot);
    context.lineTo(earthX, centerY + earthRadius);

    context.fillStyle = 'rgba(0, 0, 0, 0.9)'; // Dark gray with transparency
    context.fill();

    // Draw the earth
    context.beginPath();
    context.arc(earthX, centerY, earthRadius, 0, Math.PI * 2);
    context.fillStyle = 'lightblue';
    context.fill();

    // Draw the moon
    context.beginPath();
    context.arc(moonX, centerY, moonRadius, 0, Math.PI * 2);
    context.fillStyle = 'gray';
    context.fill();



const tooltip = document.getElementById('tooltip');
const tooltipText = document.getElementById('tooltip-text'); 
const tolerance = 10; 
// Event listener for mouseover on the canvas
canvas.addEventListener('mousemove', (e) => {
    const x = e.clientX - canvas.getBoundingClientRect().left;
    const y = e.clientY - canvas.getBoundingClientRect().top;

    // Get the color of the pixel at the mouse coordinates
    const pixelData = context.getImageData(x, y, 1, 1).data;
    const [red, green, blue] = pixelData;
    console.log('Mouseover event triggered');

    // Determine which object is being hovered over based on color
    let tooltipContent = '';

    if (red === 255 && green === 255 && blue === 0) {
        // Hovered over the sun (yellow color)
        tooltipContent = 'The Sun: The central object in our solar system, providing light and warmth to the planets, including Earth.';
    } else if (red === 173 && green === 216 && blue === 230) {
        // Hovered over the earth (light blue color)
        tooltipContent = 'The Earth: Our home planet, which casts its shadow on the Moon during a lunar eclipse.';
    } else if (red === 128 && green === 128 && blue === 128) {
        // Hovered over the moon (gray color)
        tooltipContent = 'The Moon: Earth\'s natural satellite, which is eclipsed when it passes through the Earth\'s shadow.';
    } else if (red === 50 && green === 50 && blue === 65) {
        // Hovered over the penumbra (light gray color)
        tooltipContent = 'The Penumbra: The outer part of the Earth\'s shadow where only partial eclipse occurs.';
    } else if (red === 5 && green === 5 && blue === 6) {
        // Hovered over the umbra (dark gray color)
        tooltipContent = 'The Umbra: The central and darkest part of the Earth\'s shadow where a total lunar eclipse occurs.';
    } else {
        tooltipContent = ``;
    }

        // Update the tooltip content
        tooltipText.textContent = tooltipContent;
        tooltip.style.opacity = 1;
    });

    // Event listener for mouseout on the canvas
    canvas.addEventListener('mouseout', () => {
        // Hide the tooltip on mouseout
        tooltip.style.opacity = 1;
        tooltipText.textContent = '';
    });
})