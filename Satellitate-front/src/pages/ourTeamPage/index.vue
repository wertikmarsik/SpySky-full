<template>
  <div class="main-container" id="our-team-page">
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
          <div id="header">Our team</div>
          <p>
            Meet the skilled minds behind SpySky project. With some knowledge in
            technology and space we are focused on spreading awareness about
            space debris around the Earth.
          </p>
        </div>
      </div>
      <planetModel />
    </div>

    <!--============================= TEAM BLOCK =============================-->

    <div id="team-detailed-block">
      <div class="block-header">
        <div class="block-count">01.</div>
        <div class="header-container">
          <p class="header-mid">Spysky team</p>
        </div>
        <p>
          SpySky team is a dynamic and collaborative group. With diverse skills
          and knowledge, we work together seamlessly to achieve excellence and
          drive innovation in our respective fields.
        </p>
      </div>
      <div id="team-grid">
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>designer</div>
            <div>
              <p>Darina Mamokina</p>
              <p>darinamamokina@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>Front-end developer</div>
            <div>
              <p>Liza Humnytska</p>
              <p>gumnickajaliza@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>back-end developer</div>
            <div>
              <p>Sviatoslav Strubytskyi</p>
              <p>wertik.marsik@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>Project manager</div>
            <div>
              <p>Taras Hmaruk</p>
              <p>hmaruktaras@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>Data engineer</div>
            <div>
              <p>Oleksandr Prosymiak</p>
              <p>SProsimyak@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>Ml engineer</div>
            <div>
              <p>Maksym Kahadii</p>
              <p>maks4236843@gmail.com</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>Mentor</div>
            <div>
              <p>Anastasia Deineko</p>
            </div>
          </div>
        </div>
        <div>
          <div class="team-img"></div>
          <div class="team-info">
            <div>Mentor</div>
            <div>
              <p>Denis Savenkov</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- =================== CONTACT US BLOCK ======================================= -->

    <div id="contact-us-block">
      <div id="contact-us-background"></div>
      <div class="block-header">
        <div class="block-count">01.</div>
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
  name: "ourTeam-page",
  components: {
    Navbar,
    Footer,
    planetModel,
  },
};
</script>

<style>
#our-team-page #team-detailed-block {
  margin-top: 10px;
}

#our-team-page #team-detailed-block #team-grid {
  display: grid;  
}

#our-team-page #team-detailed-block #team-grid > div {
  display: flex;
  border-radius: 0.5rem;
  border: 2px solid #00142d;
  overflow: hidden;
  background-image: url("../../assets/background-textures/contact-bg.png");
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
  transition: 0.5s ease;
  cursor: pointer;
}

#our-team-page #team-detailed-block #team-grid > div:hover {
  border: 2px solid #4c5cbc;
}

#our-team-page #team-detailed-block #team-grid > div .team-img {
  background-size: cover;
  background-position: center;
}

#our-team-page #team-detailed-block #team-grid > div .team-info {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: center;
  gap: 1rem;
}

#our-team-page #team-detailed-block #team-grid > div .team-info div:nth-child(1) {
  font-size: 1.5rem;
  font-weight: 700;
  line-height: 130%;
  text-transform: uppercase;
}

#our-team-page #team-detailed-block #team-grid > div .team-info div:nth-child(2) {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(1) .team-img {
  background-image: url("../../assets/members/dasha.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(2) .team-img {
  background-image: url("../../assets/members/liza.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(3) .team-img {
  background-image: url("../../assets/members/sviat.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(4) .team-img {
  background-image: url("../../assets/members/taras.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(5) .team-img {
  background-image: url("../../assets/members/oleksandr.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(6) .team-img {
  background-image: url("../../assets/members/maks.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(7) .team-img {
  background-image: url("../../assets/members/anastasia.jpg");
}

#our-team-page #team-detailed-block #team-grid > div:nth-child(8) .team-img {
  background-image: url("../../assets/members/denis.jpg");
}

/*============================= RESPONSIVENESS ======================================*/

/*=============================== 0 - 600 px ========================================*/

@media only screen and (min-width: 0px) and (max-width: 600px){
  #our-team-page #team-detailed-block {
    margin-bottom: 60px;
  }
  
  #our-team-page #team-detailed-block #team-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 1fr);
    row-gap: 2.5rem;
    pointer-events: none;
  }
  
  #our-team-page #team-detailed-block #team-grid > div {
    flex-direction: column;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-img {
    width: 100%;
    height: 350px;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-info {
    height: auto;
    padding: 2rem;
  }
}

/*=============================== 601 - 904 px ========================================*/

@media only screen and (min-width: 601px) and (max-width: 904px){
  #our-team-page #team-detailed-block {
    margin-bottom: 80px;
  }
  
  #our-team-page #team-detailed-block #team-grid {
    grid-template-columns: 1fr;
    grid-template-rows: repeat(8, 1fr);
    row-gap: 2.5rem;
    pointer-events: none;
  }
  
  #our-team-page #team-detailed-block #team-grid > div {
    flex-direction: column;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-img {
    width: 100%;
    height: 450px;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-info {
    height: auto;
    padding: 2rem;
  }
}

/*=============================== 905 - 1238 px ========================================*/

@media only screen and (min-width: 905px) and (max-width: 1238px) {
  #our-team-page #team-detailed-block {
    margin-bottom: 100px;
  }
  
  #our-team-page #team-detailed-block #team-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    row-gap: 3rem;
    column-gap: 2rem;
    pointer-events: none;
  }
  
  #our-team-page #team-detailed-block #team-grid > div {
    flex-direction: column;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-img {
    width: 100%;
    height: 300px;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-info {
    height: auto;
    padding: 2rem;
  }
}

/*=============================== 1239 - 1439 px ========================================*/

@media only screen and (min-width: 1239px) and (max-width: 1439px) {
  #our-team-page #team-detailed-block {
    margin-bottom: 100px;
  }
  
  #our-team-page #team-detailed-block #team-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    column-gap: 3rem;
    row-gap: 4.75rem;
    pointer-events: all;
  }
  
  #our-team-page #team-detailed-block #team-grid > div {
    flex-direction: row;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-img {
    width: 45%;
    height: 260px;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-info {
    width: auto;
    height: 100%;
    padding: 0px 2rem;
  }
}

/*=============================== 1440+ px ========================================*/  

@media only screen and (min-width: 1440px) {
  #our-team-page #team-detailed-block {
    margin-bottom: 120px;
  }
  
  #our-team-page #team-detailed-block #team-grid {
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    column-gap: 3rem;
    row-gap: 4.75rem;
    pointer-events: all;
  }
  
  #our-team-page #team-detailed-block #team-grid > div {
    flex-direction: row;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-img {
    width: 45%;
    height: 260px;
  }
  
  #our-team-page #team-detailed-block #team-grid > div .team-info {
    width: auto;
    height: 100%;
    padding: 0px 2rem;
  }
}
</style>
