<template>
  <div class="navbar">
<nav>
  <div class="buttons">
    <router-link class="nav-button" to="/">Home</router-link>
    <router-link class="nav-button" to="/login">Login</router-link>
    <router-link class="nav-button" to="/signup">Signup</router-link></div>
    

    <div class="logo-container">
      <h1 class="logo">Cryptobat</h1>
    </div>

  </nav>
  <router-view></router-view>
</div>
  </template>

<script>
import { RouterLink, RouterView } from 'vue-router';
</script>

<style scoped>
.navbar {
}

nav {
  background-color: rgb(244, 244, 244);
  height: 80px;
  padding-left: 40px;
  margin-bottom: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.buttons {
  display: flex;
  gap: 10px;
}

.nav-button {
  margin: 10px;
}

.nav-button:hover {
  text-decoration: underline;
}

.logo-container {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.logo {
  font-size: x-large;
}

</style>