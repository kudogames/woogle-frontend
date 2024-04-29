<script setup lang="ts">

useHead({
    script: [
        {
            async: true,
            src: 'https://www.google.com/adsense/search/ads.js',
        },
        {
            innerHTML: `(function(g,o){g[o]=g[o]||function(){(g[o]['q']=g[o]['q']||[]).push(arguments)},g[o]['t']=1*new Date})(window,'_googCsa');`,
            type: 'text/javascript',
        },
    ],
})

const pageOptions = {
    pubId: 'partner-pub-5627976821173124', // Make sure that this is the correct client ID!
    styleId: '2112166669',
    relatedSearchTargeting: 'content',
    resultsPageBaseUrl: 'http://www.example.com/?afs&partner_param=param', // Enter the base URL for your results page
    resultsPageQueryParam: 'query', // (Default to 'q') Matches the param denoting the query on the search page
}

const rsblock1 = {
    container: 'relatedsearches1',
    relatedSearches: 10,
}

onMounted(() => {
    // @ts-ignore
    _googCsa('relatedsearch', pageOptions, rsblock1)
})
</script>
<template>
    <h1>test content</h1>
    <div id="relatedsearches1"></div>
</template>
