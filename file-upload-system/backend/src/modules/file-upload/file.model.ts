import mongoose, {Schema} from "mongoose";

export enum StorageProvider {
    CLOUDINARY =   "cloudinary"
}

const fileSchema = new Schema (
    {
        ownerId: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true,
            index: true 
        },
        originalName: {
            type: String,
            required: true,
            trim: true
        },
        publicId: {
            type: String,
            required: true,
            unique: true
        },
        url : {
            type: String,
            required: true 
        },
        mimeType: {
            type:String,
            required: true 
        },
        size: {
            type: Number,
            required: true 
        },
        resourceType: {
            type: String,
            required: true 
        },
        storageProvider:{
            type: String,
            enum:  Object.values(StorageProvider),
            default: StorageProvider.CLOUDINARY
        }
    },
    {
        timestamps: true
    }
)

export const File = mongoose.model("File", fileSchema)