<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'

definePageMeta({
    layout: 'topic-ad-layout',
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
    tmpl: 'Topic',
}

// relatedSearch 组件
const relatedSearch1 = ref()
const relatedSearch2 = ref()
// Ad 加载完成
const adLoadComplete1 = ref(false)
const adLoadComplete2 = ref(false)
// Ad 加载完成回调
const adLoadedCallback1 = () => {
    adLoadComplete1.value = true
}
const adLoadedCallback2 = () => {
    adLoadComplete2.value = true
}
const { isMobile } = useDevice()
onMounted(() => {
    const e = new URLSearchParams(window.location.search)
    e.set('pgttl', uuidv4())
    window.history.replaceState(null, '', '?' + e.toString())
    relatedSearch1.value.loadAd()
    relatedSearch2.value.loadAd()
    if (isMobile) window.scrollTo({ top: 60, behavior: 'smooth' })
})
</script>

<template>
    <div class="bg-white" :style="{ visibility: adLoadComplete1 && adLoadComplete2 ? 'visible' : 'hidden' }">
        <TopicHeader>
            <template #search>
                <TopicSearchBar class="w-full border-#296cd4 rd-15px bg-#e7ebf5 xl-w-400px" />
            </template>
        </TopicHeader>

        <div class="mx-auto max-w-1060px w-full px-20px pb-20px">
            <div class="pt-14px md-pt-40px">
                <h1 class="text-left text-23.36px font-bold font-exo lg-text-25.6px md-text-24px xl-text-32px">
                    {{ searchArticle.title }}
                </h1>
                <!-- eslint-disable-next-line vue/no-v-html -->
                <p class="mb-20px text-16px font-exo lg-mb-30px">{{ searchArticle.description }}</p>
            </div>

            <RelatedSearch
                v-show="adLoadComplete1 && adLoadComplete2"
                ref="relatedSearch1"
                class="w-full"
                search-text="keyword"
                :terms="searchAdInfo.terms"
                :channel-id="searchAdInfo.channelId"
                style-id="3736261853"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback1"
            />
            <div class="relative mb-25px mt-40px w-full flex-center flex-shrink-0 overflow-hidden rd-15px pt-66.7%">
                <img
                    v-lazy="searchArticle.coverImg"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    class="absolute left-0 top-0 h-full w-full object-cover"
                    :alt="searchArticle.title"
                />
            </div>

            <article id="articleContent" class="font-exo" v-html="searchArticle.content"></article>
            <TopicRelatedSearch
                v-show="adLoadComplete1 && adLoadComplete2"
                ref="relatedSearch2"
                class="w-full"
                :search-text="searchArticle.title"
                :channel-id="searchAdInfo.channelId"
                style-id="3736261853"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback2"
            />
        </div>
        <TopicFooter />
        <cookie-consent />
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
        @apply text-25px mt-30px mb-25px;
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
        @apply text-13px mb-30px;
    }

    em {
        font-style: italic;
    }
    strong {
        font-weight: bold;
    }
}
</style>
