import { ApiError } from "../../utils/ApiError.js"
import { User } from "./auth.model.js"
import { LoginInput, RegisterInput } from "./auth.validation.js"
import bcrypt from "bcrypt"
import { Follow } from "../follows/follow.model.js"
import { generateToken } from "../../utils/generateToken.js"
export const registerUser = async (data: RegisterInput) => {
    const existingUser = await User.findOne({
        email: data.email
    })
    if (existingUser) {
        throw new ApiError(
            409,
            "Email already exists"
        )
    }


    const hashedPassword = await bcrypt.hash(data.password, 10)

    const user = await User.create({
        ...data,
        password: hashedPassword
    })
    const { password, ...safeUser } = user.toObject();

    return safeUser

}

export const loginUser = async (data: LoginInput) => {
    const user = await User.findOne({
        email: data.email
    })

    if (!user) {
        throw new ApiError(
            401,
            'Invalid email or password'
        )
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password)
    if (!isValidPassword) {
        throw new ApiError(
            401,
            "Invalid email or password"
        )
    }
    const token = generateToken(user._id.toString())

    const { password, ...userWithoutPassword } = user.toObject()

    return {
        user: userWithoutPassword,
        token
    }
}
export const getUsers = async(currentUserId: string)=> {
    const users = await User.find({
        _id: {
            $ne: currentUserId
        }
    }).select("_id username")
    const userIds = users.map((user) => user._id)

    const followRelationships = await Follow.find({
        followerId: currentUserId,
        followingId: {
            $in: userIds
        }
    }).select("followingId")

    const followedUserIds = new Set(
        followRelationships.map(
            (relationship) => relationship.followingId.toString()
        )
    )

    const usersWithFollowStatus = users.map((user)=> ({
        ...user.toObject(),
        isFollowing: followedUserIds.has(
            user._id.toString()
        )
    }))

    return usersWithFollowStatus
}
