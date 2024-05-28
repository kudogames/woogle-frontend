<script setup lang="ts">
import QPageCommon from '~/components/QPage/Common.vue'
import QPageTopic from '~/components/QPage/Topic.vue'
import QPageContent from '~/components/QPage/Content.vue'
import QPageDiscussion from '~/components/QPage/Discussion.vue'
definePageMeta({
    layout: 'q-layout',
})
const {
    query: { channelId, q: searchText, clickId, campaignId, adGroupId, adId, tmpl },
} = useRoute() as unknown as {
    query: {
        channelId: string
        q: string
        clickId: string
        campaignId: string
        adGroupId: string
        adId: string
        tmpl: string
    }
}

const bgColorMap: Record<string, tmplInfoType> = {
    default: {
        mobileTopColor: '#000',
        headerBgColor: 'bg-#000',
        bgColor: 'bg-#000',
        titleColor: 'color-#ccc',
        descriptionColor: 'color-#cccc',
        boderColor: 'b-color1',
        styleId: '8773662877',
        template: QPageCommon,
    },
    Content: {
        mobileTopColor: '#000',
        headerBgColor: 'bg-#000',
        bgColor: 'bg-#000',
        titleColor: 'color-#ccc',
        descriptionColor: 'color-#cccc',
        boderColor: 'b-color1',
        styleId: '8773662877',
        template: QPageContent,
    },
    Subject: {
        mobileTopColor: '#000',
        headerBgColor: 'bg-#000',
        bgColor: 'bg-#000',
        titleColor: 'color-#ccc',
        descriptionColor: 'color-#cccc',
        boderColor: 'b-color1',
        styleId: '8773662877',
        template: QPageContent,
    },
    Discussion: {
        mobileTopColor: '#01074B',
        headerBgColor: 'bg-#01074B',
        bgColor: 'bg-#01074B',
        titleColor: 'color-#ccc',
        descriptionColor: 'color-#ccc',
        boderColor: 'b-#162B5C',
        styleId: '7970436399',
        template: QPageDiscussion,
    },
    Topic: {
        mobileTopColor: '#0d1938',
        headerBgColor: 'bg-#0d1938 ',
        bgColor: 'bg-#0c1d45',
        titleColor: 'color-#ffffff',
        descriptionColor: 'color-#ffffff',
        boderColor: 'b-#162B5C',
        styleId: '3736261853',
        template: QPageTopic,
    },
}

const tmplInfo = bgColorMap[tmpl] ?? bgColorMap.default
useHead({
    meta: [
        {
            name: 'theme-color',
            content: tmplInfo.mobileTopColor,
        },
        {
            name: 'msapplication-navbutton-color',
            content: tmplInfo.mobileTopColor,
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: tmplInfo.mobileTopColor,
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: tmplInfo.mobileTopColor,
        },
    ],
})

const { data, error } = await useFetch<APIResponseType<QPageType>>(`/api/v1/article/page/q`, {
    params: { q: searchText },
    headers: { accept: 'application/json' },
})
const { searchArticleList, tagList = [] } = data.value?.data ?? ({} as QPageType)

const {
    public: { baseTrackUrl, frontUrl, adsenseSearchId },
} = useRuntimeConfig()

interface ServerTrackEventParams {
    clickId: string
    campaignId: string
    adGroupId: string
    adId: string
    siteId: string
    channelId: string
    keyword: string
    resultsStyleId: string
    termsStyleId: string
}

// 服务器 Track埋点
const serverTrackEvent = (params: ServerTrackEventParams) => {
    const img = new Image()
    img.width = 0
    img.height = 0
    img.crossOrigin = 'anonymous'

    const trackUrl = new URL(baseTrackUrl)
    const trackUrlParams = new URLSearchParams()

    trackUrlParams.set('clickId', params.clickId)
    trackUrlParams.set('campaignId', params.campaignId)
    trackUrlParams.set('adGroupId', params.adGroupId)
    trackUrlParams.set('adId', params.adId)
    trackUrlParams.set('siteId', params.siteId)
    trackUrlParams.set('channelId', params.channelId)
    trackUrlParams.set('keyword', params.keyword)
    trackUrlParams.set('termsStyleId', params.termsStyleId)
    trackUrlParams.set('resultsStyleId', params.resultsStyleId)

    trackUrl.search = trackUrlParams.toString()
    img.src = trackUrl.toString()
}

// 点击搜索广告触发
const trackSearch = () => {
    let searchAdIsTrack = false

    setInterval(() => {
        const searchAdIframeEleNodeList = document.querySelectorAll('#searchResult iframe')

        if (document.activeElement) {
            const activeEle = document.activeElement
            const searchAdIframeEleArr = Array.prototype.slice.call(searchAdIframeEleNodeList)

            if (searchAdIframeEleArr.includes(activeEle)) {
                if (!searchAdIsTrack) {
                    searchAdIsTrack = true
                    // 传服务器 Track埋点
                    serverTrackEvent({
                        siteId: '32',
                        clickId,
                        campaignId,
                        adGroupId,
                        adId,
                        channelId,
                        keyword: searchText,
                        resultsStyleId: tmplInfo.styleId,
                        termsStyleId: tmplInfo.styleId,
                    })
                }
            } else {
                searchAdIsTrack = false
            }
        }
    }, 200)
}

// Ad 加载完成
const adLoadComplete = ref(false)

interface searchOptions {
    pubId: string
    relatedSearchTargeting: string
    styleId: string
    adsafe: string
    query: string
    hl: string
    referrerAdCreative?: string
    resultsPageBaseUrl: string
    resultsPageQueryParam: string
    channel?: string
}

onMounted(() => {
    const searchResultBlock = {
        container: 'searchResult',
        number: 3,
        adLoadedCallback: () => {
            adLoadComplete.value = true
        },
    }

    const searchOptions: searchOptions = {
        // pubId: 'pub-9616389000213823',
        pubId: adsenseSearchId,
        relatedSearchTargeting: 'content',
        styleId: tmplInfo.styleId,
        adsafe: 'low',
        hl: 'en',
        query: searchText,
        resultsPageBaseUrl: `${frontUrl}/q`,
        resultsPageQueryParam: 'q',
    }

    if (channelId) {
        searchOptions.channel = channelId
    }
    // @ts-ignore
    _googCsa('ads', searchOptions, searchResultBlock)

    // 测试追踪搜索广告点击 自定义事件
    trackSearch()
})

const dataLoading = ref(false)
loadingMoreData<Article>({
    url: `/api/v1/article/page/q`,
    oldDataList: searchArticleList,
    size: 36,
    dataLoading,
    query: {
        q: searchText,
    },
})
useHead({
    script: [
        {
            async: true,
            src: 'https://www.google.com/adsense/search/ads.js',
        },
        {
            innerHTML: `
            ;(function (g, o) {
                    ;(g[o] =
                        g[o] ||
                        function () {
                            ;(g[o]['q'] = g[o]['q'] || []).push(arguments)
                        }),
                        (g[o]['t'] = 1 * new Date())
                })(window, '_googCsa')
            `,
            type: 'text/javascript',
        },
    ],
})

const relatedTag: RelatedTag[] = [
    {
        name: 'Vehicle Donation',
        svg: 'i-svg-donation',
        color1: '#ffad76',
        color2: '#fff2dc',
        color3: '#ba794d',
    },

    {
        name: 'Vehicle plans',
        svg: 'i-svg-plans',
        color1: '#a6d893',
        color2: '#f0f9e4',
        color3: '#749e4c',
    },
    {
        name: 'Motor Vehicles',
        svg: 'i-svg-motor',
        color1: '#c29fdd',
        color2: '#f0ebf7',
        color3: '#a27cce',
    },
    {
        name: 'Repair',
        svg: 'i-svg-repair',
        color1: '#ffa4a4',
        color2: '#f9eeea',
        color3: '#bf6d6d',
    },
]
</script>

<template>
    <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
        <component
            :is="tmplInfo.template"
            :search-article-list="searchArticleList"
            :tmpl-info="tmplInfo"
            :search-text="searchText"
            :tag-list="tagList"
            :related-tag="relatedTag"
        >
            <template #ad>
                <div id="searchResult" class="search-result w-full"></div>
            </template>
        </component>
    </div>
</template>
