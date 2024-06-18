<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { serverTrackImpressionEvent } from '@/utils/search-ad-track'

definePageMeta({
    layout: 'search-ad-layout',
})

const {
    params: { uid, slug },
    query,
} = useRoute('Content-uid-slug')

const { data, error } = await useFetch<APIResponseType<SearchAdPageType>>(
    `/api/v1/article/page/Content/${uid}/${slug}`,
    {
        headers: { accept: 'application/json' },
    }
)

const { searchAdInfo, searchArticle } = data.value?.data ?? ({} as SearchAdPageType)

const readMore = ref(false)

const readMoreClick = () => {
    readMore.value = true
}

const keys = ['utm_campaign', 'utm_content', 'utm_medium', 'utm_source']
const [clickId, campaignId, adGroupId, adId] = keys.map((key) => (query[key] as string) ?? '')

interface TrackParams {
    clickId: string
    campaignId: string
    adGroupId: string
    adId: string
    channelId: string
    tmpl: string
}

// 跟踪参数，带到下一页
const trackParams: TrackParams = {
    channelId: searchAdInfo.channelId,
    clickId,
    campaignId,
    adGroupId,
    adId,
    tmpl: 'Content',
}

// relatedSearch 组件
const relatedSearch = ref()

// Ad 加载完成
const adLoadComplete = ref(false)

// Ad 加载完成回调
const adLoadedCallback = (
    containerName: string,
    adsLoaded: boolean,
    isExperimentVariant: boolean,
    callbackOptions: Object
) => {
    adLoadComplete.value = true
    // 曝光埋点
    serverTrackImpressionEvent({
        siteId: '32',
        campaignId,
        adGroupId,
        adId,
        channelId: searchAdInfo.channelId,
    })
}

// 生成 ignored_params, 10%概率带pgttl, 90%概率不带pgttl
// const ignoredPageParams =
//     Math.random() < 0.1
//         ? 'layout,utm_content,campaign_id,cfgKey,utm_content,utm_campaign,arb_direct,styleID,ad_group_id,arb_campaign_id,utm_medium,utm_source,cpc,ad_id,utm_campaign,click_id,_ckttl,network,section_id,utm_source,subDomain,account,pgttl'
//         : 'layout,utm_content,campaign_id,cfgKey,utm_content,utm_campaign,arb_direct,styleID,ad_group_id,arb_campaign_id,utm_medium,utm_source,cpc,ad_id,utm_campaign,click_id,_ckttl,network,section_id,utm_source,subDomain,account'

const ignoredPageParams =
    'layout,utm_content,campaign_id,cfgKey,utm_content,utm_campaign,arb_direct,styleID,ad_group_id,arb_campaign_id,utm_medium,utm_source,cpc,ad_id,utm_campaign,click_id,_ckttl,network,section_id,utm_source,subDomain,account,pgttl'

onMounted(() => {
    // const e = new URLSearchParams(window.location.search)
    // e.set('pgttl', uuidv4())
    // window.history.replaceState(null, '', '?' + e.toString())
    relatedSearch.value.loadAd()
})
</script>

<template>
    <div>
        <div>
            <QHeader class="bg-#000">
                <template #search>
                    <SearchBar :search-text="slug" class="w-full rd-40px xl-w-600px xl-rd-10px" />
                </template>
            </QHeader>
        </div>

        <div class="mx-auto max-w-1200px min-h-100vh px-10px">
            <header class="py-20px">
                <h1 class="my-10px text-left text-16px font-bold lg-text-24px md-text-20px sm-text-18px">
                    {{ searchArticle.title }}
                </h1>
                <div class="line-clamp-2 text-12px sm-text-14px">
                    {{ searchArticle.description }}
                </div>
            </header>

            <RelatedSearch
                ref="relatedSearch"
                class="w-full"
                search-text="keyword"
                :terms="searchAdInfo.terms"
                :channel-id="searchAdInfo.channelId"
                style-id="8773662877"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :ignored-page-params="ignoredPageParams"
                :track-params="trackParams"
                :manual-load="false"
                @ad-loaded-callback="adLoadedCallback"
            />

            <div class="w-full">
                <!-- <div class="pb-200px pt-10px text-center text-12px" :style="{ display: readMore ? 'none' : 'block' }">
                    <div class="cursor-pointer" @click="readMoreClick">Read More</div>
                </div> -->

                <!-- <article
                    id="articleContent"
                    class="py-10px"
                    :style="{
                        display: readMore ? 'block' : 'none',
                    }"
                    v-html="searchArticle.content"
                ></article> -->
                <article id="articleContent" class="py-10px" v-html="searchArticle.content"></article>
            </div>
        </div>
        <div>
            <base-footer />
            <back-top />
            <cookie-consent />
        </div>
    </div>
</template>

<style lang="scss" scoped>
:deep(#articleContent) {
    h1 {
        display: block;
        font-size: 2em;
        margin-block-start: 0.67em;
        margin-block-end: 0.67em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
    }

    h2 {
        display: block;
        font-size: 1.5em;
        margin-block-start: 0.83em;
        margin-block-end: 0.83em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
    }

    h3 {
        display: block;
        font-size: 1.17em;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
    }

    h4 {
        display: block;
        margin-block-start: 1.33em;
        margin-block-end: 1.33em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        font-weight: bold;
        unicode-bidi: isolate;
    }

    p {
        display: block;
        margin-block-start: 1em;
        margin-block-end: 1em;
        margin-inline-start: 0px;
        margin-inline-end: 0px;
        unicode-bidi: isolate;
    }

    em {
        font-style: italic;
    }
    strong {
        font-weight: bold;
    }
}
</style>
