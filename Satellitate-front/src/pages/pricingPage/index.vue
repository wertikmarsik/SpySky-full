<template>
  <div class="main-container" id="pricing-page">
    <Navbar />

    <!--============================= HERO BLOCK =============================-->

    <div class="hero-container">
      <div class="hero-overlay">
        <div>
          <img
            id="asteroid1"
            src="../../assets/background-textures/asteroid1.png"
          />
        </div>
        <div>
          <img
            id="asteroid2"
            src="../../assets/background-textures/asteroid2.png"
          />
        </div>
        <div>
          <img
            id="asteroid3"
            src="../../assets/background-textures/asteroid3.png"
          />
        </div>
        <div class="hero-nav">
          <div id="header">Pricing</div>
          <p>
            Stay engaged with us by subscribing to one of our plans. Receive the
            additional features and tools to make your experience on our web app
            better.
          </p>
        </div>
      </div>
      <planetModel />
    </div>

    <!-- =================== PLANS BLOCK ======================================= -->

    <div id="plans-block">
      <div class="block-header">
        <div class="block-count">01.</div>
        <div class="header-container">
          <p class="header-mid">SUBSCRIPTION PLANS</p>
        </div>
        <p>
          We offer users free access to its online system with limited
          functionality. Alternatively, users have the option to subscribe to
          one of the paid plans to unlock enhanced features and capabilities.
        </p>
      </div>
      <div class="plans-container">
        <div class="plan-card">
          <div class="plan-name">
            <div class="header">Demo version</div>
            <p>Free</p>
          </div>
          <div class="info-container">
            <div class="info-list">
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
                Limited functionality
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
                No code provided
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
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
                <img src="../../assets/icons/star-bullet.svg" />
                Extended functionality
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
                All code provided
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
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
                <img src="../../assets/icons/star-bullet.svg" />
                Extended functionality
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
                All code provided
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
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
                <img src="../../assets/icons/star-bullet.svg" />
                Extended functionality
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
                All code provided
              </div>
              <div>
                <img src="../../assets/icons/star-bullet.svg" />
                Set up to <span>50</span> notifications
              </div>
            </div>
            <a href="#">Learn more</a>
            <button class="fill">Get the plan</button>
          </div>
        </div>
      </div>
    </div>

    <!-- =================== CONTACT US BLOCK ======================================= -->

    <div id="contact-us-block">
      <div id="contact-us-background"></div>
      <div class="block-header">
        <div class="block-count">02.</div>
        <div class="header-container">
          <p class="header-mid">Contact us</p>
        </div>
        <p>
          Contact us via our mail address@gmail.com if you have any questions.
          Also, sign up for updates.
        </p>
      </div>
      <form id="short-form">
        <input type="text" placeholder="Your email" />
        <button class="fill">Sign up for the updates</button>
      </form>
    </div>

    <Footer />
  </div>
</template>

<script>
import Navbar from "../components/navbar.vue";
import Footer from "../components/footer.vue";
import planetModel from "../components/planetScript.vue";

export default {
  name: "pricing-page",
  components: {
    Navbar,
    Footer,
    planetModel,
  },
};
</script>

<style>
#plans-block {
  margin-top: 10px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

#plans-block .plans-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
  row-gap: 3.5rem;
  column-gap: 2rem;
  margin-bottom: 120px;
}

#plans-block .plans-container > .plan-card {
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

#plans-block .plans-container > .plan-card:nth-child(1) {
  background-image: url("../../assets/background-textures/demo-plan.png");
}

#plans-block .plans-container > .plan-card:nth-child(2) {
  background-image: url("../../assets/background-textures/develop-plan.png");
}

#plans-block .plans-container > .plan-card:nth-child(3) {
  background-image: url("../../assets/background-textures/premium-plan.png");
}

#plans-block .plans-container > .plan-card:nth-child(4) {
  background-image: url("../../assets/background-textures/ultra-plan.png");
}

#plans-block .plans-container > .plan-card .info-container {
  background-color: black;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 30px 30px 35px 30px;
  box-sizing: border-box;
}

#plans-block .info-container .info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 40px;
}

#plans-block .info-container .info-list div {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

#plans-block .info-container a {
  color: #ffc8c2;
  font-weight: 600;
}

#plans-block .info-container button {
  margin-top: 30px;
}

#plans-block .plan-name {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 20px 30px;
  align-items: center;
}

#plans-block .plan-name .header {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 130%;
  text-transform: uppercase;
}

#plans-block .plan-name p {
  font-size: 1rem;
  font-weight: 700;
}
</style>
