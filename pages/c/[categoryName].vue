<script lang="ts" setup>
const {
    params: { categoryName: category },
} = useRoute('c-categoryName')

const { data, error } = await useFetch<APIResponseType<CategoryPageType>>(`/api/v1/article/page/c/${category}`, {
    headers: { accept: 'application/json' },
})

const categoryMap: Record<string, string> = {
    'vehicle-donation': 'Vehicle Donation',
    'vehicle-plans': 'Vehicle plans',
    'motor-vehicles': 'Motor Vehicles',
    repair: 'Repair',
}

const { latestPostsList, categoryArticleList } = data.value?.data ?? {}

const dataLoading = ref(false)
loadingMoreData<Article>({
    url: `/api/v1/article/page/get-data/${category}`,
    oldDataList: categoryArticleList,
    size: 12,
    dataLoading,
    query: {
        type: 'category',
    },
})
</script>

<template>
    <div class="mx-auto max-w-1400px min-h-100vh w-full flex-center flex-col px-20px pt-70px">
        <SearchBar class="max-w-900px w-full px-10px py-50px" />
        <h1 class="my-20px text-20px color-color6">{{ categoryMap[category] }}</h1>
        <div class="max-w-1400px w-full flex flex-col gap-120px py-10px lg-flex-row">
            <CategoryArticle
                class="w-full lg-w-[calc(100%-300px)] xl-w-[calc(100%-350px)]"
                :articles="categoryArticleList"
                :category="categoryMap[category]"
            />
            <div class="w-full flex-shrink-0 lg-w-300px xl-w-350px">
                <!-- <AdSenseBlock
                    class="w-full"
                    ins-style="display: block; width: 100%; height: 300px;"
                    data-ad-format="none"
                    data-full-width-responsive="false"
                    :data-ad-slot="adC1"
                /> -->
                <LatestPosts :articles="latestPostsList" />
            </div>
        </div>
        <LoadingAnim :visible="dataLoading" />
    </div>
</template>
