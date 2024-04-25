<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'

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

// // 需传至搜索页的参数
// const clickId = (query.utm_campaign as string) ?? ''
// const campaignId = (query.utm_content as string) ?? ''
// const adGroupId = (query.utm_medium as string) ?? ''
// const adId = (query.utm_source as string) ?? ''

interface TrackParams {
    clickId: string
    campaignId: string
    adGroupId: string
    adId: string
    saiId: string
}

// 跟踪参数，带到下一页
const trackParams: TrackParams = {
    saiId: searchAdInfo.uid,
    clickId,
    campaignId,
    adGroupId,
    adId,
}

// relatedSearch 组件
const relatedSearch = ref()

// Ad 加载完成
const adLoadComplete = ref(false)

// Ad 加载完成回调
const adLoadedCallback = () => {
    adLoadComplete.value = true
}

onMounted(() => {
    const e = new URLSearchParams(window.location.search)
    e.set('pgttl', uuidv4())
    window.history.replaceState(null, '', '?' + e.toString())
    relatedSearch.value.loadAd()
})
</script>

<template>
    <div>
        <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
            <base-header />
        </div>

        <div class="mx-auto max-w-1200px min-h-100vh px-10px pt-70px">
            <header :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }" class="py-20px">
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
                :style-id="searchAdInfo.termsStyleId"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback"
            />

            <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }" class="w-full">
                <div class="pb-200px pt-10px text-center text-12px" :style="{ display: readMore ? 'none' : 'block' }">
                    <div class="cursor-pointer" @click="readMoreClick">Read More</div>
                </div>

                <article
                    id="articleContent"
                    class="py-10px"
                    :style="{
                        display: readMore ? 'block' : 'none',
                    }"
                    v-html="searchArticle.content"
                ></article>
            </div>
        </div>
        <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
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
