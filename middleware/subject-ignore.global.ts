export default defineNuxtRouteMiddleware((to, from) => {
    // 对 read/1 链接重定向，测试 {ignore} 的作用
    if (to.name === 'template-uid-slug' && to.params.template.toLowerCase() === 'subject') {
        return navigateTo(
            {
                name: 'template-uid-slug-{ignore}',
                params: to.params,
                query: to.query,
            },
            { redirectCode: 301 }
        )
    }
})
