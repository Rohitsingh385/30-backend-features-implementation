export const buildPaginationMeta = (page: number, limit: number, total: number) => {
    return {
        page,
        limit,
        total,
        pages: Math.ceil(total/limit)
    }
}