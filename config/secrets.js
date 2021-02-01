const jwtSecret = process.env.JWT_SECRET || "don't let anyone know about this";
const PGUSER = "postgres";
const PGPASSWORD = "1234";

module.exports = {
    jwtSecret,
    PGUSER,
    PGPASSWORD
};