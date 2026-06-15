import type { Request, Response } from "express";
import { Notification } from "./notification.model.js";
export const notifications = async(req: Request, res: Response)=> {
    try{
        // Returns all notifications for the logged-in user.
        const notification  = await Notification.find({
            receipentId: req.id
        })
        .populate("actorId")
        .sort({
            createdAt: -1
        })

        await Notification.findById({
            recipientId: user.id
        })
    }catch(error){
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const unreadCount = async(req: Request, res: Response)=> {
    try{
// Returns unread notification count.
    }catch(error){
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const readNotification = async(req: Request, res: Response)=> {
    try{
        // PATCH /notifications//read

    }catch(error){
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}
export const readAllNotification = async(req: Request, res: Response)=> {
    try{
        // PATCH /notifications/read-all

    }catch(error){
        return res.status(500).json({
            message: 'something went wrong'
        })
    }
}