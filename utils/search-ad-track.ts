// 服务器 Track埋点
interface ServerTrackClickEventParams {
    clickId: string
    campaignId: string
    adGroupId: string
    adId: string
    siteId: string
    channelId: string
    keyword: string
    resultsStyleId: string
    termsStyleId: string
    isOwn: boolean
}

interface ServerTrackImpressionEventParams {
    siteId: string
    campaignId: string
    adGroupId: string
    adId: string
    channelId: string
}

const sendTrackRequest = (url: string) => {
    const img = new Image()
    img.width = 0
    img.height = 0
    img.crossOrigin = 'anonymous'
    img.src = url
}

export const serverTrackClickEvent = (params: ServerTrackClickEventParams) => {
    const {
        public: { baseTrackUrl },
    } = useRuntimeConfig()

    const trackUrl = new URL(baseTrackUrl + '/c')
    const trackUrlParams = new URLSearchParams()

    trackUrlParams.set('clickId', params.clickId)
    trackUrlParams.set('campaignId', params.campaignId)
    trackUrlParams.set('adGroupId', params.adGroupId)
    trackUrlParams.set('adId', params.adId)
    trackUrlParams.set('siteId', params.siteId)
    trackUrlParams.set('channelId', params.channelId)
    trackUrlParams.set('keyword', params.keyword)
    trackUrlParams.set('termsStyleId', params.termsStyleId)
    trackUrlParams.set('resultsStyleId', params.resultsStyleId)
    trackUrlParams.set('isOwn', params.isOwn.toString())

    trackUrl.search = trackUrlParams.toString()
    sendTrackRequest(trackUrl.toString())
}

export const serverTrackImpressionEvent = (params: ServerTrackImpressionEventParams) => {
    const {
        public: { baseTrackUrl },
    } = useRuntimeConfig()

    const trackUrl = new URL(baseTrackUrl + '/i')
    const trackUrlParams = new URLSearchParams()

    trackUrlParams.set('campaignId', params.campaignId)
    trackUrlParams.set('adGroupId', params.adGroupId)
    trackUrlParams.set('adId', params.adId)
    trackUrlParams.set('siteId', params.siteId)
    trackUrlParams.set('channelId', params.channelId)

    trackUrl.search = trackUrlParams.toString()
    sendTrackRequest(trackUrl.toString())
}

// const serverTrackEvent = (params: ServerTrackEventParams) => {
//     const img = new Image()
//     img.width = 0
//     img.height = 0
//     img.crossOrigin = 'anonymous'

//     const {
//         public: { baseTrackUrl },
//     } = useRuntimeConfig()

//     const trackUrl = new URL(baseTrackUrl)
//     const trackUrlParams = new URLSearchParams()

//     trackUrlParams.set('clickId', params.clickId)
//     trackUrlParams.set('campaignId', params.campaignId)
//     trackUrlParams.set('adGroupId', params.adGroupId)
//     trackUrlParams.set('adId', params.adId)
//     trackUrlParams.set('siteId', params.siteId)
//     trackUrlParams.set('channelId', params.channelId)
//     trackUrlParams.set('keyword', params.keyword)
//     trackUrlParams.set('termsStyleId', params.termsStyleId)
//     trackUrlParams.set('resultsStyleId', params.resultsStyleId)

//     trackUrl.search = trackUrlParams.toString()
//     img.src = trackUrl.toString()
// }
