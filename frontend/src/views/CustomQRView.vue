<template>
    <div class="flex p-5 gap-x-5 bg-white h-full">
        <div class="">
            <input class="py-4" type="file" @change="fileChange"></input>

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
                <Dropdown @optionSelected="selectSafetyOption" :items="safetyLevels" />
                <p class="text-gray-400 hover:cursor-pointer hover:underline decoration-dotted underline-offset-2">?</p>
            </div>

            <!-- Choice for gradient color (Coming Soon)-->
            <!-- <div class="flex mt-5 gap-x-3">
            <h1>Primary Color Gradient:</h1>
            </div> -->

            <div class=" flex col-span-2">
                <div class=" mr-2.5 py-5">
                    <ColorSliders slidersTitle="Primary Color" for-what="foreground" @updateColor="handleColorUpdate"/>
                </div>

                <div class=" ml-2.5 py-5">
                    <ColorSliders slidersTitle="Background Color" for-what="background" @updateColor="handleColorUpdate"/>
                </div>
            </div>
        </div>

        <div class="px-50">
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

<script setup>

    import { ref, computed } from "vue";
    import QrcodeVue from "qrcode.vue";
    import Dropdown from "@/components/Dropdown.vue";
    import ColorSliders from "@/components/ColorSliders.vue";
    import { uploadImage } from '@/services/api_service.js'

    const qrLink = ref("");
    const safetyLevels = ['L', 'M', 'Q', 'H']
    const currentSafetyLevel = ref('L')
    const foreColor = ref("hsla(0,100%,50%,100%)")
    const backColor = ref("hsla(0,100%,50%,100%)")

    function selectSafetyOption(selectedOption) {
    currentSafetyLevel.value = selectedOption;
    }

    function handleColorUpdate({ target, value }) {
        if (target === 'foreground') {
            foreColor.value = value;
        } else if (target === 'background') {
            backColor.value = value;
        }
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