<script setup lang="ts">
const { articles, category } = defineProps({
    articles: {
        type: Array<Article>,
        default: () => [],
    },
    category: {
        type: String,
        default: '',
    },
})
</script>
<template>
    <div>
        <h1 class="py-10px pl-10px text-28px">{{ category }}</h1>
        <div class="flex flex-wrap justify-start gap-x-20px px-10px">
            <a
                v-for="(item, index) in articles"
                :key="index"
                class="flex flex-center flex-basis-[calc((100%-20px)/2)] flex-col pb-10px md-flex-basis-[calc((100%-20*3px)/4)]"
                :href="`/article/${item.uid}`"
            >
                <div class="relative w-full flex flex-shrink-0 overflow-hidden b-2 border-color8 rd-lg pt-51.8%">
                    <img
                        v-lazy="item.coverImg"
                        class="absolute left-0 top-0 h-full w-full object-contain"
                        :alt="item.title"
                    />
                </div>
                <div class="line-clamp-1 my-10px px-10px">{{ item.title }}</div>
            </a>
        </div>
    </div>
</template>
