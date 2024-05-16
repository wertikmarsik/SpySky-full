<template>
  <div id="overlay-signup">
    <Navbar />
    <div id="form-container-signup">
      <div id="signup-header">Sign up</div>
      <form id="form-first" v-if="currentPage === 'page1'">
        <div>
          <div class="name-inputs">
            <input
              type="text"
              id="first-name"
              v-model="firstName"
              placeholder="First name"
            />
            <input
              type="text"
              id="last-name"
              v-model="lastName"
              placeholder="Last name"
            />
          </div>
          <div>
            <select id="country" v-model="selectedCountry">
              <option value="">Select a country</option>
              <option
                v-for="country in countries"
                :key="country.id"
                :value="country.id"
              >
                {{ country.country_name }}
              </option>
            </select>
          </div>
          <div>
            <input
              type="tel"
              id="phone-number"
              v-model="phone_number"
              placeholder="Phone number"
              pattern="+38-[0-9]{3}-[0-9]{3}-[0-9]{4}"
              required
            />
          </div>
        </div>

        <div class="buttons">
          <button
            id="next-button"
            class="fill"
            @click.prevent="changePage('page2')"
          >
            Next
          </button>
          <div id="socials">
            <button id="google" class="stroke">
              <img src="../../assets/icons/google.svg" alt="google" />
            </button>
            <button id="facebook" class="stroke">
              <img src="../../assets/icons/facebook.svg" alt="facebook" />
            </button>
            <button id="apple" class="stroke">
              <img src="../../assets/icons/apple.svg" alt="apple" />
            </button>
          </div>
        </div>
        <div id="login-link-container">
          <p id="login-link">
            Already have an account?
            <router-link to="/login" id="no-underline">
              <span>Log in</span>
            </router-link>
          </p>
        </div>
      </form>
      <form id="form-second" v-if="currentPage === 'page2'">
        <div>
          <div>
            <input type="text" id="email" v-model="email" placeholder="Email" />
          </div>
          <div class="password-input">
            <input
              type="password"
              class="password"
              v-model="password"
              ref="input"
              placeholder="Password"
              required
            />
            <img
              src="../../assets/icons/eye.svg"
              @click="changeVisibility('input')"
            />
          </div>
          <div class="password-input">
            <input
              type="password"
              class="password"
              ref="inputConfirm"
              placeholder="Confirm password"
              required
            />
            <img
              src="../../assets/icons/eye.svg"
              @click="changeVisibility('inputConfirm')"
            />
          </div>
        </div>
        <div class="buttons-second">
          <button id="back" class="stroke" @click.prevent="changePage('page1')">
            Back
          </button>
          <input
            type="submit"
            value="Sign up"
            id="signup-button"
            class="fill"
            @click.prevent="registerUser"
          />
        </div>
        <div id="login-link-container">
          <p id="login-link">
            Already have an account?
            <router-link to="/login" id="no-underline">
              <span>Log in</span>
            </router-link>
          </p>
        </div>
      </form>
      <form id="form-third" v-if="currentPage === 'page3'">
        <div id="confirm-email">
          <form>
            <label>Enter the confirmation code</label>
            <div id="code-input">
              <input
                type="text"
                placeholder="Enter code"
                v-model="confirmCode"
                id="code"
              />
            </div>
            <div>
              <button
                id="back"
                class="stroke"
                @click.prevent="changePage('page2')"
              >
                Back
              </button>
              <router-link to="/welcome" id="no-underline" @click="confirmUser">
                <input
                  type="submit"
                  id="signup-button"
                  class="fill"
                  value="Confirm email address"
                />
              </router-link>
            </div>
          </form>
        </div>
      </form>
    </div>
  </div>
  <planetModel />
</template>

<script>
import { onMounted, ref } from "vue";

import Navbar from "../components/navbar.vue";
import planetModel from "../components/planetScriptLog.vue";
import axios from "axios";

const url = "https://famous-plexus-417323.lm.r.appspot.com/";

export default {
  name: "signup-page",
  components: {
    Navbar,
    planetModel,
  },
  setup() {
    const input = ref(null);
    const inputConfirm = ref(null);

    onMounted(() => {
      input.value = document.getElementById("password");
      inputConfirm.value = document.getElementById("confirmPassword");
    });

    return { input, inputConfirm };
  },

  data() {
    return {
      currentPage: ref("page1"),
      selectedCountry: "",
      countries: [],
      firstName: "",
      lastName: "",
      country: "",
      phone_number: "",
      email: "",
      password: "",
      confirmCode: "",
    };
  },

  methods: {
    async getCountriesData() {
      await axios
        .get(`${url}/countries/`)
        .then((res) => {
          this.countries = res.data;
        })
        .catch((e) => {
          console.error(`Error fetching countries data: ${e.message}`);
        });
    },

    findCountry() {
      const c = this.countries.find(
        (country) => country.id === this.selectedCountry
      );
      return c.country_name;
    },

    async registerUser() {
      await axios
        .post(`${url}/users/register`, {
          first_name: this.firstName,
          last_name: this.lastName,
          country: this.findCountry(),
          phone_number: this.phone_number,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          document.cookie = `token=${res.data}; path=/`;
          this.changePage("page3");
        })
        .catch((e) => {
          console.error(`${e.message}`);
        });
    },

    async confirmUser() {
      await axios
        .post(`${url}/users/confirm`, {
          confirmationCode: this.confirmCode,
        })
        .then((res) => {
          console.log(res.data);
        })
        .catch((e) => {
          console.error(e.message);
        });
    },

    changePage(page) {
      this.currentPage = page;
    },

    changeVisibility(reference) {
      const inputRef = this.$refs[reference];

      if (inputRef.type === "password") {
        inputRef.type = "text";
      } else {
        inputRef.type = "password";
      }
    },
  },
  mounted() {
    this.getCountriesData();
  },
};
</script>

<style>
#overlay-signup {
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#overlay-signup div > input::placeholder {
  color: white;
}

#form-container-signup {
  position: relative;
  z-index: 1000;
  width: 55%;
  box-sizing: border-box;
  padding: 40px 90px 70px 90px;
  border-radius: 8px;
  background-color: rgba(0, 14, 31, 0.85);
  backdrop-filter: blur(16px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  color: white;
  font-family: "Exo 2", sans-serif;
  margin-top: 2%;
  border: 2px solid #00142d;
}

#form-container-signup form > div,
#form-container-signup form {
  display: flex;
  flex-direction: column;
}

#form-container-signup form {
  gap: 40px;
  width: 100%;
}

#form-container-signup form > div {
  gap: 24px;
}

#form-container-signup #signup-header {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 130%;
}

#form-container-signup .name-inputs input,
#form-container-signup #phone-number,
#form-container-signup #country,
#form-container-signup .password-input input,
#form-container-signup #email,
#form-container-signup #code {
  font-size: 16px;
  font-weight: 700;
  background-color: transparent;
  border: 0;
  border-bottom: 1px solid white;
  line-height: 100%;
  width: 100%;
  outline: none;
  color: white;
  padding: 20px;
  box-sizing: border-box;
}

#form-container-signup .password-input {
  position: relative;
}

#form-container-signup .password-input img {
  position: absolute;
  bottom: 20px;
  right: 20px;
  filter: invert(100%);
  width: 25px;
  cursor: pointer;
}

#form-container-signup .name-inputs {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

#form-container-signup #country:not(:first-of-type) {
  color: white;
}

#form-container-signup #country option {
  background: rgba(0, 0, 0, 0.3);
}

#form-container-signup .buttons,
#form-container-signup .buttons-second {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
}

#form-container-signup #socials {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

#form-container-signup #socials button {
  padding: 10px 25px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: 0.5s;
  background: none;
  border: 3px solid #4c5cbc;
}

#form-container-signup #socials img {
  height: 25px;
}

#login-link {
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
}

#login-link-container {
  width: 100%;
  text-align: center;
}

#login-link-container span {
  color: #ff8c71;
  font-weight: 700;
}

#signup-button {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
  display: flex;
  font-size: 20px;
  font-weight: 500;
  justify-content: center;
  align-items: center;
  line-height: 150%;
  border-radius: 8px;
  color: white;
  transition: 0.5s;
  font-family: "Exo 2", sans-serif;
  cursor: pointer;
  width: fit-content;
}

#signup-button:hover {
  box-shadow: 0 0 10px 0 rgba(65, 123, 211, 0.8);
}

#confirm-email {
  position: relative;
  z-index: 1000;
}

#confirm-email form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#confirm-email form > div {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 40px;
}

#confirm-email form #code-input {
  width: 100%;
}
</style>
