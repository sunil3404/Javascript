const {client} = require('./connect.js')


async function getUser(username, password){
	try{
		const result = await client.query(`select username from dev.employees where username=$1 and password=$2`, [username, password])
		if(result.rows.length > 0 ){
			return "true"
		}
		return {"detail" : `Invalid username or password`}
		
	}catch(err){
		message = `Some thing went wrong ${err}`
		console.log(message)
	}
}

module.exports = {getUser}