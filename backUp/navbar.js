/* Arrays for Item List */

var pandas = [
	"DataFrames",
	"Reset Index",
	"Filters"
]

var mlearn = [
	"Linear Regression",
	"Logistic Regression",
	"Random Forest Regression"
]

var numpy = [
	"numpy arange",
	"numpy seed"
]

window.onload = function(){

	for (var i=0; i<pandas.length; i++){
	var divParentTag = document.getElementsByClassName("package-container")[0]
	var divTag= document.createElement("div");
	var spanTag = document.createElement("span");

	divTag.setAttribute("class", "package")
	if (pandas[i].length > 15){
		divTag.innerHTML = pandas[i].substring(0, 15) + " . . ."
	}else{
		divTag.innerHTML = pandas[i]
	}

	divParentTag.appendChild(divTag);

	spanTag.setAttribute("class", "package-tooltip");
	spanTag.innerHTML = pandas[i];
	divTag.appendChild(spanTag);
	}
	
}

function createListItems(element){
	var divParentTag = document.getElementsByClassName("package-container")[0]
	var divTag= document.createElement("div");
	var spanTag = document.createElement("span");

	divTag.setAttribute("class", "package")
	if (element.length > 15){
		divTag.innerHTML = element.substring(0, 15) + " . . ."
	}else{
		divTag.innerHTML = element
	}

	divParentTag.appendChild(divTag);

	spanTag.setAttribute("class", "package-tooltip");
	spanTag.innerHTML = element;
	divTag.appendChild(spanTag);

}

function removeAllChildren(){
	const childArray = document.getElementsByClassName("package-container")[0];
	count = childArray.children.length;
	while(count > 0){
		childArray.removeChild(childArray.children[0]);
		count = count - 1;
	}
}

function libraryItems(element) {
	removeAllChildren()
	if(element.id == "pandas"){
		for(var i=0; i<pandas.length; i++){
			createListItems(pandas[i])
		}

	}else if(element.id == "numpy"){
		for(var i=0; i<numpy.length; i++){
			createListItems(numpy[i])
		}

	}else if(element.id == "mlearn"){
		for(var i=0; i<mlearn.length; i++){
			createListItems(mlearn[i])
		}
	}
}

