<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import { serverTrackImpressionEvent } from '@/utils/search-ad-track'
import { relatedDiscussionStyleId } from '@/constants/config'

definePageMeta({
    layout: 'discussion-ad-layout',
})

const {
    fullPath,
    params: { uid, slug },
    query,
} = useRoute('Discussion-uid-slug')

const {
    public: { frontUrl },
} = useRuntimeConfig()

const { data, error } = await useFetch<APIResponseType<DiscussionPageType>>(
    `/api/v1/article/page/Discussion/${uid}/${slug}`,
    {
        headers: { accept: 'application/json' },
    }
)

const { searchAdInfo, searchArticle, shareArticleList } = data.value?.data ?? ({} as DiscussionPageType)
useHead({
    title: searchArticle?.title,

    meta: [
        {
            name: 'description',
            content: searchArticle?.description,
        },
        {
            property: 'og:title',
            content: searchArticle?.title,
        },
        {
            property: 'og:description',
            content: searchArticle?.description,
        },
        {
            name: 'twitter:title',
            content: searchArticle?.title,
        },
        {
            name: 'twitter:description',
            content: searchArticle?.description,
        },
    ],
})
const adKeysMap = {
    utm_campaign: 'clickId',
    utm_content: 'campaignId',
    utm_medium: 'adGroupId',
    utm_source: 'adId',
}

const keys = Object.keys(adKeysMap)
const adInfo: Record<string, string> = keys.every((key) => !query[key])
    ? {}
    : {
          clickId: query.utm_campaign as string,
          campaignId: query.utm_content as string,
          adGroupId: query.utm_medium as string,
          adId: query.utm_source as string,
      }
const originAdInfo: Record<string, string> = keys.every((key) => !query[key])
    ? {}
    : {
          utm_campaign: query.utm_campaign as string,
          utm_content: query.utm_content as string,
          utm_medium: query.utm_medium as string,
          utm_source: query.utm_source as string,
      }
// const [clickId, campaignId, adGroupId, adId] = keys.map((key) => (query[key] as string) ?? '')

interface TrackParams {
    clickId?: string
    campaignId?: string
    adGroupId?: string
    adId?: string
    channelId: string
    tmpl: string
    saiId?: string
}

// 跟踪参数，带到下一页
const trackParams: TrackParams = {
    channelId: searchAdInfo.channelId,
    ...adInfo,
    tmpl: 'Discussion',
    saiId: searchAdInfo.uid,
}

const ignoredPageParams =
    Math.random() < 0.1
        ? 'layout,utm_content,campaign_id,cfgKey,utm_content,utm_campaign,arb_direct,styleID,ad_group_id,arb_campaign_id,utm_medium,utm_source,cpc,ad_id,utm_campaign,click_id,_ckttl,network,section_id,utm_source,subDomain,account,pgttl'
        : 'layout,utm_content,campaign_id,cfgKey,utm_content,utm_campaign,arb_direct,styleID,ad_group_id,arb_campaign_id,utm_medium,utm_source,cpc,ad_id,utm_campaign,click_id,_ckttl,network,section_id,utm_source,subDomain,account'

// relatedSearch 组件
const relatedSearch1 = ref()
const relatedSearch2 = ref()
// Ad 加载完成
const adLoadComplete1 = ref(false)
const adLoadComplete2 = ref(false)

const { campaignId = '', adGroupId = '', adId = '' } = adInfo

// Ad 加载完成回调
const adLoadedCallback1 = () => {
    adLoadComplete1.value = true
    // 曝光埋点
    serverTrackImpressionEvent({
        siteId: '32',
        campaignId,
        adGroupId,
        adId,
        channelId: searchAdInfo.channelId,
    })
}
const adLoadedCallback2 = () => {
    adLoadComplete2.value = true
    // 曝光埋点
    serverTrackImpressionEvent({
        siteId: '32',
        campaignId,
        adGroupId,
        adId,
        channelId: searchAdInfo.channelId,
    })
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
const showTip = ref(false)
const shareNowList = [
    {
        name: 'Facebook',
        img: (await import('@/assets/img/f.png')).default,
        clickFn: () => {
            window.open(
                `https://www.facebook.com/sharer.php?u=${frontUrl}${fullPath}`,
                '_blank',
                'width=580,height=315'
            )
        },
    },
    {
        name: 'Twitter',
        img: (await import('@/assets/img/t.png')).default,
        clickFn: () => {
            window.open(
                `https://twitter.com/share?url=${frontUrl}${fullPath}&text=${searchArticle.title}&via=twitter_handle`,
                '_blank'
            )
        },
    },
    {
        name: 'WhatsApp',
        img: (await import('@/assets/img/w.png')).default,
        clickFn: () => {
            window.open(
                `https://api.whatsapp.com/send?text=${searchArticle.title}%20${frontUrl}${fullPath}`,
                '_blank',
                'width=600,height=400'
            )
        },
    },
    {
        name: 'Reddit',
        img: (await import('@/assets/img/r.png')).default,
        clickFn: () => {
            window.open(
                `https://www.reddit.com/submit?url=${frontUrl}${fullPath}&title=${searchArticle.title}`,
                '_blank',
                'width=600,height=400'
            )
        },
    },
    {
        name: 'Copy link',
        img: (await import('@/assets/img/l.png')).default,
        clickFn: () => {
            navigator.clipboard.writeText(`${frontUrl}${fullPath}`)
            showTip.value = true
            setTimeout(() => {
                showTip.value = false
            }, 500)
        },
    },
]

const shareArticleUrl = (uid: string, slug: string) => {
    const params = Object.keys(adInfo).length > 0 ? `?${new URLSearchParams(originAdInfo).toString()}` : ''
    return `/Discussion/${uid}/${slug}${params}`
}
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
                :ele-id="'relatedSearch1'"
                :terms="searchAdInfo.terms"
                :channel-id="searchAdInfo.channelId"
                :ignored-page-params="ignoredPageParams"
                :style-id="relatedDiscussionStyleId"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback1"
            />
            <div class="relative mb-25px mt-40px w-full flex-center flex-shrink-0 overflow-hidden rd-15px pt-66.7%">
                <img
                    v-lazy="searchArticle.coverImg"
                    class="absolute left-0 top-0 h-full w-full object-cover"
                    :alt="searchArticle.title"
                />
            </div>

            <article id="articleContent" class="font-exo" v-html="searchArticle.content"></article>
            <RelatedSearch
                v-show="adLoadComplete1 && adLoadComplete2"
                ref="relatedSearch2"
                class="w-full"
                :ele-id="'relatedSearch2'"
                :search-text="searchArticle.title"
                :channel-id="searchAdInfo.channelId"
                :style-id="relatedDiscussionStyleId"
                :ignored-page-params="ignoredPageParams"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback2"
            />
            <div
                lt-xs="flex-col justify-center"
                class="relative my-20px h-50px w-full flex items-center justify-between bg-#14cccc"
            >
                <div
                    class="absolute left-0 h-0 w-0 border-b-1px border-b-24px border-l-12px border-t-28px border-b-transparent border-l-#fff border-t-transparent border-solid"
                ></div>
                <div
                    class="absolute right-0 h-0 w-0 border-b-24px border-r-12px border-t-28px border-b-transparent border-r-#fff border-t-transparent border-solid"
                ></div>
                <div class="text-12px font-bold xs-ml-32px sm-text-16px">Share this article</div>
                <div class="flex gap-[10px] xs-mr-22px">
                    <div
                        v-for="(item, index) in shareNowList"
                        :key="index"
                        class="h-30px w-30px flex items-center justify-center rd-30px bg-[#fff]"
                    >
                        <img
                            :src="item.img"
                            class="h-full w-full hover:cursor-pointer"
                            :alt="item.name"
                            @click="item.clickFn"
                        />
                    </div>
                    <span
                        v-if="showTip"
                        class="absolute left-1/2 top-1/2 translate-x-[-50%] transform rounded-md bg-black p-2 text-sm text-white"
                        >Copied</span
                    >
                </div>
            </div>
            <div class="flex flex-wrap gap-20px py-20px md-gap-40px">
                <a
                    v-for="(item, index) in shareArticleList"
                    :key="index"
                    :href="shareArticleUrl(item.uid, item.article.slug)"
                    class="flex-basis-100% md-flex-basis-[calc((100%-40px*2)/3)] sm-flex-basis-[calc((100%-20px)/2)]"
                >
                    <div class="relative w-full overflow-hidden rd-20px pt-213px">
                        <img
                            v-lazy="item.article.coverImg"
                            class="absolute left-0 top-0 h-full w-full object-cover"
                            :alt="item.article.title"
                        />
                    </div>
                    <p class="line-clamp-2 text-17px font-bold font-exo">{{ item.article.title }}</p>
                </a>
            </div>
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
