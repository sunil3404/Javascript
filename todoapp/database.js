const {pgclient} = require('./pgconnect.js')

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

module.exports = {getAllStatus, getOneStatus, getTasks, getTaskById, createTask, updateTaskById, deleteTaskById}
