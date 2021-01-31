const pg = require("pg");
const { PGUSER, PGPASSWORD } = require("./config/secrets");

const localConnection = `postgresql://${PGUSER}:${PGPASSWORD}@localhost/bw_db`;

let connection;

if (process.env.DATABASE_URL) {
  pg.defaults.ssl = { rejectUnauthorized: false };
  connection = process.env.DATABASE_URL;
} else {
  connection = localConnection;
}

const sharedConfig = {
  client: "pg",
  connection,
  migrations: { directory: "./database/migrations" },
  seeds: { directory: "./database/seeds" }
};

module.exports = {
  development: { ...sharedConfig },
  production: {
    ...sharedConfig,
    pool: { min: 2, max: 10 }
  }

};
