interface NewDataType<T> {
    [key: string]: T[]
}

export interface PageResponseType<T> {
    msg: string
    data: T
    next: number | null
    previous?: number | null
    count?: number
}

interface LoadingMoreDataParamsType<T> {
    url: string
    oldData: { [key: string]: T[] }
    dataLoading?: Ref<boolean>
    page?: Ref<number>
    size?: number
    delay?: number
    query?: object
    fetchOptions?: object
}

interface URLSearchParamsType {
    page: string
    size: string
    [key: string]: string
}

export class GetMoreData<T> {
    /**
     * @param {string} url 请求地址
     * @param {T[] | { [key: string]: T[] }} oldData 旧数据
     * @param {number} [size=24] 每页数据量
     * @param {number} [page=2] 当前页数
     * @param {number} [delay=800] 节流延迟
     * @param {object} [query] 查询参数
     * @param {object} [fetchOptions] 请求配置
     * @param {Ref<boolean>} [dataLoading] 数据加载状态
     * @param {Ref<boolean>} [hasMoreData] 是否还有更多数据
     * @param {Function} [debouncedHandleScroll] 节流处理滚动事件
     *
     */
    url: string
    oldData: { [key: string]: T[] }
    size: number
    page: Ref<number>
    delay: number

    query?: object
    fetchOptions?: object

    dataLoading: Ref<boolean>
    hasMoreData: Ref<boolean>
    debouncedHandleScroll: () => void
    constructor(options: LoadingMoreDataParamsType<T>) {
        const { url, oldData, size = 24, page = ref(2), delay = 800, query, fetchOptions } = options
        this.url = url
        this.size = size
        this.delay = delay

        this.oldData = oldData
        this.query = query
        this.page = page
        this.fetchOptions = fetchOptions

        this.dataLoading = ref(false)
        this.hasMoreData = ref(true)
        this.debouncedHandleScroll = throttle(this.handleScroll, this.delay)
    }

    getURLParams() {
        return {
            page: this.page.value.toString(),
            size: this.size.toString(),
            ...this.query,
        }
    }

    async fetch(url: string, params: URLSearchParamsType, options?: object) {
        return await $fetch<PageResponseType<NewDataType<T>>>(url, {
            params,
            headers: { accept: 'application/json' },
            ...options,
        })
    }

    parseData(data: PageResponseType<NewDataType<T>>) {
        const newData = data.data

        for (const key in newData) {
            this.oldData[key].push(...newData[key])
        }
    }

    async loadMoreData() {
        if (this.dataLoading.value || !this.hasMoreData.value) return
        this.dataLoading.value = true

        try {
            const params = this.getURLParams()

            const data = await this.fetch(this.url, params, this.fetchOptions)
            this.parseData(data)

            this.page.value++
            this.hasMoreData.value = Boolean(data.next)
        } catch (e) {
            this.hasMoreData.value = false
        } finally {
            this.dataLoading.value = false
        }
        if (!this.hasMoreData.value) {
            window.removeEventListener('scroll', this.debouncedHandleScroll)
        }
    }

    handleScroll = () => {
        const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
        const windowHeight = document.documentElement.clientHeight
        const scrollHeight = document.documentElement.scrollHeight

        if (scrollTop + windowHeight >= scrollHeight * 0.8) {
            this.loadMoreData()
        }
    }

    addScrollListener() {
        onBeforeMount(() => {
            window.addEventListener('scroll', this.debouncedHandleScroll)
        })
    }

    run() {
        this.addScrollListener()
    }
}
