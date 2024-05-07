<script setup lang="ts">
const {
    query: { saiId, q: searchText, clickId, campaignId, adGroupId, adId, tmpl },
} = useRoute() as unknown as {
    query: {
        saiId: string
        q: string
        clickId: string
        campaignId: string
        adGroupId: string
        adId: string
        tmpl: string
    }
}

const bgColorMap: Record<string, string> = {
    Content: '#000',
    Discussion: '#01074B',
}

let saiIdObj = {}
if (saiId) {
    saiIdObj = {
        saiId,
    }
}

const params = new URLSearchParams({
    q: searchText,
    ...saiIdObj,
}).toString()
const { data, error } = await useFetch<APIResponseType<QPageType>>(`/api/v1/article/page/q?${params}`, {
    headers: { accept: 'application/json' },
})
const { searchArticleList, tagList = [], styleIdInfo } = data.value?.data ?? ({} as QPageType)
if (!styleIdInfo.resultsStyleId) {
    styleIdInfo.resultsStyleId = '8773662877'
}
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
                        channelId: styleIdInfo.channelId,
                        keyword: searchText,
                        resultsStyleId: styleIdInfo.resultsStyleId,
                        termsStyleId: styleIdInfo.termsStyleId,
                    })
                }
            } else {
                searchAdIsTrack = false
            }
        }
    }, 200)
}

const searchResultBlock = {
    container: 'searchResult',
    number: 3,
}

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
    const searchOptions: searchOptions = {
        // pubId: 'pub-9616389000213823',
        pubId: adsenseSearchId,
        relatedSearchTargeting: 'content',
        styleId: styleIdInfo.resultsStyleId,
        adsafe: 'low',
        hl: 'en',
        query: searchText,
        resultsPageBaseUrl: `${frontUrl}/q`,
        resultsPageQueryParam: 'q',
    }

    if (styleIdInfo.channelId) {
        searchOptions.channel = styleIdInfo.channelId
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
const relatedTag = ref([
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
])
</script>
<template>
    <div>
        <div :class="`bg-${bgColorMap[tmpl] ?? '#000'} `" class="mt-70px min-h-[calc(100vh-100px)] w-full px-10px">
            <SearchBar v-model:search-text="searchText" class="mx-auto max-w-900px w-full px-10px pb-10px pt-20px" />
            <div class="w-full flex flex-col justify-center gap-20px md-flex-row">
                <div class="max-w-900px w-full">
                    <div id="searchResult" class="search-result w-full"></div>
                    <div class="my-20px w-full flex flex-col flex-wrap">
                        <div class="my-2 pl-2 color-gray-5">Web Results</div>
                        <div class="flex flex-col gap-8px sm-gap-0">
                            <div
                                v-for="item in searchArticleList"
                                :key="item.uid"
                                class="relative overflow-hidden b-b-1 b-color1"
                            >
                                <a
                                    class="t-image flex items-center gap-25px p-10px md-gap-5 xs-p-30px"
                                    :href="`/article/${item.uid}`"
                                >
                                    <div
                                        class="h-100px w-100px flex flex-center flex-shrink-0 items-center overflow-hidden b-2 b-color5 rd-10px sm-h-140px sm-w-140px"
                                    >
                                        <!-- <div class="h-60px w-60px flex-center flex-shrink-0 sm-h-100px sm-w-100px"> -->
                                        <img
                                            v-lazy="item.coverImg"
                                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                            class="h-full w-full object-contain"
                                            :alt="item.title"
                                        />
                                        <!-- </div> -->
                                    </div>

                                    <div class="w-full flex flex-col justify-between gap-4px sm-gap-12px">
                                        <div
                                            class="line-clamp-1 w-full text-16px font-bold color-#cccccc md-line-clamp-2 md-text-20px sm-text-18px hover:italic hover:color-#ffd751"
                                        >
                                            {{ item.title }}
                                        </div>

                                        <div class="hidden color-#cccccc sm-block">
                                            {{ frontUrl }}/article/{{ item.uid }}
                                        </div>

                                        <p class="line-clamp-2 max-w-600px text-14px color-#cccccc">
                                            {{ item.description }}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="hidden w-300px flex-shrink-0 md-block">
                    <div v-for="(item, index) in relatedTag" :key="index">
                        <RelatedTag
                            :tag-list="tagList[index]"
                            :category="item.name"
                            :color1="item.color1"
                            :color2="item.color2"
                            :color3="item.color3"
                            :svg="item.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
        <LoadingAnim :visible="dataLoading" />
    </div>
</template>
