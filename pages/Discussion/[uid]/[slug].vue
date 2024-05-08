<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'

definePageMeta({
    layout: 'discussion-ad-layout',
})

const {
    fullPath,
    params: { uid, slug },
    query,
} = useRoute('Discussion-uid-slug')

const {
    public: { frontUrl },
} = useRuntimeConfig()

const { data, error } = await useFetch<APIResponseType<SearchAdPageType>>(
    `/api/v1/article/page/Content/${uid}/${slug}`,
    {
        headers: { accept: 'application/json' },
    }
)

const { searchAdInfo, searchArticle } = data.value?.data ?? ({} as SearchAdPageType)

const readMore = ref(false)

const readMoreClick = () => {
    readMore.value = true
}

const keys = ['utm_campaign', 'utm_content', 'utm_medium', 'utm_source']
const [clickId, campaignId, adGroupId, adId] = keys.map((key) => (query[key] as string) ?? '')

interface TrackParams {
    clickId: string
    campaignId: string
    adGroupId: string
    adId: string
    channelId: string
    tmpl: string
}
// 跟踪参数，带到下一页
const trackParams: TrackParams = {
    channelId: searchAdInfo.channelId,
    clickId,
    campaignId,
    adGroupId,
    adId,
    tmpl: 'Discussion',
}

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

const shareNowList = [
    {
        img: (await import('@/assets/img/facebook.png')).default,
        link: `https://www.facebook.com/sharer.php?u=${frontUrl}${fullPath}`,
    },
    {
        img: (await import('@/assets/img/X.png')).default,
        link: `https://twitter.com/intent/tweet?url=${frontUrl}${fullPath}`,
    },
    {
        img: (await import('@/assets/img/whatsapp.png')).default,
        link: `https://api.whatsapp.com/send?text=${frontUrl}${fullPath}`,
    },
    {
        img: (await import('@/assets/img/email.png')).default,
        link: `mailto:?subject=Car rental services&body=${frontUrl}${fullPath}`,
    },
]
</script>

<template>
    <div
        :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }"
        class="mx-auto max-w-660px min-h-100vh bg-#01074B"
    >
        <div class="i-svg-logo absolute right-20px top-20px hidden h-24px w-112px lg-block"></div>
        <div class="w-full">
            <img
                :src="searchArticle.coverImg"
                alt="searchAdInfo.title"
                class="h-100px w-full object-cover"
                :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }"
            />
        </div>
        <div class="px-15px">
            <header class="py-10px">
                <div class="w-full flex items-center justify-between text-12px">
                    <div class="h-18px flex flex-center gap-4px">
                        <a href="/"><div class="i-svg-home h-14px w-14px"></div></a>

                        Published on May 7, 2024
                    </div>

                    <span>4 min read</span>
                </div>
                <h1 class="my-10px text-left text-16px font-bold">
                    {{ searchArticle.title }}
                </h1>
                <div class="pt-15px text-16px">
                    {{ searchArticle.description }}
                </div>
            </header>

            <RelatedSearch
                ref="relatedSearch"
                class="w-full"
                search-text="keyword"
                :terms="searchAdInfo.terms"
                :channel-id="searchAdInfo.channelId"
                style-id="7970436399"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback"
            />

            <div class="w-full">
                <div class="text-start text-15px" :style="{ display: readMore ? 'none' : 'block' }">
                    <div class="cursor-pointer" @click="readMoreClick">Show More...</div>
                </div>

                <article
                    id="articleContent"
                    class="py-10px"
                    :style="{
                        display: readMore ? 'block' : 'none',
                    }"
                    v-html="searchArticle.content"
                ></article>
                <a
                    :style="{
                        display: readMore ? 'flex' : 'none',
                    }"
                    href="https://woogle.info/Content/WtqWLWuU/veterans-car-charity-compare-car-donation-charities"
                    class="mt-16px flex items-center justify-between b-b-1px b-t-1px b-color3 py-10px"
                >
                    <div>
                        <span>Continue reading this article:</span>
                        <strong class="block text-20px font-bold"
                            >Veterans Car Charity - Compare Car Donation Charities</strong
                        >
                    </div>
                    <div class="h-48px w-40px flex flex-center rd-lg bg-#00EBFF">
                        <div class="i-svg-arrow h-30px w-full"></div>
                    </div>
                </a>
            </div>

            <div class="flex flex-center flex-col gap-16px py-26px">
                <div class="h-48px w-48px">
                    <img
                        :src="searchArticle.coverImg"
                        class="h-full w-full rd-md object-cover"
                        :alt="searchArticle.title"
                    />
                </div>
                <div class="text-center text-14px">
                    <div>Published on May 7, 2024</div>
                    <div>Powered by woogle.info</div>
                </div>
            </div>
            <div class="flex flex-center flex-col gap-10px pb-20px">
                <div class="text-16px">Share now!</div>

                <div class="flex gap-10px">
                    <div
                        v-for="item in shareNowList"
                        :key="item.link"
                        class="h-32px w-32px flex flex-center rd-md bg-#fff"
                    >
                        <a :href="item.link" target="_blank">
                            <img :src="item.img" class="h-16px w-16px" :alt="item.link" />
                        </a>
                    </div>
                </div>
            </div>
            <div class="w-full flex flex-center pt-24px md-hidden">
                <div class="i-svg-logo h-24px w-112px"></div>
            </div>

            <p class="py-24px text-center text-14px">
                The information on this site is of a general nature only and is not intended to address the specific
                circumstances of any particular individual or entity. It is not intended or implied to be a substitute
                for professional advice.
                <a href="/provacy"> Read more. </a>
            </p>
        </div>
    </div>
    <div :style="{ visibility: adLoadComplete ? 'visible' : 'hidden' }">
        <DiscussionBackTop />
        <DiscussionFooter />
    </div>
</template>

<style lang="scss" scoped>
:deep(#articleContent) {
    h1 {
        display: block;
        font-size: 2em;

        font-weight: bold;
    }

    h2 {
        display: block;
        font-size: 20px;
        padding-top: 15px;
        font-weight: bold;
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
        padding-top: 15px;
    }

    em {
        font-style: italic;
    }
    strong {
        font-weight: bold;
    }
}
</style>
