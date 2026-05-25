import mongoose from 'mongoose'
import {faker} from "@faker-js/faker"

import {env} from "../config/env.js"

import {User} from "../features/users/user.model.js"

const seedUsers = async()=>{

    try{
        await mongoose.connect(env.MONGO_URI)
        console.log('db connected');
        
        await User.deleteMany({});
        const users = [];

        for(let i =0; i< 1000; i++){
            users.push({
                name: faker.person.fullName(),
                username: faker.internet.username().toLowerCase(),
                email: faker.internet.email().toLowerCase(),
                bio: faker.lorem.sentence()
            })
        }

        await User.insertMany(users)
        console.log("users seeded")
        process.exit(0);
    }catch(err){
        console.error(err)
        process.exit(1);
    }
}

seedUsers()