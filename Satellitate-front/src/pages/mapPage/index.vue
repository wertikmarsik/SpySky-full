<template>
  <div id="map-container">
    <div id="map-navigation">
      <Navbar/>
    </div>

    <div id="map-panels">
      <!-- =================== ALL FILTERS ======================================= -->

      <Filters @id-was-selected="getSelectedId" @name-was-selected="getSelectedName" @time-was-selected="getSelectedTime" @filters-changed="filterOjects"/>

      <!-- =================== RIGHT BOTTOM BLOCKS ======================================= -->

      <div id="right-bottom-elems">
        <div class="scale-buttons">
          <div id="zoomOut">
            <img src="../../assets/icons/minus.svg" alt=""/>
          </div>
          <div id="zoomIn">
            <img src="../../assets/icons/plus.svg" alt=""/>
          </div>
        </div>
      </div>
    </div>

    <!-- =================== EARTH CONTAINER BLOCK ======================================= -->

    <div id="model-container" ref="containerMap"></div>
  </div>
</template>

<script setup>
// import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js";
import * as THREE from "three";
import {OrbitControls} from "three/addons/controls/OrbitControls.js";
import {onMounted, onUnmounted, ref} from "vue";
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import {MTLLoader} from "three/addons/loaders/MTLLoader.js";
import axios from "axios";

// const url = "https://famous-plexus-417323.lm.r.appspot.com/"
const url = "http://localhost:8080";

const satellites = ref([]);
const containerMap = ref(null);

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
    50,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer({antialias: true});

const controls = new OrbitControls(camera, renderer.domElement);
controls.enablePan = false;
controls.update();

controls.zoomSpeed = 3.0;

const light = new THREE.AmbientLight(0xffffff, 0.1);
scene.add(light);

const directionalLight = new THREE.DirectionalLight(0xffffff, 3);
directionalLight.position.set(-30, 35, 55);

scene.add(directionalLight);
scene.add(directionalLight.target);

new THREE.TextureLoader().load(
    "src/assets/textures/bg_360.png",
    function (texture) {
      texture.encoding = THREE.sRGBEncoding
      const pmremGenerator = new THREE.PMREMGenerator(renderer);
      pmremGenerator.compileEquirectangularShader();

      const envMap = pmremGenerator.fromEquirectangular(texture).texture;
      pmremGenerator.dispose();

      texture.mapping = THREE.EquirectangularReflectionMapping;
      envMap.intensity = 0.1;
      scene.background = envMap;
      scene.environment = envMap;
    }
);

const mapEarth = new THREE.TextureLoader().load("src/assets/textures/earth.png");
mapEarth.encoding = THREE.sRGBEncoding;
const bump = new THREE.TextureLoader().load("src/assets/textures/bump.png");

const earthMaterial = new THREE.MeshPhongMaterial({
  map: mapEarth,
  bumpMap: bump,
  bumpScale: 0.05,
});

const geometry = new THREE.SphereGeometry(1, 50, 50);
const sphere = new THREE.Mesh(geometry, earthMaterial);
sphere.position.set(0, 0, 0);

scene.add(sphere);

let id_2;
let satellitesGroup = [];

function rotateSatellite() {
  const x = Math.floor(Math.random() * 10)/2;
  const y = Math.floor(Math.random() * 10)/20;
  const z = Math.floor(Math.random() * 10)/25;
  return {x, y, z};
}

function addSatellite(x, y, z, name, id, epoch) {
  const mtlLoader = new MTLLoader();
  mtlLoader.load("./src/assets/textures/Satellite.mtl", function (materials) {
    materials.preload();
    const loader = new OBJLoader();
    loader.load("./src/assets/objects/Satellite.obj", function (object) {
      let rotations = rotateSatellite();
      object.position.set(x / 2000, y / 2000, z / 2000);
      object.scale.set(0.1, 0.1, 0.1);
      object.rotation.set(rotations.x, rotations.y, rotations.z);
      object.name = name;
      object.uuid = id + "_" + epoch;
      satellitesGroup.push(object);
      scene.add(object);
    });
  });
}

function handleWindowResize() {
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

async function getSatellite() {
  try {
    const res = await axios.get(`${url}/satellites/`);
    satellites.value = res.data;
  } catch (e) {
    console.error(e.message);
  }
}

// ============================= FILTERS =======================================

let filters = {
  "name": "Select a name",
  "id": "Select an id",
  "time": ["2024-05-28", "2024-06-01"]
}

function getSelectedName(name) {
  filters["name"] = name;
  filters["id"] = "Select an id";
}

function getSelectedId(id) {
  filters["id"] = id;
  filters["name"] = "Select a name";
}

function getSelectedTime(time) {
  filters["time"] = [new Date(time["fromValue"]), new Date(time["toValue"])];
}

function filterOjects() {
  satellitesGroup.forEach(s => {
    let s_date = new Date(s.uuid.slice(-10));
    if (s_date >= new Date(filters["time"][0]) && s_date <= new Date(filters["time"][1])) {
      s.visible = true;
      if (filters["name"] != "Select a name") {
        if (s.name != filters["name"]) {
          s.visible = false;
        } else {
          s.visible = true;
        }
      }
      if (filters["id"] != "Select an id") {
        if (s.uuid.substring(0, 9) != filters["id"]) {
          s.visible = false;
        } else {
          s.visible = true;
        }
      }
    }
    else {
      s.visible = false;
    }
  })
}

// ==============================================================================

onMounted(() => {
  window.addEventListener("resize", handleWindowResize);
  handleWindowResize();

  const zoomInbtn = document.getElementById("zoomIn");
  const zoomOutbtn = document.getElementById("zoomOut");

  const zoomInFunction = (e) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, "zoomIn");
    camera.updateProjectionMatrix();
  };

  const zoomOutFunction = (e) => {
    const fov = getFov();
    camera.fov = clickZoom(fov, "zoomOut");
    camera.updateProjectionMatrix();
  };

  zoomInbtn.addEventListener("click", zoomInFunction);
  zoomOutbtn.addEventListener("click",zoomOutFunction);

  const clickZoom = (value, zoomType) => {
    if (value >= 20 && zoomType === "zoomIn") {
      return value - 5;
    } else if (value <= 75 && zoomType === "zoomOut") {
      return value + 5;
    } else {
      return value;
    }
  };

  const getFov = () => {
    return Math.floor(
      (2 *
        Math.atan(camera.getFilmHeight() / 2 / camera.getFocalLength()) *
        180) /
        Math.PI
    );
  };

  containerMap.value = document.getElementById("model-container");

  containerMap.value.style.width = "100vw";
  containerMap.value.style.height = "100vh";
  containerMap.value.style.position = "absolute";
  containerMap.value.style.overflow = "hidden";
  containerMap.value.style.top = "0";
  containerMap.value.style.left = "0";

  const w = containerMap.value.offsetWidth;
  const h = containerMap.value.offsetHeight;

  camera.aspect = w / h;

  renderer.setSize(w, h);
  renderer.setPixelRatio(window.devicePixelRatio);

  containerMap.value.appendChild(renderer.domElement);

  getSatellite().then(() => {
    if (satellites.value.length > 0) {
      let new_epoch;
      satellites.value.forEach(s => {
          new_epoch = s.epoch.toString().substring(0, 10);
          addSatellite(s.x, s.y, s.z, s.object_name, s.object_id, new_epoch)
      })
    }
  });

  function animate() {
    id_2 = requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
  }

  animate();
});

onUnmounted(() => {
  window.cancelAnimationFrame(id_2);

  renderer.domElement.width = 0;
  renderer.domElement.height = 0;

  function removeObject(obj) {
    if (obj.geometry) obj.geometry.dispose();
    if (obj.material) obj.material.dispose();
    if (obj.children.length) obj.children.forEach(removeObject);
  }

  removeObject(sphere);
  removeObject(light);
  removeObject(directionalLight);

  window.removeEventListener("resize", handleWindowResize);

  satellitesGroup.forEach(obj => scene.remove(obj));

  if (scene.background) {
    scene.background.dispose();
  }

  if (scene.environment) {
    scene.environment.dispose();
  }

  scene.remove(camera);
  renderer.dispose();

  if (containerMap.value) {
    containerMap.value.removeChild(renderer.domElement);
  }
});
</script>

<script>
import Navbar from "../components/mapNav.vue";
import Filters from "./filters.vue";

export default {
  name: "map",
  components: {
    Navbar,
    Filters,
  }
};
</script>


<style>
/*==================== MAP CONTAINER BLOCK ==============================*/

#map-container {
  background: none;
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
}

#map-panels {
  width: 100%;
  height: 100vh;
  padding: 0px 30px;
  box-sizing: border-box;
}

/*==================== RIGHT BOTTOM ELEMENTS BLOCK ==============================*/

#right-bottom-elems {
  font-family: "Exo 2", sans-serif;
  font-size: 14px;
  position: absolute;
  color: white;
  bottom: 30px;
  z-index: 10000;
  right: 30px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  gap: 1rem;
}

#right-bottom-elems #coordinates {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

#right-bottom-elems .scale-buttons {
  display: flex;
  flex-direction: row;
  gap: 1rem;
  cursor: pointer;
}

#right-bottom-elems .scale-buttons div {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 0.5rem;
  background-color: #000000;
  border: 2px solid #001734;
}

#right-bottom-elems .scale-buttons div img {
  height: auto;
  width: 1rem;
}
</style>
