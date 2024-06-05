<script setup lang="ts">
withDefaults(
    defineProps<{
        searchArticleList: Article[]
        tmplInfo: tmplInfoType
        searchText: string
        tagList: string[]
        relatedTag?: RelatedTag[]
    }>(),
    {
        searchArticleList: () => [],
        tmplInfo: () => ({} as tmplInfoType),
        searchText: '',
        tagList: () => [],
        relatedTag: () => [],
    }
)
const { isMobile } = useDevice()
</script>

<template>
    <div :class="tmplInfo.bgColor">
        <TopicQPcHeader v-if="!isMobile" :class="tmplInfo.headerBgColor">
            <template #search>
                <TopicSearchBar :search-text="searchText" class="w-full rd-40px bg-#fff xl-w-600px xl-rd-10px" />
            </template>
        </TopicQPcHeader>
        <QHeader v-if="isMobile">
            <template #search>
                <TopicSearchBar :search-text="searchText" class="w-full rd-40px bg-#fff xl-w-600px xl-rd-10px" />
            </template>
        </QHeader>

        <div class="mx-auto mt-10px max-w-1260px min-h-[calc(100vh-100px)] w-full px-20px">
            <div class="w-full xl-w-50%">
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
                                class="t-image mt-20px flex items-center gap-15px px-5px pb-10px md-mt-15px md-gap-5 sm-gap-25px md-pb-30px"
                                :href="`/article/${item.uid}`"
                            >
                                <div
                                    class="h-80px w-80px flex flex-center flex-shrink-0 items-center overflow-hidden b-2 b-[#323a97] rd-10px lt-md-hidden sm-h-140px sm-w-140px"
                                >
                                    <div class="flex-center flex-shrink-0">
                                        <img
                                            v-lazy="item.coverImg"
                                            class="h-full w-full object-contain"
                                            :alt="item.title"
                                        />
                                    </div>
                                </div>
                                <div class="w-full flex flex-col justify-between gap-4px sm-gap-12px">
                                    <div
                                        :class="tmplInfo.titleColor"
                                        class="w-full text-16px font-600 font-exo md-line-clamp-2 md-text-20px sm-text-18px !hover:color-[#ee8100]"
                                    >
                                        {{ item.title }}
                                    </div>

                                    <p class="max-w-600px text-14px md-line-clamp-3" :class="tmplInfo.descriptionColor">
                                        {{ item.description }}
                                    </p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <TopicFooter />
        <cookie-consent />
    </div>
</template>
