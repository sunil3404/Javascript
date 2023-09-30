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
		return getTaskById(id)
	}catch(ex){
		console.log(`Something went wrong ${ex}`)
	}

}

async function getTasks(req, res){
	const task = await pgclient.query(`select * from dev.todotask`)
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

async function getOneStatus(req, res){
	const statid = req.params.id
	try{
		const result = await pgclient.query(`Select * from dev.todostatus where id=${statid}`)
		res.send(result.rows)
	}catch(ex) {
		console.log(`Somethng went wrong ${ex}`)
	}
}

module.exports = {getAllStatus, getOneStatus, getTasks, getTaskById, createTask}
