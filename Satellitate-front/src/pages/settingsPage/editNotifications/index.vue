<template>
  <div id="settings-container">
    <Navbar />

    <!-- ============================= CONTENT ============================= -->

    <div id="main-container" v-if="isData">
      <SettingsNavbar
        :data="{
          email: this.email,
          first_name: this.first_name,
          last_name: this.last_name,
        }"
      />

      <div id="notifications-container">
        <div class="settings-header">Notifications</div>

        <div class="forms-container">
          <div class="form-container">
            <div class="settings-header-mid">General</div>
            <p>How often would you like to receive email notifications?</p>
            <div class="link">
              <button>
                Payment information
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
            </div>
            <p>Send an email notification about:</p>
            <div class="checkboxes">
              <label class="checkbox-container"
                >Product updates and news
                <input type="checkbox" name="Updates" checked="checked" />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container"
                >Subscription and special deals
                <input type="checkbox" name="Deals" />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container"
                >Other iteresting information
                <input type="checkbox" name="Other" />
                <span class="checkmark"></span>
              </label>
            </div>
            <button class="fill">Save</button>
          </div>
          <div class="form-container">
            <div class="settings-header-mid">Space objects activity</div>
            <p>Send an email notification when:</p>
            <div class="checkboxes">
              <label class="checkbox-container"
                >Lorem ipsum dolor sit amet
                <input type="checkbox" checked="checked" />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container"
                >Lorem ipsum dolor
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container"
                >Lorem ipsum dolor sit amet
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container"
                >Lorem ipsum
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <label class="checkbox-container"
                >Lorem ipsum dolor
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
            </div>
            <button class="fill">Save</button>
          </div>
          <div class="form-container">
            <div class="settings-header-mid">Tracked objects list</div>
            <p>
              Manage space objects you would like to track. See full list of
              tracked objects below.
            </p>
            <div class="link">
              <button>
                List of all tracked objects
                <div>
                  <img src="../../../assets/icons/arrow-link.svg" alt="" />
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <Footer v-if="isData"/>
  </div>
</template>

<script>
import Navbar from "../../components/navbar.vue";
import SettingsNavbar from "../../components/settingsNavbar.vue";
import Footer from "../../components/footer.vue";
import { jwtDecode } from "jwt-decode";

export default {
  name: "editNotifications-page",
  components: {
    Navbar,
    SettingsNavbar,
    Footer,
  },

  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      cookie: "",
    };
  },

  computed: {
    isData() {
      return this.email !== ""; 
    }
  },

  methods: {
    fetchUserData() {
      if (this.cookie) {
        const token = document.cookie
        .split("; ")
        .find((cookie) => cookie.startsWith("token="))
        .split("=")[1];
        const decoded = jwtDecode(token);
        this.first_name = decoded.first_name;
        this.last_name = decoded.last_name;
        this.email = decoded.email;
        console.log(this.first_name);
      }
    },
  },
  mounted() {
    this.cookie = document.cookie;
    console.log("r", this.cookie);
    this.fetchUserData();
  },
};
</script>

<style>
/*===================== GENERAL STYLES ===========================*/

#notifications-container {
  width: 55%;
  height: 100%;
  box-sizing: border-box;
}

#notifications-container .form-container .link button {
  padding: 20px;
  border-radius: 0.5rem;
  border: 0;
  background-color: #000e1f;
  color: white;
  outline: none;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  transition: 0.5s;
  font-weight: 700;
  font-size: 1rem;
}

#notifications-container .form-container .link button:hover {
  box-shadow: none;
  background-color: #011932;
}

#notifications-container .checkboxes {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

#notifications-container .checkbox-container {
  position: relative;
  padding-left: 41px;
  cursor: pointer;
  user-select: none;
}

#notifications-container .checkbox-container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

#notifications-container .checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 20px;
  width: 20px;
  border-radius: 0.4rem;
  background: none;
  border: 2px solid white;
  transition: 0.3s;
}

#notifications-container .checkbox-container input:checked ~ .checkmark {
  background-color: #4c5cbc;
  border: 2px solid #4c5cbc;
}

#notifications-container .checkbox-container:hover input ~ .checkmark {
  border: 2px solid #4c5cbc;
}

#notifications-container .checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
</style>
