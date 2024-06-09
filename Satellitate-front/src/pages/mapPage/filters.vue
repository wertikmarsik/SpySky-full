<template>
  <div id="left-filters">
    <div class="filters" v-bind:class="{ 'filters': true, 'filters--collapsed': areFiltersVisible }">
      <div id="arrow" @click="showFilters()">
        <img src="../../assets/icons/arrows-filter.svg" alt="" />
      </div>

      <!-- =================== SEARCH FILTERS ======================================= -->

      <div>
        <p>Search</p>
        <div class="satellite-names">
          <p id="selected-name" @click="showNamesDropdown()">Select a name</p>
          <img src="../../assets/icons/caret-down-fill.svg" />
          <ul class="satellite-names-options" v-show="isNamesDropdownVisible">
            <li
              class="satellite-name"
              v-for="object in objects"
              :key="object.object_id"
              :value="object.object_id"
              @click="selectNameOption(object)"
            >
              {{ object.object_name }}
            </li>
          </ul>
        </div>

        <div class="object-ids">
          <p id="selected-id" @click="showIdsDropdown()">Select an id</p>
          <img src="../../assets/icons/caret-down-fill.svg" />
          <ul class="objects-id-options" v-show="isIdsDropdownVisible">
            <li
              class="object-id"
              v-for="object in objects"
              :key="object.object_id"
              :value="object.object_id"
              @click="selectIdOption(object)"
            >
              {{ object.object_id }}
            </li>
          </ul>
        </div>
        <button id="clear-filters" class="fill" @click="clearFilters()">Clear filters</button>
      </div>

      <!-- =================== TIME PERIOD SLIDER ======================================= -->

      <div class="range-slider-container">
        <p>Time period</p>
        <div id="slider">
          <div id="progress"></div>
          <div class="range-input">
            <input
              type="range"
              class="range-min"
              min="0"
              max="4"
              value="0"
            />
            <input
              type="range"
              class="range-max"
              min="0"
              max="4"
              value="4"
            />
          </div>
        </div>
        <div class="value-input">
          <p>From: {{ minValue }}</p>
          <p>To: {{ maxValue }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

const url = "https://famous-plexus-417323.lm.r.appspot.com/";

export default {
  name: "Filters-component",
  data() {
    return {
      minValue: "",
      maxValue: "",
      isNamesDropdownVisible: false,
      isIdsDropdownVisible: false,
      areFiltersVisible: false,
      objects: [],
      epochs: {},
      selectedId: "",
      selectedName: "",
      selectedTime: {
        fromValue: "",
        toValue: ""
      },
    };
  },

  methods: {
    showFilters() {
      this.areFiltersVisible = !this.areFiltersVisible;
    },

    showNamesDropdown() {
      this.isNamesDropdownVisible = !this.isNamesDropdownVisible;
    },

    showIdsDropdown() {
      this.isIdsDropdownVisible = !this.isIdsDropdownVisible;
    },

    selectNameOption(object) {
      if (this.selectedId != "") {
        this.selectedId = "";
        document.getElementById("selected-id").innerHTML = "Select an id";
        this.$emit('idWasSelected', this.selectedId);
      }
      event.stopPropagation();
      this.selectedName = object.object_name;
      document.getElementById("selected-name").innerHTML = object.object_name;
      this.isNamesDropdownVisible = false;
      this.$emit('nameWasSelected', this.selectedName);
    },

    selectIdOption(object) {
      if (this.selectedName != "") {
        this.selectedName = "";
        document.getElementById("selected-name").innerHTML = "Select a name";
        this.$emit('nameWasSelected', this.selectedName);
      }
      event.stopPropagation();
      this.selectedId = object.object_id;
      document.getElementById("selected-id").innerHTML = object.object_id;
      this.isIdsDropdownVisible = false;
      this.$emit('idWasSelected', this.selectedId);
    },

    selectTimePeriod() {
      console.log(this.selectedTime);
    },

    clearFilters() {
      this.selectedId = "";
      this.selectedName = "";
      this.$emit('nameWasSelected', this.selectedName);
      this.$emit('idWasSelected', this.selectedId);
      document.getElementById("selected-id").innerHTML = "Select an id";
      document.getElementById("selected-name").innerHTML = "Select a name";
    },

    async getSatellitesNames() {
      await axios
      .get(`${url}/satellites/`)
      .then((res) => {
        this.objects = res.data;
      })
      .catch((e) => {
        console.error(`Error fetching names data: ${e.message}`)
      })
    },

    getEpochs() {
      let id = 0;
      let timeDiff = new Date(this.maxValue).getTime() - new Date(this.minValue).getTime();
      let daysDiff = Math.round(timeDiff / (1000 * 3600 * 24));
      let curr_date = new Date(this.minValue);

      while (daysDiff >= 0) {
        this.epochs[id] = curr_date.toISOString().substring(0, 10);
        curr_date = new Date(curr_date.setDate(curr_date.getDate()+1));
        daysDiff--;
        id++;
      }
    },

    async getMaxMin() {
      await axios
        .get(`${url}/satellites/maxmin/premium`)
        .then((res) => {
          this.maxValue = res.data.maxValue.toString().substring(0, 10);
          this.minValue = res.data.minValue.toString().substring(0, 10);
          this.getEpochs();
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
  },

  mounted() {
    this.getMaxMin();
    this.getSatellitesNames();

    const rangeInput = document.querySelectorAll(".range-input input");
    const progress = document.querySelector(".range-slider-container #progress");
    const values = document.querySelectorAll(".range-slider-container .value-input p");

    rangeInput.forEach((input) => {
      input.addEventListener("input", (e) => {
        const minV = parseInt(rangeInput[0].value);
        const maxV = parseInt(rangeInput[1].value);

        if (maxV - minV < 1) {
          if (e.target.className === "range-min") {
            rangeInput[0].value = maxV - 1;
            values[0].innerHTML = "From: " + this.epochs[maxV - 1];
          } else {
            rangeInput[1].value = minV + 1;
            values[1].innerHTML = "To: " + this.epochs[minV + 1];
          }
        } else {
          values[0].innerHTML = "From: " + this.epochs[minV];
          values[1].innerHTML = "To: " + this.epochs[maxV];
          progress.style.left = ((minV - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
          progress.style.right = 100 - ((maxV - rangeInput[0].min) / (rangeInput[0].max - rangeInput[0].min)) * 100 + "%";
        }
      });
    });
  },
  
};
</script>

<style>
/*==================== LEFT FILTERS BAR BLOCK ==============================*/

#left-filters {
  display: flex;
  flex-direction: column;
  color: white;
  font-family: "Exo 2", sans-serif;
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

.filters {
  position: relative;
  background-color: #000000;
  padding: 20px 10px 30px 0px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 30px;
  border-radius: 0.5rem;
  width: 10px;
  border: 2px solid #00142d;
  transition: width 0.3s ease-in-out;
}

.filters * {
  visibility: hidden;
  width: 0;
}

.filters #clear-filters {
  display: none;
  width: 0;
  font-size: 1rem !important;
}

.filters #arrow img {
  transform: scaleX(-1);
}

.filters * p {
  height: 19.2px;
}

.filters--collapsed {
  width: 350px;
  padding: 20px 20px 30px 20px;
  transition: width 0.3s ease-in-out;
}

.filters--collapsed * {
  visibility: visible;
  width: 100%;
  transition: visibility 0.4s linear;
}

.filters--collapsed #clear-filters {
  display: block;
  width: fit-content;
  transition: visibility 0.4s linear;
}

.filters--collapsed #arrow img {
  transform: scaleX(1);
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
  border: 2px solid #00142d;
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
#left-filters .object-ids {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-radius: 0.5rem;
  border: 0;
  background-color: #000e1f;
  color: white;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  color: #a1a1a1;
  font-weight: 700;
  font-size: 1rem;
  position: relative;
}

#left-filters .satellite-names p,
#left-filters .object-ids p {
  text-transform: none;
}

#left-filters .satellite-names img,
#left-filters .object-ids img {
  filter: invert(74%) sepia(5%) saturate(5%) hue-rotate(314deg) brightness(87%)
    contrast(86%);
  height: 12px;
  width: 12px;
}

#left-filters .satellite-names .satellite-names-options,
#left-filters .object-ids .objects-id-options {
  flex-direction: column;
  height: 130px;
  border-radius: 0.5rem;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  color: #a1a1a1;
  font-weight: 700;
  font-size: 1rem;
  background-color: #000e1f;
  overflow-y: scroll;
  position: absolute;
  display: flex;
  left: 0;
  bottom: -130px;
  z-index: 1000;
}

#left-filters .satellite-names .satellite-names-options .satellite-name,
#left-filters .object-ids .objects-id-options .object-id {
  padding: 20px;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  list-style: none;
  background-color: #000e1f;
  border-radius: 0.5rem;
  display: flex;
  align-items: center;
  gap: 20px;
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
  border: 2px solid #a1a1a1;
  transition: 0.3s !important;
}

#left-filters .objects-type-checkbox-container input:checked ~ .checkmark {
  background-color: #4c5cbc;
  border: 2px solid #4c5cbc;
}

#left-filters .objects-type-checkbox-container:hover input ~ .checkmark {
  border: 2px solid #4c5cbc;
}

#left-filters .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/*==================== TIME SLIDER BLOCK ==============================*/

.range-slider-container {
  width: 100%;
}

.range-slider-container #time-slider {
  width: 100%;
}

.range-slider-container .value-input {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.range-slider-container
  .value-input
  input[type="number"]::-webkit-outer-spin-button,
.range-slider-container
  .value-input
  input[type="number"]::-webkit-inner-spin-button {
  appearance: none;
}

.range-slider-container .value-input input[type="number"] {
  margin-top: 20px;
  background-color: #000e1f;
  outline: none;
  border: none;
  box-sizing: border-box;
  padding: 20px;
  border-radius: 0.5rem;
  color: #a1a1a1;
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
  background-color: #4c5cbc;
  position: absolute;
  border-radius: 5px;
  left: 0%;
  right: 0%;
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

.range-slider-container
  #slider
  .range-input
  input[type="range"]::-webkit-slider-thumb {
  appearance: none;
  width: 15px;
  height: 15px;
  background-color: #4c5cbc;
  border-radius: 50%;
  pointer-events: auto;
}
</style>
