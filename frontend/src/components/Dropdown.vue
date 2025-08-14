<template>
  <div>
    <select v-model="selectedOption">
      <option @click="selectOption" v-for="item in items">{{ item }}</option>
    </select>
  </div>
</template>

<script setup>
import { ref } from "vue";

const selectedOption = ref("L");

const props = defineProps({
  items: {
    type: Array,
    required: true,
  },
});

const emit = defineEmits(["optionSelected"]);

function selectOption() {
  emit("optionSelected", selectedOption);
}
</script>
