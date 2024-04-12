<script setup lang="ts">
import TmplKeyWordPopular from '~/components/TmplKeyWord/Popular.vue'
import TmplKeyWordOffers from '~/components/TmplKeyWord/Offers.vue'
const {
    params: { tmplKeyWord, keyWord },
} = useRoute('tmplKeyWord-keyWord')

// 广告ID
const {
    public: { adhome1, adhealth1 },
} = useRuntimeConfig()

// 模板选择
interface KeywordMap {
    [key: string]: Component
}
const keywordMap: KeywordMap = {
    popular: TmplKeyWordPopular,
    offers: TmplKeyWordOffers,
}
// 获取符合关键字的模板
const currentComponent = shallowRef(keywordMap[tmplKeyWord])

const url = `/api/v1/article/page/${tmplKeyWord}/${keyWord}`
// 请求数据
const { data, error } = await useFetch<APIResponseType<RelatedArticlePageType>>(url, {
    headers: { accept: 'application/json' },
})
// 结构数据
const { relatedArticle, recommendArticleList } = data.value?.data ?? {}

// 标题描述,post标题，图片信息
interface PageInfoMap {
    [key: string]: {
        title?: string
        description?: string
        adData?: {
            adStyle?: string
            adFormat?: string
            adResponsive?: string
            adClass: string
            adSlot: string
        }
    }
}
const pageInfoMap: PageInfoMap = {
    'offers-home': {
        title: 'Smart Choices, Superior Savings: Your 3-in-1 Service Solution Awaits!',
        description:
            'Say goodbye to the struggle of finding budget-friendly services without sacrificing quality or convenience. Explore the curated options below and discover the perfect blend of economic practicality, service excellence, and convenience. Click now to elevate your experience without exceeding your budget.',
        adData: {
            adStyle: 'display: block; height: 300px;',
            adFormat: 'none',
            adResponsive: 'false',
            adClass: 'mt-3 w-full',
            adSlot: adhome1,
        },
    },
    'popular-health': {
        title: 'Affordable Radiance: Navigate the New Age of Beauty Deals!',
        description:
            'For buyers seeking health and beauty on a budget, discovering economically sound services can be a true challenge. However, the landscape is changing in the health and beauty industry, rewriting the rules on discounts. Explore the options below, and unlock the gateway to personalized and budget-friendly health and beauty solutions.',
        adData: {
            adClass: 'w-full',
            adSlot: adhealth1,
        },
    },
}
const {
    title,
    description,
    adData = {
        adClass: '',
        adStyle: '',
        adFormat: '',
        adResponsive: '',
        adSlot: '',
    },
} = pageInfoMap[`${tmplKeyWord}-${keyWord}`] ?? {}

const dataLoading = ref(false)
loadingMoreData<Article>({
    url,
    oldDataList: recommendArticleList,
    size: 24,
    dataLoading,
})
</script>
<template>
    <div class="pt-70px">
        <component :is="currentComponent">
            <!-- -------------------通用-------------------------------- -->
            <template #searchBar>
                <SearchBar class="mx-auto max-w-900px w-full px-10px py-50px" />
            </template>

            <template #title>
                <div class="px-10px py-20px">
                    <h1 class="my-10px text-left text-16px font-bold lg-text-24px md-text-20px sm-text-18px">
                        {{ title }}
                    </h1>
                    <div class="line-clamp-2 text-12px color-#949494 sm-text-14px">
                        {{ description }}
                    </div>
                </div>
            </template>

            <template #recommendCode>
                <SearchResults class="w-full" :articles="recommendArticleList" />
            </template>
            <!-- --------------------------RelatedSearch------------------------- -->
            <template #relatedSearch>
                <RelatedSearch
                    :class="{ 'w-full sm-w-[calc(100%-300px)]': tmplKeyWord == 'offers' }"
                    :search-text="keyWord"
                />
            </template>

            <!-- ----------------------Offers----RelatedCode------------------------- -->
            <template v-if="tmplKeyWord == 'offers'" #relatedCode>
                <RelatedCode class="w-300px" :article="relatedArticle" />
            </template>

            <!-- -------------------------AD----------------------------   -->
            <template #Ad>
                <AdSenseBlock
                    :class="adData.adClass"
                    :ins-style="adData.adStyle"
                    :data-ad-format="adData.adFormat"
                    :data-full-width-responsive="adData.adResponsive"
                    :data-ad-slot="adData.adSlot"
                />
            </template>
        </component>
        <LoadingAnim :visible="dataLoading" />
    </div>
</template>
