<script setup lang="ts">
const { articles } = defineProps({
    articles: {
        type: Array<Article>,
        default: () => [],
    },
})
</script>

<template>
    <div>
        <a
            v-for="(item, index) in articles"
            :key="index"
            :href="`/article/${item.uid}`"
            class="w-full flex items-center b-b-2 b-color5 py-40px"
        >
            <div class="flex flex-center flex-col gap-x-30px sm-flex-row">
                <div class="w-250px flex-center flex-shrink-0 xl-w-350px">
                    <div class="relative w-full overflow-hidden pt-51.8% shadow-lg">
                        <img
                            v-lazy="item.coverImg"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            class="absolute left-0 top-0 h-full w-full object-contain"
                            :alt="item.title"
                        />
                    </div>
                </div>

                <div class="flex flex-col justify-center gap-10px">
                    <div class="flex gap-10px py-10px color-gray-4">
                        <span class="color-color6">{{ item.category.name.toUpperCase() }}</span> |
                        <span class="color-color7">{{ item.category.name.toUpperCase() }}</span>
                    </div>

                    <div class="line-clamp-1 text-18px font-550 color-color1 xl-line-clamp-2">
                        {{ item.title }}
                    </div>
                    <div class="line-clamp-2 text-14px color-color7 xl-line-clamp-3">{{ item.description }}</div>
                </div>
            </div>
        </a>
    </div>
</template>
