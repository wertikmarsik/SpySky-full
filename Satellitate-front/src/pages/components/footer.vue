<template>
    <footer id="footer">
        <div id="footer-logo"><a href="#"><img src="../../assets/icons/logo_s.svg"></a></div>
        <ul>
          <router-link to="/about-us" id="no-underline-footer"><li>About Us</li></router-link>
          <router-link to="/our-mission" id="no-underline-footer"><li>Our Mission</li></router-link>
          <router-link to="/our-team" id="no-underline-footer"><li>SpySKy Team</li></router-link>
          <router-link to="/pricing" id="no-underline-footer"><li>Pricing</li></router-link>
          <router-link to="/3d-map" id="no-underline-footer"><li>Our Tools</li></router-link>
          <router-link to="/contacts" id="no-underline-footer"><li>Contacts</li></router-link>
          <router-link to="/login" id="no-underline-footer"><li>Log in</li></router-link>
          <router-link to="/signup" id="no-underline-footer"><li>Sign up</li></router-link>
        </ul>
        <hr />
        <p>© 2023-2024 SpySky</p>
      </footer>
</template>

<script>
export default {
    name: 'Footer'
}
</script>

<style>

#footer {
  width: 100%;
  z-index: 10000;
  background-color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  gap: 40px;
  padding: 60px 0;
  box-shadow: 0px 0px 29.6px 9px rgba(0, 0, 0, 0.85);
}

#footer ul {
  display: flex;
  flex-direction: row;
  list-style: none;
  gap: 2.5rem;
  font-size: 20px;
}

#footer ul li {
  font-size: 1rem;
}

#footer hr {
  width: 100%;
  opacity: 50%;
}

#footer #footer-logo img {
  height: 35px;
}
</style>