const express = require("express")
const db  = require("./database.js")
const path = require("path")
const app = express();

app.use(express.json())
app.use(express.static("public"))

app.listen(8080, () =>{
	console.log('Server is listening on port 8080');
});

//Get All Tasks
app.get('/task', db.getTasks)

//Get Task By Id
app.get('/task/:id', async (req, res) => {
	const id = req.params.id;
	const results = await db.getTaskById(id);
	res.json(results.rows)
});

//Create Task
app.post('/createTask', async (req, res) => {
	const { task } = req.body;
	const result = await db.createTask(task);
	res.send(result.rows)
})

//Update Task
app.put('/updateTask', async (req, res) => {
	console.log(req.body)
	const result = await db.updateTaskById(req.body.id, req.body.status, req.body.updated_date);
	res.send(result.rows)
})

//Delete Task
app.delete('/deleteTask', async(req, res) => {
	const result = await db.deleteTaskById(req.body.id);
	res.send(result.rows)
})

//create User
app.post('/register', async(req, res) => {
	const user = await db.createUser(req.body.first_name, req.body.last_name, req.body.username, req.body.password, req.body.email)
	res.send(user.rows)
})

//Get All Users
app.get('/users', async(req, res) => {
	const users = await db.getUsers()
	res.send(users.rows)
})

app.get('/user/:id', async(req, res) => {
	const user = await db.getUserById(req.params.id)
	if (user.rows){
		res.send(user.rows)
	}else{
		res.send(user)
	}
})

//Get All Status
app.get('/status', db.getAllStatus)

//Get Status By Id
app.get('/statbyid/:id', db.getOneStatus)

//Render Files
app.get('/', (req, res) => {
	res.sendFile("/home/sunil/Javascript/todoapp/public/todo.html")
})

