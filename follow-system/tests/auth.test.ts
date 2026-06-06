import { describe, it, expect, beforeAll, afterAll, beforeEach } from "vitest";
import request from "supertest";
import app from "../src/app.js";
import { setup, teardown, clearDB } from "./setup.js";

beforeAll(setup);
afterAll(teardown);
beforeEach(clearDB);

const validUser = {
    name: "Alice",
    email: "alice@test.com",
    password: "pass1234",
};

describe("POST /api/v1/signup", () => {
    it("registers a new user and returns a token", async () => {
        const res = await request(app).post("/api/v1/signup").send(validUser);

        expect(res.status).toBe(201);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe(validUser.email);
        expect(res.body.user.password).toBeUndefined();
    });

    it("returns 409 when email already exists", async () => {
        await request(app).post("/api/v1/signup").send(validUser);
        const res = await request(app).post("/api/v1/signup").send(validUser);

        expect(res.status).toBe(409);
        expect(res.body.message).toMatch(/already exists/i);
    });

    it("returns 400 when name is too short (< 3 chars)", async () => {
        const res = await request(app)
            .post("/api/v1/signup")
            .send({ ...validUser, name: "AB" });

        expect(res.status).toBe(400);
    });

    it("returns 400 when password is too short (< 6 chars)", async () => {
        const res = await request(app)
            .post("/api/v1/signup")
            .send({ ...validUser, password: "abc" });

        expect(res.status).toBe(400);
    });

    it("returns 400 when email format is invalid", async () => {
        const res = await request(app)
            .post("/api/v1/signup")
            .send({ ...validUser, email: "not-an-email" });

        expect(res.status).toBe(400);
    });

    it("returns 400 when required fields are missing", async () => {
        const res = await request(app).post("/api/v1/signup").send({});

        expect(res.status).toBe(400);
    });

    it("stores email in lowercase regardless of input casing", async () => {
        const res = await request(app)
            .post("/api/v1/signup")
            .send({ ...validUser, email: "ALICE@TEST.COM" });

        expect(res.status).toBe(201);
        expect(res.body.user.email).toBe("alice@test.com");
    });

    it("does not expose password in the response", async () => {
        const res = await request(app).post("/api/v1/signup").send(validUser);

        expect(res.body.user).not.toHaveProperty("password");
    });
});

describe("POST /api/v1/signin", () => {
    beforeEach(async () => {
        await request(app).post("/api/v1/signup").send(validUser);
    });

    it("signs in with correct credentials and returns a token", async () => {
        const res = await request(app)
            .post("/api/v1/signin")
            .send({ email: validUser.email, password: validUser.password });

        expect(res.status).toBe(200);
        expect(res.body.token).toBeDefined();
        expect(res.body.user.email).toBe(validUser.email);
    });

    it("returns 401 with wrong password", async () => {
        const res = await request(app)
            .post("/api/v1/signin")
            .send({ email: validUser.email, password: "wrongpass" });

        expect(res.status).toBe(401);
        expect(res.body.message).toMatch(/invalid credentials/i);
    });

    it("returns 401 when user does not exist", async () => {
        const res = await request(app)
            .post("/api/v1/signin")
            .send({ email: "ghost@test.com", password: "pass1234" });

        expect(res.status).toBe(401);
    });

    it("is case-insensitive for email on signin", async () => {
        const res = await request(app)
            .post("/api/v1/signin")
            .send({ email: "ALICE@TEST.COM", password: validUser.password });

        expect(res.status).toBe(200);
    });

    it("does not expose password in the response", async () => {
        const res = await request(app)
            .post("/api/v1/signin")
            .send({ email: validUser.email, password: validUser.password });

        expect(res.body.user).not.toHaveProperty("password");
    });

    it("returns 400 when email field is missing", async () => {
        const res = await request(app)
            .post("/api/v1/signin")
            .send({ password: "pass1234" });

        expect(res.status).toBe(400);
    });
});
