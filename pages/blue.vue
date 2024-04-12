<script lang="ts" setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Autoplay, A11y } from 'swiper/modules'
const { data, error } = await useFetch<APIResponseType<BlueArticleType>>('/api/v1/article/page/blue', {
    headers: { accept: 'application/json' },
})
const {
    public: { adBlue1 },
} = useRuntimeConfig()

const { blueArticleList = [] } = data.value?.data ?? {}

const slideActiveIndex = ref(0)

const handleActiveIndexChange = (swiper: { realIndex: number }) => {
    slideActiveIndex.value = swiper.realIndex
}
</script>

<template>
    <div class="mb-100px mt-90px w-full bg-bg">
        <div class="mx-auto max-w-[1200px] w-full">
            <AdSenseBlock :data-ad-slot="adBlue1" />
            <div class="flex flex-col text-center">
                <h1 class="text-30px font-bold font-italic">
                    Explore curated, high-quality information customized just for you.
                </h1>
                <p class="text-16px">Click 'START' for an immersive and enjoyable discovery journey. It's 100% free!</p>
            </div>
            <div class="relative mt-80px w-full pt-372px">
                <div class="absolute left-0 top-0 w-full">
                    <ClientOnly>
                        <div class="swiper w-full !px-60px">
                            <swiper
                                :navigation="{ nextEl: '.swiper-btn-next', prevEl: '.swiper-btn-prev' }"
                                class="relative z-100"
                                :modules="[Navigation, Autoplay, A11y]"
                                slides-per-view="auto"
                                :space-between="0"
                                :watch-slides-progress="true"
                                :grab-cursor="true"
                                :loop="true"
                                :centered-slides="true"
                                :autoplay="{
                                    delay: 5000,
                                    disableOnInteraction: false,
                                }"
                                :breakpoints="{
                                    768: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 20,
                                    },
                                    900: {
                                        slidesPerView: 'auto',
                                        spaceBetween: 40,
                                    },
                                }"
                                @active-index-change="handleActiveIndexChange"
                            >
                                <swiper-slide
                                    v-for="(item, index) in blueArticleList"
                                    v-slot="{ isActive }"
                                    :key="index"
                                    :lazy="true"
                                    class="flex-basis-100% md-flex-basis-50%"
                                >
                                    <!-- 
                                        " -->
                                    <a class="flex flex-center flex-col" :href="`/article/${item.uid}`">
                                        <div
                                            class="h-full w-full rd-10px"
                                            :style="{
                                                'border-color': isActive ? '#00d900' : '#fffcf9',
                                                border: isActive ? '10px solid #00d900' : '',
                                                padding: isActive ? '0' : '10px',
                                            }"
                                        >
                                            <div class="relative w-full flex flex-shrink-0 overflow-hidden pt-52.38%">
                                                <img
                                                    loading="lazy"
                                                    :src="item.coverImg"
                                                    class="swiper-lazy absolute left-0 top-0 h-full w-full flex-shrink-0 bg-gray-1 object-contain"
                                                    :alt="item.title"
                                                />
                                            </div>
                                        </div>
                                        <!-- info -->
                                        <div
                                            :style="{ display: isActive ? '-webkit-box' : 'none' }"
                                            class="line-clamp-1 my-20px px-10px text-18px font-bold font-italic"
                                        >
                                            {{ item.title }}
                                        </div>
                                    </a>
                                </swiper-slide>
                                <!-- button -->
                                <a :href="`/article/${blueArticleList[slideActiveIndex].uid}`">
                                    <div
                                        class="absolute left-[calc((100%-120px)/2)] top-[calc((100%-44px-40px)/2)] z-100"
                                        lg="left-[calc((100%-300px)/2)] top-[calc((100%-44px-80px)/2)]"
                                        md="left-[calc((100%-200px)/2)] top-[calc((100%-44px-60px)/2)]"
                                        sm="left-[calc((100%-300px)/2)] top-[calc((100%-44px-80px)/2)]"
                                        xs="left-[calc((100%-200px)/2)] top-[calc((100%-44px-60px)/2)]"
                                    >
                                        <div
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
                                            md="h-60px w-200px text-24px"
                                            lg="h-80px w-300px text-30px"
                                            sm="h-80px w-300px text-30px  "
                                            xs="h-60px w-200px text-24px"
                                            class="h-40px w-120px flex-center border-4px border-#00000024 rd-20px text-14px font-bold color-white text-shadow-[1px_1px_rgba(0,0,0,0.5)] shadow-[inset_0_2px_2px_#76c376] contrast-100 transition-duration-0.14s transition-ease-in-out hover:contrast-160"
                                        >
                                            START
                                        </div>
                                    </div></a
                                >
                            </swiper>
                            <div
                                class="swiper-btn-prev absolute left-0 top-[calc((100%-44px-40px)/2)] z-200 h-50px w-50px flex flex-center rd-50px bg-black color-white"
                            >
                                <div class="i-svg-swiper-left-arrow h-30px w-30px"></div>
                            </div>
                            <div
                                class="swiper-btn-next absolute right-0 top-[calc((100%-44px-40px)/2)] z-200 h-50px w-50px flex flex-center rd-50px bg-black color-white"
                            >
                                <div class="i-svg-swiper-right-arrow h-30px w-30px"></div>
                            </div></div
                    ></ClientOnly>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
