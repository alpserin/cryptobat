<template>
    <div>
        <h2>Crypto Prices</h2>
        <div class="data">
            <div v-for="crypto in crypto_data" :key="index">
                <p>{{ crypto }}</p>


            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Table',
  data() {
    return {
      crypto_data: [],
    };
  },
  async created() {
    try {
      const response = await axios.get('http://localhost:5000/api');
      this.crypto_data = response.data.data;
    } catch (error) {
      console.error(error);
    }
  },
};
</script>