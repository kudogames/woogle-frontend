<script setup lang="ts">
import { v4 as uuidv4 } from 'uuid'
definePageMeta({
    layout: 'article-detail-layout',
})

const {
    params: { uid },
} = useRoute('article-uid')
const url = `/api/v1/article/page/article/${uid}`
const { data, error } = await useFetch<APIResponseType<ArticlePageType>>(url, {
    headers: { accept: 'application/json' },
})
if (error.value?.statusCode) {
    handleError(url, (error.value ?? {}) as ApiErrorType<ArticlePageType>)
}
const { currentArticle, popularArticleList } = data.value?.data ?? ({} as ArticlePageType)
useHead({
    title: currentArticle?.title,

    meta: [
        {
            name: 'description',
            content: currentArticle?.description,
        },
        {
            property: 'og:title',
            content: currentArticle?.title,
        },
        {
            property: 'og:description',
            content: currentArticle?.description,
        },
        {
            name: 'twitter:title',
            content: currentArticle?.title,
        },
        {
            name: 'twitter:description',
            content: currentArticle?.description,
        },
    ],
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
    <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
        <IndexHeader />

        <div class="bg-#fff pt-[50px]">
            <div class="mx-auto max-w-[1200px]">
                <TopicSearchBar
                    :placeholder="' '"
                    :button-class="' px-60px bg-#193774'"
                    :svg="`i-svg-bold-search-bar bg-#fff`"
                    class="mx-auto my-30px w-full b-2px b-#193774 rd-10px lg-w-800px"
                />

                <div class="flex flex-col gap-10px md-flex-row">
                    <div class="w-full px-[10px] md-w-[calc(100%-310px)]">
                        <!-- 页面导航 -->

                        <div
                            class="line-clamp-1 w-full flex items-center justify-between gap-10px text-[12px] color-gray-4"
                        >
                            <div class="flex items-center">
                                <a href="/">
                                    <div class="i-svg-article-home h-18px w-18px flex-shrink-0 color-#193774"></div>
                                </a>
                                <div class="i-svg-arrow h-18px w-18px flex-shrink-0 color-#193774"></div>

                                <p :title="currentArticle.title" class="line-clamp-1 color-#0155ff">
                                    {{ currentArticle.title }}
                                </p>
                            </div>
                            <div class="flex flex-shrink-0 gap-50px">
                                <span>{{ 'Published on ' + formattedDate(currentArticle.updateTime) }}</span>
                                <span>{{ currentArticle.readTime }} min read </span>
                            </div>
                        </div>

                        <!-- 文章标题与简介 -->
                        <div class="font-roboto-bold">
                            <h1 class="py-[10px] text-26px font-bold">{{ currentArticle.title }}</h1>
                            <p class="text-[14px] color-#193774">{{ currentArticle.description }}</p>
                        </div>
                        <!-- 图片 -->

                        <div
                            class="relative my-20px w-full flex flex-shrink-0 overflow-hidden pt-calc[1200,628] lg-w-45% lg-pt-calc[1200,628,45]"
                        >
                            <img
                                v-lazy="currentArticle?.coverImg"
                                class="absolute left-0 top-0 h-full w-full object-contain"
                                :alt="currentArticle?.title"
                            />
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

                        <div
                            id="articleContent"
                            class="py-[10px] font-roboto-bold"
                            v-html="currentArticle?.content"
                        ></div>
                    </div>

                    <div class="w-full flex-shrink-0 px-10px md-w-[300px]">
                        <div class="text-20px font-bold leading-20px">Popular Articles</div>
                        <PopularArticles class="py-16px" :article-list="popularArticleList" />
                    </div>
                </div>
            </div>
        </div>

        <base-footer class="bg-color1" />
        <back-top />
        <cookie-consent />
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
        font-size: 20px;
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
