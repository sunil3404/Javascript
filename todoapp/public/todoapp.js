let myStat = ["Created", "In Progress", "Completed"]
fetch("/task")
	.then(response => response.json())
	.then(tasks => todoAppTest(tasks))

fetch("/status")
	.then(response => response.json())
	.then(stat => getAllStatus(stat)) 

function createSelectField(task, stat){
	var sTag = document.createElement('select')
	for (let i = 0; i< 3; i++){
		var opTag = document.createElement("option")
		opTag.innerHTML = myStat[i]
		if (task.status == "Created"){
			opTag.setAttribute("selected", "selected")
		}else if(task.status == "In Progress"){
			opTag.setAttribute("selected", "selected")
		}else if(task.status == "Completed"){
			opTag.setAttribute("selected", "selected")
		}
		sTag.append(opTag)
	}
	return sTag
}

function createTdRows(task){
	let trTag = document.createElement("tr")
	let tdId = document.createElement("td")
	tdId.innerHTML = task.id;

	let tdTask = document.createElement("td")
	tdTask.innerHTML = task.task

	let tdCreated = document.createElement("td")
	tdCreated.innerHTML = task.created_date

	let tdUpdated = document.createElement("td")
	tdUpdated.innerHTML = task.updated_date
	
	let tdPSelect = document.createElement("td");
	let tdSelect = createSelectField(task)
	tdPSelect.append(tdSelect)

	trTag.append(tdId)
	trTag.append(tdTask)
	trTag.append(tdCreated)
	trTag.append(tdUpdated)
	trTag.append(tdPSelect)

	return trTag
}

function getAllStatus(stat){
	console.log(stat)
}

function todoAppTest(tasks){
	let tabTag = document.getElementsByClassName("table-head")[0]
	for(var i=0;i < tasks.length; i++){
		let trTag = createTdRows(tasks[i])
		tabTag.append(trTag)
	}
}

function todoTask(){
	var task = document.getElementsByClassName("todo-text")[0].value;
}
