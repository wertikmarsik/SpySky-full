<template>
        <div id="model-container-welcome" ref="containerWelcome"></div>
        
</template>
    
<script setup>

// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import * as THREE from "three";
import { onBeforeMount, onMounted, ref, onUnmounted } from "vue";

import gsap from 'gsap';
import vertexShader from "../../assets/shaders-folder/vertex.glsl";
import fragmentShader from "../../assets/shaders-folder/fragment.glsl";
import atmosphereVertexShader from "../../assets/shaders-folder/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../../assets/shaders-folder/atmosphereFragment.glsl";


const scene = new THREE.Scene();
const containerWelcome = ref(null);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 2;


const renderer = new THREE.WebGLRenderer({ antialias: true });
const backgroundTexture = new THREE.TextureLoader().load('src/assets/background-textures/bg.png');
backgroundTexture.encoding = THREE.sRGBEncoding
scene.background = backgroundTexture;

// --- Creating the Earth and Atmosphere ---

const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms: {
        globeTexture: {
            value: new THREE.TextureLoader().load('src/assets/textures/earth.png')
        }
    }
});

const geometry =  new THREE.SphereGeometry(1, 30, 30);
const sphere = new THREE.Mesh(geometry, material);

const material_atmosphere = new THREE.ShaderMaterial({
        vertexShader: atmosphereVertexShader,
        fragmentShader: atmosphereFragmentShader,
        blending: THREE.AdditiveBlending,
        side: THREE.BackSide
    });

const atmosphere = new THREE.Mesh(geometry, material_atmosphere)
atmosphere.scale.set(1.05, 1.05, 1.05);

const group = new THREE.Group();
    group.add(sphere);  
    group.add(atmosphere);     
    group.position.x = 1.2;
    group.position.y = 0.3;


const mouse = {
        x: 0,
        y: 0
};

let id;

function handleWindowResize () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (containerWelcome.value) {
        containerWelcome.value.style.width = `${newWidth}px`;
        containerWelcome.value.style.height = `${newHeight}px`;
        renderer.setSize(newWidth, newHeight);
        camera.aspect = newWidth / newHeight;
    }

    camera.updateProjectionMatrix();

    const targetAspect = newWidth / newHeight;
    const imageAspect = 2048 / 1024;
    const factor = imageAspect / targetAspect;
    scene.background.offset.x = factor > 1 ? (1 - 1 / factor) / 2 : 0;
    scene.background.repeat.x = factor > 1 ? 1 / factor : 1;
    scene.background.offset.y = factor > 1 ? 0 : (1 - factor) / 2;
    scene.background.repeat.y = factor > 1 ? 1 : factor;

    if (newWidth < 601) {
        group.position.x = 0;
        group.position.y = 1.2;
    } else {
        group.position.x = 1.2;
        group.position.y = 0.3;
    }
}

onBeforeMount(() => {
addEventListener('mousemove', (event) => {
        mouse.x = (event.clientX / innerWidth) * 2 - 1
        mouse.y = -(event.clientY / innerHeight) * 2 - 1
    })

handleWindowResize();
})

onMounted(() => {
    containerWelcome.value = document.getElementById('model-container-welcome');

    containerWelcome.value.style.width = "100vw";
    containerWelcome.value.style.height = "100vh";
    containerWelcome.value.style.position = "absolute";
    containerWelcome.value.style.overflow = "hidden";
    containerWelcome.value.style.top = "0";
    containerWelcome.value.style.left = "0";

    const w = containerWelcome.value.offsetWidth;
    const h = containerWelcome.value.offsetHeight;

    camera.aspect = w/h

    scene.add(group);

    renderer.setSize(w, h);
    renderer.setPixelRatio(window.devicePixelRatio);

    containerWelcome.value.appendChild(renderer.domElement);
    
    function animate() {
        id = requestAnimationFrame( animate );
        renderer.render(scene, camera);
        sphere.rotation.y += 0.002;
        group.rotation.y = mouse.x * 0.5;
        gsap.to(group.rotation, {
            x: -mouse.y * 0.5,
            y: mouse.x * 0.5,
            duration: 2
        })
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
  window.cancelAnimationFrame(id);

  backgroundTexture.dispose(); 
  material.uniforms.globeTexture.value.dispose(); 

  renderer.domElement.width = 0;
  renderer.domElement.height = 0;

  removeObject(sphere)
  removeObject(atmosphere)
  scene.remove(group);

    if (containerWelcome.value) {
        containerWelcome.value.removeChild(renderer.domElement);
    }
    window.removeEventListener('resize', handleWindowResize);
});

</script>