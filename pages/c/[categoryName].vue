<script lang="ts" setup>
import { title } from '~/constants'
definePageMeta({
    layout: 'index-layout',
})
const {
    params: { categoryName: category },
} = useRoute('c-categoryName')

const { data, error } = await useFetch<APIResponseType<CategoryPageType>>(`/api/v1/article/page/c/${category}`, {
    headers: { accept: 'application/json' },
})

const categoryMap: Record<string, string> = {
    'vehicle-donation': 'Vehicle Donation',
    'vehicle-plans': 'Vehicle plans',
    'motor-vehicles': 'Motor Vehicles',
    repair: 'Repair',
}

useHead({
    title: ` ${categoryMap[category]} - ${title}`,
})

const { topArticle, trendingArticleList, recentArticleList } = data.value?.data ?? ({} as CategoryPageType)

// const dataLoading = ref(false)
// loadingMoreData<Article>({
//     url: `/api/v1/article/page/get-data/${category}`,
//     oldDataList: recentArticleList,
//     size: 12,
//     dataLoading,
//     query: {
//         type: 'category',
//     },
// })
</script>

<template>
    <div class="mx-auto h-full max-w-[1920px] w-full">
        <div class="w-full flex flex-center bg-[url(@/assets/img/bg-img.webp)] py-16px">
            <!-- <img class="absolute left-0 top-0 h-full w-full object-cover" src="@/assets/img/bg-img.webp" alt="" /> -->
            <div class="max-w-[1200px] w-full px-10px py-20px">
                <div class="flex gap-20px bg-white lt-sm-flex-col">
                    <div
                        class="relative w-full flex-shrink-0 bg-gray-2 pt-calc[1200,628] sm-w-50% sm-pt-calc[1200,628,50]"
                    >
                        <img
                            v-lazy="topArticle.coverImg"
                            class="absolute left-0 top-0 h-full w-full flex-shrink-0 object-contain"
                            :alt="topArticle.title"
                        />
                        <span
                            class="absolute left-10px top-10px rd-29px bg-#e86187 px-16px py-4px text-14px font-bold color-white opacity-80"
                            >{{ categoryMap[category] }}</span
                        >
                    </div>
                    <div class="w-full flex flex-col justify-between px-10px sm-w-[calc(50%-20px)]">
                        <h1 class="w-full py-10px text-18px font-bold lg-text-26px">
                            {{ topArticle.title }}
                        </h1>
                        <div class="flex justify-between py-10px">
                            <span class="text-14px font-sora color-#6e6e6e">{{
                                formattedDate(topArticle.updateTime)
                            }}</span>
                            <a :href="`/article/${topArticle.uid}`" class="flex items-center gap-10px color-#0155ff">
                                <span>Read Now</span>
                                <div class="i-svg-arrow h-24px w-24px"></div
                            ></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="mx-auto max-w-[1200px] w-full px-10px">
            <div class="px-10px py-16px text-26px font-bold">Trending Articles</div>
            <CategoryTrending :article-list="trendingArticleList" />
            <div class="px-10px py-16px text-26px font-bold">Recent Articles</div>
            <CategoryRecent :article-list="recentArticleList" />
        </div>
    </div>
</template>
