import { useIntersectionObserver } from '@vueuse/core'
const defaultImg = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.directive('lazy', {
        mounted(el, binding) {
            const { stop } = useIntersectionObserver(el, ([{ isIntersecting }]) => {
                if (isIntersecting) {
                    el.src = binding.value
                    el.onerror = () => {
                        el.src = defaultImg
                    }
                    stop()
                }
            })
        },
        getSSRProps(binding, vnode) {
            // 你可以在这里提供SSR特定的props
            return { src: defaultImg }
        },
    })
})
