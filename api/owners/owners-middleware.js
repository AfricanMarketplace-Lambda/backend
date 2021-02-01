const Owner = require("./owners-model");

module.exports = {
    validateOwnerId,
    validateOwner
};

function validateOwnerId(req, res, next) {
    const { id } = req.params;
    Owner.findById(id)
        .then(owner => {
            if (!owner) {
                res.status(404).json({ message: `Owner with id ${id} not found` });
            } else {
                req.owner = owner;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving the owner" });
        });
}

function validateOwner(req, res, next) {
    const { username, password } = req.body;

    if (!req.body) {
        res.status(400).json({ message: "Missing owner data" });
    } else if (!username) {
        res.status(400).json({ message: "Missing username data" });
    } else if (!password) {
        res.status(400).json({ message: "Missing password data" });
    } else {
        next();
    }
}