const {Client} = require('pg')

const pgclient = new Client({

        user : "postgres",
        password : "postgres",
        host : "localhost",
        port : 5432,
        database: "todoapp"
})
pgclient.connect()
module.exports = {pgclient}

