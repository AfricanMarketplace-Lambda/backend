const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { jwtSecret } = require("../../config/secrets");
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

router.post("/login", checkLoginRequest, checkUsernameExists, (req, res) => {
    const { password } = req.body;
    try {
        const verifyUser = bcrypt.compareSync(password, req.ownerData.password);
        if (verifyUser) {
            const token = generateToken(req.ownerData);
            res.status(200).json({
                message: "Welcome to our API " + req.ownerData.username,
                token
            });
        } else {
            res.status(401).json({ message: "You are not allowed in here!" });
        }
    } catch (error) {
        res.status(500).json({ message: "Something wrong happened!" });
    }
});

function generateToken(owner) {
    const payload = {
        subject: owner.id,
        username: owner.username
    }
    const options = {
        expiresIn: "1d"
    }

    return jwt.sign(payload, jwtSecret, options);
}

module.exports = router;