export const checkTableActiveSort = (sortMethod: string | undefined, selectedSort: string) => {
    if (sortMethod) return sortMethod.includes(selectedSort)
}