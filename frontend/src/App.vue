<template>
  <div class="flex p-10 gap-x-5 bg-white h-screen">
    <div>
      <!--link of QR code-->
      <label for="link" class="block text-gray-700 text-sm font-bold mb-2">QR Link:</label>
      <input
        type="text"
        id="link"
        v-model="qrLink"
        class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      />

      <!--HSL values with sliders for values-->
      <p>Hue: {{ hue }}</p>
      <input v-model="hue" type="range" min="0" max="359" step="1" class="slider" />
      <br />
      <p>Saturation: {{ saturation }}</p>
      <input v-model="saturation" type="range" min="0" max="100" step="1" class="slider" />
      <br />
      <p>Lightness: {{ lightness }}</p>
      <input v-model="lightness" type="range" min="0" max="100" step="1" class="slider" />

      <!--Choices for level of qr code-->
      <Dropdown @optionSelected="selectSafetyOption" :items="safetyLevels" />

      <input type="file" @change="fileChange"></input>
    </div>
    <div>
      <!-- A higher "level" reduces chances of error if code is damaged -->
      <!--Used to set values for QR code-->
      <QrcodeVue
        :value="qrLink"
        :foreground="qrColor"
        :size="400"
        render-as="canvas"
        :level="currentSafetyLevel.value"
      />
      <p>Value: {{ currentSafetyLevel.value }}</p>
    </div>
  </div>
</template>

<style scoped></style>

<script setup>
import { ref, computed } from "vue";
import QrcodeVue from "qrcode.vue";
import Dropdown from "./components/Dropdown.vue";
import { uploadImage } from './services/api_service.js'

const hue = ref(0);
const saturation = ref(100);
const lightness = ref(50);
const qrLink = ref("");
const safetyLevels = ["L", "M", "Q", "H"];
const currentSafetyLevel = ref("L");

const qrColor = computed(() => {
  return `hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 100%)`;
});

function selectSafetyOption(selectedOption) {
  currentSafetyLevel.value = selectedOption;
}

async function fileChange(event) {
  const image = event.target.files[0];
  if (!image) return;

  const result = await uploadImage(image);
  if (result.success) {
    console.log('Uploaded:', result);
  } else {
    console.error('Upload failed:', result.error)
  }
}

</script>
