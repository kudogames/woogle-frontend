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
    slug: string
    title: string
    coverImg: string
    category: Category
    tag: string[]
    rank: number
    content: string
    createTime: string
    updateTime: string
    description: string
    referrerAdCreative: string
}
interface SearchArticle {
    uid: string
    title: string
    coverImg: string
    description: string
    content: string
    referrerAdCreative: string
}

interface SearchAd {
    uid: string
    terms: string
    channelId: string
}

interface IndexPageType {
    swiperArticleList: Article[]
    trendingArticleList: Article[]
    latestArticleList: Article[]
    editorsArticleList: Article[]
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

interface SearchAdPageType {
    searchAdInfo: SearchAd
    searchArticle: SearchArticle
}

interface DiscussionPageType extends SearchAdPageType {
    shareArticleList: {
        uid: string
        article: Article
    }[]
}

interface tmplInfoType {
    mobileTopColor: string
    headerBgColor: string
    bgColor: string
    boderColor: string
    titleColor: string
    descriptionColor: string
    styleId: string
    template: Component
}

interface RelatedTag {
    name: string
    svg: string
    color1: string
    color2: string
    color3: string
}

declare module 'uuid'
