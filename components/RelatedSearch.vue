<script setup lang="ts">
const { number, searchText } = defineProps({
    number: {
        type: Number,
        default: 6,
    },
    searchText: {
        type: String,
        default: 'flowers',
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

const relatedSearchBlock = {
    container: 'relatedSearch',
    relatedSearches: number,
}

const {
    public: { frontUrl, adsenseSearchId },
} = useRuntimeConfig()

onMounted(() => {
    const searchOptions = {
        // pubId: 'pub-9616389000213823',
        pubId: adsenseSearchId,
        relatedSearchTargeting: 'content',
        styleId: '9537452044',
        adsafe: 'medium',
        query: searchText,
        resultsPageBaseUrl: `${frontUrl}/q?`, // Enter the base URL for your results page
        resultsPageQueryParam: 'q', // (Default to 'q') Matches the param denoting the query on the search page
    }
    // @ts-ignore
    _googCsa('ads', searchOptions, relatedSearchBlock)
})
</script>

<template>
    <div id="relatedSearch" class="w-full flex-shrink-0 bg-theme px-10px py-20px"></div>
</template>
