<template>
  <div class="main-container" id="our-tools-page">
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
          <div id="header">Our tools</div>
          <p>
            Using machine learning algorithms, we're accurate at keeping tabs on
            all space objects. Our 3D map lets you see where they're heading and
            if they might crash into anything. Join us and explore the space.
          </p>
        </div>
      </div>
      <planetModel />
    </div>

    <!--============================= 3D MAP BLOCK =============================-->

    <div id="map-info">
      <div id="map-background"></div>
      <div id="left-side">
        <div class="block-count">01.</div>
        <div class="header-container">
          <p class="header-mid">3D MAP</p>
        </div>
        <p>
          Explore the visualization of NASA open data with our map. Keep the
          track of space objects, which you are interested in, and turn on
          personal notifications. You can manage all of that in your profile
          settings.
        </p>
        <div id="map-buttons">
          <router-link to="/3d-map" id="no-underline"
            ><button class="fill">See the map</button></router-link
          >
          <router-link to="/settings" id="no-underline"
            ><button class="stroke">Profile settings</button></router-link
          >
        </div>
      </div>
      <div id="right-side">
        <div class="map-features">
          <div id="feature">
            <div>
              <div id="bullet"></div>
              <p id="feature-header">Objects tracking</p>
            </div>
            <p>
              Track all needed satellites and space debris around the Earth. We
              will inform you about all changes via your email address.
            </p>
          </div>
          <div id="feature">
            <div>
              <div id="bullet"></div>
              <p id="feature-header">Data visualization</p>
            </div>
            <p>
              High-quality visualization of all space objects for better
              understanding of the space problems.
            </p>
          </div>
          <div id="feature">
            <div>
              <div id="bullet"></div>
              <p id="feature-header">Danger alerts</p>
            </div>
            <p>
              We use Machine Learning algorithms to identify the danger in
              space. If something is wrong - you immediately get a
              notification. 
            </p>
          </div>
        </div>
      </div>
    </div>

    <!--============================= LINKS BLOCK =============================-->

    <div id="links-block">
      <div id="left-part">
        <div class="block-header">
          <div class="block-count">02.</div>
          <div class="header-container">
            <p class="header-mid">Useful links</p>
          </div>
          <p>
            Here you can find links to the websites which we took the data and
            3D models from.
          </p>
        </div>
        <div id="links-container">
          <div>
            <div>NASA OPEN DATA</div>
            <p>https://celestrak.org/</p>
          </div>
          <div>
            <div>3D models</div>
            <p>https://www.turbosquid.com/</p>
          </div>
          <div>
            <div>TEXTURES and photos</div>
            <p>https://www.solarsystemscope.com/textures/</p>
            <p>https://www.shadedrelief.com/natural3/pages/textures.html</p>
            <p>https://unsplash.com/</p>
          </div>
        </div>
      </div>
      <div id="right-part">
        <div id="space-shuttle">
          <img
            src="../../assets/background-textures/space-shuttle.png"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/background-textures/asteroid1.png"
            id="link-asteroid1"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/background-textures/asteroid3.png"
            id="link-asteroid2"
            alt=""
          />
        </div>
        <div>
          <img
            src="../../assets/background-textures/asteroid1.png"
            id="link-asteroid3"
            alt=""
          />
        </div>
      </div>
    </div>

    <!-- =================== CONTACT US BLOCK ======================================= -->

    <div id="contact-us-block">
      <div id="contact-us-background"></div>
      <div class="block-header">
        <div class="block-count">03.</div>
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
  name: "tools-page",
  components: {
    Navbar,
    Footer,
    planetModel,
  },
};
</script>

<style>
#our-tools-page .hero-nav button {
  margin-top: 12px;
}

#map-info {
  width: 100%;
  height: fit-content;
  margin: 100px 0 120px 0;
  box-sizing: border-box;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  flex-direction: row;
  gap: 15%;
  position: relative;
  padding: 110px 0;
}

#map-info #left-side {
  position: relative;
  z-index: 1000;
  width: 60%;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

#map-info #left-side #map-buttons {
  display: flex;
  flex-direction: row;
  gap: 20px;
}

#our-tools-page .map-features {
  width: 100%;
  text-align: left;
  font-size: 18px;
  line-height: 150%;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  position: relative;
  z-index: 1000;
}

#our-tools-page .map-features #feature {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  box-sizing: border-box;
}

#feature #bullet {
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px solid #4c5cbc;
}

#feature #feature-header {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 130%;
  text-transform: uppercase;
}

#feature > div {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

#map-info #map-background {
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

#links-block {
  display: flex;
  flex-direction: row;
  gap: 10%;
  margin-bottom: 120px;
}

#links-block .block-header {
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  width: 100%;
}

#links-block .block-header > p {
  text-align: left;
  width: 80%;
}

#links-block #left-part {
  display: flex;
  flex-direction: column;
  gap: 4rem;
  width: 45%;
}

#links-block #links-container {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

#links-block #links-container div {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

#links-block #links-container div > div {
  font-weight: 700;
  font-size: 20px;
  text-transform: uppercase;
}

#links-block #right-part {
  position: relative;
  width: 45%;
  display: flex;
  justify-content: center;
}

#links-block #right-part #space-shuttle {
  height: 100%;
  display: flex;
  align-items: end;
  transition: 0.5s;
  animation: move 1s infinite alternate;
  animation-play-state: paused;
}

#links-block #right-part #space-shuttle img {
  height: 90%;
}

@keyframes move {
  0% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-10%);
  }
}

#links-block #right-part #space-shuttle:hover {
  animation-play-state: running;
}

#links-block #right-part #link-asteroid1 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100px;
}

#links-block #right-part #link-asteroid2 {
  position: absolute;
  width: 180px;
  right: 0;
  top: 15%;
}

#links-block #right-part #link-asteroid3 {
  position: absolute;
  width: 50px;
  bottom: 0;
  left: 15%;
}
</style>
