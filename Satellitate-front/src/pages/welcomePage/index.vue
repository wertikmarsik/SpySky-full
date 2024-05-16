<template>
  <div class="main-container" id="welcome-page">
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
          <div id="header">Welcome to SpySky</div>
          <p>
            We dream of a time when space is free from junk, and that's what
            SpySky is all about. We watch satellites and space junk really
            closely, and we share all that info with space agencies, big
            companies, and anyone who loves space.
          </p>
          <div class="nasa-data">
            <img src="../../assets/icons/nasa_logo.png" alt="nasa-logo" />
            <p>Based on NASA open data</p>
          </div>
          <router-link to="/our-tools" id="no-underline"
            ><button class="fill">
              <img src="../../assets/icons/arrow.svg" /> Explore our tools
            </button></router-link
          >
        </div>
      </div>
      <planetModel />
    </div>

    <!--============================= ABOUT US BLOCK =============================-->

    <div id="about-us-block">
      <div id="about-us-background"></div>
      <div id="left-side">
        <img id="junk1" src="../../assets/background-textures/junk1.png" />
        <img id="junk2" src="../../assets/background-textures/asteroid1.png" />
        <img
          id="astronaut"
          src="../../assets/background-textures/astronaut.png"
        />
      </div>
      <div id="right-side">
        <div class="block-count">01.</div>
        <div class="header-container">
          <p class="header-mid">About Us</p>
        </div>
        <div id="paragraphs">
          <p>
            The SpySky project allows you to track space debris and detect
            danger on Earth orbit using NASA open data. Thanks to our system, it
            is possible to determine the level of danger and accumulation of
            debris.
          </p>
          <p>
            Our product will be relevant for those interested in space and
            astronomy. The visualization of NASA open data will also help in
            exploring the Earth and other objects around the Earth. Moreover, it
            can be helpful for specialists of the space industry.
          </p>
        </div>
        <router-link to="/about-us" id="no-underline"
          ><button class="fill">More about us</button></router-link
        >
      </div>
    </div>

    <!--============================= OUR MISSION BLOCK =============================-->

    <div id="our-mission-block">
      <div class="block-header">
        <div class="block-count">02.</div>
        <div class="header-container">
          <p class="header-mid">Our mission</p>
        </div>
        <p>
          We give people the opportunity to detect space debris in Earth orbit.
          Thanks to our online system, it will be possible to determine the
          level of danger in orbit.
        </p>
        <router-link to="/our-mission" id="no-underline"
          ><button class="fill">More about our goals</button></router-link
        >
      </div>
      <div class="our-mission-container">
        <div class="our-goals">
          <div id="goal">
            <div>
              <div id="bullet"></div>
              <p id="goal-header">Space debris tracking</p>
            </div>
            <p>
              We help to track the movement of space debris and visualize areas
              with the biggest amount of junk and danger.
            </p>
          </div>
          <div id="goal">
            <div>
              <div id="bullet"></div>
              <p id="goal-header">Threats identifying</p>
            </div>
            <p>
              We detect and display unauthorized objects in space to help in
              identifying possible threats and incorrect maneuvers, which will
              allow taking measures to avoid them.
            </p>
          </div>
          <div id="goal">
            <div>
              <div id="bullet"></div>
              <p id="goal-header">Regular Analysis</p>
            </div>
            <p>
              We ensure the safety of the satellites from space debris by
              monitoring and analysis of the space debris movement. 
            </p>
          </div>
        </div>
        <div class="our-mission-decor-container">
          <img class="moon" src="../../assets/background-textures/moon.png" />
        </div>
      </div>
    </div>

    <!--============================= QUOTE BLOCK =============================-->

    <div id="quote-block">
      <div id="blue-line"></div>
      <p>
        “That's one <span id="pink-font">small step</span> for a man, one
        <span id="pink-font">giant leap</span> for mankind.”
      </p>
    </div>

    <!--============================= SPYSKY TEAM BLOCK =============================-->

    <div id="our-team-block">
      <div class="block-header">
        <div class="block-count">03.</div>
        <div class="header-container">
          <p class="header-mid">SpySky team</p>
        </div>
        <p>
          SpySky team is a dynamic and collaborative group. With diverse skills
          and knoledge, we work together seamlessly to achieve excellence and
          drive innovation in our respective fields.
        </p>
        <router-link to="/our-team" id="no-underline"
          ><button class="fill">More about our team</button></router-link
        >
      </div>
      <div class="team-cards">
        <div>
          <div class="member-photo" id="dasha"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/design.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Designer</p>
              <p class="member-name">Darina Mamokina</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="liza"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/front-end.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Front-end developer</p>
              <p class="member-name">Liza Humnytska</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="sviat"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/back-end.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Back-end developer</p>
              <p class="member-name">Sviatoslav Strubytskyi</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="taras"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/pm.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Project manager</p>
              <p class="member-name">Taras Hmaruk</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="oleksandr"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/de.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Data Engineer</p>
              <p class="member-name">Oleksandr Prosymiak</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="maks"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/ml.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">ML Engineer</p>
              <p class="member-name">Maksym Kahadii</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="anastasia"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/mentor-ana.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Mentor</p>
              <p class="member-name">Anastasia Deineko</p>
            </div>
          </div>
        </div>

        <div>
          <div class="member-photo" id="denis"></div>
          <div class="all-info">
            <div class="square">
              <img src="../../assets/icons/mentor-den.svg" alt="pc" />
            </div>
            <div class="member-info">
              <p class="team-role">Mentor</p>
              <p class="member-name">Denis Savenkov</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!--============================= PRICING BLOCK =============================-->

    <div class="pricing-block">
      <div class="block-header">
        <div class="block-count">04.</div>
        <div class="header-container">
          <p class="header-mid">Pricing</p>
        </div>
        <p>
          We offer users free access to its online system with limited
          functionality. Alternatively, users have the option to subscribe to
          one of the paid plans to unlock enhanced features and capabilities.
        </p>
        <router-link to="/pricing" id="no-underline"
          ><button class="fill">See plans</button></router-link
        >
      </div>

      <div class="plans-container">
        <div class="plan-card">
          <img src="../../assets/icons/free-subscription.svg" alt="" />
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
          <img src="../../assets/icons/paid-subscription.svg" alt="" />
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
      </div>
    </div>

    <!-- =================== CONTACT US BLOCK ======================================= -->

    <div id="contact-us-block">
      <div id="contact-us-background"></div>
      <div class="block-header">
        <div class="block-count">05.</div>
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
  name: "welcome-page",
  components: {
    Navbar,
    Footer,
    planetModel,
  },
};
</script>

<style>
/*==================== ABOUT US BLOCK ==============================*/

#welcome-page #about-us-block {
  width: 100%;
  height: fit-content;
  margin: 100px 0 100px 0;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  flex-direction: row;
  gap: 10%;
  position: relative;
  padding: 110px 0;
}

#welcome-page #about-us-block #about-us-background {
  position: absolute;
  left: -150px;
  top: 0px;
  bottom: 0px;
  z-index: 0;
  border-top: 2px solid #00142d;
  border-bottom: 2px solid #00142d;
  background-image: url("../../assets/background-textures/space-bg.png");
  width: 100vw;
  height: 100%;
  background-attachment: fixed;
}

#welcome-page #about-us-block > div {
  display: flex;
  flex-direction: column;
  gap: 25px;
}

#welcome-page #about-us-block #paragraphs {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

#welcome-page #about-us-block #left-side {
  width: 50%;
  position: relative;
  display: flex;
}

#welcome-page #about-us-block #junk1 {
  position: absolute;
  width: 220px;
  bottom: 0;
  right: 50%;
}

#welcome-page #about-us-block #junk2 {
  position: absolute;
  left: 0;
  width: 130px;
  top: 0;
  transform: rotate(70deg);
}

#welcome-page #about-us-block #astronaut {
  position: absolute;
  width: 330px;
  right: 10%;
  transition: 1s;
  z-index: 1000;
  cursor: pointer;
}

#welcome-page #about-us-block #astronaut:hover {
  right: 5%;
  transform: rotate(5deg);
}

#welcome-page #about-us-block #right-side {
  width: 50%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

/*======================== OUR MISSION BLOCK ================================*/

#our-mission-block .our-mission-container {
  display: flex;
  flex-direction: row;
  gap: 60px;
}

#our-mission-block .block-header {
  margin-bottom: 4rem;
}

#our-mission-block .our-goals {
  width: 50%;
  text-align: left;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  position: relative;
  z-index: 1000;
}

#our-mission-block .our-goals #goal {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  background-color: black;
  border-radius: 0.5rem;
  box-sizing: border-box;
  padding: 1.75rem;
  cursor: pointer;
  transition: 1s;
  border: 2px solid #00142d;
}

#our-mission-block .our-goals #goal:hover {
  transform: translate(40px, 0);
  border: 2px solid #4c5cbc;
}

#goal #bullet {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.5rem;
  background-color: black;
  border: 2px solid #4c5cbc;
  transition: 1s;
}

#our-mission-block .our-goals #goal:hover #bullet {
  background-color: #4c5cbc;
}

#goal #goal-header {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 130%;
  text-transform: uppercase;
}

#goal > div {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.our-mission-decor-container {
  position: relative;
  width: 50%;
}

.our-mission-decor-container .moon {
  position: absolute;
  right: -600px;
  top: 20px;
  z-index: 10;
  width: 190%;
}

/*============================= QUOTE BLOCK ====================================*/

#quote-block {
  font-size: 6rem;
  font-weight: 400;
  line-height: 130%;
  box-sizing: border-box;
  height: fit-content;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 3rem;
  margin: 150px 0 100px 0;
  z-index: 1000;
  position: relative;
}

#quote-block #pink-font {
  color: #ffc8c2;
  font-weight: 700;
}

#quote-block #blue-line {
  align-self: stretch;
  width: 0.25rem;
  border-radius: 1rem;
  background: #4c5cbc;
}

/*=========================== SPYSKY TEAM =======================================*/

#our-team-block {
  margin-bottom: 120px;
}

#our-team-block .block-header {
  margin-bottom: 4rem;
}

.team-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: repeat(2, 1fr);
  column-gap: 3rem;
  row-gap: 4.75rem;
  box-sizing: border-box;
  width: 100%;
  padding-top: 30px;
  cursor: pointer;
}

.team-cards > div {
  border: 2px solid #00142d;
  border-radius: 0.5rem;
  display: flex;
  box-sizing: border-box;
  transition: 1s;
  background-color: black;
  width: 100%;
  height: 100%;
  flex-direction: column;
  overflow: hidden;
}

.team-cards > div:hover {
  border: 2px solid #4c5cbc;
  transform: translate(0, -30px);
}

.team-cards > div .member-photo {
  width: 100%;
  border-radius: 6px;
  height: 250px;
  background-size: cover;
  background-repeat: no-repeat;
}

.team-cards .square {
  box-sizing: border-box;
  background-color: black;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0.5rem;
  margin-left: -10px;
}

.team-cards .square img {
  height: 40px;
  width: 40px;
}

.team-cards .all-info {
  margin: 0 1.5rem 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: -30px;
}

.member-info {
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
}

.team-role {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 150%;
  text-transform: uppercase;
}

.member-name {
  font-size: 1.125rem;
  font-weight: 400;
  line-height: 150%;
}

/*================== MEMBERS' PHOTOS =============================*/

#dasha {
  background-image: url("../../assets/members/dasha.jpg");
  background-position: 0 30%;
}

#liza {
  background-image: url("../../assets/members/liza.jpg");
  background-position: 0 45%;
}

#sviat {
  background-image: url("../../assets/members/sviat.jpg");
}

#taras {
  background-image: url("../../assets/members/taras.jpg");
  background-position: 0 45%;
}

#maks {
  background-image: url("../../assets/members/maks.jpg");
  background-position: 0 75%;
}

#oleksandr {
  background-image: url("../../assets/members/oleksandr.jpg");
  background-position: 0 45%;
}

#anastasia {
  background-image: url("../../assets/members/anastasia.jpg");
  background-position: 0 45%;
}

#denis {
  background-image: url("../../assets/members/denis.jpg");
  background-position: 0 45%;
}

/*============================= PRICING BLOCK ===================================*/

.pricing-block {
  display: grid;
  grid-template-columns: 1fr 1.75fr;
  grid-template-rows: repeat(1, 1fr);
  column-gap: 5rem;
  box-sizing: border-box;
  width: 100%;
  margin-bottom: 150px;
}

.pricing-block .block-header {
  align-items: flex-start;
  text-align: left;
  margin: 0;
  justify-content: center;
  width: 80%;
}

#welcome-page .plans-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(1, 1fr);
  column-gap: 3rem;
}

#welcome-page .plans-container > .plan-card {
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
  position: relative;
}

#welcome-page .plans-container > .plan-card > img {
  position: absolute;
  top: 30px;
  left: 30px;
  height: 30px;
}

#welcome-page .plans-container > .plan-card:nth-child(1) {
  background-image: url("../../assets/background-textures/demo-plan.png");
}

#welcome-page .plans-container > .plan-card:nth-child(2) {
  background-image: url("../../assets/background-textures/develop-plan.png");
}
#welcome-page .plans-container > .plan-card .info-container {
  background-color: black;
  border-top-right-radius: 20px;
  border-top-left-radius: 20px;
  padding: 30px 30px 35px 30px;
  box-sizing: border-box;
}

#welcome-page .info-container .info-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
  font-size: 1rem;
  font-weight: 700;
  margin-bottom: 40px;
}

#welcome-page .info-container .info-list div {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

#welcome-page .info-container a {
  color: #ffc8c2;
  font-weight: 600;
}

#welcome-page .info-container button {
  margin-top: 30px;
}

#welcome-page .plan-name {
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  padding: 0 30px 20px 30px;
  align-items: center;
}

#welcome-page .plan-name .header {
  font-size: 1.25rem;
  font-weight: 700;
  line-height: 130%;
  text-transform: uppercase;
}

#welcome-page .plan-name p {
  font-size: 1rem;
  font-weight: 700;
}
</style>
