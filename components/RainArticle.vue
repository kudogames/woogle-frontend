<script setup lang="ts">
const { articles } = defineProps({
    articles: {
        type: Array<Article>,
        default: () => [],
    },
})
</script>

<template>
    <div class="flex flex-col gap-20px">
        <div v-for="(item, index) in articles" :key="index">
            <a :href="`/article/${item.uid}`">
                <div class="flex flex-col gap-20px sm-flex-row lt-sm-items-center">
                    <div class="w-full flex-center flex-shrink-0 lg-w-400px md-w-300px sm-w-250px xl-w-600px">
                        <div class="relative w-full overflow-hidden pt-52.23%">
                            <img
                                v-lazy="item.coverImg"
                                class="absolute left-0 top-0 h-full w-full bg-gray-1 object-contain"
                                :alt="item.title"
                            />
                        </div>
                    </div>

                    <div class="flex flex-col justify-between px-10px text-start lt-sm-items-center lt-sm-gap-10px">
                        <h2
                            class="line-clamp-1 block text-20px font-bold font-italic color-#000 xl-line-clamp-2 lg-text-24px md-text-20px sm-text-14px"
                        >
                            {{ item.title }}
                        </h2>

                        <p
                            class="line-clamp-2 block text-start text-16px font-100 color-color7 xl-line-clamp-3 lg-text-18px"
                        >
                            {{ item.description }}
                        </p>

                        <button
                            style="
                                background: radial-gradient(
                                            at 0 -15%,
                                            hsla(0, 0%, 100%, 0.07) 70%,
                                            hsla(0, 0%, 100%, 0) 71%
                                        )
                                        0 0/80% 90% no-repeat content-box,
                                    linear-gradient(#00b700, #1d9b1d) content-box,
                                    linear-gradient(#16b916, #309730) border-box;
                            "
                            class="h-60px w-200px flex-center border-4px border-#00000024 rd-20px text-32px font-bold color-white text-shadow-[1px_1px_rgba(0,0,0,0.5)] shadow-[inset_0_2px_2px_#76c376] contrast-100 transition-duration-0.14s transition-ease-in-out lg-h-80px lg-w-300px lg-text-40px hover:contrast-160"
                        >
                            START
                        </button>
                    </div>
                </div>
            </a>
        </div>
    </div>
</template>
