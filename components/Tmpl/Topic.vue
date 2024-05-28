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

// relatedSearch 组件
</script>

<template>
    <div class="bg-#fff">
        <div :style="{ visibility: visibleAd ? 'visible' : 'hidden' }">
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
                <div v-show="visibleAd">
                    <slot name="ad1" />
                </div>

                <!-- <RelatedSearch
                v-show="adLoadComplete1 && adLoadComplete2"
                ref="relatedSearch1"
                class="w-full"
                search-text="keyword"
                :terms="searchAdInfo.terms"
                :channel-id="searchAdInfo.channelId"
                style-id="3736261853"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback"
            /> -->
                <div class="relative mb-25px mt-40px w-full flex-center flex-shrink-0 overflow-hidden rd-15px pt-66.7%">
                    <img
                        v-lazy="searchArticle.coverImg"
                        src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                        class="absolute left-0 top-0 h-full w-full object-cover"
                        :alt="searchArticle.title"
                    />
                </div>

                <article id="articleContent" class="font-exo" v-html="searchArticle.content"></article>
                <div v-show="visibleAd">
                    <slot name="ad2" />
                </div>
                <!-- <TopicRelatedSearch
                v-show="adLoadComplete1 && adLoadComplete2"
                ref="relatedSearch2"
                class="w-full"
                :search-text="searchArticle.title"
                :channel-id="searchAdInfo.channelId"
                style-id="3736261853"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback2"
            /> -->
            </div>
            <TopicFooter />
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
