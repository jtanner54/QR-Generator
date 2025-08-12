<script setup>
const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits({});
</script>

<template>
  <div>
    <select v-for="value in props.items">
      <p>{{ value }}</p>
    </select>
  </div>
</template>
