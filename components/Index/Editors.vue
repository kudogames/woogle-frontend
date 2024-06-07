<script setup lang="ts">
withDefaults(
    defineProps<{
        articleList: Article[]
    }>(),
    {
        articleList: () => [],
    }
)
</script>

<template>
    <div class="flex flex-wrap gap-10px">
        <a
            v-for="(item, index) in articleList"
            :key="index"
            class="group w-full flex flex-col gap-4px rd-lg bg-#fff px-20px py-20px lg-w-[calc((100%-2*10px)/3)] sm-w-[calc((100%-10px)/2)] hover:scale-100.5 hover:shadow-lg"
            :href="`/article/${item.uid}`"
        >
            <div class="relative w-full overflow-hidden rd-lg bg-gray-2 pt-calc[1200,628]">
                <img
                    v-lazy="item.coverImg"
                    class="absolute left-0 top-0 h-full w-full object-contain"
                    :alt="item.title"
                />
            </div>
            <div class="flex flex-col gap-10px sm-py-10px">
                <span class="text-16px font-bold color-#d83e2d">Trending Article</span>
                <h2 class="line-clamp-2 text-18px font-bold line-height-24px group-hover:color-#0155ff">
                    {{ item.title }}
                </h2>
            </div>
        </a>
    </div>
</template>
