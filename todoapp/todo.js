const {Client} = require('pg')
const client = new Client({
	user : "postgres",
	password : "postgres",
	host: "localhost",
	port: 5432,
	database: "todoapp"
})

/*client.connect()
.then(() => console.log("Connected Succesfully"))
.then(() => client.query("select * from dev.todostatus"))
.then(results => console.table(results.rows))
.finally(() => client.end())*/

test()
async function execute(query){
	try {
		await client.connect()
		console.log("connected succesfully");
		const results = await client.query(query)
		console.log(results.rows)
	 	return (results.rows[0])
	}
	catch(ex){
		console.log(`Something wrong happened ${ex}`)
	}
	finally {
		await client.end()
		console.log("Client disconnected succesfully");
	}
}

async function test(){
	const results = execute("select * from dev.todostatus where id='1'")
	console.log(results.rows)
}

