<template>
    <div id="model-container" ref="containerLog"></div>
</template>

<script setup>

// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import * as THREE from "three";
import { onBeforeMount, onBeforeUnmount, onMounted, ref } from "vue";
import vertexShader from "../../assets/shaders-folder/vertex.glsl";
import fragmentShader from "../../assets/shaders-folder/fragment.glsl";
import atmosphereVertexShader from "../../assets/shaders-folder/atmosphereVertex.glsl";
import atmosphereFragmentShader from "../../assets/shaders-folder/atmosphereFragment.glsl";


const scene = new THREE.Scene();
const containerLog = ref(null);

const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 1.4;

const renderer = new THREE.WebGLRenderer({ antialias: true });

const backgroundTexture = new THREE.TextureLoader().load('src/assets/background-textures/bg.png');
backgroundTexture.encoding = THREE.sRGBEncoding
scene.background = backgroundTexture;

// --- Creating the Earth ---

const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
          globeTexture: {
              value: new THREE.TextureLoader().load('src/assets/textures/map.jpg')
          }
      }
  });

const geometry =  new THREE.SphereGeometry(1, 30, 30);
const sphere = new THREE.Mesh(geometry, material)

// --- Creating the atmosphere

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
    group.position.y = -0.95;

function handleWindowResize () {
    const newWidth = window.innerWidth;
    const newHeight = window.innerHeight;

    if (containerLog.value) {
      containerLog.value.style.width = `${newWidth}px`;
      containerLog.value.style.height = `${newHeight}px`;
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

    if (newWidth <= 600) {
      sphere.scale.set(0.7, 0.7, 0.7);
      atmosphere.scale.set(0.75, 0.75, 0.75);
    } else {
      sphere.scale.set(1, 1, 1);
      atmosphere.scale.set(1.05, 1.05, 1.05);
    } 
}

onBeforeMount(() => {
  window.addEventListener('resize', handleWindowResize);
  handleWindowResize();
})

onMounted(() => {
  containerLog.value = document.getElementById('model-container');

  containerLog.value.style.width = "100vw";
  containerLog.value.style.height = "100vh";
  containerLog.value.style.position = "absolute";
  containerLog.value.style.overflow = "hidden";
  containerLog.value.style.top = "0";
  containerLog.value.style.left = "0";

  const w = containerLog.value.offsetWidth;
  const h = containerLog.value.offsetHeight;

  camera.aspect = w/h

  scene.add(group);

  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);

  containerLog.value.appendChild(renderer.domElement);

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y += 0.002;
  }
  animate();

  window.addEventListener('resize', handleWindowResize);
});

onBeforeUnmount(() => {  

    sphere.material.dispose();
    sphere.geometry.dispose();

    atmosphere.material.dispose();
    atmosphere.geometry.dispose();

    scene.remove(group);

    material.dispose();
    material_atmosphere.dispose();

    geometry.dispose();

    scene.background.dispose();
    scene.remove(camera);

    renderer.dispose();
  
  containerLog.value.removeChild(renderer.domElement);
  window.removeEventListener('resize', handleWindowResize);
});

</script>