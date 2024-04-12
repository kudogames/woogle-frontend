<script setup lang="ts">
defineProps({
    visible: {
        type: Boolean,
        default: false,
    },
    navArr: {
        type: Array<Category>,
        default: () => [],
    },
})
defineEmits(['update:visible'])
</script>

<template>
    <div
        :style="{ left: visible ? '0' : '-250px' }"
        class="fixed left-0 top-0 z-11 h-full w-200px overflow-y-auto bg-white py-100px transition-left duration-300 ease-in-out"
    >
        <div v-for="item in navArr" :key="item.name" class="h-30px w-full flex-center justify-start px-8 py-16px">
            <a :href="`/c/${item.slug}`" class="text-3">{{ item.name }}</a>
        </div>
    </div>
    <div
        ref="menuMask"
        class="fixed left-0 top-0 z-10 h-full w-full bg-black bg-opacity-50"
        :style="{ display: visible ? 'block' : 'none' }"
        @click="$emit('update:visible', false)"
    ></div>
</template>
