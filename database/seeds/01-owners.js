exports.seed = function (knex) {
  return knex("owners").insert([
    { username: "johndoe", password: "1234" },
    { username: "janedoe", password: "1234" }
  ]);
};
