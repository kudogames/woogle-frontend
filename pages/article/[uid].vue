<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
definePageMeta({
    layout: 'article-detail-layout',
})

const {
    params: { uid },
} = useRoute('article-uid')

const { data, error } = await useFetch<APIResponseType<ArticlePageType>>(`/api/v1/article/page/article/${uid}`, {
    headers: { accept: 'application/json' },
})
const { currentArticle, relatedArticleList } = data.value?.data ?? {}
useHead({
    title: currentArticle?.title,
})
// relatedSearch 组件
const relatedSearch = ref()

// Ad 加载完成
const adLoadComplete = ref(false)

// Ad 加载完成回调
const adLoadedCallback = () => {
    adLoadComplete.value = true
}

onMounted(() => {
    const e = new URLSearchParams(window.location.search)
    e.set('pgttl', uuidv4())
    window.history.replaceState(null, '', '?' + e.toString())
    relatedSearch.value.loadAd()
})
</script>

<template>
    <div>
        <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
            <base-header />
        </div>
        <div class="pt-70px">
            <div class="mx-auto max-w-1200px">
                <div class="py-50px">
                    <SearchBar
                        :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }"
                        class="mx-auto max-w-900px w-full rd-40px px-10px"
                    />
                </div>

                <div class="flex flex-col md-flex-row">
                    <div class="w-full px-10px md-w-[calc(100%-300px)]">
                        <!-- 页面导航 -->
                        <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
                            <div class="line-clamp-1 text-12px color-gray-4">
                                <a class="hover:color-color1" href="/">Home</a> > {{ currentArticle?.title }}
                            </div>

                            <!-- 文章标题与简介 -->
                            <div class="py-10px">
                                <h1 class="py-10px text-24px font-bold">{{ currentArticle?.title }}</h1>
                                <p class="text-14px color-#4d5156">{{ currentArticle?.description }}</p>
                            </div>
                        </div>

                        <!-- 相关搜索 -->
                        <RelatedSearch
                            ref="relatedSearch"
                            class="w-full"
                            style-id="2112166669"
                            :search-text="currentArticle?.title"
                            :referrer-ad-creative="currentArticle?.referrerAdCreative"
                            @ad-loaded-callback="adLoadedCallback"
                        />
                        <!-- 图片 -->
                        <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
                            <div
                                class="relative w-full flex flex-shrink-0 overflow-hidden b-2 border-#efdcca rd-lg pt-52.12%"
                            >
                                <img
                                    v-lazy="currentArticle?.coverImg"
                                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                    class="absolute left-0 top-0 h-full w-full object-contain"
                                    :alt="currentArticle?.title"
                                />
                            </div>

                            <div id="articleContent" class="py-10px" v-html="currentArticle?.content"></div>
                        </div>
                    </div>

                    <div
                        :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }"
                        class="w-full flex-shrink-0 md-w-300px"
                    >
                        <RelatedArticles class="mb-60px" :articles="relatedArticleList" />
                    </div>
                </div>
            </div>
        </div>
        <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
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
