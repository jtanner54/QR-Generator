<template>
    <div class="flex p-10 gap-x-5">
        <div>
            <h1>Welcome to QR-Generator</h1>
            <input v-model="hue" type="range" min="0" max="359" step="1" class="slider">
            <br>
            <input v-model="saturation" type="range" min="0" max="100" step="1" class="slider">
            <br>
            <input v-model="lightness" type="range" min="0" max="100" step="1" class="slider">
            <br>
            <p>{{ colorlight }}</p>
            <p>{{ brightness }}</p>
        </div>
        <div>
            <QrcodeVue
                :value="inputLink"
                :foreground='textColor'
                render-as="canvas"
            />
        </div>
    </div>
    
</template>

<style scoped>

</style>

<script setup>

    import { ref, computed } from 'vue'
    import QrcodeVue from 'qrcode.vue'


    const hue = ref(0)
    const saturation = ref(100)
    const lightness = ref(50)
    const inputLink = ref('https://google.com')

    const textColor = computed(() => {
      return `hsl(${hue.value}, ${saturation.value}%, ${lightness.value}%)`
    })

</script>