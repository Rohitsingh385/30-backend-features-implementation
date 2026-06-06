import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { setup, teardown, clearDB } from "./setup.js";

beforeAll(setup);
afterAll(teardown);
beforeEach(clearDB);

async function createUser(name: string, email: string) {
    const res = await request(app).post("/api/v1/signup").send({
        name,
        email,
        password: "pass1234",
    });
    return { token: res.body.token as string, id: res.body.user.id as string };
}

describe("POST /api/v1/users/:id/follow", () => {
    it("follows a user successfully", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        const res = await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(201);
    });

    it("returns 401 when no token is provided", async () => {
        const bob = await createUser("Bob", "bob@test.com");

        const res = await request(app).post(`/api/v1/users/${bob.id}/follow`);

        expect(res.status).toBe(401);
    });

    it("returns 400 when trying to follow yourself", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(400);
    });

    it("returns 404 when target user does not exist", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app)
            .post(`/api/v1/users/000000000000000000000001/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(404);
    });

    it("returns 409 when already following", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        const res = await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(409);
    });

    it("returns 400 for invalid ObjectId in route param", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app)
            .post(`/api/v1/users/not-valid-id/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(400);
    });
});

describe("DELETE /api/v1/users/:id/follow", () => {
    it("unfollows a user successfully", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        const res = await request(app)
            .delete(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(200);
    });

    it("returns 404 when trying to unfollow someone not followed", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        const res = await request(app)
            .delete(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(404);
    });

    it("returns 401 when no token is provided", async () => {
        const bob = await createUser("Bob", "bob@test.com");

        const res = await request(app).delete(`/api/v1/users/${bob.id}/follow`);

        expect(res.status).toBe(401);
    });

    it("returns 400 for invalid ObjectId", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app)
            .delete(`/api/v1/users/bad-id/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        expect(res.status).toBe(400);
    });
});

describe("GET /api/v1/users/:id/followers", () => {
    it("returns empty array when user has no followers", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app).get(`/api/v1/users/${alice.id}/followers`);

        expect(res.status).toBe(200);
        expect(res.body.followers ?? res.body.data).toHaveLength(0);
    });

    it("returns list of followers", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${bob.token}`);

        const res = await request(app).get(`/api/v1/users/${alice.id}/followers`);

        expect(res.status).toBe(200);
        const list = res.body.followers ?? res.body.data;
        expect(list).toHaveLength(1);
        expect(list[0].email).toBe("bob@test.com");
    });

    it("does not expose password in followers list", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${bob.token}`);

        const res = await request(app).get(`/api/v1/users/${alice.id}/followers`);

        const list = res.body.followers ?? res.body.data;
        expect(list[0]).not.toHaveProperty("password");
    });

    it("returns 404 for non-existent user", async () => {
        const res = await request(app).get(
            `/api/v1/users/000000000000000000000001/followers`
        );
        expect(res.status).toBe(404);
    });
});

describe("GET /api/v1/users/:id/following", () => {
    it("returns empty array when user follows nobody", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app).get(`/api/v1/users/${alice.id}/following`);

        expect(res.status).toBe(200);
        expect(res.body.following ?? res.body.data).toHaveLength(0);
    });

    it("returns list of users being followed", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        const res = await request(app).get(`/api/v1/users/${alice.id}/following`);

        expect(res.status).toBe(200);
        const list = res.body.following ?? res.body.data;
        expect(list).toHaveLength(1);
        expect(list[0].email).toBe("bob@test.com");
    });

    it("reflects an unfollow — removed user not in following list", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        await request(app)
            .delete(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        const res = await request(app).get(`/api/v1/users/${alice.id}/following`);

        const list = res.body.following ?? res.body.data;
        expect(list).toHaveLength(0);
    });
});

describe("GET /api/v1/users/:id/followers/count", () => {
    it("returns 0 when user has no followers", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app).get(
            `/api/v1/users/${alice.id}/followers/count`
        );

        expect(res.status).toBe(200);
        expect(res.body.count).toBe(0);
    });

    it("increments count after a follow", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${bob.token}`);

        const res = await request(app).get(
            `/api/v1/users/${alice.id}/followers/count`
        );

        expect(res.body.count).toBe(1);
    });

    it("decrements count after an unfollow", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");

        await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${bob.token}`);

        await request(app)
            .delete(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${bob.token}`);

        const res = await request(app).get(
            `/api/v1/users/${alice.id}/followers/count`
        );

        expect(res.body.count).toBe(0);
    });

    it("count matches the actual followers list length", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");
        const carol = await createUser("Carol", "carol@test.com");

        await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${bob.token}`);
        await request(app)
            .post(`/api/v1/users/${alice.id}/follow`)
            .set("Authorization", `Bearer ${carol.token}`);

        const listRes = await request(app).get(
            `/api/v1/users/${alice.id}/followers`
        );
        const countRes = await request(app).get(
            `/api/v1/users/${alice.id}/followers/count`
        );

        const list = listRes.body.followers ?? listRes.body.data;
        expect(countRes.body.count).toBe(list.length);
    });
});

describe("GET /api/v1/users/:id/following/count", () => {
    it("returns 0 when user follows nobody", async () => {
        const alice = await createUser("Alice", "alice@test.com");

        const res = await request(app).get(
            `/api/v1/users/${alice.id}/following/count`
        );

        expect(res.status).toBe(200);
        expect(res.body.count).toBe(0);
    });

    it("increments count after following multiple users", async () => {
        const alice = await createUser("Alice", "alice@test.com");
        const bob = await createUser("Bob", "bob@test.com");
        const carol = await createUser("Carol", "carol@test.com");

        await request(app)
            .post(`/api/v1/users/${bob.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);
        await request(app)
            .post(`/api/v1/users/${carol.id}/follow`)
            .set("Authorization", `Bearer ${alice.token}`);

        const res = await request(app).get(
            `/api/v1/users/${alice.id}/following/count`
        );

        expect(res.body.count).toBe(2);
    });
});
