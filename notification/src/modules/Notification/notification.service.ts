import { Notification } from "./notification.model.js";
export async function createNotification(recipientId : string, actorId: string, type: string, entityId: string){
    if(recipientId.toString() === actorId.toString()){
        return;
    }

    await Notification.create({
        recipientId,
        actorId,
        type,
        entityId
    })
    
}