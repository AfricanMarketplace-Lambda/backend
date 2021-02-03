const router = require("express").Router();

const Item = require("./items-model");

const { validateItemId, validateItem } = require("./items-middleware");

router.get("/", (req, res, next) => {
    Item.get()
        .then(items => {
            res.status(200).json(items);
        })
        .catch(next);
});

router.get("/:id", validateItemId, (req, res) => {
    res.status(200).json(req.item);
});

router.post("/", validateItem, (req, res, next) => {
    Item.insert(req.body)
        .then(newItem => {
            res.status(201).json(newItem);
        })
        .catch(next);
});

router.put("/:id", validateItemId, validateItem, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    Item.update(id, changes)
        .then(updatedItem => {
            res.status(200).json(updatedItem);
        })
        .catch(next);
});

router.delete(":/id", validateItemId, (req, res, next) => {
    const { id } = req.params;
    Item.remove(id)
        .then(() => {
            res.status(200).json({ message: "The item has been deleted" });
        })
        .catch(next);
});

router.use((err, req, res, next) => {
    const env = process.env.NODE_ENV || "development";
    const message = env === "development"
        ? err.message
        : "Something went wrong!";
    res.status(500).json({ message: message });
});

module.exports = router;