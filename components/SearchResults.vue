<script setup lang="ts">
const { articles } = defineProps({
    articles: {
        type: Array<Article>,
        default: () => [],
    },
})
</script>
<template>
    <div class="flex flex-col gap-10px px-10px">
        <a
            v-for="(item, index) in articles"
            :key="index"
            :href="`/article/${item.uid}`"
            class="b-color5 w-full flex items-center b-2 rd-10px p-10px"
        >
            <div class="w-full flex flex-center justify-between">
                <div class="flex flex-center flex-col gap-x-20px sm-flex-row">
                    <div class="w-200px flex-center flex-shrink-0">
                        <div class="relative w-full overflow-hidden pt-51.8% shadow-lg">
                            <img
                                v-lazy="item.coverImg"
                                src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                class="absolute left-0 top-0 h-full w-full object-contain"
                                :alt="item.title"
                            />
                        </div>
                    </div>

                    <div class="max-w-500px flex flex-col justify-center gap-10px">
                        <div class="w-full flex gap-10px color-gray-4">
                            <span class="color-color6">{{ item.category.name.toUpperCase() }}</span> |
                            <span class="color-color7">{{ item.category.name.toUpperCase() }}</span>
                        </div>

                        <div class="color-color1 line-clamp-1 text-18px font-550">
                            {{ item.title }}
                        </div>
                        <div class="color-color7 line-clamp-1 text-14px">{{ item.description }}</div>
                    </div>
                </div>

                <div class="bg-color9 hidden rd-10px px-50px py-8px color-white sm-block hover:bg-#f91d6e">Start</div>
            </div>
        </a>
    </div>
</template>
