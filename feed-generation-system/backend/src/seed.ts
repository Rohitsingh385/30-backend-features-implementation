import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDB } from "./config/db.js";
import { User } from "./modules/auth/auth.model.js";
import { Post } from "./modules/posts/post.model.js";
import { Follow } from "./modules/follows/follow.model.js";
import { Like } from "./modules/like/like.model.js";

const PASSWORD = "11111111";

async function seed() {
    await connectDB();

    // clear existing data
    await Promise.all([
        User.deleteMany(),
        Post.deleteMany(),
        Follow.deleteMany(),
        Like.deleteMany(),
    ]);
    console.log("Cleared existing data");

    // create 15 users
    const hashedPassword = await bcrypt.hash(PASSWORD, 10);
    const users = await User.insertMany(
        Array.from({ length: 15 }, () => ({
            username: faker.internet.username(),
            email: faker.internet.email(),
            password: hashedPassword,
        }))
    );
    console.log(`Created ${users.length} users`);

    // create 3-5 posts per user
    const posts = await Post.insertMany(
        users.flatMap((user) =>
            Array.from({ length: faker.number.int({ min: 3, max: 5 }) }, () => ({
                author: user._id,
                content: faker.lorem.sentences({ min: 1, max: 3 }),
                likesCount: 0,
                commentsCount: 0,
            }))
        )
    );
    console.log(`Created ${posts.length} posts`);

    // each user follows 3-6 random other users
    const followDocs: { followerId: mongoose.Types.ObjectId; followingId: mongoose.Types.ObjectId }[] = [];
    const followSet = new Set<string>();

    for (const user of users) {
        const others = users.filter((u) => !u._id.equals(user._id));
        const targets = faker.helpers.arrayElements(others, faker.number.int({ min: 3, max: 6 }));
        for (const target of targets) {
            const key = `${user._id}-${target._id}`;
            if (!followSet.has(key)) {
                followSet.add(key);
                followDocs.push({ followerId: user._id, followingId: target._id });
            }
        }
    }
    await Follow.insertMany(followDocs);
    console.log(`Created ${followDocs.length} follows`);

    // each user likes 5-10 random posts
    const likeDocs: { userId: mongoose.Types.ObjectId; postId: mongoose.Types.ObjectId }[] = [];
    const likeSet = new Set<string>();

    for (const user of users) {
        const targets = faker.helpers.arrayElements(posts, faker.number.int({ min: 5, max: 10 }));
        for (const post of targets) {
            const key = `${user._id}-${post._id}`;
            if (!likeSet.has(key)) {
                likeSet.add(key);
                likeDocs.push({ userId: user._id, postId: post._id });
            }
        }
    }
    await Like.insertMany(likeDocs);

    // update likesCount on posts
    for (const like of likeDocs) {
        await Post.findByIdAndUpdate(like.postId, { $inc: { likesCount: 1 } });
    }
    console.log(`Created ${likeDocs.length} likes`);

    console.log("\nDone! All user passwords are: 11111111");
    console.log("Sample user:", users[0].email);
    await mongoose.disconnect();
}

seed().catch((err) => {
    console.error(err);
    process.exit(1);
});
