<script setup lang="ts">
const {
    params: { uid },
} = useRoute('article-uid')

const {
    public: { adArticle1, adArticle2 },
} = useRuntimeConfig()

const { data, error } = await useFetch<APIResponseType<ArticlePageType>>(`/api/v1/article/page/article/${uid}`, {
    headers: { accept: 'application/json' },
})
const { currentArticle, relatedArticleList } = data.value?.data ?? {}
</script>

<template>
    <div class="pt-70px">
        <div class="mx-auto max-w-1200px">
            <SearchBar class="mx-auto max-w-900px w-full px-10px py-50px" />
            <div class="flex flex-col md-flex-row">
                <div class="w-full px-10px md-w-[calc(100%-300px)]">
                    <!-- 页面导航 -->
                    <div class="line-clamp-1 text-12px color-gray-4">
                        <a class="hover:color-color1" href="/">Home</a> > {{ currentArticle?.title }}
                    </div>

                    <!-- 文章标题与简介 -->
                    <div class="py-10px">
                        <h1 class="py-10px text-24px font-bold">{{ currentArticle?.title }}</h1>
                        <p class="text-14px color-#4d5156">{{ currentArticle?.description }}</p>
                    </div>
                    <!-- 相关搜索 -->
                    <!-- <RelatedSearch /> -->
                    <!-- 图片 -->
                    <div class="relative w-full flex flex-shrink-0 overflow-hidden b-2 border-#efdcca rd-lg pt-52.12%">
                        <img
                            v-lazy="currentArticle?.coverImg"
                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                            class="absolute left-0 top-0 h-full w-full object-contain"
                            :alt="currentArticle?.title"
                        />
                    </div>
                    <!-- 文章内容 -->
                    <!-- <div>
                        <p
                            v-for="(paragraph, index) in currentArticle?.content.split('\n')"
                            :key="index"
                            style="white-space: pre-wrap"
                        >
                            {{ paragraph }}
                        </p>
                    </div> -->
                    <div id="articleContent" class="py-10px" v-html="currentArticle?.content"></div>
                    <!-- <p style="white-space: pre-wrap">{{ currentArticle?.content }}</p> -->
                    <!-- 广告 -->
                    <!-- <AdSenseBlock :data-ad-slot="adArticle1" /> -->
                </div>
                <div class="w-full flex-shrink-0 md-w-300px">
                    <!-- 广告 -->

                    <!-- <AdSenseBlock
                        class="w-full"
                        ins-style="display: block; width: 100%; height: 300px;"
                        data-ad-format="none"
                        data-full-width-responsive="false"
                        :data-ad-slot="adArticle2"
                    /> -->
                    <!-- 相关文章 -->
                    <RelatedArticles class="mb-60px" :articles="relatedArticleList" />
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
// @vite-ignore
:deep(#articleContent h4) {
    font-weight: 700;
    font-size: 20px;
    margin: 20px 0;
}
// @vite-ignore
:deep(#articleContent p) {
    font-size: 16px;
}
</style>