export const getPagination = ( page: number, limit: number)=>{
    const skip = (skip -1) * limit
    
    return (
        skip,
        limit
    )
}