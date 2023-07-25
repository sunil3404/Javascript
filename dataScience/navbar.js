/* Arrays for Item List */

var pandas = [
	"DataFrames",
	"Reset Index",
	"Filters - loc & iloc"
]

var mlearn = [
	"Linear Regression",
	"Logistic Regression",
	"RandomForest Regression"
]

var numpy = [
	"arange",
	"seed",
	"linspace",
	"shape",
	"size"
]

window.onload = function(){

	for (var i=0; i<pandas.length; i++){
		var divParentTag = document.getElementsByClassName("package-container")[0]
		var divTag= document.createElement("div");
		var spanTag = document.createElement("span");

		divTag.setAttribute("class", "package")
		divTag.setAttribute("onclick", "onClickLibrary(this)");
		pandas = pandas.sort();
		if (pandas[i].length > 15){
			divTag.innerHTML = pandas[i].substring(0, 15) + " . . ."
		}else{
			divTag.innerHTML = pandas[i]
		}

		divParentTag.appendChild(divTag);

		spanTag.setAttribute("class", "package-tooltip");
		spanTag.setAttribute("heading", "pandas");
		spanTag.innerHTML = pandas[i];
		divTag.appendChild(spanTag);
	}

	var heading = document.getElementsByClassName("heading")[0]
	var prefix = document.querySelector("span[heading=pandas]")

	heading.innerHTML = prefix.getAttribute("heading").toUpperCase() + " - " + prefix.innerHTML.toUpperCase()
	
}

function createListItems(element, heading_prefix){
	var divParentTag = document.getElementsByClassName("package-container")[0]
	var divTag= document.createElement("div");
	var spanTag = document.createElement("span");

	divTag.setAttribute("class", "package")
	divTag.setAttribute("onclick", "onClickLibrary(this)");
	if (element.length > 15){
		divTag.innerHTML = element.substring(0, 15) + " . . ."
	}else{
		divTag.innerHTML = element
	}

	divParentTag.appendChild(divTag);

	spanTag.setAttribute("class", "package-tooltip");
	spanTag.setAttribute("heading", heading_prefix);
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
		pandas = pandas.sort()
		for(var i=0; i<pandas.length; i++){
			createListItems(pandas[i], element.id)
		}

	}else if(element.id == "numpy"){
		numpy = numpy.sort()
		for(var i=0; i<numpy.length; i++){
			createListItems(numpy[i], element.id)
		}

	}else if(element.id == "mlearn"){
		mlearn = mlearn.sort();
		for(var i=0; i<mlearn.length; i++){
			createListItems(mlearn[i], element.id)
		}
	}
}


// Function to create heading in Main Content
function onClickLibrary (element){
	var prefix = element.children[0].getAttribute("heading")
	var suffix = element.children[0].innerHTML
	var heading = document.getElementsByClassName("heading")[0]

	heading.innerHTML = prefix.charAt(0).toUpperCase() + prefix.slice(1) + " - " + suffix.toUpperCase()
}
