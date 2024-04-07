<template>
  <div class="flex flex-col items-center">
    <h2 class="prose md:prose-xl lg:prose-2xl font-bold text-center mt-4 mb-4">
      Crypto Prices
    </h2>
    <div class="sort-buttons mt-4 mb-8">
      <div class="inc-buttons">
        <button
          @click="sortByIncPrice"
          type="button"
          class="border hover:bg-gray mx-2 w-48"
        >
          Increasing Price
        </button>
        <button
          @click="sortByIncVolume"
          type="button"
          class="border hover:bg-gray mx-2 w-48"
        >
          Increasing Volume
        </button>
        <button
          @click="sortByIncChange"
          type="button"
          class="border hover:bg-gray mx-2 w-48"
        >
          Increasing Change
        </button>
      </div>
      <div class="dec-buttons">
        <button
          @click="sortByDecPrice"
          type="button"
          class="border hover:bg-gray mx-2 w-48"
        >
          Decreasing Price
        </button>
        <button
          @click="sortByDecVolume"
          type="button"
          class="border hover:bg-gray mx-2 w-48"
        >
          Decreasing Volume
        </button>
        <button
          @click="sortByDecChange"
          type="button"
          class="border hover:bg-gray mx-2 w-48"
        >
          Decreasing Change
        </button>
      </div>
    </div>

    <table class="table-auto w-4/6">
      <thead>
        <tr>
          <th class="text-left">Name</th>
          <th class="text-left">Price ($)</th>
          <th class="text-left">Change in 24hr</th>
          <th class="text-left">Volume in 24hr</th>
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

    <div class="page-buttons mt-16">
      <button
        @click="prevPage"
        type="button"
        class="border hover:bg-gray mx-2 w-48"
      >
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button
        @click="nextPage"
        type="button"
        class="border hover:bg-gray mx-2 w-48"
      >
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
  let sortedArray = [...cryptoData.value];
  if (sortBy.value.startsWith("-")) {
    const prop = sortBy.value.slice(1);
    sortedArray.sort((a, b) => b[prop] - a[prop]); // Sort in descending order
  } else {
    sortedArray.sort((a, b) => a[sortBy.value] - b[sortBy.value]); // Sort in ascending order
  }
  return sortedArray;
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

function sortByIncChange() {
  sortBy.value = "changePercent24Hr";
}

function sortByDecChange() {
  sortBy.value = "-changePercent24Hr";
}
</script>

<style scoped></style>
