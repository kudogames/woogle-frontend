// 全局类型文件
interface APIResponseType<T> {
    msg: string
    data: T
}
interface Category {
    id: string
    name: string
    slug: string
}
interface Article {
    uid: string
    title: string
    coverImg: string
    category: Category
    tag: string[]
    rank: number
    content: string
    createTime: string
    updateTime: string
    description: string
}
interface SearchArticle {
    uid: string
    title: string
    coverImg: string
    description: string
    content: string
}

interface SearchAd {
    uid: string
    terms: string
    channelId: string
}

interface IndexPageType {
    trendingArticleList: Article[]
    allArticleList: Article[]
}
interface QPageType {
    tagList: [string[]]
    searchArticleList: Article[]
}
interface RelatedArticlePageType {
    relatedArticle: Article
    recommendArticleList: Article[]
}
interface CategoryPageType {
    currentCategory: Category
    categoryArticleList: Article[]
    latestPostsList: Article[]
}
interface ArticlePageType {
    currentArticle: Article
    relatedArticleList: Article[]
}

interface BlueArticleType {
    blueArticleList: Article[]
}
interface RainArticlePageType {
    rainArticleList: Article[]
}
interface SearchAdPageType {
    searchAdInfo: SearchAd
    searchArticle: SearchArticle
}

declare module 'uuid'
