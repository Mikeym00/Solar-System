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
const uranusRingTexture = new THREE.TextureLoader().load("uranusring.png");
const neptuneTexture = new THREE.TextureLoader().load("neptune.jpg");

// always need canvas, camera, and renderer 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer(
    {canvas:document.querySelector("#bg"),}
);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

const controls = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90,140,100);

//############################################################################################
//############################################################################################
const pointLight = new THREE.PointLight(0xffffff,2,300);
scene.add(pointLight);
const ambientLight = new THREE.AmbientLight(0X222222);
scene.add(ambientLight);


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


const mercury = createPlanet(3,mercuryTexture,-35);
mercury.obj.rotateY(Math.PI / 3);
const venus = createPlanet(4,venusTexture,45);
venus.obj.rotateY(Math.PI / 2);
const earth = createPlanet(4,earthTexture,-55);
earth.obj.rotateY(Math.PI / 3);
const mars = createPlanet(3.5,marsTexture,65);
mars.obj.rotateY(Math.PI / 2);
const jupiter = createPlanet(12,jupiterTexture,-90);
jupiter.obj.rotateY(Math.PI / 4);
const saturn = createPlanet(10,saturnTexture,130, {
    innerRadius: 10,
    outerRadius: 20,
    texture: satRingTexture
});
saturn.obj.rotateY(Math.PI / 4);
const uranus = createPlanet(5,uranusTexture,165,{
    innerRadius: 5,
    outerRadius: 10,
    texture: uranusRingTexture
});
uranus.obj.rotateY(Math.PI / 6);
const neptune = createPlanet(5,neptuneTexture,-185);
neptune.obj.rotateY(Math.PI / 6);

//############################################################################################
//############################################################################################
function addStar(){
    const geometry = new THREE.SphereGeometry(0.1,24,24);
    const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
    const star = new THREE.Mesh( geometry, material);
    const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(300));
    star.position.set(x,y,z);
    scene.add(star);
}
Array(500).fill().forEach(addStar);

//############################################################################################
//############################################################################################

function animate() {
    requestAnimationFrame(animate);
    //sun orbit rotations 
    venus.obj.rotation.y += 0.0045;
    mercury.obj.rotation.y += 0.005;
    earth.obj.rotation.y += 0.003;
    mars.obj.rotation.y += 0.0025;
    jupiter.obj.rotation.y += 0.001;
    saturn.obj.rotation.y += 0.00085;
    uranus.obj.rotation.y += 0.0007;
    neptune.obj.rotation.y += 0.00065;

    //planet rotations
    sun.rotation.y += 0.001;
    mercury.planet.rotation.y += 0.01;
    venus.planet.rotation.y += 0.01;
    earth.planet.rotation.y += 0.01;
    mars.planet.rotation.y += 0.01;
    jupiter.planet.rotation.y += 0.01;
    saturn.planet.rotation.y += 0.01
    uranus.planet.rotation.y += 0.01;
    neptune.planet.rotation.y += 0.01;

    controls.update();
    renderer.render(scene, camera);
}
animate();


window.addEventListener('resize', function() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});