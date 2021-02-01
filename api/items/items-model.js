const db = require("../../database/dbConfig");

module.exports = {
    get,
    getBy,
    getById,
    insert,
    update,
    remove
};

function get() {
    return db("items").orderBy("id");
}

function getBy(params) {
    return db("items").where(params).orderBy("id");
}

function getById(id) {
    return db("items").where("id", id).first();
}

async function insert(item) {
    const [id] = await db("items").insert(item, "id");
    return getById(id);
}

async function update(id, changes) {
    await db("items").where("id", id).update(changes);
    return getById(id);
}

function remove(id) {
    return db("items").where("id", id).del();
}