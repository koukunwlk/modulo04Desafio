const {Pool} = require('pg')

module.exports = new Pool({
    user: "postgres",
    password: "12091997",
    database: "classroom",
    host: "localhost",
    port: 5432
})