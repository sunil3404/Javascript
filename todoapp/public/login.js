// Login User

document.getElementById("register-id").addEventListener("click", function(){
	window.location.replace("http://127.0.0.1:8080/register")

})

document.getElementById("login-id").addEventListener("click", function(){

	const username = document.getElementsByClassName("username")[0].value
	const password = document.getElementsByClassName("password")[0].value
	console.log(username)
	fetch("http://127.0.0.1:8080/login/" , {
		"method" : "POST",
		"body"   : JSON.stringify({"username" : username, "password" : password}),
		"headers": {
    		"Content-type": "application/json; charset=UTF-8"
  		}
	})
	.then(response => response.json())
	.then((stat) => loginUser(stat))

	function loginUser(stat){
		console.log(stat)
		if (stat.message == true){
			window.location.replace("http://127.0.0.1:8080/todo");
		}else {
			alert(stat.message)
		}
	}
});
