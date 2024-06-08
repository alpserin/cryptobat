<template>
  <div id="app">
    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/signup">signup</router-link>
      <router-link to="/login">login</router-link>
    </nav>
    <router-view></router-view>
</div>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>
