// seo信息
import { appName, keyWords, appDescription } from './constants/index'

export default defineNuxtConfig({
    // 模块
    modules: [
        'nuxt-swiper',
        '@unocss/nuxt',
        '@vueuse/nuxt',
        '@nuxtjs/device',
        '@vite-pwa/nuxt',
        'nuxt-simple-sitemap',
        '@zadigetvoltaire/nuxt-gtm',
    ],

    // 开启ssr
    ssr: true,

    runtimeConfig: {
        // 全局变量
        public: {
            frontUrl: process.env.NUXT_FRONT_URL,
            baseUrl: process.env.NUXT_PUBLIC_BASE_URL,
            baseApi: process.env.NUXT_PUBLIC_BASE_API,
            subdomain: process.env.NUXT_PUBLIC_SUBDOMAIN,
            adSenseClientId: process.env.NUXT_PUBLIC_ADSENSE_CLIENT_ID,
            adsenseSearchId: process.env.NUXT_ADSENSE_SEARCH_ID,
            baseTrackUrl: process.env.NUXT_PUBLIC_BASE_TRACK_URL,
        },
    },

    // header信息
    app: {
        head: {
            viewport:
                'user-scalable=no, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, width=device-width, height=device-height',
            link: [
                { rel: 'icon', href: '/favicon.ico', sizes: 'any' },
                { rel: 'icon', type: 'image/svg+xml', href: '/favicon.ico' },
                { rel: 'apple-touch-icon', href: '/apple-touch-icon.png' },
            ],
            meta: [
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1',
                },
                { name: 'description', content: appDescription },
                { name: 'keywords', content: keyWords },
                {
                    name: 'apple-mobile-web-app-status-bar-style',
                    content: 'black-translucent',
                },
            ],
            script: [
                {
                    innerHTML:
                        'window.adsbygoogle = window.adsbygoogle || [];let adBreak = adConfig = function (o) {adsbygoogle.push(o);}',
                    type: 'text/javascript',
                },
                {
                    async: true,
                    src: 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js',
                    'data-ad-client': process.env.NUXT_PUBLIC_ADSENSE_CLIENT_ID,
                    'data-ad-frequency-hint': '30s',
                    // 环境变量控制测试广告是否开启
                    ...(process.env.NUXT_ENV === 'development' ? { 'data-adbreak-test': 'on' } : {}),
                },
            ],
        },
    },

    // 全局css样式
    css: ['@unocss/reset/tailwind.css', '@/assets/css/main.scss'],

    // 服务启动端口号
    devServer: {
        port: 3032,
    },

    // devtools工具
    devtools: {
        enabled: true,
        DragEvent: true,

        timeline: {
            enabled: true,
        },
    },

    // 判断设备类型
    device: {
        refreshOnResize: true,
    },

    // 实验性配置 https://nuxt.com/docs/guide/going-further/experimental-features
    experimental: {
        payloadExtraction: false,
        typedPages: true,
    },

    // gtm配置
    gtm: {
        enabled: true,
        debug: false,
        id: process.env.NUXT_CONFIG_GTM_ID ?? '',
    },

    // 页面缓存地址
    nitro: {
        // 路由渲染规则
        routeRules: {
            '/': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            }, // 单位 s
            '/Content/**': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/article/**': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/c/**': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/q': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/contactus': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/privacy': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/legalterms': {
                swr: process.env.NUXT_CONFIG_CACHE_TTL
                    ? Number(process.env.NUXT_CONFIG_CACHE_TTL) > 0
                        ? Number(process.env.NUXT_CONFIG_CACHE_TTL)
                        : false
                    : 172800,
            },
            '/api/**': {
                proxy: process.env.NUXT_PUBLIC_BASE_API + '/api/**',
            },
            '/site_api/**': {
                proxy: process.env.NUXT_PUBLIC_BASE_API + '/site_api/**',
            },
        },
        storage: {
            cache: {
                driver: 'redis',
                host: 'localhost',
                port: 6379,
                db: 3,
            },
        },
        devStorage: {
            cache: {
                driver: 'redis',
                host: 'localhost',
                port: 6379,
                db: 3,
            },
        },
        externals: {
            traceInclude: [],
        },
    },

    // pwa配置
    pwa: {
        // registerType: 'autoUpdate',
        base: '/',
        manifest: {
            id: '/',
            scope: '/',
            name: appName,
            short_name: appName,
            description: appDescription,
            theme_color: '#ffffff',
            icons: [
                {
                    src: 'pwa-64x64.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-96x96.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-128x128.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-192x192.png',
                    sizes: '192x192',
                    type: 'image/png',
                },
                {
                    src: 'pwa-256x256.png',
                    sizes: '64x64',
                    type: 'image/png',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'any',
                },
                {
                    src: 'pwa-512x512.png',
                    sizes: '512x512',
                    type: 'image/png',
                    purpose: 'maskable',
                },
            ],
        },
        workbox: {
            globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
            navigateFallbackDenylist: [/^\/p\//, /^\/api\//],
            navigateFallback: undefined,
            cleanupOutdatedCaches: true,
            runtimeCaching: [
                {
                    urlPattern: /^https:\/\/fonts.googleapis.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'google-fonts-cache',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
                {
                    urlPattern: /^https:\/\/fonts.gstatic.com\/.*/i,
                    handler: 'CacheFirst',
                    options: {
                        cacheName: 'gstatic-fonts-cache',
                        expiration: {
                            maxEntries: 10,
                            maxAgeSeconds: 60 * 60 * 24 * 365, // <== 365 days
                        },
                        cacheableResponse: {
                            statuses: [0, 200],
                        },
                    },
                },
            ],
        },
        registerWebManifestInRouteRules: true,
        writePlugin: true,
        devOptions: {
            enabled: process.env.NUXT_ENV === 'production' || process.env.NUXT_ENV === 'test',
            navigateFallback: '/',
        },
    },

    // sitemap配置
    site: {
        url: process.env.NUXT_PUBLIC_BASE_URL,
    },
    sitemap: {
        xsl: false,
        excludeAppSources: ['nuxt:pages'],
        cacheMaxAgeSeconds: 60 * 60 * 24, // 1 day
        sources: ['/api/v1/system/page/sitemap'],
        exclude: ['/contactus', '/legalterms', '/privacy'],
    },
})
