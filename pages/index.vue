<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Autoplay } from 'swiper/modules'

definePageMeta({
    layout: 'index-layout',
})

const { data, error } = await useFetch<APIResponseType<IndexPageType>>('/api/v1/article/page/index', {
    headers: { accept: 'application/json' },
})

const { swiperArticleList, trendingArticleList, editorsArticleList, latestArticleList } =
    data.value?.data ?? ({} as IndexPageType)
const dataLoading = ref(false)

const slideActiveIndex = ref(0)

const handleActiveIndexChange = (swiper: { realIndex: number }) => {
    slideActiveIndex.value = swiper.realIndex
}

const categoryImgList = [
    {
        name: 'Vehicle Donation',
        slug: 'vehicle-donation',
        img: (await import('@/assets/img/index/donation.webp')).default,
    },
    {
        name: 'Vehicle Plans',
        slug: 'vehicle-plans',
        img: (await import('@/assets/img/index/plans.webp')).default,
    },
    {
        name: 'Motor Vehicles',
        slug: 'motor-vehicles',
        img: (await import('@/assets/img/index/moto.webp')).default,
    },
    {
        name: 'Repair',
        slug: 'repair',
        img: (await import('@/assets/img/index/repair.webp')).default,
    },
]
</script>

<template>
    <div class="font-sora">
        <div class="bg-#fff px-10px py-30px">
            <div class="mx-auto max-w-[1200px]">
                <div class="flex gap-30px lt-md-flex-col">
                    <div class="w-full lg-w-600px md-w-440px">
                        <ClientOnly>
                            <swiper
                                class="swiper"
                                :modules="[Autoplay]"
                                :loop="true"
                                :autoplay="{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }"
                                @active-index-change="handleActiveIndexChange"
                            >
                                <swiper-slide
                                    v-for="(item, index) in swiperArticleList"
                                    :key="index"
                                    :lazy="true"
                                    class="flex-basis-100%"
                                >
                                    <a class="flex flex-center flex-col" :href="`/c/${item.slug}`">
                                        <!-- img -->
                                        <div
                                            class="relative w-full flex flex-shrink-0 overflow-hidden rd-md bg-gray-2 pt-calc[1200,628]"
                                        >
                                            <img
                                                loading="lazy"
                                                :src="item.coverImg"
                                                class="swiper-lazy absolute left-0 top-0 h-full w-full flex-shrink-0 bg-gray-1"
                                                :alt="item.title"
                                            />
                                        </div>
                                    </a>
                                </swiper-slide>
                            </swiper>
                        </ClientOnly>
                    </div>
                    <div
                        class="w-full flex flex-col justify-between gap-6px px-10px lg-w-[calc(100%-630px)] md-w-[calc(100%-390px)]"
                    >
                        <div v-for="(item, index) in swiperArticleList" :key="index" class="flex flex-col gap-6px">
                            <a
                                :href="`/article/${item.uid}`"
                                class="group flex flex-col justify-between"
                                hover="bg-#00000010"
                                :class="slideActiveIndex === index ? 'bg-#00000010 scale-104' : ''"
                            >
                                <h2 class="line-clamp-1 text-18px font-bold group-hover:color-#0155ff">
                                    {{ item.title }}
                                </h2>
                                <p class="line-clamp-1 text-14px color-#193774">{{ item.description }}</p>
                                <span class="text-12px color-#193774 lt-md-block lt-lg-hidden">{{
                                    formattedDate(item.updateTime)
                                }}</span>
                            </a>
                            <hr v-if="index !== 3" class="color-#aecdff" />
                        </div>
                    </div>
                </div>
                <TopicSearchBar
                    :placeholder="' '"
                    :button-class="' px-40px bg-#193774'"
                    class="my-10px w-full b-1px b-#193774 rd-md lg-w-600px"
                />
            </div>
        </div>

        <div class="mx-auto max-w-[1200px] w-full">
            <div class="flex justify-between px-10px py-30px lt-lg-flex-wrap lt-md-gap-10px lt-md-gap-y-20px">
                <div
                    v-for="(item, index) in categoryImgList"
                    :key="index"
                    class="flex-shrink-0 flex-basis-[calc((100%-3*10px)/4)] lt-md-flex-basis-[calc((100%-10px)/2)]"
                >
                    <a :href="`/c/${item.slug}`" class="flex flex-center">
                        <div class="group xss-w-180px w-full">
                            <div
                                group-hover="shadow-md duration-500  scale-105"
                                class="rd-lt-rb relative w-full overflow-hidden bg-gray-2 pt-calc[1200,628]"
                            >
                                <img
                                    v-lazy="item.img"
                                    class="absolute left-0 top-0 h-full w-full object-contain"
                                    :alt="item.name"
                                />
                            </div>
                            <h2 group-hover="color-#d83e2d" class="mt-10px text-center text-18px font-bold">
                                {{ item.name }}
                            </h2>
                        </div>
                    </a>
                </div>
            </div>

            <div class="px-10px py-20px text-24px font-bold">Trending Articles</div>
            <IndexTrending class="mx-10px" :article-list="trendingArticleList" />
            <div class="px-10px py-20px text-24px font-bold">Latest Articles</div>
            <IndexLatest :article-list="latestArticleList" />
            <div class="px-10px py-20px text-24px font-bold">Trending Articles</div>

            <IndexEditors class="mb-30px px-10px" :article-list="editorsArticleList" />
        </div>
        <LoadingAnim :visible="dataLoading" />
    </div>
</template>

<style scoped lang="scss">
.rd-lt-rb {
    border-radius: 30px 0 30px 0;
}
</style>
