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
    <div class="flex gap-20px bg-#fff p-10px lt-md-flex-col lg-gap-70px">
        <div class="w-full flex flex-col gap-10px lg-w-[calc(100%-610px)] md-w-[calc(100%-420px)]">
            <div v-for="(item, index) in articleList.slice(0, 3)" :key="index" class="group flex flex-col gap-10px">
                <a :href="`/article/${item.uid}`" class="lt-xss-flex-col flex gap-10px" hover="bg-#00000010">
                    <div
                        xl="pt-120px w-224px"
                        xss="pt-90px w-174px"
                        class="relative w-full flex-shrink-0 overflow-hidden rd-md bg-gray-2 pt-calc[1200,628]"
                    >
                        <img
                            v-lazy="item.coverImg"
                            class="absolute left-0 top-0 h-full w-full object-contain"
                            :alt="item.title"
                        />
                    </div>
                    <div class="xss-w-[calc(100%-184px)] flex flex-col justify-between xl-w-[calc(100%-234px)]">
                        <span class="text-16px font-bold color-#d83e2d">Trending Article</span>
                        <h2 class="line-clamp-2 text-18px font-bold line-height-24px group-hover:color-#0155ff">
                            {{ item.title }}
                        </h2>

                        <span class="text-12px color-#193774 lt-md-block lt-lg-hidden">{{
                            formattedDate(item.updateTime)
                        }}</span>
                    </div>
                </a>
                <hr v-if="index !== 2" class="w-full b-#aecdff" />
            </div>
        </div>
        <a :href="`/article/${articleList.slice(3)[0].uid}`" class="h-full w-full flex flex-col lg-w-540px md-w-400px">
            <div class="relative flex-shrink-0 overflow-hidden rd-t-md bg-gray-2 pt-calc[1200,628]">
                <img
                    v-lazy="articleList.slice(3)[0].coverImg"
                    class="absolute left-0 top-0 h-full w-full object-contain"
                    :alt="articleList.slice(3)[0].title"
                />
            </div>
            <div class="w-full flex flex-col gap-6px bg-#fff6ac px-20px py-14px">
                <span class="text-12px font-bold color-#d83e2d">Trending Article</span>
                <h2 class="line-clamp-2 text-16px font-bold line-height-24px group-hover:color-#0155ff">
                    {{ articleList.slice(3)[0].title }}
                </h2>
            </div>
        </a>
    </div>
</template>
