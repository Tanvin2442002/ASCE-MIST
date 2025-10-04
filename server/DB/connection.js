const postgres = require('postgres');

const connectionString = process.env.DATABASE_URL;
console.log("Connecting to database with URL:", connectionString);
const sql = postgres(connectionString);

module.exports = sql;