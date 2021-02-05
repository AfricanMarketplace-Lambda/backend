test("sanity", () => {
    expect(true).toBe(true);
});

const request = require("supertest");
const server = require("./server");
const db = require("../database/dbConfig");

const testOwner1 = {
    username: "testOwner1",
    password: "password1"
};
const testOwner2 = {
    username: "testOwner2",
    password: "password2"
};

const testItem1 = { name: "testItem1", description: "description1", price: 1 };
const testItem2 = { name: "testItem2", description: "description2", price: 2 };

beforeAll(async () => {
    await db.migrate.rollback();
    await db.migrate.latest();
});

beforeEach(async () => {
    await db("owners").truncate();
    await db("items").truncate();
});

afterAll(async () => {
    await db.destroy();
});

describe("server", () => {
    describe("[POST] /api/auth/register", () => {
        it("responds with 201 Created", async () => {
            const res = await request(server).post("/api/auth/register").send(testOwner1);
            expect(res.status).toBe(201);
        });
        it("responds with the newly created user", async () => {
            let res;
            res = await request(server).post("/api/auth/register").send(testOwner1);
            expect(res.body.username).toBe("testOwner1");

            res = await request(server).post("/api/auth/register").send(testOwner2);
            expect(res.body.username).toBe("testOwner2");
        });
    });
    describe("[POST] /api/auth/login", () => {
        it("responds with 200 OK", async () => {
            await request(server).post("/api/auth/register").send(testOwner1);
            const res = await request(server).post("/api/auth/login").send(testOwner1);
            expect(res.status).toBe(200);
        });
        it("responds with a message welcoming the logged in user", async () => {
            let res;
            await request(server).post("/api/auth/register").send(testOwner1);
            await request(server).post("/api/auth/register").send(testOwner2);
            res = await request(server).post("/api/auth/login").send(testOwner1);
            expect(res.body.message).toBe("Welcome to our API " + testOwner1);

            res = await request(server).post("/api/auth/login").send(testOwner2);
            expect(res.body.message).toBe("Welcome to our API " + testOwner2);
        });
    });
    describe("[GET] /api/items", () => {
        it("responds with 200 OK", async () => {
            let res;
            await request(server).post("/api/auth/register").send(testOwner1);
            res = await request(server).post("/api/auth/login").send(testOwner1);
            const token = res.body.token;
            res = await request(server).get("/api/items").set("Authorization", token);
            expect(res.status).toBe(200);
        });
        it("responds with the correct number of items", async () => {
            let res;
            await request(server).post("/api/auth/register").send(testOwner1);
            res = await request(server).post("/api/auth/login").send(testOwner1);
            const token = res.body.token;
            res = await request(server).get("/api/items").set("Authorization", token);
            expect(res.body).toHaveLength(2);
        });
    });
    describe("[GET] /api/owners", () => {
        it("responds with 200 OK", async () => {
            let res;
            await request(server).post("/api/auth/register").send(testOwner1);
            res = await request(server).post("/api/auth/login").send(testOwner1);
            const token = res.body.token;
            res = await request(server).get("/api/owners").set("Authorization", token);
            expect(res.status).toBe(200);
        });
        it("responds with the correct number of owners", async () => {
            let res;
            await request(server).post("/api/auth/register").send(testOwner1);
            res = await request(server).post("/api/auth/login").send(testOwner1);
            const token = res.body.token;
            res = await request(server).get("/api/owners").set("Authorization", token);
            expect(res.body).toHaveLength(1);
        });
    });
});