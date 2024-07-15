export function throttle(fn: Function, delay: number) {
    // previous 是上一次执行 fn 的时间
    // timer 是定时器
    let previous = 0
    let timer = null as NodeJS.Timeout | null

    // 将 throttle 处理结果当作函数返回
    return function (this: any, ...args: any[]) {
        // 获取当前时间，转换成时间戳，单位毫秒
        const now = +new Date()

        // 判断上次触发的时间和本次触发的时间差是否小于时间间隔
        if (now - previous < delay) {
            // 如果小于，则为本次触发操作设立一个新的定时器
            // 定时器时间结束后执行函数 fn
            if (timer) clearTimeout(timer)
            timer = setTimeout(() => {
                previous = now
                fn.apply(this, args)
            }, delay)
            // ------ 新增部分 end ------
        } else {
            // 第一次执行
            // 或者时间间隔超出了设定的时间间隔，执行函数 fn
            previous = now

            fn.apply(this, args)
        }
    }
}

export function debounce(fn: Function, delay: number = 1000) {
    let timer: NodeJS.Timeout | null = null
    return function (this: any, ...args: []) {
        if (timer) clearTimeout(timer)
        timer = setTimeout(() => {
            fn.apply(this, args)
        }, delay)
    }
}
