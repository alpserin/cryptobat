<template>
  <div>
    <h2>Crypto Prices</h2>
    <div class="sort-buttons">
      <div class="inc-buttons">
        <button
          @click="sortByIncPrice"
          type="button"
          class="border hover:bg-gray"
        >
          Increasing Price
        </button>
        <button
          @click="sortByIncVolume"
          type="button"
          class="border hover:bg-gray"
        >
          Increasing Volume
        </button>
      </div>
      <div class="dec-buttons">
        <button
          @click="sortByDecPrice"
          type="button"
          class="border hover:bg-gray"
        >
          Decreasing Price
        </button>
        <button
          @click="sortByDecVolume"
          type="button"
          class="border hover:bg-gray"
        >
          Decreasing Volume
        </button>
      </div>
    </div>

    <table class="table-fixed">
      <thead>
        <tr>
          <th>Name</th>
          <th>Price ($)</th>
          <th>Change in 24hr</th>
          <th>Volume in 24hr</th>
        </tr>
      </thead>
      <tbody v-if="paginatedData.length">
        <tr v-for="(crypto, index) in paginatedData" :key="index">
          <td>{{ crypto.name }} ({{ crypto.symbol }})</td>
          <td>{{ roundValue(crypto.priceUsd) }}</td>
          <td>{{ roundValue(crypto.changePercent24Hr) }} %</td>
          <td>{{ roundValue(crypto.volumeUsd24Hr) }}</td>
        </tr>
      </tbody>
    </table>

    <div class="page-buttons">
      <button @click="prevPage" type="button" class="border hover:bg-gray">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="nextPage" type="button" class="border hover:bg-gray">
        Next
      </button>
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
  currentPage.value = 1;
}

function sortByDecPrice() {
  sortBy.value = "-priceUsd";
  currentPage.value = 1;
}

function sortByIncVolume() {
  sortBy.value = "volumeUsd24Hr";
  currentPage.value = 1;
}

function sortByDecVolume() {
  sortBy.value = "-volumeUsd24Hr";
  currentPage.value = 1;
}
</script>
