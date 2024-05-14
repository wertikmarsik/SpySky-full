<template>
    <div id="model-container" ref="containerMap"></div>
</template>

<script setup>
import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { onBeforeMount, onUnmounted, onMounted, onBeforeUnmount, ref } from "vue";
import { OBJLoader } from 'three/addons/loaders/OBJLoader.js';
import { MTLLoader } from 'three/addons/loaders/MTLLoader.js';

const scene = new THREE.Scene();
const containerMap = ref(null);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({ antialias: true });

const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.update();

const light = new THREE.AmbientLight( 0xffffff, 0.2 ); 
scene.add( light );

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.9);
directionalLight.position.x = -30;
directionalLight.position.y = 35;
directionalLight.position.z = 55;

directionalLight.target.position.x = 0;
directionalLight.target.position.y = 0;
directionalLight.target.position.z = 0;

scene.add(directionalLight);
scene.add(directionalLight.target);

const backgroundTexture = new THREE.TextureLoader().load('src/assets/textures/bg_high.png');
const spaceMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture, side: THREE.DoubleSide });
const spaceGeometry = new THREE.SphereGeometry(800, 32, 32);

const space = new THREE.Mesh(spaceGeometry, spaceMaterial);
scene.add(space);

const mapEarth = new THREE.TextureLoader().load('src/assets/textures/earth.png');
const bump = new THREE.TextureLoader().load('src/assets/textures/bump.png');

const earthMaterial = new THREE.MeshPhongMaterial({ map: mapEarth, bumpMap: bump, bumpScale: 0.05 });

const geometry =  new THREE.SphereGeometry(1, 50, 50);
const sphere = new THREE.Mesh(geometry, earthMaterial);

sphere.position.set(0, 0, 0)

scene.add(sphere)

function getOrbitControls() {
    return this.controls;
}

let id_2;

// Add asteroid
let asteroidsGroup = [];

function addAsteroid(x, y, z) {
    
    let mtlLoader = new MTLLoader();
    mtlLoader.load('./src/assets/textures/Rock.mtl', function(materials) {
        materials.preload();

        let loader = new OBJLoader();
        // loader.setMaterials(materials);

        loader.load('./src/assets/objects/Rock.obj', function(object){
            object.position.set(x, y, z);
            object.scale.set(0.0002, 0.0002, 0.0002);
            scene.add(object);

            asteroidsGroup.push(object);
        });
    })

    // let lat = (90 - latRaw) * (Math.PI/180);
    // let lng = (lngRaw + 180) * (Math.PI/180);

    // let x = -(Math.sin(lat)*Math.cos(lng));
    // let y = (Math.sin(lat)*Math.sin(lng));
    // let z = (Math.cos(lat))
  }

// Add satellite
let satellitesGroup = [];

function addSatellite(x, y, z) {
    
    let mtlLoader = new MTLLoader();
    mtlLoader.load('./src/assets/textures/Satellite.mtl', function(materials) {
        materials.preload();

        let loader = new OBJLoader();
        // loader.setMaterials(materials);

        loader.load('./src/assets/objects/Satellite.obj', function(object){
            object.position.set(x, y, z);
            object.scale.set(0.1, 0.1, 0.1);
            scene.add(object);

            satellitesGroup.push(object);
        });
    })

    // let lat = (90 - latRaw) * (Math.PI/180);
    // let lng = (lngRaw + 180) * (Math.PI/180);

    // let x = -(Math.sin(lat)*Math.cos(lng));
    // let y = (Math.sin(lat)*Math.sin(lng));
    // let z = (Math.cos(lat))
  }

function handleWindowResize () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (containerMap.value) {
        containerMap.value.style.width = `${newWidth}px`;
        containerMap.value.style.height = `${newHeight}px`;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
    }

    camera.updateProjectionMatrix();
}

onBeforeMount(() => {
window.addEventListener('resize', handleWindowResize);
handleWindowResize();
})

onMounted(() => {
    containerMap.value = document.getElementById('model-container');

    containerMap.value.style.width = "100vw";
    containerMap.value.style.height = "100vh";
    containerMap.value.style.position = "absolute";
    containerMap.value.style.overflow = "hidden";
    containerMap.value.style.top = "0";
    containerMap.value.style.left = "0";

    const w = containerMap.value.offsetWidth;
    const h = containerMap.value.offsetHeight;

    camera.aspect = w/h

    addAsteroid(1, 0.5, -0.4)
    addAsteroid(-0.4, 1, 0.5)
    addAsteroid(-0.35, 1, 0.55)
    addAsteroid(-0.8, 0.8, 0.6)
    addAsteroid(-1, -0.5, -0.7)
    addAsteroid(-1.1, -0.53, -0.75)
    addAsteroid(0.5, 0.5, 0.75)

    addSatellite(0.7, 0.7, 0.7)
    addSatellite(-0.7, -0.7, 0.7)
    addSatellite(-0.7, 0.8, 1)


    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerMap.value.appendChild(renderer.domElement);

    function animate() {
        id_2 = requestAnimationFrame(animate);
       
        renderer.render(scene, camera);
        controls.update();
    }
    animate();
    window.addEventListener('resize', handleWindowResize);
});


function removeObject(obj) {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
    if (obj.children.length) obj.children.forEach(removeObject);
    }

onUnmounted(() => {  
    window.cancelAnimationFrame(id_2);

    scene.dispose();
    backgroundTexture.dispose();

    renderer.domElement.width = 0;
    renderer.domElement.height = 0;

    removeObject(sphere)
    removeObject(light)
    removeObject(directionalLight)

    window.removeEventListener('resize', handleWindowResize);

    for (let i = 0; i < asteroidsGroup.length; i++) {
        removeObject(asteroidsGroup[i]);
    }

    for (let i = 0; i < satellitesGroup.length; i++) {
        scene.remove(satellitesGroup[i]);
    }

    asteroidsGroup = [];
    satellitesGroup = [];
    
    if (scene.backgroundTexture) {
        scene.backgroundTexture.dispose();
    }

    scene.remove(camera);

    renderer.dispose();
    scene.dispose();

    if (containerMap.value) {
        containerMap.value.removeChild(renderer.domElement);
    }
});

function cleanupThreeScene() {
    window.cancelAnimationFrame(id_2);

    scene.dispose();
    backgroundTexture.dispose();

    renderer.domElement.width = 0;
    renderer.domElement.height = 0;

    removeObject(sphere)
    removeObject(light)
    removeObject(directionalLight)

    window.removeEventListener('resize', handleWindowResize);

    for (let i = 0; i < asteroidsGroup.length; i++) {
        removeObject(asteroidsGroup[i]);
    }

    for (let i = 0; i < satellitesGroup.length; i++) {
        scene.remove(satellitesGroup[i]);
    }

    asteroidsGroup = [];
    satellitesGroup = [];

    if (scene.backgroundTexture) {
        scene.backgroundTexture.dispose();
    }

    scene.remove(camera);

    renderer.dispose();
    scene.dispose();

    if (containerMap.value) {
        containerMap.value.removeChild(renderer.domElement);
    }
}


</script>