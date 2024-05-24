<script setup lang="ts">
const props = defineProps({
    number: {
        type: Number,
        default: 6,
    },
    searchText: {
        type: String,
        required: true,
    },
    searchTerms: {
        type: String,
        default: '',
    },
    searchIvt: {
        type: Boolean,
        default: undefined,
    },
    styleId: {
        type: String,
        default: '9537452044',
    },
    channelId: {
        type: String,
        default: undefined,
    },
    trackParams: {
        type: Object,
        default: () => ({}),
    },
    // 手动加载广告，需要在父组件中调用 loadAd 方法
    manualLoad: {
        type: Boolean,
        default: false,
    },
})

useHead({
    script: [
        {
            async: true,
            src: 'https://www.google.com/adsense/search/ads.js',
        },
        {
            innerHTML: `(function(g,o){g[o]=g[o]||function(){(g[o]['q']=g[o]['q']||[]).push( arguments)},g[o]['t']=1*new Date})(window,'_googCsa');`,
            type: 'text/javascript',
        },
    ],
})

const runtimeConfig = useRuntimeConfig()
const frontUrl = runtimeConfig.public.frontUrl

// https://developers.google.com/custom-search-ads/s/docs/reference?hl=zh-cn
interface searchOptions {
    pubId: string
    relatedSearchTargeting: string
    styleId: string
    adsafe: string
    query?: string
    resultsPageBaseUrl: string
    resultsPageQueryParam: string
    channel?: string
    terms?: string
    ivt?: boolean
}

const emit = defineEmits(['adLoadedCallback'])

const loadAd = () => {
    const relatedSearchBlock = {
        container: 'relatedSearch2',
        relatedSearches: props.number,
        adLoadedCallback: () => {
            emit('adLoadedCallback')
        },
    }
    // 将 trackParams 参数拼接到 URL 参数中，传递到搜索结果页
    const resultsPageBaseUrlParmas = new URLSearchParams()
    for (const key in props.trackParams) {
        resultsPageBaseUrlParmas.append(key, props.trackParams[key])
    }
    const resultsPageBaseUrl = `${frontUrl}/q?${resultsPageBaseUrlParmas.toString()}`

    const searchOptions: searchOptions = {
        pubId: runtimeConfig.public.adsenseSearchId,
        relatedSearchTargeting: 'content',
        styleId: props.styleId,
        adsafe: 'low',
        resultsPageBaseUrl,
        resultsPageQueryParam: 'q',
    }

    if (props.searchTerms) {
        searchOptions.terms = props.searchTerms
    } else {
        searchOptions.query = props.searchText
    }

    if (props.searchIvt !== undefined) {
        searchOptions.ivt = props.searchIvt
    }

    if (props.channelId) {
        searchOptions.channel = props.channelId
    }
    // @ts-ignore
    _googCsa('relatedsearch', searchOptions, relatedSearchBlock)
}

onMounted(() => {
    if (!props.manualLoad) {
        loadAd()
    }
})

defineExpose({
    loadAd,
})
</script>

<template>
    <div id="relatedSearch2" class="related-search"></div>
</template>
