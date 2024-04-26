export default defineNuxtRouteMiddleware((to, from) => {
    // 对 read/1 链接重定向，测试 {ignore} 的作用
    if (to.name === 'Subject-uid-slug') {
        return navigateTo(
            {
                name: 'Subject-uid-slug-{ignore}',
                params: to.params,
                query: to.query,
            },
            { redirectCode: 301 }
        )
    }
})
