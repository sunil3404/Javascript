const {pgclient} = require('./pgconnect.js')

//Users Creation DB queries
async function createUser(first_name, last_name, username, password, email){
	try{
		const result = await pgclient.query(`Insert into dev.user (first_name, last_name, username, password, email) 
			values($1, $2, $3, $4, $5) RETURNING ID, USERNAME`, [first_name, last_name, username, password, email])
		console.log(result.rows)
		return result
	}catch(err){
		message = `Some thing went wrong ${err}`
		console.log(message)
	}

}

async function getUsers(req, res){
	try{
		const result = await pgclient.query(`select id, username, email from dev.user`)
		console.log(result.rows)
		return result
	}catch(err){
		message = `Some thing went wrong ${err}`
		console.log(message)
	}
}

async function getUserById(id) {
	// body...
	try{
		const result = await pgclient.query(`select username, email from dev.user where id=$1`, [id])
		console.log(result.rows.length)
		if (result.rows.length == 0){
			console.log("Inside if in userById");
			return {"Message" : `No User found with id -> ${id}`}
		}
		return result
	}catch(err){
		message = `Some thing went wrong ${err}`
		console.log(message)
	}
}

async function getAllStatus(req , res){
	query = "Select * from dev.todostatus"
	try{
		const result = await pgclient.query(query)
		res.json(result.rows)
	}catch(ex) {
		console.log(`Somethng went wrong ${ex}`)
	}
}

async function createTask(taskname) {
	try{
		const result = await pgclient.query(`insert into dev.todotask (task) values($1) RETURNING ID`, [taskname])
		const id  = result.rows[0].id
		console.log(result.rows)
		return getTaskById(id)
	}catch(ex){
		console.log(`Something went wrong ${ex}`)
	}

}

async function updateTaskById(id, stat, updated_date){
	try{
		console.log(updated_date)
		const result = await pgclient.query(`update dev.todotask set status=$1, updated_date=$2 where id=$3 RETURNING ID, STATUS, UPDATED_DATE`, [stat, updated_date, id])
		await pgclient.query('COMMIT')
		return getTaskById(id)
	}catch(ex){
		await pgclient.query("ROLLBACK");
		console.log(`Something went wrong ${ex}1`)
	}
}

async function getTasks(req, res){
	const task = await pgclient.query(`select * from dev.todotask order by id asc`)
	res.send(task.rows)
}

async function getTaskById(id){
	try {
		const task = await pgclient.query(`select * from dev.todotask where id=$1`,[id])
		return task
	}catch(ex){
		console.log(`Something went wrong in here ${ex}`)
	}
}

async function deleteTaskById(id){
	try {
		const task = await pgclient.query(`DELETE from dev.todotask where id=$1 RETURNING ID, STATUS`,[id])
		console.log (`SuccessFully Delted Task with Id : ${id}`)
		return task
	}catch(ex){
		console.log(`Something went wrong in here ${ex}`)
	}
}

async function getOneStatus(req, res){
	const statid = req.params.id
	try{
		const result = await pgclient.query(`Select * from dev.todostatus where id=${statid}`)
		res.send(result.rows)
	}catch(ex) {
		console.log(`Somethng went wrong ${ex}`)
	}
}

module.exports = {getAllStatus, getOneStatus, getTasks, getTaskById, createTask, updateTaskById, deleteTaskById, createUser, getUserById, getUsers}
