const express = require("express");
const helmet = require("helmet");
const cors = require("cors");

const server = express();

const authRouter = require("./auth/auth-router");
const ownerRouter = require("./owners/owners-router");
const itemRouter = require("./items/items-router");
const restricted = require("./auth/restricted");

server.use(express.json());
server.use(helmet());
server.use(cors());

server.use("/api/auth", authRouter);
server.use("/api/owners", restricted, ownerRouter);
server.use("/api/items", restricted, itemRouter);

server.get("/", (req, res) => {
    res.status(200).json({ message: "API is up and running" });
});

module.exports = server;