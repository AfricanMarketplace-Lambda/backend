exports.seed = function (knex) {
  return knex("categories").insert([
    { category: "Home Improvement" },
    { category: "Decorations" },
  ]);
};