$(document).ready(function() {
    const scene = new THREE.Scene();
    const aspectRatio = window.innerWidth / window.innerHeight;
    const camera = new THREE.PerspectiveCamera(75, aspectRatio, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('scene-container').appendChild(renderer.domElement);

    const earthGeometry = new THREE.SphereGeometry(1, 32, 32);
    const earthMaterial = new THREE.MeshBasicMaterial({ color: 0x0077be });
    const earth = new THREE.Mesh(earthGeometry, earthMaterial);
    earth.position.set(0, 0, 0);

    // Create the Moon
    const moonGeometry = new THREE.SphereGeometry(0.1, 32, 32);
    const moonMaterial = new THREE.MeshBasicMaterial({ color: 0xcccccc });
    const moon = new THREE.Mesh(moonGeometry, moonMaterial);
    moon.position.set(2, 0, 0); // Initial position of the Moon
    
    scene.add(earth);
    scene.add(moon);
    const shadowGeometry = new THREE.ConeGeometry(1.05, 3, 32);
    const shadowMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, transparent: true, opacity: 0.8 });
    const shadow = new THREE.Mesh(shadowGeometry, shadowMaterial);
    shadow.rotation.x = Math.PI; // Flip the cone to point towards the Moon
    scene.add(shadow);
    camera.position.z = 3;
    camera.lookAt(0, 0, 0);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    
    // Add event listeners for mouse/touch events
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);

    function onMouseMove(event) {
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
        moveMoon();
    }

    function onTouchMove(event) {
        const touch = event.touches[0];
        mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
        mouse.y = - (touch.clientY / window.innerHeight) * 2 + 1;
        moveMoon();
    }

    function moveMoon() {
        // Update the raycaster and check for intersections
        raycaster.setFromCamera(mouse, camera);
        const intersects = raycaster.intersectObjects([earth]);

        if (intersects.length > 0) {
            const intersection = intersects[0];
            const moonDistance = intersection.point.sub(earth.position).normalize();
            moon.position.copy(moonDistance.multiplyScalar(2));
        }
    }

    const animate = () => {
        requestAnimationFrame(animate);
    
        // Add any animations or updates here
    
        renderer.render(scene, camera);
    };
    
    animate();

})