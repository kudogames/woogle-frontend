<script setup lang="ts">
defineProps({
    articles: {
        type: Array<Article>,
        default: () => [],
    },
})
</script>

<template>
    <div>
        <div class="py-6px pl-20px text-18px">related articles</div>
        <div class="flex flex-wrap gap-x-10px gap-y-60px px-10px">
            <a
                v-for="(item, index) in articles"
                :key="index"
                class="t-image flex flex-center flex-basis-100% flex-col md-flex-basis-100% xs-flex-basis-[calc((100%-10px)/2)]"
                :href="`/article/${item.uid}`"
            >
                <div class="group relative h-full w-full flex flex-col">
                    <div class="relative z-20 w-full">
                        <div
                            class="absolute left-14px top-14px z-10 rd-20px bg-color9 px-20px py-2px text-center text-14px color-white opacity-80"
                        >
                            {{ item.category.name }}
                        </div>

                        <div
                            group-hover="rd-b-0 b-color8 b-b-#fff"
                            class="relative w-full flex flex-shrink-0 overflow-hidden b-2 border-color5 rd-lg pt-51.8%"
                        >
                            <img
                                v-lazy="item.coverImg"
                                class="absolute left-0 top-0 h-full w-full object-contain"
                                :alt="item.title"
                            />
                        </div>
                    </div>

                    <div
                        group-hover=" b-2 b-color8 rd-b-lg b-t-0 pt-12px"
                        class="absolute top-99% line-clamp-1 z-30 b-2 b-#fff bg-white px-10px pb-8px pt-10px line-height-30px"
                    >
                        {{ item.title }}
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
