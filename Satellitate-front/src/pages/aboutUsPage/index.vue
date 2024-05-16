<template>
  <div class="main-container" id="about-us-page">
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
          <div id="header">About us</div>
          <p>
            We are dedicated to addressing the issue of space debris. Through
            advanced technology and collaboration, we raise awareness and
            promote responsible space practices.
          </p>
        </div>
      </div>
      <planetModel />
    </div>

    <!-- =================== OUR MISSIONS BLOCK ======================================= -->

    <div id="our-missions-block">
      <div id="missions-grid">
        <div class="mission-img"></div>
        <div class="mission-text">
          <div class="block-header">
            <div class="block-count">01.</div>
            <div class="header-container">
              <p class="header-mid">
                we inform people about the dangers of space
              </p>
            </div>
            <p>
              The danger of space debris is an important problem, but not many
              people know about it. We want to teach more people about it by
              spreading information. Our project aims to provide people with an
              online system that can find space junk and sort it based on how
              dangerous it is.
            </p>
            <p>
              We do not aim to resolve the complex issue of space debris, which
              is beyond our capability. Rather, we want to enhance awareness
              through the provision of visualizations. These visuals help people
              understand how serious the problem of space debris is, making it
              easier for everyone to become aware.
            </p>
          </div>
        </div>
        <div class="mission-text">
          <div class="block-header">
            <div class="block-count">02.</div>
            <div class="header-container">
              <p class="header-mid">use of machine learning</p>
            </div>
            <p>
              We do not just take raw data from NASA and use it directly.
              Instead, a machine learning engineer processes and analyzes the
              data to make it more useful for our project.
            </p>
          </div>
        </div>
        <div class="mission-img"></div>
      </div>
    </div>

    <!-- =================== OUR TEAM BLOCK ======================================= -->

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

    <!-- =================== CONTACT US BLOCK ======================================= -->

    <div id="contact-us-block">
      <div id="contact-us-background"></div>
      <div class="block-header">
        <div class="block-count">04.</div>
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
  name: "aboutUs-page",
  components: {
    Navbar,
    Footer,
    planetModel,
  },
};
</script>

<style>
#missions-grid .block-header {
  width: 100%;
}

#missions-grid .block-header p,
#missions-grid .block-header div {
  text-align: left;
  width: 100%;
}

#missions-grid {
  margin-top: 20px;
  margin-bottom: 90px;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: auto;
  row-gap: 3.5rem;
  column-gap: 2rem;
}

#missions-grid > div:nth-child(1) {
  grid-column-start: 1;
  grid-column-end: 6;
  grid-row-start: 1;
  grid-row-end: 2;
  background-color: bisque;
  border: 2px solid #4c5cbc;
  border-radius: 0.5rem;
  background-image: url("../../assets/background-textures/about-us-bg1.png");
  background-size: cover;
}

#missions-grid > div:nth-child(2) {
  grid-column-start: 6;
  grid-column-end: 13;
  grid-row-start: 1;
  grid-row-end: 2;
  border: 2px solid #4c5cbc;
  border-radius: 0.5rem;
  padding: 50px;
  box-sizing: border-box;
}

#missions-grid > div:nth-child(3) {
  grid-column-start: 1;
  grid-column-end: 8;
  grid-row-start: 2;
  grid-row-end: 3;
  border: 2px solid #4c5cbc;
  border-radius: 0.5rem;
  padding: 50px;
  box-sizing: border-box;
}

#missions-grid > div:nth-child(4) {
  grid-column-start: 8;
  grid-column-end: 13;
  grid-row-start: 2;
  grid-row-end: 3;
  border: 2px solid #4c5cbc;
  border-radius: 0.5rem;
  background-image: url("../../assets/background-textures/about-us-bg2.png");
  background-size: cover;
}
</style>
