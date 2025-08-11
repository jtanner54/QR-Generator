<template>
    <div class="flex p-10 gap-x-5 bg-white h-screen">
        <div>
            <h1>Welcome to QR-Generator</h1>
            <p>{{ hue }}</p>
            <input v-model="hue" type="range" min="0" max="359" step="1" class="slider">
            <br>
            <p>{{ saturation }}</p>
            <input v-model="saturation" type="range" min="0" max="100" step="1" class="slider">
            <br>
            <p>{{ lightness }}</p>
            <input v-model="lightness" type="range" min="0" max="100" step="1" class="slider">
        </div>
        <div>
            <!-- A higher "level" reduces chances of error if code is damaged -->
            <QrcodeVue
                :value="inputLink"
                :foreground='textColor'
                size="150"
                render-as="canvas"
                level='H' 
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
      return `hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, 100%)`
    })

</script>