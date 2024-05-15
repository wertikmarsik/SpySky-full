<template>
  <div id="settings-container">
    <Navbar />

    <!-- ============================= CONTENT ============================= -->

    <div id="main-container">
      <SettingsNavbar
        :data="{
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
        }"
      />
      <div id="profile-container">
        <div class="settings-header">Edit profile</div>
        <div id="profile-photo-change">
          <div>
            <img src="../../../assets/icons/test_profile_photo.png" alt="" />
          </div>
          <div>
            <button class="fill">Change the photo</button>
            <button class="stroke">Delete the photo</button>
          </div>
        </div>
        <div class="forms-container">
          <div class="form-container">
            <div class="settings-header-mid">Personal information</div>
            <form>
              <input
                type="text"
                placeholder="First name"
                v-model="first_name"
              />
              <input type="text" placeholder="Last name" v-model="last_name" />
              <input type="text" placeholder="Email address" v-model="email" />
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
            </form>
            <button class="fill" @click="updatePersonalInfo">
              Save the information
            </button>
          </div>
          <div class="form-container">
            <div class="settings-header-mid">Password</div>
            <form class="password-container">
              <div class="password-input">
                <input
                  type="password"
                  class="password"
                  v-model="oldPassword"
                  ref="input"
                  placeholder="Old password"
                  required
                />
                <img
                  src="../../../assets/icons/eye.svg"
                  @click="changeVisibility('input')"
                />
              </div>
              <div class="password-input">
                <input
                  type="password"
                  class="password"
                  v-model="newPassword"
                  ref="inputConfirm"
                  placeholder="New password"
                  required
                />
                <img
                  src="../../../assets/icons/eye.svg"
                  @click="changeVisibility('inputConfirm')"
                />
              </div>
            </form>
            <p>
              The password should be a minimum of 8 characters long, containing
              at least one uppercase letter and one number in it.
            </p>
            <button class="fill" @click="updatePassword">
              Change your password
            </button>
          </div>
          <div class="form-container">
            <div class="settings-header-mid">Payment details</div>
            <div class="links">
              <button>
                <div>
                  <img src="../../../assets/icons/payment.svg" alt="" />
                  Payment information
                </div>
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
              <button>
                <div>
                  <img src="../../../assets/icons/history.svg" alt="" />
                  Payment history
                </div>
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
              <button>
                <div>
                  <img src="../../../assets/icons/details.svg" alt="" />
                  Subscription details
                </div>
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
            </div>
          </div>
          <div class="form-container">
            <div class="settings-header-mid">
              Profile deletion & deactivation
            </div>
            <p>
              You can either temporarily deactivate your profile or permanently
              delete it. After the deletion, it will not be possible to get your
              account back.
            </p>
            <div class="links">
              <button @click="deactivateUser">
                Deactivate profile for 30 days
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
              <button id="delete-profile" @click="deleteUser">
                Delete profile
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../../components/navbar.vue";
import SettingsNavbar from "../../components/settingsNavbar.vue";
import Footer from "../../components/footer.vue";
import { onMounted, ref } from "vue";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const url = "http://localhost:8080";

export default {
  name: "editProfile-page",
  components: {
    Navbar,
    SettingsNavbar,
    Footer,
  },

  data() {
    return {
      selectedCountry: "",
      countries: [],
      first_name: "",
      last_name: "",
      email: "",
      oldPassword: "",
      newPassword: "",
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
    async deactivateUser() {
      await axios
        .post(`${url}/users/deactivate`, {
          email: this.email,
        })
        .then((res) => {
          alert(res.data);
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.$router.push("/login");
        })
        .catch((e) => {
          console.error(e.message);
        });
    },

    async deleteUser() {
      await axios
        .delete(`${url}/users/${this.email}`)
        .then((res) => {
          alert(res.data);
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.$router.push("/");
        })
        .catch((e) => {
          console.error(e.message);
        });
    },

    fetchUserData() {
      const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        .split("=")[1];
      const decoded = jwtDecode(token);
      this.first_name = decoded.first_name;
      this.last_name = decoded.last_name;
      this.email = decoded.email;
      console.log(this.first_name);
    },

    async updatePersonalInfo() {
      await axios
        .put(`${url}/users/profile`, {
          first_name: this.first_name,
          last_name: this.last_name,
          email: this.email,
          country: this.findCountry(),
        })
        .then((res) => {
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          document.cookie = `token=${res.data}; path=/`;
        })
        .catch((e) => {
          console.error(e.message);
        });
    },
    async updatePassword() {
      await axios
        .put(`${url}/users/password`, {
          email: this.email,
          oldPassword: this.oldPassword,
          newPassword: this.newPassword,
        })
        .then((res) => {
          alert(res.data);
          document.cookie =
            "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
          this.$router.push("/login");
        })
        .catch((e) => {
          console.error(e.message);
        });
    },

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
    this.fetchUserData();
    this.getCountriesData();
  },
};
</script>

<style>
/*===================== GENERAL STYLES ===========================*/

#profile-container {
  width: 55%;
  height: 100%;
  box-sizing: border-box;
}

#profile-photo-change {
  display: flex;
  flex-direction: row;
  gap: 60px;
  align-items: center;
  margin: 0 0 50px;
}

#profile-photo-change img {
  width: 150px;
}

#profile-photo-change > div:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.form-container .password-container {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

.form-container .password-container .password-input {
  position: relative;
  width: 100%;
}

.form-container .password-container .password-input img {
  position: absolute;
  bottom: 20px;
  right: 20px;
  filter: invert(1);
  cursor: pointer;
}

.form-container form input,
.form-container form select,
.links button {
  padding: 20px;
  border-radius: 0.5rem;
  border: 0;
  background-color: #000e1f;
  color: white;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  appearance: none;
}

.links {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.links button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: 0.5s;
  font-weight: 700;
  font-size: 1rem;
}

.links button:hover {
  box-shadow: none;
  background-color: #011932;
}

.links button > div {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.links #delete-profile {
  color: #ff8c71;
}

.form-container form input::placeholder,
.form-container form select {
  color: #a1a1a1;
  font-weight: 700;
  font-size: 1rem;
}
</style>
