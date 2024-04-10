<template>
  <div class="flex flex-col items-center">
    <h2 class="prose md:prose-xl lg:prose-2xl font-bold text-center mt-4 mb-4">
      Crypto Prices
    </h2>

    <div class="flex align-middle justify-center h-96">
      <table class="table-fixed w-4/6">
        <thead>
          <tr>
            <th class="text-left">Name</th>
            <th class="text-left hover:cursor-pointer" :onClick="sortPrice">
              <span class="flex items-center">
                Price ($)
                <v-icon
                  name="bi-caret-down-fill"
                  v-if="sortBy === '-priceUsd'"
                ></v-icon>
                <v-icon
                  name="bi-caret-up-fill"
                  v-if="sortBy === 'priceUsd'"
                ></v-icon>
              </span>
            </th>
            <th class="text-left hover:cursor-pointer" :onClick="sortChange">
              <span class="flex items-center">
                Change (24hr)
                <v-icon
                  name="bi-caret-down-fill"
                  v-if="sortBy === '-changePercent24Hr'"
                ></v-icon>
                <v-icon
                  name="bi-caret-up-fill"
                  v-if="sortBy === 'changePercent24Hr'"
                ></v-icon>
              </span>
            </th>
            <th class="text-left hover:cursor-pointer" :onClick="sortVolume">
              <span class="flex items-center">
                Volume (24hr)
                <v-icon
                  name="bi-caret-down-fill"
                  v-if="sortBy === '-volumeUsd24Hr'"
                ></v-icon>
                <v-icon
                  name="bi-caret-up-fill"
                  v-if="sortBy === 'volumeUsd24Hr'"
                ></v-icon>
              </span>
            </th>
          </tr>
        </thead>
        <tbody v-if="paginatedData.length">
          <tr v-for="(crypto, index) in paginatedData" :key="index">
            <td>{{ crypto.name }} ({{ crypto.symbol }})</td>
            <td>{{ roundValue(crypto.priceUsd) }}</td>
            <td
              :class="[
                {
                  'text-green-700': crypto.changePercent24Hr >= 0,
                  'text-red-700': crypto.changePercent24Hr < 0,
                },
              ]"
            >
              {{ roundValue(crypto.changePercent24Hr) }} %
            </td>
            <td>{{ roundValue(crypto.volumeUsd24Hr) }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="mt-16 flex">
      <Button text="<<" :onClick="firstPage" class="w-10" />
      <Button text="Previous" :onClick="prevPage" />
      <div class="w-40 flex align-middle justify-center">
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
      </div>
      <Button text="Next" :onClick="nextPage" />
      <Button text=">>" :onClick="lastPage" class="w-10" />
    </div>
  </div>
</template>

<script setup>
import axios from "axios";
import { computed, onMounted, ref } from "vue";
import getCurrentData from "../services/getCurrentData.js";
import Button from "./Button.vue";

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

// PAGE NAVIGATION

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

function firstPage() {
  currentPage.value = 1;
}

function lastPage() {
  currentPage.value = totalPages.value;
}

// SORTING
const sortBy = ref("");

function sortPrice() {
  if (sortBy.value === "") {
    sortBy.value = "-priceUsd";
  } else if (sortBy.value === "-priceUsd") {
    sortBy.value = "priceUsd";
  } else {
    sortBy.value = "-priceUsd";
  }
}

function sortChange() {
  if (sortBy.value === "") {
    sortBy.value = "-changePercent24Hr";
  } else if (sortBy.value === "-changePercent24Hr") {
    sortBy.value = "changePercent24Hr";
  } else {
    sortBy.value = "-changePercent24Hr";
  }
}

function sortVolume() {
  if (sortBy.value === "") {
    sortBy.value = "-volumeUsd24Hr";
  } else if (sortBy.value === "-volumeUsd24Hr") {
    sortBy.value = "volumeUsd24Hr";
  } else {
    sortBy.value = "-volumeUsd24Hr";
  }
}
</script>
