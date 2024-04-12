<script lang="ts" setup>
const { data, error } = await useFetch<APIResponseType<RainArticlePageType>>(`/api/v1/article/page/rain`, {
    headers: { accept: 'application/json' },
})
const {
    public: { adRain1 },
} = useRuntimeConfig()
const { rainArticleList } = data.value?.data ?? {}
</script>

<template>
    <div class="mt-90px min-h-[calc(100vh-120px)] w-full bg-bg">
        <div class="mx-auto max-w-[1200px] w-full">
            <AdSenseBlock :data-ad-slot="adRain1" />
            <div class="flex flex-col text-center">
                <h1 class="text-30px font-bold font-italic">
                    Explore curated, high-quality information customized just for you.
                </h1>
                <p class="text-16px">Click 'START' for an immersive and enjoyable discovery journey. It's 100% free!</p>
            </div>

            <RainArticle class="mb-30px mt-80px" :articles="rainArticleList" />
        </div>
    </div>
</template>

<style scoped lang="scss"></style>
