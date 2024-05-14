<template>
    <div id="mapNavbar">
        <router-link to="/" id="no-underline"><div id="logo"><img src="../../assets/icons/logo_s.svg" alt=""></div></router-link>
        <div class="nav-buttons">
          <div id="user" @click="showDropdown()">
            <img src="../../assets/icons/test_profile_photo.png" id="user-photo">
            <div id="user-dropdown">
              <div>
                <router-link to="/settings" id="no-underline-dropdown">
                  <p>Profile settings</p>
                </router-link>
                <router-link to="/3d-map" id="no-underline-dropdown">
                  <p>3D map</p>
                </router-link>
                <p>Dashboard</p>
              </div>
              <hr>
              <div id="logout">
                <img src="../../assets/icons/log-out.svg" alt="">
                <div>Log out</div>
              </div>
            </div>
          </div>
          <div id="burger-menu" @click="showNavLinks()">
            <img src="../../assets/icons/burger.svg" alt="">
          </div>
        </div>
    </div>
    <ul id="burger-menu-navlinks">
      <router-link to="/about-us" id="no-underline"><li>About Us</li></router-link>
      <router-link to="/our-mission" id="no-underline"><li>Our Mission</li></router-link>
      <router-link to="/our-team" id="no-underline"><li>SpySKy Team</li></router-link>
      <router-link to="/pricing" id="no-underline"><li>Pricing</li></router-link>
      <router-link to="/our-tools" id="no-underline"><li>Our Tools</li></router-link>
      <router-link to="/contacts" id="no-underline"><li>Contacts</li></router-link>
    </ul>
</template>

<script>


export default {
  name: 'mapNavbar',
  data () {
    document.addEventListener("click", (event) => {
      let dropdown = document.getElementById("user-dropdown")
      let icon = document.querySelector(".nav-buttons #user");
      let isClickInside = icon.contains(event.target);
      if (!isClickInside) {
        dropdown.classList.remove("show");
      }
    });
  },
  methods: {
    showDropdown() {
      let dropdown = document.getElementById("user-dropdown")
      if (dropdown.classList.contains("show")) {
        dropdown.classList.remove("show");
      } else {
        dropdown.classList.toggle("show");
      }
  },
  showNavLinks() {
    let burgerMenu = document.getElementById("burger-menu-navlinks");
    let burgerIcon = document.getElementById("burger-menu");
    if (burgerMenu.classList.contains("show")) {
      burgerMenu.classList.remove("show");
      burgerIcon.classList.remove("opened");
    } else {
      burgerMenu.classList.toggle("show");
      burgerIcon.classList.toggle("opened");
    }
  }
},
}
</script>

<style>
  #mapNavbar {
    font-size: 1rem;
    color: white;
    font-family: 'Exo 2', sans-serif;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 75px;
    z-index: 10000;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(6px);
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    box-sizing: border-box;
    align-items: center;
    padding: 0 30px;
    border-bottom: 2px solid #00142D;
  }
  
  #mapNavbar #logo img {
    height: 25px;
  }

  #mapNavbar #user {
    position: relative;
  }
  
  #mapNavbar #user-photo {
    width: 36px;
    cursor: pointer;
  }
  
  #mapNavbar .nav-buttons {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
  }

  #mapNavbar #active-nav {
    color: #FF8C71;
  }
  
  #mapNavbar .nav-buttons button {
    height: 2.25rem;
  }

  #mapNavbar > div {
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 2rem;
    align-items: center;
    position: relative;
  }

  #mapNavbar #user-dropdown {
    position: absolute;
    padding: 30px 70px 45px 30px;
    background-color: #000E1F;
    right: 0px;
    top: 60px;
    display: flex;
    width: 220px;
    flex-direction: column;
    box-sizing: border-box;
    gap: 30px;
    border-radius: 0.5rem;
    visibility: hidden; 
    opacity: 0;
    transition: opacity 0.3s ease-in-out, visibility 0s linear 0.3s; 
  }

  #mapNavbar #user-dropdown.show {
    visibility: visible;
    opacity: 1;
    transition: opacity 0.3s ease-in-out, visibility 0s linear;
  }

  #burger-menu-navlinks {
    position: relative;
    top: 0px;
    font-size: 14px;
    color: white;
    font-family: 'Exo 2', sans-serif;
    position: fixed;
    left: 0;
    width: 100%;
    z-index: 9000;
    background: rgba(0, 0, 0, 0.8);
    backdrop-filter: blur(6px);
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    box-sizing: border-box;
    align-items: center;
    padding: 12px 30px;
    border-bottom: 2px solid #00142D;
    opacity: 0;
    transition: all 0.3s ease;
    height: 0;
    list-style: none;
    gap: 2rem;
  }

  #burger-menu-navlinks li {
    transition: 0.5s;
    cursor: pointer;
  }

  #burger-menu-navlinks li:hover {
    color: #FFC8C2;
  }

  #burger-menu-navlinks.show {
    opacity: 1;
    transform: translateY(75px);
    height: fit-content;
  }

  #mapNavbar #user-dropdown #logout {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  #mapNavbar #burger-menu {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    border-radius: 0.25rem;
    padding: 8px;
    box-sizing: border-box;
  }

  #mapNavbar #burger-menu img {
    width: 18px;
    height: 18px;
  }

  #mapNavbar #burger-menu:hover {
    background-color: #4C5CBC;
  }

  #mapNavbar #burger-menu.opened {
    background-color: #4C5CBC;
  }

  #mapNavbar #user-dropdown hr {
    width: 100%;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1px;
  }

  #mapNavbar #user-dropdown div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #mapNavbar #no-underline-dropdown {
    text-decoration: none;
    color: white;
  }

</style>