<template>
<div class="main-container" id="our-mission-page">

    <Navbar />

    <!--============================= HERO BLOCK =============================-->

    <div class="hero-container">
    <div class="hero-overlay">
        <div><img id="asteroid1" src="../../assets/background-textures/asteroid1.png"></div>
        <div><img id="asteroid2" src="../../assets/background-textures/asteroid2.png"></div>
        <div><img id="asteroid3" src="../../assets/background-textures/asteroid3.png"></div>
        <div class="hero-nav">
            <div id="header">Our mission</div>
            <p>
                Our mission is to address space debris using advanced technology and collaboration. 
                We raise awareness among people, making this problem more widespread.
            </p>
        </div>
    </div>
    <planetModel />
    </div>

    <!-- =================== QUOTE BLOCK ======================================= -->

    <div id="mission-quote-block">
        <div id="quote-bg"></div>
        <p>“That's one <span id="pink-font">small step</span> for a man, one <span id="pink-font">giant leap</span> for mankind.”</p>
    </div>

    <!-- =================== OUR MISSION BLOCK ======================================= -->

    <div id="our-missions-block">
        <div class="block-header">
            <div class="block-count">01.</div>
            <div class="header-container">
                <p class="header-mid">Our mission</p>
            </div>
            <p>
                We give people the opportunity to detect space debris in Earth orbit. 
                Thanks to our online system, it will be possible to determine the level of danger in orbit. 
            </p>
          </div>
          <div id="mission-grid">
            <div></div>
            <div>
                <div class="header">
                    <div></div>
                    <p>Space debris tracking</p>
                </div>
                <div>
                    <p>We specialize in tracking space debris movement using data analysis and machine learning algorithms.</p>
                    <p>By identifying areas with high debris concentrations, we inform users about possible dangers.</p>
                </div>
            </div>
            <div>
                <div class="header">
                    <div></div>
                    <p>Threats identifying</p>
                </div>
                <div>
                    <p>We detect and display unauthorized objects in space to help in identifying possible threats and incorrect maneuvers, which will allow taking measures to avoid them.</p>
                    <p>We're good at spotting dangers from space debris using smart technology. By watching space closely, we quickly spot risks to satellites and spacecraft.</p>
                </div>
            </div>
            <div></div>
            <div></div>
            <div>
                <div class="header">
                    <div></div>
                    <p>Regular Analysis</p>
                </div>
                    <p>We look at space debris data regularly to see what's happening. This helps us understand the risks better and ensure the safety of the satellites from space debris by monitoring and analysis of the space debris movement. </p>
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
            Contact us via our mail address@gmail.com if you have any questions. Also, sign up for updates.
          </p>
        </div>
        <form id="short-form">
            <input type="text" placeholder="Your email">
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
    name: "ourMissionPage",
    components: {
        Navbar,
        Footer,
        planetModel
    }
}

</script>
    
<style>

#our-mission-page #mission-quote-block {
    width: 100%;
    background-size: cover;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    box-sizing: border-box;
    padding: 150px 0;
    margin-bottom: 90px;
    font-size: 6rem;
    font-weight: 400;
    line-height: 130%;
    height: fit-content;
}

#our-mission-page #mission-quote-block p {
    position: relative;
    z-index: 1000;
    text-align: center;
}
  
#our-mission-page #mission-quote-block #pink-font {
    color: #FFC8C2;
    font-weight: 700;
}

#our-mission-page #mission-quote-block #blue-line {
    align-self: stretch;
    width: 0.25rem;
    border-radius: 1rem;
    background: #4C5CBC;
}

#our-mission-page #mission-quote-block #quote-bg {
    position: absolute;
    left: -150px;
    top: 0px; 
    bottom: 0px;
    z-index: 0;
    border-top: 2px solid #00142D;
    border-bottom: 2px solid #00142D;
    background-image: url("../../assets/background-textures/quote-bg.png");
    width: 100vw;
    height: 100%;
    background-size: cover;
    z-index: 0;
}

#our-missions-block #mission-grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    grid-auto-rows: auto;
    row-gap: 3.5rem;
    column-gap: 2rem;
    margin-top: 4rem;
    margin-bottom: 120px;
}

#our-missions-block #mission-grid .header {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
}

#our-missions-block #mission-grid .header p {
    font-size: 1.5rem;
    font-weight: 700;
    line-height: 130%; 
    text-transform: uppercase;
}

#our-missions-block #mission-grid .header div {
    width: 1.25rem;
    height: 1.25rem;
    border-radius: 0.5rem;
    border: 2px solid #4C5CBC;
}

#our-missions-block #mission-grid > div {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    line-height: 150%;
    font-size: 18px;
}

#our-missions-block #mission-grid > div > div {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
}

#our-missions-block #mission-grid > div:nth-child(1) {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 1;
    grid-row-end: 2;
    background-image: url("../../assets/background-textures/mission1-bg.png");
    background-size: cover;
    border: 2px solid #4C5CBC;
    border-radius: 0.5rem;
}

#our-missions-block #mission-grid > div:nth-child(2) {
    grid-column-start: 6;
    grid-column-end: 13;
    grid-row-start: 1;
    grid-row-end: 2;
    box-sizing: border-box;
    padding: 50px;
}

#our-missions-block #mission-grid > div:nth-child(3) {
    grid-column-start: 1;
    grid-column-end: 8;
    grid-row-start: 2;
    grid-row-end: 3;
    box-sizing: border-box;
    padding: 50px;
}

#our-missions-block #mission-grid > div:nth-child(4) {
    grid-column-start: 8;
    grid-column-end: 13;
    grid-row-start: 2;
    grid-row-end: 3;
    background-image: url("../../assets/background-textures/mission2-bg.png");
    background-size: cover;
    border: 2px solid #4C5CBC;
    border-radius: 0.5rem;
}

#our-missions-block #mission-grid > div:nth-child(5) {
    grid-column-start: 1;
    grid-column-end: 6;
    grid-row-start: 3;
    grid-row-end: 4;
    background-image: url("../../assets/background-textures/mission3-bg.png");
    background-size: cover;
    border: 2px solid #4C5CBC;
    border-radius: 0.5rem;
}

#our-missions-block #mission-grid > div:nth-child(6) {
    grid-column-start: 6;
    grid-column-end: 13;
    grid-row-start: 3;
    grid-row-end: 4;
    box-sizing: border-box;
    padding: 50px;
}

</style>