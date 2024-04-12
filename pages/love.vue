<script lang="ts" setup>
const { data, error } = await useFetch<APIResponseType<IndexPageType>>('/api/v1/article/page/love', {
    headers: { accept: 'application/json' },
})
const {
    public: { adIndex1, adIndex2 },
} = useRuntimeConfig()

const { trendingArticleList = [], allArticleList } = data.value?.data ?? {}
const dataLoading = ref(false)
loadingMoreData<Article>({
    url: '/api/v1/article/page/get-data/index',
    oldDataList: allArticleList,
    size: 24,
    dataLoading,
})
</script>

<template>
    <div class="pt-70px">
        <div class="relative">
            <div
                class="h-450px w-full flex-center flex-col bg-cover bg-center bg-no-repeat"
                :style="{
                    'background-image': `url(${trendingArticleList[0]?.coverImg})`,
                    // 'mask-image': 'linear-gradient(to right, transparent, black 25%, black 75%, transparent)',
                }"
            ></div>
            <div class="absolute left-0 top-0 h-450px w-full flex-center flex-col">
                <h1 class="text-30px font-bold color-white">Let your searches unfold in a friendly embrace!</h1>
                <SearchBar class="mx-auto max-w-900px w-full px-10px py-50px" />
            </div>
        </div>

        <div class="mx-auto max-w-1200px w-full py-10px">
            <AdSenseBlock :data-ad-slot="adIndex1" />
            <LovePage class="pt-50px" :articles="trendingArticleList" category="Trending" :size="12" />
            <AdSenseBlock :data-ad-slot="adIndex2" />
            <LovePage class="pt-50px" :articles="allArticleList" category="All Articles" :size="36" />
        </div>
        <LoadingAnim :visible="dataLoading" />
    </div>
</template>

<style scoped lang="scss"></style>
