const {Client} = require('pg')


const client = new Client({

		"user" : "postgres",
		"password": "postgres",
		"host" : "localhost",
		"port" : 5432,
		"database" : "jiraapp"
})


client.connect()
module.exports = {client}


