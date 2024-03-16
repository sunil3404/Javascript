const {pgclient} = require('./pgconnect.js')
const bct = require("bcrypt")

//Users Creation DB queries
async function createUser(first_name, last_name, email, username, password){
	try{
		const hashpassword = await bct.hash(password, 10)
		const user = await pgclient.query(`select username from dev.user where username=$1`, [username])
		const emailid = await pgclient.query(`select username from dev.user where email=$1`, [email])
		if (user.rows.length > 0) {
			return JSON.stringify({"details" : `User already exists with username -> ${username}`})
		}else if(emailid.rows.length > 0) {
			return JSON.stringify({"details" : `Email ${email} already exists`})
		}else{
			console.log("Inside Else Condition")
			const newuser = await pgclient.query(`Insert into dev.user (first_name, last_name, username, hashpassword, email) 
			values($1, $2, $3, $4, $5) RETURNING ID, USERNAME`, [first_name, last_name, username, hashpassword, email])
			return JSON.stringify({"details" : true})
		}
	}catch(err){
		message = `Some thing went wrong ${err}`
		console.log(message)
	}
}

async function getUsers(req, res){
	try{
		const result = await pgclient.query(`select id, username, email from dev.user`)
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

// async function getUserByUsername(username, password) {
// 	try {
// 		// const hasspassword
// 		// const match = bcrypt.compare()
// 		const result = await pgclient.query(`select username, id, email from dev.user where username=$1 and password=$2`, [username, password])
// 		console.log(result.rows)
// 		if (result.rows.length == 0){
// 			return {"Message" : `No User found with username -> ${username}`}
// 		}
// 		return result
// 	}catch(err){
// 		message = `Some thing went wrong ${err}`
// 		console.log(message)
// 	}
// }

async function login(username, password) {
	try {
		const result = await pgclient.query(`select id, hashpassword from dev.user where username=$1`, [username])
		if(result.rows.length > 0){
			const user = await bct.compare(password, result.rows[0]['hashpassword'])
			return {"message" : true, "user_id" : result.rows[0].id}
		}else{
			return {"message" : `No User found with username ${username}`}
		}
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

async function createTask(task, user_id) {
	let userid = await pgclient.query(`select id from dev.user where id=$1`, [user_id])
	try{
		const result = await pgclient.query(`insert into dev.todotask (task, user_id) values($1, $2) RETURNING ID`, [task, userid.rows[0].id])
		const id  = result.rows[0].id
		return getTaskById(id)
	}catch(ex){
		console.log(`Something went wrong ${ex}`)
	}
}

async function updateTaskById(id, stat, updated_date){

	try{
		console.log("Inside Update task")	
		const result = await pgclient.query(`update dev.todotask set status_id=$1, updated_date=$2 where id=$3 RETURNING ID, STATUS_ID, UPDATED_DATE`, [stat, updated_date, id])
		console.log(result.rows)
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
		const task = await pgclient.query(`DELETE from dev.todotask where id=$1 RETURNING ID, STATUS_ID`,[id])
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

module.exports = {getAllStatus, getOneStatus, getTasks, getTaskById, createTask, updateTaskById, deleteTaskById, createUser, getUserById, login, getUsers}
