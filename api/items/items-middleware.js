const Item = require("./items-model");

module.exports = {
    validateItemId,
    validateItem
};

function validateItemId(req, res, next) {
    const { id } = req.params;
    Item.getById(id)
        .then(item => {
            if (!item) {
                res.status(404).json({ message: `Item with id ${id} not found` });
            } else {
                req.item = item;
                next();
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Error retrieving the item" });
        });
}

function validateItem(req, res, next) {
    const { name, description, price } = req.body;

    if (!req.body) {
        res.status(400).json({ message: "Missing item data" });
    } else if (!name) {
        res.status(400).json({ message: "Missing name" });
    } else if (!description) {
        res.status(400).json({ message: "Missing description" });
    } else if (!price) {
        res.status(400).json({ message: "Missing price" });
    } else {
        next();
    }
}