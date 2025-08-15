<template>
    <!--HSLA values with sliders for values-->
    <h1 class=" text-lg font-bold">{{ slidersTitle }}</h1>
    <p>Hue: {{ hue }}</p>
    <input @input="onSliderChange" v-model="hue" type="range" min="0" max="359" step="1" class="slider" />
    <p>Saturation: {{ saturation }}</p>
    <input @input="onSliderChange" v-model="saturation" type="range" min="0" max="100" step="1" class="slider" />
    <p>Lightness: {{ lightness }}</p>
    <input @input="onSliderChange" v-model="lightness" type="range" min="0" max="100" step="1" class="slider" />
    <p>Transparency: {{ alpha }}</p>
    <input @input="onSliderChange" v-model="alpha" type="range" min="0" max="100" step="1" class="slider" />
</template>

<script setup>

    import { ref, computed } from "vue";

    const hue = ref(0);
    const saturation = ref(100);
    const lightness = ref(50);
    const alpha = ref(100);

    const colorOutput = computed(() => {
        return `hsla(${hue.value}, ${saturation.value}%, ${lightness.value}%, ${alpha.value}%)`;
    });

    const props = defineProps({
        forWhat: {
            type: String,
            required: true,
        },
        slidersTitle: {
            type: String,
        }
    });

    const emit = defineEmits(['updateColor'])

    function onSliderChange() {
        emit('updateColor', {
            target: props.forWhat,
            value: colorOutput.value
        });
    }

</script>