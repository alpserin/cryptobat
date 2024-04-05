<template>
  <div>
    <h2>Crypto Prices</h2>
    <div class="data">
      <div v-for="crypto in crypto_data" :key="index">
        <p>Name : {{ crypto.name }} ({{ crypto.symbol }})</p>
        <p>Rounded Price ($): {{ roundValue(crypto.priceUsd) }}</p>
        <p>Change in 24hr ($): {{ roundValue(crypto.changePercent24Hr) }} %</p>
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
});

function roundValue(number) {
  return Math.round(number * 1000000) / 1000000;
}
</script>
