<script setup lang="ts">
const { article, category } = defineProps({
    article: {
        type: Object,
        default: () => ({} as Article),
    },
    category: {
        type: String,
        default: '',
    },
})
</script>
<template>
    <div>
        <div class="flex flex-wrap justify-between gap-x-30px px-10px md-gap-x-60px">
            <a
                class="b-color5 flex flex-center flex-basis-100% flex-col overflow-hidden b-1 rd-10px pb-10px"
                :href="`/article/${article.uid}`"
            >
                <div class="relative w-full flex flex-shrink-0 pt-52.8%">
                    <img
                        loading="lazy"
                        :src="article.coverImg"
                        class="absolute left-0 top-0 h-full w-full object-contain"
                        :alt="article.title"
                    />
                </div>
                <div class="line-clamp-2 my-10px px-20px font-550">{{ article.title }}</div>
            </a>
        </div>
    </div>
</template>
