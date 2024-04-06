<template>
  <div>
    <h2>Crypto Prices</h2>
    <div class="sort-buttons">
      <div class="inc-buttons">
        <button @click="sortByIncPrice">Increasing Price</button>
        <button @click="sortByIncVolume">Increasing Volume</button>
      </div>
      <div class="dec-buttons">
        <button @click="sortByDecPrice">Decreasing Price</button>
        <button @click="sortByDecVolume">Decreasing Volume</button>
      </div>
    </div>

    <div class="data">
      <div v-for="(crypto, index) in paginatedData" :key="index">
        <p>Name: {{ crypto.name }} ({{ crypto.symbol }})</p>
        <p>Price ($): {{ roundValue(crypto.priceUsd) }}</p>
        <p>Change in 24hr: {{ roundValue(crypto.changePercent24Hr) }} %</p>
        <p>Volume in 24hr ($): {{ roundValue(crypto.volumeUsd24Hr) }}</p>
        <p>-------------------</p>
      </div>
    </div>

    <div class="page-buttons">
      <button @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage">Next</button>
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
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

// PAGINATION
const itemsPerPage = 10;
let currentPage = ref(1);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return sortedData.value.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(sortedData.value.length / itemsPerPage);
});

function prevPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

// SORTING
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
