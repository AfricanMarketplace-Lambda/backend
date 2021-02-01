const router = require("express").Router();

const Owner = require("./owners-model");

const { validateOwnerId, validateOwner } = require("./owners-middleware");

router.get("/", (req, res, next) => {
    Owner.get()
        .then(owners => {
            res.status(200).json(owners);
        })
        .catch(next);
});

router.get("/:id", validateOwnerId, (req, res) => {
    res.status(200).json(req.owner);
});

router.put("/:id", validateOwnerId, validateOwner, (req, res, next) => {
    const { id } = req.params;
    const changes = req.body;
    Owner.update(id, changes)
        .then(updatedOwner => {
            res.status(200).json(updatedOwner);
        })
        .catch(next);
});

router.delete(":/id", validateOwnerId, (req, res, next) => {
    const { id } = req.params;
    Owner.remove(id)
        .then(() => {
            res.status(200).json({ message: "The owner has been deleted" });
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