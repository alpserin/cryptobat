<template>
    <div>
      <h2>Signup Form</h2>
      <form @submit.prevent="signup">
        <input v-model="username" placeholder="Username" required />
        <input type="password" v-model="password" placeholder="Password" required />
        <button type="submit">Signup</button>
      </form>
    </div>
  </template>
  
  <script>
  
  </script>
  