<script setup lang="ts">
defineProps({
    tagList: {
        type: Array<string>,
        default: () => [],
    },
    svg: {
        type: String,
        default: 'i-svg-health',
    },
    category: {
        type: String,
        default: 'health',
    },
    color1: {
        type: String,
        default: 'ffad76',
    },
    color2: {
        type: String,
        default: '#fff2dc',
    },
    color3: {
        type: String,
        default: '#ba794d',
    },
})
</script>

<template>
    <div>
        <div class="my-10px text-18px font-bold">{{ category }}</div>
        <div class="flex flex-wrap gap-10px">
            <a
                v-for="(item, index) in tagList"
                :key="index"
                :href="`/q?q=${item}`"
                class="flex-basis-[calc((100%-10px)/2)] flex-wrap gap-10px"
            >
                <div class="flex">
                    <div
                        :style="{ 'background-color': color1 }"
                        class="h-30px w-42px flex-center rd-l-40px py-4px pl-2px"
                    >
                        <div :class="svg" class="h-full w-full"></div>
                    </div>
                    <div
                        :style="{ 'background-color': color2, color: color3 }"
                        class="line-clamp-2 h-30px w-90px flex flex-basis-80% items-center justify-center rd-r-10px text-center text-12px line-height-15px"
                    >
                        {{ item }}
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
