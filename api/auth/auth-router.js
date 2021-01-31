const bcrypt = require("bcryptjs");
const router = require("express").Router();

const Owner = require("../owners/owners-model");

const {
    checkRegisterRequest,
    checkLoginRequest,
    checkUniqueUsername,
    checkUsernameExists
} = require("./auth-middleware");

router.post("/register", checkRegisterRequest, checkUniqueUsername, (req, res) => {
    const credentials = req.body;
    const rounds = process.env.BCRYPT_ROUNDS || 10;
    const hashed = bcrypt.hashSync(credentials.password, parseInt(rounds));

    credentials.password = hashed;

    Owner.insert(credentials)
        .then(owner => {
            res.status(201).json(owner);
        })
        .catch(err => {
            res.status(500).json({ message: "Something wrong happened!" });
        });
});