<template>
  <div>
    <h2>Crypto Prices</h2>
    <div class="data">
      <div v-for="crypto in crypto_data" :key="index">
        <p>Name : {{ crypto.name }}</p>
        <p>Price ($):{{ crypto.priceUsd }}</p>
        <p>Price ($):{{ crypto.changePercent24Hr }}</p>
        <p>-------------------</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import getCurrentData from "../services/getCurrentData.js";

const crypto_data = ref([]);

onMounted(async () => {
  crypto_data.value = await getCurrentData();
  console.log(crypto_data.value);
});
</script>
