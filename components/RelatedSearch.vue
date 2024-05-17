<script setup lang="ts">
const props = defineProps({
    number: {
        type: Number,
        default: 6,
    },
    searchText: {
        type: String,
        default: 'flowers',
    },
    terms: {
        type: String,
        default: '',
    },
    styleId: {
        type: String,
        default: '8773662877',
    },
    channelId: {
        type: String,
        default: '',
    },
    referrerAdCreative: {
        type: String,
        default: '',
    },
    trackParams: {
        type: Object,
        default: () => ({}),
    },
    // 手动加载广告，需要在父组件中调用 loadAd 方法
    manualLoad: {
        type: Boolean,
        default: true,
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

const {
    public: { frontUrl, adsenseSearchId },
} = useRuntimeConfig()

interface searchOptions {
    pubId: string
    relatedSearchTargeting: string
    styleId: string
    adsafe: string
    query?: string
    hl: string
    resultsPageBaseUrl: string
    resultsPageQueryParam: string
    channel?: string
    terms?: string
    ignoredPageParams: string
    referrerAdCreative: string
}

const emit = defineEmits(['adLoadedCallback'])

const loadAd = () => {
    const relatedSearchBlock = {
        container: 'relatedSearch',
        relatedSearches: props.number,
        adLoadedCallback: () => {
            emit('adLoadedCallback')
        },
    }
    // 将 trackParams 参数拼接到 URL 参数中，传递到搜索结果页
    const resultsPageBaseUrlParmas = new URLSearchParams(props.trackParams).toString()

    // for (const [key, value] of Object.entries(props.trackParams)) {
    //     resultsPageBaseUrlParmas.append(key, value)
    // }
    const resultsPageBaseUrl = `${frontUrl}/q?${resultsPageBaseUrlParmas}`

    const searchOptions: searchOptions = {
        pubId: adsenseSearchId,
        relatedSearchTargeting: 'content',
        styleId: props.styleId,
        hl: 'en',
        adsafe: 'low',
        resultsPageBaseUrl,
        resultsPageQueryParam: 'q',
        ignoredPageParams:
            'layout,utm_content,campaign_id,cfgKey,utm_content,utm_campaign,arb_direct,styleID,ad_group_id,arb_campaign_id,utm_medium,utm_source,cpc,ad_id,utm_campaign,click_id,_ckttl,network,section_id,utm_source,subDomain,account,pgttl',
        referrerAdCreative: props.referrerAdCreative,
    }

    if (props.terms) {
        searchOptions.terms = props.terms
    } else {
        searchOptions.query = props.searchText
    }

    if (props.channelId) {
        searchOptions.channel = props.channelId
    }
    // @ts-ignore
    _googCsa('relatedsearch', searchOptions, relatedSearchBlock)
}

onMounted(() => {
    // loadAd()
    if (!props.manualLoad) {
        loadAd()
    }
})

defineExpose({
    loadAd,
})
</script>

<template>
    <div id="relatedSearch" class="related-search w-full"></div>
</template>
