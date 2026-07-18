import { Request, Response, NextFunction } from "express";
import { saveBookmark, removeBookmark, getBookmark } from "./bookmark.service.js";
type bookmarkParams ={
    postId: string
}
export const saveBookmarkController = async(req: Request<bookmarkParams>, res: Response, next: NextFunction)=> {
    
    try{
        console.log('in controller')
        const bookmark = await saveBookmark(
            req.user._id,
            req.params?.postId
        )

        res.status(201).json({
            success: true,
            message: "Bookmark saved successfully",
            data: bookmark
        })
    }catch(error){
        next(error)
    }
}

export const removeBookmarkController = async(req: Request<bookmarkParams>, res: Response, next: NextFunction)=> {

    try{
        const bookmark = await removeBookmark(
            req.user._id,
            req.params?.postId
        )
        res.status(200).json({
            success: true,
            message: "Bookmark removed"
        })

    }catch(error){
        next(error)
    }
}

export const getBookmarkController = async(req: Request, res: Reponse , next: NextFunction)=> {

    try{
        const {cursor, limit } =  req.query
        const result = await getBookmark(
            {
                userId: req.user._id,
                cursor: cursor as string | undefined,
                limit: limit ? Number(limit) : 10
            }
        )
        res.status(200).json({
            success: true,
            data: result
        })
    }catch(error){
        next(error)
    }
}