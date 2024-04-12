<script lang="ts" setup>
const { data, error } = await useFetch<APIResponseType<IndexPageType>>('/api/v1/article/page/index', {
    headers: { accept: 'application/json' },
})
const {
    public: { adIndex1, adIndex2 },
} = useRuntimeConfig()

const { trendingArticleList, allArticleList } = data.value?.data ?? {}
const dataLoading = ref(false)
loadingMoreData<Article>({
    url: '/api/v1/article/page/get-data/index',
    oldDataList: allArticleList,
    size: 24,
    dataLoading,
})
</script>

<template>
    <div class="bg-color2 mt-90px w-full">
        <div class="mx-auto max-w-[1200px] w-full">
            <AdSenseBlock :data-ad-slot="adIndex1" />

            <SearchBar class="mx-auto max-w-900px px-10px py-30px" />

            <RecommendArticle class="pt-50px" :articles="trendingArticleList" category="Trending" :size="6" />
            <AdSenseBlock :data-ad-slot="adIndex2" />
            <RecommendArticle class="pt-50px" :articles="allArticleList" category="All Articles" :size="24" />
        </div>
        <LoadingAnim :visible="dataLoading" />
    </div>
</template>

<style scoped lang="scss"></style>
