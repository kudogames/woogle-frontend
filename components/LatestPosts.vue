<script setup lang="ts">
const { articles } = defineProps({
    articles: {
        type: Array<Article>,
        default: () => [],
    },
})
const dataLoading = ref(false)
</script>

<template>
    <div>
        <div class="flex items-center py-20px text-center">
            <hr class="flex-1 b-3 b-color8" />
            <span class="px-10px text-14px"> LATEST POSTS </span>
            <hr class="flex-1 b-3 b-color8" />
        </div>
        <div class="flex flex-row flex-wrap gap-20px lg-flex-col">
            <a
                v-for="(item, index) in articles"
                :key="index"
                :href="`/article/${item.uid}`"
                class="w-full flex items-center py-20px xs-flex-basis-[calc((100%-20px)/2)]"
            >
                <div class="w-full">
                    <div class="relative w-full flex-shrink-0 pt-51.18% shadow-lg">
                        <img
                            v-lazy="item.coverImg"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            class="absolute left-0 top-0 h-full w-full object-contain"
                            :alt="item.title"
                        />
                        <div
                            class="absolute left-47% top--10px z-10 h-20px w-20px flex-center rd-20px bg-color8 text-center color-white"
                        >
                            {{ index + 1 }}
                        </div>
                    </div>
                    <div class="line-clamp-3 px-10px pt-20px text-center font-550 color-[rgb(82,81,68)]">
                        {{ item.title }}
                    </div>
                </div>
            </a>
        </div>
    </div>
    <LoadingAnim :visible="dataLoading" />
</template>
