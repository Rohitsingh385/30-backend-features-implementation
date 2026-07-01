import  { Response } from "express"

interface ApiResponse<T>{
    statusCode: number;
    success: boolean;
    message: string;
    data?: T
}

export const sendResponse = <T>(res: Response, payload: ApiResponse<T>)=> {
    return res.status(payload.statusCode).json({
        success: payload.success,
        message: payload.message,
        data: payload.data 
    })
}