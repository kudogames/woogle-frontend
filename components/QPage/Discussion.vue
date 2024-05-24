<script setup lang="ts">
withDefaults(
    defineProps<{
        searchArticleList: Article[]
        tmplInfo: tmplInfoType
        searchText: string
        tagList: string[]
        relatedTag: RelatedTag[]
    }>(),
    {
        searchArticleList: () => [],
        tmplInfo: () => ({} as tmplInfoType),
        searchText: '',
        tagList: () => [],
        relatedTag: () => [],
    }
)
const {
    public: { frontUrl },
} = useRuntimeConfig()
</script>

<template>
    <div :class="tmplInfo.bgColor">
        <QHeader :class="tmplInfo.headerBgColor">
            <template #search>
                <SearchBar :search-text="searchText" class="w-full rd-40px xl-w-600px xl-rd-10px" />
            </template>
        </QHeader>

        <div class="mx-auto max-w-1200px min-h-[calc(100vh-100px)] w-full px-10px">
            <div class="w-full flex flex-col gap-20px md-flex-row">
                <div class="max-w-900px w-full">
                    <slot name="ad" />
                    <!-- <div id="searchResult" class="search-result w-full"></div> -->
                    <div class="my-20px w-full flex flex-col flex-wrap">
                        <div class="my-2 pl-2 color-gray-5">Web Results</div>
                        <div class="flex flex-col gap-8px sm-gap-0">
                            <div
                                v-for="item in searchArticleList"
                                :key="item.uid"
                                :class="tmplInfo.boderColor"
                                class="relative overflow-hidden b-b-1"
                            >
                                <a
                                    class="t-image flex items-center gap-25px px-20px pb-10px pt-20px md-gap-5 md-pb-30px md-pt-15px"
                                    :href="`/article/${item.uid}`"
                                >
                                    <div
                                        class="h-100px w-100px flex flex-center flex-shrink-0 items-center overflow-hidden b-2 b-color5 rd-10px sm-h-140px sm-w-140px"
                                    >
                                        <!-- <div class="h-60px w-60px flex-center flex-shrink-0 sm-h-100px sm-w-100px"> -->
                                        <img
                                            v-lazy="item.coverImg"
                                            src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                                            class="h-full w-full object-contain"
                                            :alt="item.title"
                                        />
                                        <!-- </div> -->
                                    </div>

                                    <div class="w-full flex flex-col justify-between gap-4px sm-gap-12px">
                                        <div
                                            :class="tmplInfo.titleColor"
                                            class="line-clamp-1 w-full text-16px font-bold md-line-clamp-2 md-text-20px sm-text-18px hover:italic hover:color-#ffd751"
                                        >
                                            {{ item.title }}
                                        </div>

                                        <div :class="tmplInfo.descriptionColor" class="hidden sm-block">
                                            {{ frontUrl }}/article/{{ item.uid }}
                                        </div>

                                        <p
                                            :class="tmplInfo.descriptionColor"
                                            class="line-clamp-2 max-w-600px text-14px"
                                        >
                                            {{ item.description }}
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <base-footer />
        <back-top />
        <cookie-consent />
    </div>
</template>
