import { faker } from "@faker-js/faker";

import { connectDB } from "../config/db.js";
import postModel from "../features/post.model.js"

const seedData = async()=> {
    try{
        await connectDB()

        console.log('db connected')

        await postModel.deleteMany({});
         console.log("Old posts deleted");

        const posts= []

        for(let i =0; i<50; i++){
            posts.push({
                title: faker.lorem.sentence(7),
                content: faker.lorem.paragraph(50),
                author: {
                    name: faker.person.fullName(),
                    email: faker.internet.email(),
                },
            })
        }

        await postModel.insertMany(posts)
        console.log('Post seeded succefully')
        process.exit(0)
    }catch(error){
        console.log(error)
        process.exit(1)
    }
}
seedData()