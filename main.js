import  * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const sunTexture = new THREE.TextureLoader().load("sun.jpg");
const mercuryTexture = new THREE.TextureLoader().load("mercury.jpg");
const venusTexture = new THREE.TextureLoader().load("venus.jpg");
const earthTexture = new THREE.TextureLoader().load("earth.jpg");
const marsTexture = new THREE.TextureLoader().load("mars.jpg");
const jupiterTexture = new THREE.TextureLoader().load("jupiter.jpg");
const saturnTexture = new THREE.TextureLoader().load("saturn.jpg");
const satRingTexture = new THREE.TextureLoader().load("saturnring.jpg");
const uranusTexture = new THREE.TextureLoader().load("uranus.jpg");
const neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");

// always need canvas, camera, and renderer 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer(
    {canvas:document.querySelector("#bg"),}
);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// camera.position.setZ(30);
// camera.position.z = 100; // same thing as above, just a case of preference 
camera.position.set(0,100,30);

//############################################################################################
//############################################################################################
const pointLight = new THREE.PointLight(0xffffff,2,300);
scene.add(pointLight);
const gridHelper = new THREE.GridHelper(500, 50);
scene.add(gridHelper);


const sun = new THREE.Mesh(
    new THREE.SphereGeometry(15,32,16),
    new THREE.MeshBasicMaterial( {map: sunTexture}));
scene.add(sun);


function createPlanet (size, texture, position, ring){
    const obj = new THREE.Object3D();
    scene.add(obj);
    const planet = new THREE.Mesh(
        new THREE.SphereGeometry(size,32,16),
        new THREE.MeshStandardMaterial( {map: texture}));
    obj.add(planet);
    if (ring){
        const ringMesh = new THREE.Mesh(
            new THREE.RingGeometry(
                ring.innerRadius,
                ring.outerRadius,
                32),
            new THREE.MeshBasicMaterial( {map: ring.texture, side: THREE.DoubleSide}));

        obj.add(ringMesh);
        ringMesh.position.x = position;
        ringMesh.rotation.x = -0.5 * Math.PI;
    }
    planet.position.x = position;
    return {planet, obj}
}


const mercury = createPlanet(3,mercuryTexture,35);
const venus = createPlanet(4,venusTexture,45);
const earth = createPlanet(4,earthTexture,55);
const mars = createPlanet(3.5,marsTexture,65);
const jupiter = createPlanet(12,jupiterTexture,90);
const saturn = createPlanet(10,saturnTexture,130, {
    innerRadius: 10,
    outerRadius: 20,
    texture: satRingTexture
});
const uranus = createPlanet(5,uranusTexture,165);
const neptune = createPlanet(5,neptuneTexture,185);



//############################################################################################
//############################################################################################

// const ambientLight = new THREE.AmbientLight(0Xffffff);
// scene.add(ambientLight);
// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);



// function addStar(){
//     const geometry = new THREE.SphereGeometry(0.25,24,24);
//     const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
//     const star = new THREE.Mesh( geometry, material);
//     const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
//     star.position.set(x,y,z);
//     scene.add(star);
// }
// Array(200).fill().forEach(addStar);
// const spaceBackground = new THREE.TextureLoader().load("space.jpg");
// scene.background = spaceBackground;



const controls = new OrbitControls(camera, renderer.domElement);


function animate() {
    requestAnimationFrame(animate);
  
    sun.rotation.y += 0.001;

    mercury.obj.rotation.y += 0.005;
    mercury.planet.rotation.y += 0.01;

    venus.obj.rotation.y += 0.004;
    venus.planet.rotation.y += 0.01;

    earth.obj.rotation.y += 0.007;
    earth.planet.rotation.y += 0.01;

    mars.obj.rotation.y += 0.007;
    mars.planet.rotation.y += 0.01;

    jupiter.obj.rotation.y += 0.007;
    jupiter.planet.rotation.y += 0.01;

    saturn.obj.rotation.y += 0.001;
    saturn.planet.rotation.y += 0.01;

    uranus.obj.rotation.y += 0.007;
    uranus.planet.rotation.y += 0.01;

    neptune.obj.rotation.y += 0.007;
    neptune.planet.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}
animate();
