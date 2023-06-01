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
camera.position.set(0,100,100);

//############################################################################################
//############################################################################################


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


const mercury = createPlanet(3,mercuryTexture,30);
const saturn = createPlanet(10,saturnTexture,140, {
    innerRadius: 10,
    outerRadius: 20,
    texture: satRingTexture
});



//############################################################################################
//############################################################################################

const pointLight = new THREE.PointLight(0xffffff,2,300);
scene.add(pointLight);


// const ambientLight = new THREE.AmbientLight(0Xffffff);
// scene.add(ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
// scene.add(lightHelper);

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);



// function addStar(){
//     const geometry = new THREE.SphereGeometry(0.25,24,24);
//     const material = new THREE.MeshStandardMaterial( {color: 0xffffff} );
//     const star = new THREE.Mesh( geometry, material);
//     const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));
//     star.position.set(x,y,z);
//     scene.add(star);
// }
// Array(200).fill().forEach(addStar);
const spaceBackground = new THREE.TextureLoader().load("space.jpg");
scene.background = spaceBackground;




function animate() {
    requestAnimationFrame(animate);
  
    sun.rotation.y += 0.001;
    mercury.obj.rotation.y += 0.005;
    mercury.planet.rotation.y += 0.01;
    saturn.obj.rotation.y += 0.001;
    saturn.planet.rotation.y += 0.01;

    


    controls.update();
    renderer.render(scene, camera);
}
animate();
