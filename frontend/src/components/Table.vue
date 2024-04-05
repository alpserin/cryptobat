<template>
  <div>
    <h2>Crypto Prices (real-time)</h2>
    <div class="sort-buttons">
      <div class="top-buttons">
        <button @click="sortByIncPrice">Increasing Price</button>
        <button @click="sortByIncVolume">Increasing Volume</button>
      </div>
      <div class="bottom-buttons">
        <button @click="sortByDecPrice">Decreasing Price</button>
        <button @click="sortByDecVolume">Decreasing Volume</button>
      </div>
    </div>

    <div class="data"></div>
    <div class="data">
      <div v-for="(crypto, index) in sortedData" :key="index">
        <p>Name : {{ crypto.name }} ({{ crypto.symbol }})</p>
        <p>Price ($): {{ roundValue(crypto.priceUsd) }}</p>
        <p>Change in 24hr ($): {{ roundValue(crypto.changePercent24Hr) }} %</p>
        <p>Volume in 24hr ($): {{ roundValue(crypto.volumeUsd24Hr) }} %</p>
        <p>-------------------</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, defineComponent, onMounted, ref } from "vue";
import getCurrentData from "../services/getCurrentData.js";

const cryptoData = ref([]);

onMounted(async () => {
  cryptoData.value = await getCurrentData();
});

function roundValue(number) {
  return Math.round(number * 1000000) / 1000000;
}

const sortedData = computed(() => {
  return [...cryptoData.value].sort(
    (a, b) => a[sortBy.value] - b[sortBy.value]
  );
});

const sortBy = ref("");

function sortByIncPrice() {
  sortBy.value = "priceUsd";
}

function sortByDecPrice() {
  sortBy.value = "-priceUsd";
}

function sortByIncVolume() {
  sortBy.value = "volumeUsd24Hr";
}

function sortByDecVolume() {
  sortBy.value = "-volumeUsd24Hr";
}
</script>
