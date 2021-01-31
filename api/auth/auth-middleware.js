const Owner = require("../owners/owners-model");

module.exports = {
    checkRegisterRequest,
    checkLoginRequest,
    checkUniqueUsername,
    checkUsernameExists
};

function checkRegisterRequest(req, res, next) {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({ message: "Username and password are required to register" });
    } else {
        next();
    }
}

function checkLoginRequest(req, res, next) {
    let { username, password } = req.body;
    if (!username || !password) {
        res.status(401).json({ message: "Username and password are required for login" });
    } else {
        next();
    }
}

function checkUniqueUsername(req, res, next) {
    let { username } = req.body;
    Owner.getBy({ username: username })
        .then(rows => {
            if (!rows.length) {
                next();
            } else {
                res.status(400).json({ message: "Username is not unique, please choose a different username" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}

function checkUsernameExists(req, res, next) {
    let { username } = req.body;
    Owner.getBy({ username: username })
        .then(rows => {
            if (rows.length) {
                req.ownerData = rows[0];
                next();
            } else {
                res.status(400).json({ message: "Username does not exist" });
            }
        })
        .catch(err => {
            res.status(500).json({ message: err.message });
        });
}