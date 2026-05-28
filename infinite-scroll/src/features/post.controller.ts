import type{Request, Response} from "express"

import postModel from "./post.model.js"

import { getPagination } from "../utils/pagination.js"
import { sortData } from "../utils/sorting.js"


export const postController = async(req: Request, res: Response)=> {
    try{

        const {page =1, limit =5, sortBy ="newest"} = req.query as unknown as{
            page: number,
            limit: number,
            sortBy: string
        }

        const currentPage = Number(page);
        const currentLimit = Number(limit)

        const {skip} = getPagination(currentPage, currentLimit)

        const sortOptions = sortData(String(sortBy));

        const posts = await postModel.find({})
            .sort(sortOptions)
            .skip(skip)
            .limit(currentLimit)


    }catch(error){
        res.status(500).json({
            message: 'ops something went wrong'
        })
    }
}