const express = require("express")
const db  = require("./database.js")
const path = require("path")
const app = express();
const bcrypt =  require("bcrypt")
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();
console.log(process.env.JWT_SECRET_KEY)
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
	const result = await db.createTask(task, req.body.userid);
	console.log(result.rows)
	res.send(result.rows)
})

//Update Task
app.put('/updateTask', async (req, res) => {
	console.log(req.body)
	const result = await db.updateTaskById(req.body.id, req.body.status_id, req.body.updated_date);
	res.send(result.rows)
})

//Delete Task
app.delete('/deleteTask', async(req, res) => {
	console.log(req.body)
	const result = await db.deleteTaskById(req.body.id);
	res.send(result.rows)
})

//create User
app.post('/register', async(req, res) => {
	const user = await db.createUser(req.body.first_name, req.body.last_name, req.body.email,
									 req.body.username, req.body.password1)
	res.send(user)
})

app.post('/login', async(req, res) => {
	const stat = await db.login(req.body.username, req.body.password)
	if(stat.message == true){
		res.cookie('userid', stat.user_id)
		res.send(stat)
	}else{
		res.send(stat)
	}
})

//Get All Users
app.get('/users', async(req, res) => {
	const users = await db.getUsers()
	console.log(users.rows)
	res.send(users.rows)
})

//Get User by username
app.post('/username/', async(req, res) => {
	const user = await db.getUserByUsername(req.body.username, req.body.password)
	if (user.rows){
		res.send(true)
	}else {
		res.send(false)
	}
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

// Render Files
app.get('/todo', (req, res) => {
	res.sendFile("/home/sunil/Javascript/todoapp/public/todo.html")
})

app.get('/register', (req, res) => {
	res.sendFile("/home/sunil/Javascript/todoapp/public/register.html")
})

app.get('/login', (req, res) => {
	res.sendFile("/home/sunil/Javascript/todoapp/public/login.html")
})
