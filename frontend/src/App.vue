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

            <!--Choices for safety level-->
            <div class="flex mt-5 gap-x-3">
                <h1>Error Correction Level:</h1>
                <Dropdown
                    @optionSelected="selectSafetyOption"
                    :items="safetyLevels"
                />
                <p class="text-gray-400 hover:cursor-pointer hover:underline decoration-dotted underline-offset-2">?</p>
            </div>

            <!--Choice for gradient color (Coming Soon)-->
            <!-- <div class="flex mt-5 gap-x-3">
                <h1>Primary Color Gradient:</h1>
            </div> -->

            <div class=" py-5">
                <!--HSLA values with sliders for values-->
                <h1 class=" text-lg font-bold">Primary Color</h1>
                <p>Hue: {{ forehue }}</p>
                <input v-model="forehue" type="range" min="0" max="359" step="1" class="slider" />
                <p>Saturation: {{ foresaturation }}</p>
                <input v-model="foresaturation" type="range" min="0" max="100" step="1" class="slider" />
                <p>Lightness: {{ forelightness }}</p>
                <input v-model="forelightness" type="range" min="0" max="100" step="1" class="slider" />
                <p>Transparency: {{ forealpha }}</p>
                <input v-model="forealpha" type="range" min="0" max="100" step="1" class="slider" />
            </div>
            <div class=" py-5">
                <!--HSLA values with sliders for values-->
                <h1 class=" text-lg font-bold">Secondary Color</h1>
                <p>Hue: {{ backhue }}</p>
                <input v-model="backhue" type="range" min="0" max="359" step="1" class="slider" />
                <p>Saturation: {{ backsaturation }}</p>
                <input v-model="backsaturation" type="range" min="0" max="100" step="1" class="slider" />
                <p>Lightness: {{ backlightness }}</p>
                <input v-model="backlightness" type="range" min="0" max="100" step="1" class="slider" />
                <p>Transparency: {{ backalpha }}</p>
                <input v-model="backalpha" type="range" min="0" max="100" step="1" class="slider" />
            </div>

        </div>
        <div>
            <!-- A higher "level" reduces chances of error if code is damaged -->
            <!--Used to set values for QR code-->
            <QrcodeVue
                :value="qrLink"
                :foreground="foreColor"
                :background="backColor"
                :size=400
                render-as="canvas"
                :level="currentSafetyLevel.value"
            />
        </div>
    </div>
</template>

<style scoped></style>

<script setup>
import { ref, computed } from "vue";
import QrcodeVue from "qrcode.vue";
import Dropdown from "./components/Dropdown.vue";

const forehue = ref(0);
const foresaturation = ref(100);
const forelightness = ref(50);
const forealpha = ref(100);
const backhue = ref(0);
const backsaturation = ref(100);
const backlightness = ref(50);
const backalpha = ref(0);
const qrLink = ref("");
const safetyLevels = ['L', 'M', 'Q', 'H']
const currentSafetyLevel = ref('L')

const foreColor = computed(() => {
  return `hsla(${forehue.value}, ${foresaturation.value}%, ${forelightness.value}%, ${forealpha.value}%)`;
});

const backColor = computed(() => {
  return `hsla(${backhue.value}, ${backsaturation.value}%, ${backlightness.value}%, ${backalpha.value}%)`;
});

function selectSafetyOption(selectedOption) {
    currentSafetyLevel.value = selectedOption
}

</script>
