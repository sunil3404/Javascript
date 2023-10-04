let myStat = ["Created", "In Progress", "Completed"]
let tableFields = ['SL.NO', 'Task Name', 'Created', 'Updated', 'Status', 'Action']
fetch("/task")
	.then(response => response.json())
	.then(tasks => todoAppTest(tasks))

fetch("/status")
	.then(response => response.json())
	.then(stat => getAllStatus(stat)) 

//onChange Event
function onChangeSelect(element){
	let update_date = new Date().toISOString().slice(0,10)
	fetch("http://127.0.0.1:8080/updateTask", {
		method : "PUT",
		body: JSON.stringify({
			"id" : element.id,
			"status": element.value,
			"updated_date" : update_date
		}),
		headers: {
                "Content-type": "application/json; charset=UTF-8"
       		 }
        })
        .then(response => response.json())
        .then((json) => console.log(json));
	fetch("/task")
	.then(response => response.json())
	.then(tasks => todoAppTest(tasks))
	location.reload()
}

function createOptTag(sTag){
	for (let i = 0; i< 3; i++){
		let opTag = document.createElement("option")
		opTag.innerHTML = myStat[i];
		sTag.append(opTag)
	}
	return sTag
}

function createSelectField(task){
	console.log("This is coming from createSelectField", task)
	var sTag = document.createElement('select')
	let flag = false;
	sTag.setAttribute("id", task.id)
	sTag.setAttribute("class", "task")
	sTag.setAttribute("name", "task" + task.id)
	sTag.setAttribute("onchange", "onChangeSelect(this)")
	for (let i = 0; i< 3; i++){
		var opTag = document.createElement("option")
		if (myStat[i] == 'Created' && task.status.trim() == "Created" && flag==false){
			console.log("Inside Created")
			opTag.innerHTML = 'Created'
			opTag.setAttribute("selected", "selected")
			opTag.setAttribute("value", "Created")
			flag=true
		}else if(myStat[i] == 'In Progress' && task.status.trim() == "In Progress" && flag == false){
			console.log("Inside In InProgress")
			opTag.innerHTML = 'In Progress'
			opTag.setAttribute("selected", "selected")
			opTag.setAttribute("value", "In Progress")
			flag=true
		}else if(myStat[i] == 'Completed' && task.status.trim() == "Completed" && flag == false){
			console.log("Inside COmpleted")
			opTag.innerHTML = 'Completed'
			opTag.setAttribute("selected", "selected")
			opTag.setAttribute("value", "Completed")
			flag=true
		}else {

			opTag.innerHTML = myStat[i]
		}
		sTag.append(opTag)
	}
	return sTag
}

function createActions(task){
	let tdDiv = document.createElement("div");
	tdDiv.setAttribute("class", "table-buttons")

	let btnEdit = document.createElement("button");
	let btnDelete = document.createElement("button");

	btnEdit.setAttribute("class", "btn-edit");
	btnEdit.setAttribute("value", task.id);
	btnEdit.setAttribute("onclick", "btnEdit(this)")
	btnEdit.setAttribute("id", task.id)
	btnEdit.innerHTML = 'Edit'

	btnDelete.setAttribute("class", "btn-del");
	btnDelete.setAttribute("value", 'Delete');
	btnDelete.setAttribute("onclick", "btnDelete(this)")
	btnDelete.setAttribute("id", task.id)
	btnDelete.innerHTML = 'Delete'

	tdDiv.append(btnEdit);
	tdDiv.append(btnDelete);

	return tdDiv;

}
function createTdRows(task){
	let trTag = document.createElement("tr")
	let tdId = document.createElement("td")
	tdId.innerHTML = task.id;

	let tdTask = document.createElement("td")
	tdTask.innerHTML = task.task

	let tdCreated = document.createElement("td")
	tdCreated.innerHTML = String(task.created_date).split("T")[0]

	let tdUpdated = document.createElement("td")
	tdUpdated.innerHTML = String(task.updated_date).split("T")[0]
	
	let tdPSelect = document.createElement("td");
	let tdSelect = createSelectField(task)
	tdPSelect.append(tdSelect)

	let tdAction = document.createElement("td")
	let tdDivTag = createActions(task)


	trTag.append(tdId);
	trTag.append(tdTask);
	trTag.append(tdCreated);
	trTag.append(tdUpdated);
	trTag.append(tdPSelect);
	trTag.append(tdDivTag);

	return trTag
}

function getAllStatus(stat){
	console.log(stat)
}

function createTableHeader(tbTag){
	let trTag = document.createElement("tr")
	for (let i=0; i< tableFields.length; i++){
		let thTag = document.createElement("th")
		thTag.innerHTML = tableFields[i]
		trTag.append(thTag)
	}
	return trTag
	
}

function todoAppTest(tasks){
	let tabTag = document.getElementsByClassName("table-body")[0]
	tabTag.innerHTML = ''
	let trHeadTag = createTableHeader(tabTag)
	tabTag.append(trHeadTag)

	for(var i=0;i < tasks.length; i++){
		let trTag = createTdRows(tasks[i])
		tabTag.append(trTag)
	}
}

//On Submit Event
var formsubmit = document.getElementsByTagName("form")[0]

formsubmit.addEventListener("submit", todoTask)

function todoTask(event){
	var inputdata = document.getElementsByClassName("todo-text")[0].value
	fetch("http://127.0.0.1:8080/createTask", {
  	method: "POST",
  	body: JSON.stringify({
    		"task" : inputdata,
  	}),
  	headers: {
    		"Content-type": "application/json; charset=UTF-8"
  	}
	})
	.then(response => response.json())
	.then((json) => console.log(json));
	let myLocation = "http://127.0.0.1:8080"
	location.replace(myLocation);
}

// Events for Edit and Delete
function btnDelete(element){
	fetch("http://127.0.0.1:8080/deleteTask", {
		method: "DELETE",
		body: JSON.stringify({
			"id" : element.id
		}),
		headers : {
    		"Content-type": "application/json; charset=UTF-8"
  		}
	})
	.then(response => response.json())
	.then((json) => console.log(json));
	location.reload()
}

function btnEdit(element){
	console.log(element.id)


// <button id="myBtn">Open Modal</button>

// <!-- The Modal -->
// <div id="myModal" class="modal">

//   <!-- Modal content -->
//   <div class="modal-content">
//     <span class="close">&times;</span>
//     <p>Some text in the Modal..</p>
//   </div>

// </div>
}