exports.up = function (knex) {
    return knex.schema
        .createTable("owners", table => {
            table.increments();
            table.string("username", 128).notNullable().unique();
            table.string("password", 128).notNullable();
        })
        .createTable("items", table => {
            table.increments();
            table.string("name", 128).notNullable();
            table.string("description", 256).notNullable();
            table.integer("price").notNullable().unsigned();
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("items")
        .dropTableIfExists("owners");
};
