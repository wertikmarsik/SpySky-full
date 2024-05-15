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
      padding: 0 150px;
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

  #navbar #no-underline-dropdown {
    text-decoration: none;
    color: white;
  }

</style>