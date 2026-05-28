export const sortData = (sortBy: string)=> {
    let sortOptions =  {}
    if(sortBy === "newest"){
        sortOptions = {
            createdAt : -1
        }
    }
    if(sortBy === "oldest"){
        sortOptions =  {
            createdAt : 1
        }
    }

    return sortOptions
}