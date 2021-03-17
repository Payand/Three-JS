//Three.js project

//add scene
let scene = new THREE.Scene();
//add camera and camera position (x,y,z)
let camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

camera.position.set(0, 0.5, 8);

//add WebGL
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor("#000000"); // backup background
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

//window different size adjusment
window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
});

//add background
const loader = new THREE.TextureLoader();
loader.load("./2k_stars_milky_way.jpg", function(texture) {
    scene.background = texture;
});

// add audio
const listener = new THREE.AudioListener();
camera.add(listener);
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("background-music.mp4", function(buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(1);
    sound.play();
});

// add white wire sphere
const geometry = new THREE.SphereGeometry(2.3, 40, 40);
const material = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    wireframe: true,

    map: new THREE.TextureLoader().load("2k_moon.jpg"),
});
const whiteSphere = new THREE.Mesh(geometry, material);
whiteSphere.position.y = 0.3;

//add wire earth
const geometry2 = new THREE.SphereGeometry(1, 40, 40);
const material2 = new THREE.MeshLambertMaterial({
    color: 0xfffff0,
    transparent: true,
    opacity: 1,
    wireframe: true,
    map: new THREE.TextureLoader().load("2k_earth_daymap.jpg"),
});
const earth = new THREE.Mesh(geometry2, material2);
earth.position.y = 0.2;

//add mars sphere and  position (x,y,z)
const geometry4 = new THREE.SphereGeometry(0.4, 40, 40);
const material4 = new THREE.MeshLambertMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 1,
    wireframe: false,
    map: new THREE.TextureLoader().load("2k_mars.jpg"),
});
const mars = new THREE.Mesh(geometry4, material4);

mars.position.set(4.5, 2, -5);

// add moon
const geometry5 = new THREE.SphereGeometry(0.2, 40, 40);
const materaial5 = new THREE.MeshLambertMaterial({
    map: new THREE.TextureLoader().load("2k_moon.jpg"),
});
const moon = new THREE.Mesh(geometry5, materaial5);
moon.position.set(-2.9, 0, 2);

//add red ring around and position
const geometry1 = new THREE.RingGeometry(1.7, 1.6, 50);
const material1 = new THREE.MeshLambertMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
});

const redRing = new THREE.Mesh(geometry1, material1);
redRing.position.y = 0.2;

//add yellow ring and position
const geometry3 = new THREE.RingGeometry(1.7, 1.6, 50);
const material3 = new THREE.MeshLambertMaterial({
    color: 0xffff00,
    side: THREE.DoubleSide,
});

const yellowRing = new THREE.Mesh(geometry3, material3);
yellowRing.position.y = 0.2;

// add shapes to secene
scene.add(whiteSphere);
scene.add(earth);
scene.add(moon);
scene.add(mars);
scene.add(redRing);
scene.add(yellowRing);
// add light to the secene and position
const light = new THREE.PointLight(0xffffff, 2, 1000);
light.position.set(-10, -5, 10);
scene.add(light);

// add animation render
const render = function() {
    requestAnimationFrame(render);

    //add white sphere rotation
    whiteSphere.rotation.y += 0.0005;
    //add red ring rotation
    redRing.rotation.y -= 0.005;
    redRing.rotation.x -= 0.005;
    redRing.rotation.z -= 0.005;

    //add earth rotation
    earth.rotation.y -= 0.002;
    //add yellow ring rotation
    yellowRing.rotation.y += 0.009;
    yellowRing.rotation.x += 0.009;
    yellowRing.rotation.z += 0.009;
    //add mars rotation
    mars.rotation.y -= 0.001;
    //add moon rotation
    moon.rotation.y += 0.002;

    renderer.render(scene, camera);
};
render();
// add event listener to go to mars and moon and back to earth
document.body.addEventListener("keydown", (event) => {
    if (event.key === "m") {
        camera.position.x = 4.5;
        camera.position.y = 2;
        camera.position.z = -3;
    } else if (event.key === "e") {
        camera.position.x = 0;
        camera.position.y = 0.5;
        camera.position.z = 8;
    } else if (event.key === "o") {
        camera.position.x = -2.9;
        camera.position.y = 0;
        camera.position.z = 3;
    }
});