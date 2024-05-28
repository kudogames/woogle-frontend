<script lang="ts" setup>
import { v4 as uuidv4 } from 'uuid'
import TmplContent from '~/components/Tmpl/Content.vue'
import TmplDiscussion from '~/components/Tmpl/Discussion.vue'
import TmplSubject from '~/components/Tmpl/Subject.vue'
import TmplTopic from '~/components/Tmpl/Topic.vue'

definePageMeta({
    layout: 'tmpl-ad-layout',
    validate: (route) => {
        const params = route.params as Record<string, string>

        return ['content', 'subject', 'topic', 'discussion'].includes(params.template.toLowerCase())
    },
})

const {
    params: { template, uid, slug },
    query,
} = useRoute('template-uid-slug')

// 将 template 转换为da小写
const tmpl = template.charAt(0).toUpperCase() + template.slice(1).toLowerCase()

interface TmplInfoMapType {
    [key: string]: { styleId: string; component: Component; mobileColor: string }
}

const TmplInfoMap: TmplInfoMapType = {
    Content: { styleId: '8773662877', component: TmplContent, mobileColor: '#000' },
    Subject: { styleId: '8773662877', component: TmplSubject, mobileColor: '#000' },
    Discussion: { styleId: '7970436399', component: TmplDiscussion, mobileColor: '#01074B' },
    Topic: { styleId: '3736261853', component: TmplTopic, mobileColor: '#fff' },
}

useHead({
    meta: [
        {
            name: 'theme-color',
            content: TmplInfoMap[tmpl].mobileColor,
        },
        {
            name: 'msapplication-navbutton-color',
            content: TmplInfoMap[tmpl].mobileColor,
        },
        {
            name: 'apple-mobile-web-app-capable',
            content: TmplInfoMap[tmpl].mobileColor,
        },
        {
            name: 'apple-mobile-web-app-status-bar-style',
            content: TmplInfoMap[tmpl].mobileColor,
        },
    ],
})

const { data, error } = await useFetch<APIResponseType<SearchAdPageType>>(
    `/api/v1/article/page/Content/${uid}/${slug}`,
    {
        headers: { accept: 'application/json' },
    }
)
const { searchAdInfo, searchArticle } = data.value?.data ?? ({} as SearchAdPageType)

const keys = ['utm_campaign', 'utm_content', 'utm_medium', 'utm_source']
const [clickId, campaignId, adGroupId, adId] = keys.map((key) => (query[key] as string) ?? '')

// 跟踪参数，带到下一页
const trackParams: TrackParams = {
    channelId: searchAdInfo.channelId,
    clickId,
    campaignId,
    adGroupId,
    adId,
    tmpl,
}

// relatedSearch 组件
const relatedSearch = ref()
const relatedSearch2 = ref()

// Ad 加载完成
const adLoadComplete = ref(false)
const adLoadComplete2 = ref(false)

// Ad 加载完成回调
const adLoadedCallback = () => {
    adLoadComplete.value = true
}
const adLoadedCallback2 = () => {
    adLoadComplete2.value = true
}
const { isMobile } = useDevice()

onMounted(() => {
    const e = new URLSearchParams(window.location.search)
    e.set('pgttl', uuidv4())
    window.history.replaceState(null, '', '?' + e.toString())
    relatedSearch.value.loadAd()
    if (tmpl === 'Topic') {
        relatedSearch2.value.loadAd()
        if (isMobile) window.scrollTo({ top: 60, behavior: 'smooth' })
    } else {
        adLoadComplete2.value = true
    }
})
const visibleAd = computed(() => adLoadComplete.value && adLoadComplete2.value)
</script>

<template>
    <component :is="TmplInfoMap[tmpl].component" :search-article="searchArticle" :visible-ad="visibleAd">
        <template #ad1>
            <RelatedSearch
                ref="relatedSearch"
                class="w-full"
                search-text="keyword"
                :terms="searchAdInfo.terms"
                :channel-id="searchAdInfo.channelId"
                :style-id="TmplInfoMap[tmpl].styleId"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback"
            />
        </template>

        <template v-if="tmpl === 'Topic'" #ad2>
            <TopicRelatedSearch
                ref="relatedSearch2"
                class="w-full"
                :search-text="searchArticle.title"
                :channel-id="searchAdInfo.channelId"
                :style-id="TmplInfoMap[tmpl].styleId"
                :referrer-ad-creative="searchArticle.referrerAdCreative"
                :track-params="trackParams"
                @ad-loaded-callback="adLoadedCallback2"
            />
        </template>
    </component>
</template>
