<template>
  <div id="left-filters">
    <div id="filters">
      <div id="arrow" @click="showFilters()">
        <img src="../../assets/icons/arrows-filter.svg" alt="">
      </div>

      <!-- =================== SEARCH FILTERS ======================================= -->

      <div>
        <p>Search</p>
        <div class="satellite-names">
          <p>Satellite name</p>
          <img src="../../assets/icons/caret-down-fill.svg">
          <ul class="satellite-names-options">
            <li class="satellite-name" v-for="satellite in this.$props.data" :key="satellite.object_id">
              {{ satellite.object_name }}
            </li>
          </ul>
        </div>

        <div class="object-ids">
          <p>Object's ID</p>
          <img src="../../assets/icons/caret-down-fill.svg">
          <ul class="objects-id-options">
            <li class="object-id" v-for="satellite in this.$props.data" :key="satellite.object_id">
              {{ satellite.object_id }}
            </li>
          </ul>
        </div>
      </div>

      <!-- =================== OBJECT TYPE FILTER ======================================= -->

      <div>
        <p>Object type</p>
        <div class="object-types">
          <p>Object types</p>
          <img src="../../assets/icons/caret-down-fill.svg">
          <ul class="objects-type-options">
            <li class="object-type">
              <label class="objects-type-checkbox-container">Satellites
                <input type="checkbox" name="Satellite"/>
                <div class="checkmark"></div>
              </label>
            </li>
            <li class="object-type">
              <label class="objects-type-checkbox-container">Debris
                <input type="checkbox" name="Satellite"/>
                <div class="checkmark"></div>
              </label>
            </li>
          </ul>
        </div>
      </div>

      <!-- =================== TIME PERIOD SLIDER ======================================= -->

      <div class="range-slider-container">
        <p>Time period</p>
        <div id="slider">
          <div id="progress"></div>
          <div class="range-input">
            <input type="range" class="range-min" min="1900" max="2020" value="1900">
            <input type="range" class="range-max" min="1900" max="2020" value="1960">
          </div>
        </div>
        <div class="value-input">
          <p>From: {{ this.minValue }}</p>
          <p>To: {{ this.maxValue }}</p>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import {onMounted} from "vue";

/*=============================== DROPDOWNS =================================*/
onMounted(() => {
  const selectedName = document.querySelector(".satellite-names > p");
  const nameOptions = document.querySelectorAll(".satellite-names .satellite-names-options li");
  const satelliteNames = document.querySelector(".satellite-names");
  const satelliteNamesDropdown = document.querySelector(".satellite-names .satellite-names-options");

  satelliteNames.addEventListener("click", showNamesDropdown);

  const selectedId = document.querySelector(".object-ids > p");
  const idOptions = document.querySelectorAll(".object-ids .objects-id-options li");
  const objectIds = document.querySelector(".object-ids");
  const objectIdDropdown = document.querySelector(".object-ids .objects-id-options");

  objectIds.addEventListener("click", showIdsDropdown);

  const objectTypes = document.querySelector(".object-types");
  const objectTypesDropdown = document.querySelector(".object-types .objects-type-options");

  objectTypes.addEventListener("click", showTypesDropdown);

  document.addEventListener("click", (event) => {

    const isInsideNamesDropdown = satelliteNames.contains(event.target);
    const isInsideIdsDropdown = objectIds.contains(event.target);
    const isInsideTypesDropdown = objectTypes.contains(event.target);

    if (!isInsideNamesDropdown) {
      satelliteNamesDropdown.classList.remove("show");
    }
    if (!isInsideIdsDropdown) {
      objectIdDropdown.classList.remove("show");
    }
    if (!isInsideTypesDropdown) {
      objectTypesDropdown.classList.remove("show");
    }
  });

  nameOptions.forEach(option => {
    option.addEventListener("click", () => {
      nameOptions.forEach(e => {
        e.classList.remove("show");
      })
      let text = option.innerHTML;
      selectedName.innerHTML = text;
      option.classList.toggle("show");
    })
  });

  idOptions.forEach(option => {
    option.addEventListener("click", () => {
      idOptions.forEach(e => {
        e.classList.remove("show");
      })
      let text = option.innerHTML;
      selectedId.innerHTML = text;
      option.classList.toggle("show");
    })
  });

  /*=============================== SLIDER =================================*/

  const rangeInput = document.querySelectorAll(".range-input input");
  const progress = document.querySelector(".range-slider-container #progress");
  const values = document.querySelectorAll(".range-slider-container .value-input p");
  const gap = 10;

  rangeInput.forEach(input => {
    input.addEventListener("input", e => {
      const minV = parseInt(rangeInput[0].value);
      const maxV = parseInt(rangeInput[1].value);

      if (maxV - minV < gap) {
        if (e.target.className === "range-min") {
          rangeInput[0].value = maxV - gap;
          values[0].innerHTML = "From: year " + (maxV - gap);
        } else {
          rangeInput[1].value = minV + gap;
          values[1].innerHTML = "To: year " + (minV + gap);
        }

      } else {
        values[0].innerHTML = "From: year " + minV;
        values[1].innerHTML = "To: year " + maxV;
        progress.style.left = ((minV - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
        progress.style.right = 100 - ((maxV - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
      }
    })
  })


  function showNamesDropdown() {
    let satelliteNamesDropdown = document.querySelector(".satellite-names .satellite-names-options");
    if (satelliteNamesDropdown.classList.contains("show")) {
      satelliteNamesDropdown.classList.remove("show");
    } else {
      satelliteNamesDropdown.classList.toggle("show");
    }
  }

  function showIdsDropdown() {
    let objectIdDropdown = document.querySelector(".object-ids .objects-id-options");
    if (objectIdDropdown.classList.contains("show")) {
      objectIdDropdown.classList.remove("show");
    } else {
      objectIdDropdown.classList.toggle("show");
    }
  }

  function showTypesDropdown() {
    let objectTypesDropdown = document.querySelector(".object-types .objects-type-options");
    if (objectTypesDropdown.classList.contains("show")) {
      objectTypesDropdown.classList.remove("show");
    } else {
      objectTypesDropdown.classList.toggle("show");
    }
  }
});
</script>

<script>
import axios from "axios";

const url = "http://localhost:8080"

export default {
  name: "Filters",
  props: ['data'],
  data() {
    return {
      maxValue: "",
      minValue: ""
    }
  },
  methods: {
    showFilters() {
      let filters = document.getElementById("filters")
      if (filters.classList.contains("show")) {
        filters.classList.remove("show");
      } else {
        filters.classList.toggle("show");
      }
    },
    async getMaxMin() {
      await axios.get(`${url}/satellites/maxmin/premium`).then(res => {
        this.maxValue = res.data.maxValue.toString().substring(0, 10)
        this.minValue = res.data.minValue.toString().substring(0, 10)
      }).catch(e => {
        console.error(e.message)
      })
    }
  },
  mounted() {
    this.getMaxMin()
  }
}
</script>

<style>

/*==================== LEFT FILTERS BAR BLOCK ==============================*/

#left-filters {
  display: flex;
  flex-direction: column;
  color: white;
  font-family: 'Exo 2', sans-serif;
  z-index: 100;
  position: relative;
  height: 100vh;
  justify-content: center;
  width: fit-content;
}

#left-filters > div > div {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#left-filters p {
  font-size: 1rem;
  font-weight: 700;
  text-transform: uppercase;
}

#left-filters #arrow {
  position: absolute;
  width: 24px;
  height: 36px;
  background-color: #2e5688;
  right: -24px;
}

#filters {
  position: relative;
  background-color: #000000;
  padding: 20px 10px 30px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 0.5rem;
  width: 10px;
  border: 2px solid #00142D;
  transition: width 0.3s ease-in-out;
}

#filters.show {
  width: 350px;
  padding: 20px 20px 30px 20px;
  transition: width 0.3s ease-in-out;
}

#filters.show * {
  visibility: visible;
  width: 100%;
  transition: visibility 0s linear;
}

#filters.show #arrow img {
  transform: scaleX(1);
}


#filters * {
  visibility: hidden;
  width: 0;
}

#filters #arrow img {
  transform: scaleX(-1);
}

#filters * p {
  height: 19.2px;
}

#left-filters #arrow {
  position: absolute;
  width: 24px;
  height: 36px;
  background-color: #2e5688;
  right: -25px;
  visibility: visible;
  top: calc(50% - 18px);
  background-color: #000000;
  border: 2px solid #00142D;
  border-top-right-radius: 0.5rem;
  border-bottom-right-radius: 0.5rem;
  border-left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

#left-filters #arrow img {
  width: 11px;
  height: 13px;
  visibility: visible;
}

/*==================== DROPDOWNS BLOCK ==============================*/

#left-filters .satellite-names,
#left-filters .object-ids,
#left-filters .object-types {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 0.5rem;
  border: 0;
  background-color: #000E1F;
  color: white;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  color: #A1A1A1;
  font-weight: 700;
  font-size: 1rem;
  position: relative;
}

#left-filters .satellite-names p,
#left-filters .object-ids p,
#left-filters .object-types p {
  text-transform: none;
}

#left-filters .satellite-names img,
#left-filters .object-ids img,
#left-filters .object-types img {
  filter: invert(74%) sepia(5%) saturate(5%) hue-rotate(314deg) brightness(87%) contrast(86%);
  height: 12px;
  width: 12px;
}

#left-filters .satellite-names .satellite-names-options,
#left-filters .object-ids .objects-id-options,
#left-filters .object-types .objects-type-options {
  flex-direction: column;
  height: 130px;
  border-radius: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  color: #A1A1A1;
  font-weight: 700;
  font-size: 1rem;
  background-color: #000E1F;
  overflow-y: scroll;
  position: absolute;
  display: none;
  left: 0;
  bottom: -130px;
  z-index: 1000;
}

#left-filters .object-types .objects-type-options {
  height: 100px;
  bottom: -100px;
  z-index: 1000;
  overflow-y: visible;
}

#left-filters .satellite-names .satellite-names-options.show,
#left-filters .object-ids .objects-id-options.show,
#left-filters .object-types .objects-type-options.show {
  display: flex;
}

#left-filters .satellite-names .satellite-names-options .satellite-name,
#left-filters .object-ids .objects-id-options .object-id,
#left-filters .object-types .objects-type-options .object-type {
  padding: 20px;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
  background-color: #000E1F;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 20px;
}

#left-filters .object-types .objects-type-options .object-type input {
  width: auto;
}

#left-filters .satellite-names .satellite-names-options .satellite-name:hover,
#left-filters .object-ids .objects-id-options .object-id:hover,
#left-filters .satellite-names .satellite-names-options .satellite-name.show,
#left-filters .object-ids .objects-id-options .object-id.show {
  background-color: #011932;
  color: white;
}

#left-filters .objects-type-checkbox-container {
  position: relative;
  padding-left: 41px;
  cursor: pointer;
  user-select: none;
}

#left-filters .objects-type-checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

#left-filters .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px !important;
  border-radius: 0.4rem;
  background: none;
  border: 2px solid #A1A1A1;
  transition: 0.3s !important;
}

#left-filters .objects-type-checkbox-container input:checked ~ .checkmark {
  background-color: #4C5CBC;
  border: 2px solid #4C5CBC;
}

#left-filters .objects-type-checkbox-container:hover input ~ .checkmark {
  border: 2px solid #4C5CBC;
}

#left-filters .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/*==================== TIME SLIDER BLOCK ==============================*/

.range-slider-container {
  width: 100px;
}

.range-slider-container #time-slider {
  width: 100%;
}

.range-slider-container .value-input {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.range-slider-container .value-input input[type="number"]::-webkit-outer-spin-button,
.range-slider-container .value-input input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
}

.range-slider-container .value-input input[type="number"] {
  margin-top: 20px;
  background-color: #000E1F;
  outline: none;
  border: none;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 0.5rem;
  color: #A1A1A1;
  font-weight: 700;
  font-size: 1rem;
}

.range-slider-container #slider {
  height: 5px;
  border-radius: 5px;
  background-color: white;
  position: relative;
}

.range-slider-container #slider #progress {
  height: 5px;
  background-color: #4C5CBC;
  position: absolute;
  border-radius: 5px;
  left: 0%;
  right: 50%;
  width: auto;
}

.range-slider-container #slider .range-input input {
  position: absolute;
  appearance: none;
  background: none;
  height: 5px;
  pointer-events: none;
  border-radius: 5px;
}

.range-slider-container #slider .range-input input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: #4C5CBC;
  border-radius: 50%;
  pointer-events: auto;
}

</style>