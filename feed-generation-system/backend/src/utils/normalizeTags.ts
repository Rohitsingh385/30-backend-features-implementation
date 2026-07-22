

export function normalizeTags(tags: string[]): string[] {

   const normalizedTags  =  tags
            .map(tag => tag.trim().toLowerCase())
            .filter(tag => tag !== "")
    const uniqueTags  = [...new Set(normalizedTags )]
    return uniqueTags 

}

