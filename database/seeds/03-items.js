exports.seed = function (knex) {
  return knex("items").insert([
    { name: "Polished Garnet", description: "Valuable handcrafted stone.", price: 25, category_id: 1 },
    { name: "Multitool", description: "Useful in various applications.", price: 45, category_id: 2 },
  ]);
};
