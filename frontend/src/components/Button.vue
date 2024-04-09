<template>
  <button
    @click="onClick"
    type="button"
    class="border border-gray-300 hover:font-bold mx-2 w-48"
  >
    {{ text }}
  </button>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
    onClick: {
      type: Function,
      required: true,
    },
  },
};
</script>
