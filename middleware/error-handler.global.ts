export default defineNuxtRouteMiddleware((to, from) => {
    // 页面不存在，跳转至首页
    // console.log(to, from)
    if (!to.matched.length && to.path !== '/') {
        return navigateTo('/', { redirectCode: 301 })
    }
})
