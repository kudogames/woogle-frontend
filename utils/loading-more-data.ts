interface NewDataType<T> {
    newDataList: T[]
}

interface PageResponseType<T> {
    msg: string
    data: T
    next?: number | null
    previous?: number | null
    count?: number
}
interface LoadingMoreDataParams<T> {
    url?: string
    oldDataList?: T[]
    dataLoading?: Ref<boolean>
    size?: number
    query?: object
}

export function loadingMoreData<T>(options: LoadingMoreDataParams<T>) {
    const { url = '', oldDataList = [], size = 24, dataLoading = ref(false), query } = options
    const page: Ref<number> = ref(1)
    // const dataLoading: Ref<boolean> = ref(false)
    const hasMoreData: Ref<boolean> = ref(true)

    // 加载数据
    const loadMoreData = async (oldDataList: T[]) => {
        // 没有数据并且或者不在底部时，不触发
        if (dataLoading.value || !hasMoreData.value) return
        dataLoading.value = true

        // 等待0.2秒
        // await new Promise((resolve) => setTimeout(resolve, time))

        // 请求数据
        try {
            const params = new URLSearchParams({
                page: page.value.toString(),
                size: size.toString(),
                ...query,
            }).toString()
            const data = await $fetch<PageResponseType<NewDataType<T>>>(`${url}?${params}`, {
                headers: { accept: 'application/json' },
            })

            const newDataList = data.data.newDataList
            const next = data.next

            oldDataList.push(...(newDataList ?? []))

            page.value++
            hasMoreData.value = Boolean(next)
        } catch (e) {
            hasMoreData.value = false
        } finally {
            dataLoading.value = false
        }
    }
    // 监听滚动是否到达底部
    const handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (scrollTop + windowHeight >= scrollHeight * 0.8) {
            // 到达底部时，调用loadMoreData 函数
            loadMoreData(oldDataList)
        }
    }

    // 监听滚动是否到达底部
    onBeforeMount(() => {
        loadMoreData(oldDataList)
        window.addEventListener('scroll', handleScroll)
    })

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll)
    })
}
