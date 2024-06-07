export const formattedDate = (date: string) => {
    const Data = new Date(date)
    return `${Data.toLocaleString('en-US', { month: 'long' }).toLowerCase()}${Data.getDate()},${Data.getFullYear()}`
}
