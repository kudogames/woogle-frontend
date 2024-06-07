<script setup lang="ts">
withDefaults(
    defineProps<{
        articleList: Article[]
    }>(),
    {
        articleList: () => [],
    }
)
const headImgList = [
    {
        name: 'Olivia',
        img: (await import('@/assets/img/index/head/1.webp')).default,
    },
    {
        name: 'Ethan',
        img: (await import('@/assets/img/index/head/2.webp')).default,
    },
    {
        name: 'Charlotte',
        img: (await import('@/assets/img/index/head/3.webp')).default,
    },
    {
        name: 'Jack',
        img: (await import('@/assets/img/index/head/4.webp')).default,
    },
    {
        name: 'Emily',
        img: (await import('@/assets/img/index/head/5.webp')).default,
    },
]
</script>

<template>
    <div class="flex flex-wrap gap-10px">
        <a
            v-for="(item, index) in articleList"
            :key="index"
            class="w-full flex flex-col gap-4px rd-lg bg-#fff px-30px py-20px lg-w-[calc((100%-2*10px)/3)] sm-w-[calc((100%-10px)/2)] hover:scale-100.5 hover:shadow-lg"
            :href="`/article/${item.uid}`"
        >
            <div class="relative w-full overflow-hidden rd-lg bg-gray-2 pt-calc[1200,628]">
                <img
                    v-lazy="item.coverImg"
                    class="absolute left-0 top-0 h-full w-full object-contain"
                    :alt="item.title"
                />
            </div>
            <span class="pt-8px text-12px color-#6e6e6e90 lt-md-block lt-lg-hidden">{{
                formattedDate(item.updateTime)
            }}</span>
            <h2 class="line-clamp-1 text-20px font-bold group-hover:color-#0155ff">
                {{ item.title }}
            </h2>
            <p class="line-clamp-1 text-14px color-#6e6e6e">{{ item.description }}</p>

            <div class="flex items-center">
                <div class="w-80px flex flex-shrink-0">
                    <div class="relative w-full overflow-hidden rd-40px bg-gray-2 pt-40px">
                        <img
                            v-lazy="headImgList[index % headImgList.length].img"
                            class="absolute left-0 top-0 h-full w-full object-contain"
                            :alt="item.title"
                        />
                    </div>
                    <div class="relative left--10px w-full overflow-hidden rd-40px bg-gray-2 pt-40px">
                        <img
                            v-lazy="headImgList[(index + 1) % headImgList.length].img"
                            class="absolute left-0 top-0 h-full w-full object-contain"
                            :alt="item.title"
                        />
                    </div>
                </div>
                <div class="w-full flex items-center justify-between">
                    <p class="line-clamp-1 w-[calc(100%-20px)] color-#0155ff">
                        {{ headImgList[index % headImgList.length].name }} ,
                        {{ headImgList[(index + 1) % headImgList.length].name }} ,
                        {{ headImgList[(index + 3) % headImgList.length].name }} ...likes
                    </p>
                    <div class="i-svg-ph--heart-fill h-20px w-20px bg-#ff627f"></div>
                </div>
            </div>
        </a>
    </div>
</template>
