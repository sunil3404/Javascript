document.getElementById("signin-id").addEventListener("click", function(){
	window.location.replace("http://127.0.0.1:8080/");
})


function getFormInformation(){
	const firstname =  document.getElementsByClassName("first-name")[0].value;
	const lastname  =  document.getElementsByClassName("last-name")[0].value;
	const email     =  document.getElementsByClassName("email")[0].value
	const username  =  document.getElementsByClassName("username")[0].value
	const password1 =  document.getElementsByClassName("password1")[0].value
	const password2 =  document.getElementsByClassName("password2")[0].value


	const user_data = { 

			"firstname" : firstname, 
			"lastname" :  lastname, 
		    "email" : email,
		    "username" : username,
		    "password1" : password1,
		    "password2" : password2
		}

	return user_data
}

function passwordValidation(password1, password2){
	if (password1 == password2){
		return true
	}
	return false
}

function formValidation(user){
	let pattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[-+_!@#$%^&*.,?]).+$"); 

	if (user.password1 != user.password2){
		alert("password and confirm password must be same")
		return false
	}
	if(user.password1.length < 8) {
		alert("password must be atleast of 8 character")
		return false
	}
	if (!pattern.test(user.password1)){
		alert("password must contain atleast 1 special, 1 numerical and 1 uppercase")
		return false
	}
 	return true 

}

document.getElementById("register-id").addEventListener("click", function(){

	const user_data = getFormInformation();
	let flag = formValidation(user_data)
	if(flag) {

	fetch("http://127.0.0.1:8080/register/" , {
		"method" : "POST",
		"body"   : JSON.stringify({
					"first_name" : user_data.firstname,
					"last_name"  : user_data.lastname,
					"username" : user_data.username, 
					"password1" : user_data.password1,
					"email" : user_data.email
		}),
		"headers": {
    		"Content-type": "application/json; charset=UTF-8"
  		}
	})
	.then(response => response.json())
	.then((stat) => createUser(stat))
	}

})


function createUser(stat) {
	alert(stat.details)
	if (stat.details == true){
		window.location.replace("http://127.0.0.1:8080/login")
	}
	else{
		alert(stat.details)
	}

}
