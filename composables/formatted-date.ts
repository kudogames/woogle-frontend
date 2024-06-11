export const formattedDate = (date: string) => {
    const formatDate = new Date(date)
    return `${formatDate.toLocaleString('en-US', {
        month: 'long',
    })} ${formatDate.getDate()}, ${formatDate.getFullYear()}`
}
