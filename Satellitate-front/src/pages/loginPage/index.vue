<template>
  <div id="overlay-login">
    <div id="form-container-login">
      <div id="log-header">Log in</div>
      <div id="error">{{ error }}</div>
      <form @submit.prevent="loginUser">
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
              <svg
                class="visibilityButton"
                @click="changeVisibility('input')"
                :class="{ 'visible': isPasswordShown }"
              />
            </div>
            <div id="link-container">
              <a href="#" id="forgot-password">Forgot password?</a>
            </div>
          </div>
        </div>

        <div class="buttons">
            <button
              id="login-button"
              class="fill"
            >Log in</button>
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
            <router-link to="/signup" id="no-underline">
              <span>Sign up</span>
            </router-link>
          </p>
        </div>
      </form>
    </div>
    <!-- <planetModel /> -->
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from 'vue-router';

// import planetModel from "../components/planetScriptLog.vue";
import axios from "axios";


const url = "https://famous-plexus-417323.lm.r.appspot.com/";

export default {
  name: "login-page",
  components: {
    // planetModel
  },

  data() {
    return {
      email: "",
      password: "",
      error: "",
      router: useRouter(),
      isPasswordShown: false
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
      await axios.post(`${url}/users/login`, {
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          document.cookie = `token=${res.data}; path=/`;
          this.router.push('/');
        })
        .catch((e) => {
          this.error = "You have passed wrong email or password!";
        })
    },

    changeVisibility(reference) {
      const inputRef = this.$refs[reference];
      
        if (inputRef.type === "password") {
          inputRef.type = "text";
          this.isPasswordShown = true;
        } else {
          inputRef.type = "password";
          this.isPasswordShown = false;
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
  box-sizing: border-box;
  position: relative;
}

#overlay-login div > input::placeholder {
  color: white;
}

#form-container-login {
  position: relative;
  z-index: 1000;
  box-sizing: border-box;
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

#form-container-login input:-webkit-autofill,
#form-container-login input:-webkit-autofill:hover, 
#form-container-login input:-webkit-autofill:focus, 
#form-container-login input:-webkit-autofill:active{
  color : rgb(255, 255, 255) !important;
  -webkit-text-fill-color: rgb(255, 255, 255) !important;
  transition: background-color 500000s;
}

#form-container-login #link-container {
  width: 100%;
  text-align: end;
}

#signup-link {
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

#form-container-login .visibilityButton {
  position: absolute;
  width: 25px;
  height: 25px;
  right: 20px;
  bottom: 20px;
  filter: invert(100%);
  cursor: pointer;
  background-image: url("../../assets/icons/eye-slash.svg");
  background-size: contain;
}

#form-container-login .visible {
  background-image: url("../../assets/icons/eye.svg");
}

#form-container-login #forgot-password {
  color: white;
  line-height: 150%;
  font-weight: 400;
  text-decoration: none;
}

#error {
  color: #ff8c71;
  font-size: 20px;
  font-weight: 700;
}


/*============================= RESPONSIVENESS ======================================*/

/*=============================== 0 - 600 px ========================================*/

@media only screen and (min-width: 0px) and (max-width: 600px){
  #overlay-login {
    padding: 0px 5%;
  }
    
  #form-container-login {
    width: 100%;
    padding: 25px 25px 50px;
  }
  
  #form-container-login #login-button {
    width: 100%;
  }
  
  #form-container-login .buttons {
    flex-direction: column;
    width: 100%;
    gap: 24px;
  }
  
  #form-container-login #socials button {
    width: 100%;
  }
  
  #form-container-login form .password-input input,
  #form-container-login form #email {
    font-size: 18px;
  }
  
  #form-container-login #link-container {
    margin-top: 30px;
  }

  #signup-link {
    font-size: 20px;
  }
  
  #form-container-login #forgot-password {
    font-size: 20px;
  }
}

/*=============================== 601 - 904 px ========================================*/

@media only screen and (min-width: 601px) and (max-width: 904px){
  #overlay-login {
    padding: 0px 7%;
  }
    
  #form-container-login {
    width: 100%;
    padding: 35px 35px 60px;
  }
    
  #form-container-login #login-button {
    width: fit-content;
  }
  
  #form-container-login .buttons {
    flex-direction: row;
    width: 100%;
  }
  
  #form-container-login #socials button {
    width: fit-content;
  }
  
  #form-container-login form .password-input input,
  #form-container-login form #email {
    font-size: 18px;
  }
  
  #form-container-login #link-container {
    margin-top: 30px;
  }

  #signup-link {
    font-size: 18px;
  }
  
  #form-container-login #forgot-password {
    font-size: 18px;
  }
}

/*=============================== 905 - 1238 px ========================================*/

@media only screen and (min-width: 905px) and (max-width: 1238px){
  #form-container-login {
    width: 65%;
    padding: 40px 50px 60px 50px;
  }
    
  #form-container-login #login-button {
    width: fit-content;
  }
  
  #form-container-login .buttons {
    flex-direction: row;
  }
  
  #form-container-login #socials button {
    width: fit-content;
  }
  
  #form-container-login form .password-input input,
  #form-container-login form #email {
    font-size: 16px;
  }
  
  #form-container-login #link-container {
    margin-top: 20px;
  }

  #signup-link {
    font-size: 16px;
  }
  
  #form-container-login #forgot-password {
    font-size: 16px;
  }
}

/*=============================== 1239+ px ========================================*/

@media only screen and (min-width: 1239px) {
  #form-container-login {
    width: 55%;
    padding: 40px 90px 70px 90px;
  }
    
  #form-container-login #login-button {
    width: fit-content;
  }
    
  #form-container-login .buttons {
    flex-direction: row;
  }
  
  #form-container-login #socials button {
    width: fit-content;
  }
  
  #form-container-login form .password-input input,
  #form-container-login form #email {
    font-size: 16px;
  }
  
  #form-container-login #link-container {
    margin-top: 20px;
  }
  
  #signup-link {
    font-size: 16px;
  }

  #form-container-login #forgot-password {
    font-size: 16px;
  }
}

</style>
