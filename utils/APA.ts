/**
 * Adsense Placement API (APA) 弹窗类型广告
 * 文档参考: https://developers.google.com/ad-placement/apis?hl=zh-cn
 *
 * eg:
 *    // 初始化 并弹出 Preroll 广告
 *    APA.init()
 *    // 弹出其他类型广告
 *    APA.showStart()
 */

interface AdBreakConfig {
    type: string
    name: string
    beforeAd?: () => void
    afterAd?: () => void
    beforeReward?: (showAdFn: () => void) => void
    adDismissed?: () => void
    adViewed?: () => void
    adBreakDone?: () => void
}

interface AdConfigOptions {
    preloadAdBreaks?: 'on' | 'auto'
    sound?: 'on' | 'off'
    onReady?: () => void
}

declare function adConfig(options: AdConfigOptions): void
declare function adBreak(config: AdBreakConfig): void

export default class APA {
    private triggerTag = () => {
        window.dataLayer?.push({
            event: '5555NB', // 发送 Tag Manager
        })
    }

    // 游戏进入前弹出广告 Preroll, 加载APA广告配置
    public init = (breakFunc?: () => void, beforeAdFunc?: () => void) => {
        const adConfigPromise = new Promise<boolean>((resolve, reject) => {
            adConfig({
                preloadAdBreaks: 'on',
                onReady: () => {
                    // console.log('apa ready!')
                    resolve(true)
                },
            })
        })

        const timeoutPromise = new Promise<boolean>((resolve, reject) => {
            const timer = setTimeout(() => {
                resolve(false)
                clearTimeout(timer)
            }, 10000)
        })

        Promise.race([adConfigPromise, timeoutPromise]).then((isShow) => {
            if (isShow) {
                this.showPreroll(breakFunc)
                this.triggerTag()
                beforeAdFunc?.()
            } else {
                breakFunc?.()
            }
        })
    }

    // 展示 Preroll 广告
    public showPreroll = (breakFunc?: () => void) => {
        adBreak({
            type: 'preroll',
            name: 'preroll_ad',
            adBreakDone: () => {
                setTimeout(() => {
                    breakFunc?.()
                }, 200)
            },
        })
    }

    // 展示 Start 广告
    public showStart = (breakFunc?: () => void, beforeAdFunc?: () => void, afterAdFunc?: () => void) => {
        adBreak({
            type: 'start',
            name: 'start_ad',
            beforeAd: () => {
                this.triggerTag()
                beforeAdFunc?.()
            },
            afterAd: () => {
                afterAdFunc?.()
            },
            adBreakDone: () => {
                setTimeout(() => {
                    breakFunc?.()
                }, 200)
            },
        })
    }

    // 展示 Next 广告
    public showNext = (breakFunc?: () => void, beforeAdFunc?: () => void, afterAdFunc?: () => void) => {
        adBreak({
            type: 'next',
            name: 'next_ad',
            beforeAd: () => {
                this.triggerTag()
                beforeAdFunc?.()
            },
            afterAd: () => {
                afterAdFunc?.()
            },
            adBreakDone: () => {
                setTimeout(() => {
                    breakFunc?.()
                }, 200)
            },
        })
    }

    // 展示 Pause 广告
    public showPause = (breakFunc?: () => void, beforeAdFunc?: () => void, afterAdFunc?: () => void) => {
        adBreak({
            type: 'pause',
            name: 'pause_ad',
            beforeAd: () => {
                this.triggerTag()
                beforeAdFunc?.()
            },
            afterAd: () => {
                afterAdFunc?.()
            },
            adBreakDone: () => {
                setTimeout(() => {
                    breakFunc?.()
                }, 200)
            },
        })
    }

    // 展示 Rewarded 广告(激励广告)
    public showReward = (
        beforeAdFunc?: () => void,
        afterAdFunc?: () => void,
        rewardFunc?: () => void,
        dismissFunc?: () => void
    ) => {
        adBreak({
            type: 'reward',
            name: 'reward_ad',
            beforeAd: () => {
                // this.triggerTag()
                beforeAdFunc?.()
            },
            afterAd: () => {
                afterAdFunc?.()
            },
            beforeReward: (showAdFn: () => void) => {
                showAdFn()
            },
            // 用户取消广告
            adDismissed: () => {
                dismissFunc?.()
            },
            // 用户看完广告
            adViewed: () => {
                rewardFunc?.()
            },
            adBreakDone: () => {
                setTimeout(() => {
                    dismissFunc?.()
                }, 200)
            },
        })
    }
}
