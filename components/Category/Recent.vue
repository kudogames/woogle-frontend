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
            class="group w-full flex flex-col gap-4px rd-lg bg-#fff px-30px py-20px lg-w-[calc((100%-2*10px)/3)] sm-w-[calc((100%-10px)/2)] hover:scale-100.5 hover:shadow-lg"
            :href="`/article/${item.uid}`"
        >
            <div class="relative w-full overflow-hidden rd-lg bg-gray-2 pt-calc[1200,628]">
                <img
                    v-lazy="item.coverImg"
                    class="absolute left-0 top-0 h-full w-full object-contain"
                    :alt="item.title"
                />
            </div>
            <div class="flex justify-between pt-8px text-12px color-#6e6e6e90">
                <span class="text-12px color-#6e6e6e90">{{ formattedDate(item.updateTime) }}</span>
                <span class="">{{ item.readTime }} min read </span>
            </div>

            <div class="flex items-center justify-between">
                <h2 class="line-clamp-1 text-20px font-bold group-hover:color-#0155ff">
                    {{ item.title }}
                </h2>
                <div class="i-svg-ic-arrow h-24px w-24px flex-shrink-0 bg-#0155ff"></div>
            </div>

            <p class="line-clamp-2 text-14px color-#6e6e6e">{{ item.description }}</p>
        </a>
    </div>
</template>
