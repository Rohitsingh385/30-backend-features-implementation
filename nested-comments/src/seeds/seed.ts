import { faker } from "@faker-js/faker"

import { connectDB } from "../config/db.js"
import { commentModel } from "../features/comment.model.js";
import { userModel } from "../features/user.model.js";
import postModel from "../features/post.model.js";

const seedData = async () => {
    try {
        await connectDB();

        await userModel.deleteMany();
        await postModel.deleteMany();
        await commentModel.deleteMany();

        console.log('deletion done')

        let users = []
        let posts = []
        let comments = []
        const replies = []

        for (let i = 0; i < 5; i++) {
            users.push({
                firstname: faker.person.firstName(),
                lastname: faker.person.lastName(),
                email: faker.internet.email()
            })
        }

        const createdUsers = await userModel.insertMany(users)
        console.log('users inserted')



        for (let i = 0; i < 10; i++) {
            const randomUser = createdUsers[
                Math.floor(Math.random() * createdUsers.length)
            ]
            posts.push({
                title: faker.lorem.sentence(),
                author: randomUser._id
            })
        }
        const createdPosts = await postModel.insertMany(posts)
        console.log('posts inserted')





        for (let i = 0; i < 20; i++) {
            const randomUser = createdUsers[
                Math.floor(Math.random() * createdUsers.length)
            ]
            const randomPost = createdPosts[
                Math.floor(Math.random() * createdPosts.length)
            ]

            comments.push({
                content: faker.lorem.sentence(),

                author: randomUser._id,

                postId: randomPost._id,

                parentComment: null
            })
        }

        const createdComments = await commentModel.insertMany(comments)

        for(let i =0; i<10; i++){
            const randomUser = createdUsers[
                Math.floor(Math.random()* createdUsers.length)
            ]
            const randomParentComment = createdComments[
                Math.floor(Math.random() * createdComments.length)
            ]

            replies.push({
                content: faker.lorem.sentence(),
                author: randomUser?._id,
                postId: randomParentComment.postId,

                parentComment: randomParentComment._id 
            })
        }
        await commentModel.insertMany(replies)
    } catch (err) {
        console.error(err)
    }
}

seedData()