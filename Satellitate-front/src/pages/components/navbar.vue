<template>
    <div id="navbar">
        <router-link to="/welcome" id="no-underline"><div id="logo"><img src="../../assets/icons/logo_s.svg" alt=""></div></router-link>
      <ul>
        <div class="nav-links">
          <router-link to="/about-us" id="no-underline"><li>About Us</li></router-link>
          <router-link to="/our-mission" id="no-underline"><li>Our Mission</li></router-link>
          <router-link to="/our-team" id="no-underline"><li>SpySKy Team</li></router-link>
          <router-link to="/pricing" id="no-underline"><li>Pricing</li></router-link>
          <router-link to="/our-tools" id="no-underline"><li>Our Tools</li></router-link>
          <router-link to="/contacts" id="no-underline"><li>Contacts</li></router-link>
        </div>
        <!-- <div class="nav-buttons">
          <router-link to="/login" id="no-underline">
            <button class="fill">Log in</button>
          </router-link>
          <router-link to="/signup" id="no-underline">
            <button class="stroke">Sign up</button>
          </router-link>
        </div> -->
        <div class="nav-buttons">
          <div id="user" @click="showDropdown()">
            <img src="../../assets/icons/test_profile_photo.png" id="user-photo">
          </div>
        </div>
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
        <div id="burger-container">
          <div id="nav-burger-menu" @click="showBurgerMenu()">
            <img src="../../assets/icons/burger.svg" alt="">
          </div>
          <div id="nav-bm-dropdown">
            <router-link to="/about-us" id="no-underline"><div>About Us</div></router-link>
            <router-link to="/our-mission" id="no-underline"><div>Our Mission</div></router-link>
            <router-link to="/our-team" id="no-underline"><div>SpySKy Team</div></router-link>
            <router-link to="/pricing" id="no-underline"><div>Pricing</div></router-link>
            <router-link to="/our-tools" id="no-underline"><div>Our Tools</div></router-link>
            <router-link to="/contacts" id="no-underline"><div>Contacts</div></router-link>
          </div>
        </div>
      </ul>
    </div>
</template>

<script>
export default {
  name: 'Navbar-component',
  data () {
    document.addEventListener("click", (event) => {
      let dropdown = document.getElementById("user-dropdown")
      let icon = document.querySelector(".nav-buttons #user");
      if (icon) {
        let isClickInsideUser = icon.contains(event.target);
        if (!isClickInsideUser) {
          dropdown.classList.remove("show");
        }
      }

      let burgerMenu = document.getElementById("nav-bm-dropdown")
      let burgerIcon = document.getElementById("nav-burger-menu");
      let isClickInsideBurger = burgerIcon.contains(event.target);
      if (!isClickInsideBurger) {
        burgerMenu.classList.remove("show");
        burgerIcon.classList.remove("opened");
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
  showBurgerMenu() {
    let burgerDropdown = document.getElementById("nav-bm-dropdown");
    let burgerIcon = document.getElementById("nav-burger-menu");
      if (burgerDropdown.classList.contains("show")) {
        burgerDropdown.classList.remove("show");
        burgerIcon.classList.remove("opened");
      } else {
        burgerDropdown.classList.toggle("show");
        burgerIcon.classList.toggle("opened");
      }
  }
},
}
</script>

<style>
  #navbar {
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
      border-bottom: 2px solid #00142D;
    }
  
  #navbar #logo img {
    height: 25px;
  }
  
  #navbar #user-photo {
    width: 36px;
    cursor: pointer;
  }
  
  #navbar ul {
    display: flex;
    flex-direction: row;
    list-style: none;
    gap: 2rem;
    align-items: center;
    position: relative;
  }
  
  #navbar ul .nav-links {
    display: flex;
    flex-direction: row;
    gap: 1.5rem;
    align-items: center;
  }
  
  #navbar .nav-buttons {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }
  
  #navbar ul li, 
  #navbar .nav-buttons button {
    font-size: 14px;
    transition: 0.5s;
    cursor: pointer;
  }

  #navbar #active-nav {
    color: #FF8C71;
  }
  
  #navbar .nav-buttons button {
    height: 2.25rem;
  }

  #navbar ul li:hover {
    color: #FFC8C2;
  }

  #navbar #user-dropdown {
    position: absolute;
    padding: 30px 70px 45px 30px;
    background-color: #000E1F;
    top: 60px;
    right: 0;
    display: flex;
    flex-direction: column;
    width: 220px;
    box-sizing: border-box;
    gap: 30px;
    border-radius: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  #navbar #user-dropdown.show {
    opacity: 1;
  }

  #navbar #user-dropdown #logout {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  #navbar #user-dropdown hr {
    width: 100%;
    border: 0;
    border-top: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 1px;
  }

  #navbar #user-dropdown div {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  #navbar #user-dropdown p {
    transition: 0.5s;
  }

  #navbar #user-dropdown p:hover {
    color: #FFC8C2;
  }

  #navbar #no-underline-dropdown {
    text-decoration: none;
    color: white;
  }

  #navbar #burger-container {
    position: relative;
    display: none;
  }

  #navbar #burger-container #nav-burger-menu {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.3s ease-in-out;
    border-radius: 0.25rem;
    padding: 8px;
    box-sizing: border-box;
  }

  #navbar #burger-container #nav-burger-menu img {
    width: 18px;
    height: 18px;
  }

  #navbar #burger-container #nav-burger-menu.opened,
  #navbar #burger-container #nav-burger-menu:hover {
    background-color: #4C5CBC;
  }

  #navbar #nav-bm-dropdown {
    display: flex;
    position: absolute;
    width: 200px;
    height: fit-content;
    right: 0;
    top: 60px;
    padding: 30px 70px 45px 30px;
    background-color: #000E1F;
    box-sizing: border-box;
    gap: 30px;
    border-radius: 0.5rem;
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    flex-direction: column;
  }

  #navbar #nav-bm-dropdown a {
    transition: 0.5s;
  }

  #navbar #nav-bm-dropdown a:hover {
    color: #FFC8C2;
  }

  #navbar #nav-bm-dropdown.show {
    opacity: 1;
  }

  @media only screen and (min-width: 0px) and (max-width: 600px) {
    #navbar {
      padding: 0 5%;
    }

    #navbar ul .nav-links {
      display: none;
    }

    #navbar #burger-container {
      display: block;
    }

    #navbar #nav-bm-dropdown {
      width: 280px;
      font-size: 24px;
    }

    #navbar #user-dropdown {
      width: 280px;
      font-size: 24px;
    }
  }
  
  @media only screen and (min-width: 601px) and (max-width: 904px) {
    #navbar {
      padding: 0 7%;
    }

    #navbar ul .nav-links {
      display: none;
    }

    #navbar #burger-container {
      display: block;
    }

    #navbar #nav-bm-dropdown {
      width: 280px;
      font-size: 22px;
    }

    #navbar #user-dropdown {
      width: 280px;
      font-size: 22px;
    }
  }
  
  @media only screen and (min-width: 905px) and (max-width: 1238px) {
    #navbar {
      padding: 0 10%;
    }

    #navbar ul .nav-links {
      display: flex;
    }

    #navbar #burger-container {
      display: none;
    }

    #navbar #user-dropdown {
      font-size: 1rem;
      width: 220px;
    }
  }
  
  @media only screen and (min-width: 1239px) and (max-width: 1439px) {
    #navbar {
      padding: 0 10%;
    }

    #navbar #user-dropdown {
      font-size: 1rem;
      width: 220px;
    }
  }
  
  @media only screen and (min-width: 1440px) {
    #navbar {
      padding: 0 12%;
    }

    #navbar #user-dropdown {
      font-size: 1rem;
      width: 220px;
    }
  }

</style>