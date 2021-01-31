exports.up = function (knex) {
    return knex.schema
        .createTable("owners", table => {
            table.increments();
            table.string("username", 128).notNullable().unique();
            table.string("password", 128).notNullable();
        })
        .createTable("categories", table => {
            table.increments();
            table.string("category", 128).notNullable().unique();
        })
        .createTable("items", table => {
            table.increments();
            table.string("name", 128).notNullable();
            table.string("description", 256).notNullable();
            table.integer("price").notNullable().unsigned();
            table.integer("category_id")
                .unsigned()
                .references("id")
                .inTable("categories")
                .onUpdate("CASCADE")
                .onDelete("CASCADE");
        });
};

exports.down = function (knex) {
    return knex.schema
        .dropTableIfExists("items")
        .dropTableIfExists("categories")
        .dropTableIfExists("owners");
};
