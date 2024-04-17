<script setup lang="ts">
const searchText = useRoute().query.q?.toString() || ''
const { data, error } = await useFetch<APIResponseType<QPageType>>(`/api/v1/article/page/q?q=${searchText}`, {
    headers: { accept: 'application/json' },
})

const { searchArticleList, tagList = [] } = data.value?.data ?? {}

const {
    public: { adQ1, frontUrl, adsenseSearchId },
} = useRuntimeConfig()

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

const searchResultBlock = {
    container: 'searchResult',
    number: 2,
}
onMounted(() => {
    const styleId = isMobile ? '2233686589' : '4728253849'

    const searchOptions = {
        // pubId: 'pub-9616389000213823',
        pubId: adsenseSearchId,
        relatedSearchTargeting: 'content',
        styleId,
        adsafe: 'medium',
        query: searchText,
        resultsPageBaseUrl: `${frontUrl}/q?`, // Enter the base URL for your results page
        resultsPageQueryParam: 'q', // (Default to 'q') Matches the param denoting the query on the search page
    }
    // @ts-ignore
    _googCsa('ads', searchOptions, searchResultBlock)
})

const { isMobile } = useDevice()
</script>
<template>
    <div class="mt-70px min-h-[calc(100vh-100px)] w-full px-10px">
        <SearchBar v-model:search-text="searchText" class="mx-auto max-w-900px w-full px-10px py-30px" />
        <div class="flex flex-col justify-center gap-20px md-flex-row">
            <div class="max-w-900px w-full">
                <!-- <div id="searchResult" class="w-full"></div> -->
                <div class="my-20px w-full flex flex-col flex-wrap">
                    <div class="my-2 pl-2 color-gray-5">Web Results</div>
                    <div class="flex flex-col gap-8px sm-gap-0">
                        <div
                            v-for="item in searchArticleList"
                            :key="item.uid"
                            class="relative overflow-hidden b-1 b-gray-1 bg-[white]"
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
                                        class="h-full w-full object-cover"
                                        :alt="item.title"
                                    />
                                    <!-- </div> -->
                                </div>

                                <div class="w-full flex flex-col justify-between gap-4px sm-gap-12px">
                                    <div
                                        class="line-clamp-1 w-full text-16px font-bold color-color1 md-text-20px sm-text-18px hover:italic hover:color-color6"
                                    >
                                        {{ item.title }}
                                    </div>

                                    <p class="line-clamp-3 max-w-600px text-14px color-#4d5156">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
            <div class="hidden w-full flex-shrink-0 md-block md-w-300px">
                <div v-for="(item, index) in relatedTag" :key="index">
                    <RelatedTag
                        :tag-list="tagList[index]"
                        :category="item.name"
                        :color1="item.color1"
                        :color2="item.color2"
                        :color3="item.color3"
                        :svg="item.svg"
                    />

                    <!-- <AdSenseBlock
                        v-if="index === 0"
                        class="mt-20px w-full"
                        ins-style="display: block; width: 300px; height:
                    300px;"
                        data-ad-format="none"
                        data-full-width-responsive="false"
                        :data-ad-slot="adQ1"
                        :screen-width-range="[768, -1]"
                    /> -->
                </div>
            </div>
        </div>
    </div>
    <LoadingAnim :visible="dataLoading" />
</template>
