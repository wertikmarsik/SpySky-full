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

      <div id="pricing-container">
        <div class="settings-header">Available plans</div>
        <div class="plans-container">
          <div class="plan-card">
            <div class="plan-name">
              <div class="header">Demo version</div>
              <p>Free</p>
            </div>
            <div class="info-container">
              <div class="info-list">
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  Limited functionality
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  No code provided
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  No access to notifications
                </div>
              </div>
              <a href="#">Learn more</a>
              <button class="stroke">Cancel the plan</button>
            </div>
          </div>

          <div class="plan-card">
            <div class="plan-name">
              <div class="header">Development version</div>
              <p>10$/month</p>
            </div>
            <div class="info-container">
              <div class="info-list">
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  Extended functionality
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  All code provided
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  No access to notifications
                </div>
              </div>
              <a href="#">Learn more</a>
              <button class="fill">Get the plan</button>
            </div>
          </div>

          <div class="plan-card">
            <div class="plan-name">
              <div class="header">Premium</div>
              <p>12$/month</p>
            </div>
            <div class="info-container">
              <div class="info-list">
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  Extended functionality
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  All code provided
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  Set up to <span>20</span> notifications
                </div>
              </div>
              <a href="#">Learn more</a>
              <button class="fill">Get the plan</button>
            </div>
          </div>

          <div class="plan-card">
            <div class="plan-name">
              <div class="header">Ultra</div>
              <p>15$/month</p>
            </div>
            <div class="info-container">
              <div class="info-list">
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  Extended functionality
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  All code provided
                </div>
                <div>
                  <img src="../../../assets/icons/star-bullet.svg" />
                  Set up to <span>50</span> notifications
                </div>
              </div>
              <a href="#">Learn more</a>
              <button class="fill">Get the plan</button>
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
      selectedCountry: "",
      countries: [],
      first_name: "",
      last_name: "",
      email: "",
    };
  },

  computed: {
    isData() {
      return this.email !== ""; 
    }
  },

  methods: {
    fetchUserData() {
      if (document.cookie) {
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
    this.fetchUserData();
  },
};
</script>

<style>
/*===================== GENERAL STYLES ===========================*/

#pricing-container {
  width: calc(100% - 350px);
  height: 100%;
  box-sizing: border-box;
}

#pricing-container .plans-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 3.5rem;
  column-gap: 2rem;
}

#pricing-container .plans-container > .plan-card {
  border-radius: 0.5rem;
  width: 100%;
  box-sizing: border-box;
  background-repeat: no-repeat;
  background-size: 100%;
  border: 2px solid #4c5cbc;
  overflow: hidden;
  height: 480px;
  display: flex;
  flex-direction: column;
  justify-content: end;
}

#pricing-container .plans-container > .plan-card:nth-child(1) {
  background-image: url("../../../assets/background-textures/demo-plan.png");
}

#pricing-container .plans-container > .plan-card:nth-child(2) {
  background-image: url("../../../assets/background-textures/develop-plan.png");
}

#pricing-container .plans-container > .plan-card:nth-child(3) {
  background-image: url("../../../assets/background-textures/premium-plan.png");
}

#pricing-container .plans-container > .plan-card:nth-child(4) {
  background-image: url("../../../assets/background-textures/ultra-plan.png");
}

#pricing-container .plans-container > .plan-card .info-container {
  background-color: black;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 30px 30px 35px 30px;
  box-sizing: border-box;
}

#pricing-container .info-container .info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 40px;
}

#pricing-container .info-container .info-list div {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

#pricing-container .info-container a {
  color: #ffc8c2;
  font-weight: 600;
}

#pricing-container .info-container button {
  margin-top: 30px;
}

#pricing-container .plan-name {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 20px 30px;
  align-items: center;
}

#pricing-container .plan-name .header {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 130%;
  text-transform: uppercase;
}

#pricing-container .plan-name p {
  font-size: 1rem;
  font-weight: 700;
}
</style>
