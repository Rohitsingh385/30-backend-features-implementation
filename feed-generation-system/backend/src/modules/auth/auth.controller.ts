import { asyncHandler } from "../../utils/asyncHandler.js";
import { sendResponse } from "../../utils/sendResponse.js";
import { registerUser, loginUser } from "./auth.service.js";
export const register = asyncHandler(async (req, res)=> {
    const user = await registerUser(req.body);

    sendResponse(res, {
        statusCode: 201,
        success: true,
        message: "User registered successfully",
        data: user
    })
})
export const login = asyncHandler(async(req,res)=> {
    const user = await loginUser(req.body)

    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'user logged In',
        data: user
    })
})

export const getMe = asyncHandler(async(requestAnimationFrame,res)=> {
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: "Current user fetched succesfully",
        data: requestAnimationFrame.user
    })
})