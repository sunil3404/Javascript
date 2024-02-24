const express = require("express")
const db  = require("./database.js")
const bodyParser = require('body-parser');



// const path = require("path")
const app = express();

app.use(express.json())
app.use(express.static("public"))
app.use(bodyParser.urlencoded({ extended: true })); 

app.listen(8080, () =>{
	console.log('Server is listening on port 8080');
});

app.post('/user', async (req, res) => {
	
	console.log(req.body)
	const result = await db.getUser(req.body.username, req.body.password);
	if (result == "true"){
		res.send({"status" : "Success", "redirect" : "/register"})
		// res.redirect("/register")
	}
	res.send({"status" : "Failed", "message": "Invalid Username or Password"})
})


app.get('/', (req, res) => {
	res.sendFile("/home/sunil/Javascript/jiraapp/public/index.html")
})


app.get('/login', (req, res) => {
	res.sendFile("/home/sunil/Javascript/jiraapp/public/login.html")
})


app.get('/register', (req, res) => {
	res.sendFile("/home/sunil/Javascript/jiraapp/public/register.html")
})