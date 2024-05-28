<script lang="ts" setup>
withDefaults(
    defineProps<{
        searchArticle: SearchArticle

        visibleAd: Boolean
    }>(),
    {
        searchArticle: () => ({} as SearchArticle),

        visibleAd: () => true,
    }
)

const readMore = ref(false)

const readMoreClick = () => {
    readMore.value = true
}
const {
    params: { slug },
} = useRoute('template-uid-slug')
</script>

<template>
    <div class="bg-#000 color-#cecece">
        <div :style="{ visibility: visibleAd ? 'visible' : 'hidden' }">
            <QHeader class="bg-#000">
                <template #search>
                    <SearchBar :search-text="slug" class="w-full rd-40px xl-w-600px xl-rd-10px" />
                </template>
            </QHeader>

            <div class="mx-auto max-w-1200px min-h-100vh px-10px">
                <header class="py-20px">
                    <h1 class="my-10px text-left text-16px font-bold lg-text-24px md-text-20px sm-text-18px">
                        {{ searchArticle.title }}
                    </h1>
                    <div class="line-clamp-2 text-12px sm-text-14px">
                        {{ searchArticle.description }}
                    </div>
                </header>

                <slot name="ad1" />

                <!-- <RelatedSearch
                    ref="relatedSearch"
                    class="w-full"
                    search-text="keyword"
                    :terms="searchAdInfo.terms"
                    :channel-id="searchAdInfo.channelId"
                    :style-id="styleId"
                    :referrer-ad-creative="searchArticle.referrerAdCreative"
                    :track-params="trackParams"
                    @ad-loaded-callback="adLoadedCallback"
                /> -->

                <article id="articleContent" class="py-10px" v-html="searchArticle.content"></article>
            </div>

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
