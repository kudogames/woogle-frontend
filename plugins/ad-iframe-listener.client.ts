export default defineNuxtPlugin(() => {
    let adBlockIsTrack = false
    let relatedSearchIsTrack = false
    let searchResultIsTrack = false

    setInterval(() => {
        const adBlockIframeList = document.querySelectorAll('.ad-block ins iframe')
        const relatedSearchFrameList = document.querySelectorAll('.related-search iframe')
        const searchResultIframeList = document.querySelectorAll('.search-result iframe')

        if (document.activeElement) {
            const activeEle = document.activeElement

            const adBlockIframeArr = Array.prototype.slice.call(adBlockIframeList)
            const relatedSearchFrameArr = Array.prototype.slice.call(relatedSearchFrameList)
            const searchResultIframeArr = Array.prototype.slice.call(searchResultIframeList)

            if (adBlockIframeArr.includes(activeEle)) {
                if (!adBlockIsTrack) {
                    adBlockIsTrack = true
                    window.dataLayer?.push({
                        event: '1111NB',
                    })
                }
            } else {
                adBlockIsTrack = false
            }

            if (relatedSearchFrameArr.includes(activeEle)) {
                if (!relatedSearchIsTrack) {
                    relatedSearchIsTrack = true
                    window.dataLayer?.push({
                        event: '8888NB',
                    })
                }
            } else {
                relatedSearchIsTrack = false
            }

            if (searchResultIframeArr.includes(activeEle)) {
                if (!searchResultIsTrack) {
                    searchResultIsTrack = true
                    window.dataLayer?.push({
                        event: '2222NB',
                    })
                }
            } else {
                searchResultIsTrack = false
            }
        }
    }, 200)
})
