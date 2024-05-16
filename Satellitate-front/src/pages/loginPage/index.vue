<template>
  <div id="overlay-login">
    <Navbar />
    <div id="form-container-login">
      <div id="log-header">Log in</div>
      <form>
        <div>
          <div>
            <input
              type="text"
              id="email"
              v-model="email"
              placeholder="Email"
              required
            />
          </div>
          <div>
            <div class="password-input">
              <input
                type="password"
                id="password"
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
            <div id="link-container">
              <a href="#" id="forgot-password">Forgot password?</a>
            </div>
          </div>
        </div>

        <div class="buttons">
          <router-link to="/welcome" id="no-underline">
            <input
              type="submit"
              @click="loginUser"
              value="Log in"
              id="login-button"
              class="fill"
            />
          </router-link>
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
        <div id="signup-link-container">
          <p id="signup-link">
            Don't have an account?
            <router-link to="/" id="no-underline">
              <span>Sign up</span>
            </router-link>
          </p>
        </div>
      </form>
    </div>
  </div>
  <planetModel />
</template>

<script>
import { ref, onMounted } from "vue";

import planetModel from "../components/planetScriptLog.vue";
import Navbar from "../components/navbar.vue";
import axios from "axios";


const url = "https://famous-plexus-417323.lm.r.appspot.com/";

export default {
  name: "login-page",
  components: {
    planetModel,
    Navbar,
  },

  data() {
    return {
      email: "",
      password: "",
    };
  },

  setup() {
    const input = ref(null);

    onMounted(() => {
      input.value = document.getElementById("password");
    });

    return { input };
  },

  methods: {
    async loginUser() {
      await axios
        .post(`${url}/users/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          document.cookie = `token=${res.data}; path=/`;
        })
        .catch((e) => {
          alert(e.message);
        });
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
};
</script>

<style>
#overlay-login {
  z-index: 10000;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#overlay-login div > input::placeholder {
  color: white;
}

#form-container-login {
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

#form-container-login form > div,
#form-container-login form {
  display: flex;
  flex-direction: column;
}

#form-container-login form {
  gap: 40px;
  width: 100%;
}

#form-container-login form > div {
  gap: 24px;
}

#form-container-login #login-button {
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
}

#form-container-login #login-button {
  box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.4);
}

#form-container-login #login-button:hover {
  box-shadow: 0 0 10px 0 rgba(27, 74, 143, 0.8);
}

#form-container-login .buttons {
  display: flex;
  flex-direction: row;
  gap: 40px;
  justify-content: center;
}

#form-container-login #socials {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

#form-container-login #socials img {
  height: 25px;
}

#form-container-login #log-header {
  font-size: 24px;
  font-weight: 700;
  text-transform: uppercase;
  line-height: 130%;
}

#form-container-login form .password-input input,
#form-container-login form #email {
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

#form-container-login #link-container {
  width: 100%;
  text-align: end;
  margin-top: 20px;
}

#forgot-password {
  font-size: 20px;
  font-weight: 400;
  text-decoration: none;
}

#signup-link {
  font-size: 16px;
  font-weight: 700;
  text-decoration: none;
}

#signup-link-container {
  width: 100%;
  text-align: center;
}

#signup-link-container span {
  color: #ff8c71;
  font-weight: 700;
}

#form-container-login .password-input {
  position: relative;
}

#form-container-login .password-input img {
  position: absolute;
  right: 20px;
  bottom: 20px;
  filter: invert(100%);
  width: 25px;
  cursor: pointer;
}

#form-container-login #forgot-password {
  color: white;
  font-size: 16px;
  font-weight: 500;
  line-height: 150%;
}
</style>
