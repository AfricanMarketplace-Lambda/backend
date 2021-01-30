exports.seed = function (knex) {
  return knex("items").insert([
    { name: "Polished Garnet", description: "Valuable handcrafted stone.", price: 25 },
    { name: "Multitool", description: "Useful in various applications.", price: 45 }
  ]);
};
