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

//Get All Status
app.get('/status', db.getAllStatus)

//Get Status By Id
app.get('/statbyid/:id', db.getOneStatus)

//Render Files
app.get('/', (req, res) => {
	res.sendFile("/home/sunil/Javascript/todoapp/public/todo.html")
})

