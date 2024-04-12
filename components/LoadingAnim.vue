<template>
    <div class="box-loading fixed bottom-4% left-49% h-60px w-60px" :style="{ display: visible ? 'block' : 'none' }" />
</template>

<script setup lang="ts">
defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
})

defineEmits(['update:visible'])
</script>
<style scoped lang="scss">
.box-loading:after {
    content: ' ';
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    box-sizing: border-box;
    border: 30px solid;
    border-color: #a6d893 transparent white transparent;
    animation: anim-box-loading 1.2s infinite;
}

@keyframes anim-box-loading {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
}
</style>
