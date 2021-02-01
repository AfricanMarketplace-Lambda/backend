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
    return db("owners").orderBy("id");
}

function getBy(params) {
    return db("owners").where(params).orderBy("id");
}

function getById(id) {
    return db("owners").where("id", id).first();
}

async function insert(owner) {
    const [id] = await db("owners").insert(owner, "id");
    return getById(id);
}

async function update(id, changes) {
    await db("owners").where("id", id).update(changes);
    return getById(id);
}

function remove(id) {
    return db("owners").where("id", id).del();
}