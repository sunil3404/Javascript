//Postgresql Connection
//3. Provide connection string for the postgreSQL client, port generally is default one i.e. 5432:
//4. Instantiate the client for postgres database:
//5. Connect to database by using following command:


/*var pg = require('pg');
#
#var connectionString = "postgres://postgres:postgres@127.0.0.1:5432/test123";
#var pgClient = new pg.Client(connectionString);
#console.log(pgClient)
#pgClient.connect();
#*/

//Actual Javascript code

var elements = document.querySelectorAll(".digits")
var disp = document.getElementsByClassName("display-container")[0]
var operators = ["(", ")", "/", "*", "+", "-"]

window.onload = () =>{
	document.getElementsByClassName("display-container")[0].style.boxShadow = "none"
	document.getElementsByClassName("numerical-container")[0].style.boxShadow = "none"
	document.getElementsByClassName("digits")[0].style.boxShadow = "none"
}

function switchOn(element){
	if(element.id == "off") {
		document.getElementById("off").innerHTML = "ON";
		document.getElementById("off").setAttribute("id", "on");
		document.getElementsByClassName("numerical-container")[0].style.border = "none";
		document.getElementsByClassName("numerical-container")[0].style.boxShadow = "none";
		document.getElementsByClassName("display-container")[0].style.border = "none"
		document.getElementsByClassName("display-container")[0].style.boxShadow = "none"
		calcOffHelper(elements, document.getElementsByClassName("status")[0].innerHTML)
		clearDisp()
	} else {
		document.getElementById("on").innerHTML = "OFF";
		document.getElementById("on").setAttribute("id", "off");
		document.getElementsByClassName("numerical-container")[0].style.border = "1px solid cyan"
		document.getElementsByClassName("numerical-container")[0].style.boxShadow = "1px 0.5px 0.5px white"
		document.getElementsByClassName("display-container")[0].style.border = "1px solid cyan"
		document.getElementsByClassName("display-container")[0].style.boxShadow = "1px 0.5px 0.5px white" 
		calcOffHelper(elements, document.getElementsByClassName("status")[0].innerHTML)
		clearDisp()

	}
}

function calcOffHelper(elements, cstat){
	count = 0
	while (count < elements.length) {
		if (cstat == "ON") {
			elements[count].style.border = "none"
		} else {
			elements[count].style.border = "1px solid cyan"
		}
	 	count = count + 1
	}
}

function getDigits(element) {
	var digit = document.getElementsByClassName("digits")[0]
	var cstat = document.getElementsByClassName("status")[0]
	var disp = document.getElementsByClassName("display-container")[0]

	if (cstat.innerHTML == "OFF") {
		enterDigitsInDisp(element)
	}else {
		disp.innerHTML = "Switch On Calc"
	}
}

function enterDigitsInDisp(element){
	if (disp.innerHTML == ""){
		disp.innerHTML = element.innerHTML
	}else {
		disp.innerHTML = disp.innerHTML + element.innerHTML
	}
}

// function to clear display

function clearDisp(){
	if (document.getElementsByClassName("status")[0].innerHTML == "On") {
		disp.innerHTML = "Switch On Calc"
	}else {
		disp.innerHTML = ""	
	}
}

//Backspace Functionality

function backSpace() {
	if(disp.innerHTML == "") {
		console.log("Nothing to Delete");
	} 
}

//function to handle operator

function getOperator(operator){
	console.log(operator.innerHTML)
	
}




