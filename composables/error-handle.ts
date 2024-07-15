export interface ApiErrorType<T> {
    cause?: string
    data?: APIResponseType<T>
    statusCode: number
    statusMessage: string
    message: string
}

export const handleError = <T>(url: string, error: ApiErrorType<T>) => {
    if (error.statusCode === 500 && !url.includes('page/index')) {
        return clearError({ redirect: '/' })
    }
    throw createError({ statusCode: error.statusCode, statusMessage: error.statusMessage })
}
