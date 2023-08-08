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

function createListItems(element, heading_prefix, heading_suffix){
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
	
	var heading = document.getElementsByClassName("heading")[0]
	heading.innerHTML = heading_prefix.charAt(0).toUpperCase() + heading_prefix.slice(1) + " - " + heading_suffix.toUpperCase()

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
			createListItems(pandas[i], element.id, pandas[0])
		}

	}else if(element.id == "numpy"){
		numpy = numpy.sort()
		for(var i=0; i<numpy.length; i++){
			createListItems(numpy[i], element.id, numpy[0])
		}

	}else if(element.id == "mlearn"){
		mlearn = mlearn.sort();
		for(var i=0; i<mlearn.length; i++){
			createListItems(mlearn[i], element.id, mlearn[0])
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

// function to filter packages on the sidebar container

function filterPackages(){
	var searchText = document.getElementsByClassName("search-text")[0]
	var packages = document.querySelectorAll(".package");
	const packageHeader = document.getElementsByClassName("package-container")[0]
	var heading = document.getElementsByClassName("heading")[0].innerHTML.split(" - ")[0].toLowerCase()
	if (searchText.value == ''){
		libraryItems(document.getElementById(heading))
	}else {
		for (var i=0; i < packages.length; i++){

			if (!packages[i].innerText.toLowerCase().startsWith(searchText.value.toLowerCase())){
				packageHeader.removeChild(packageHeader.children[i])
				var packages = document.querySelectorAll(".package");
			}
		}
	}
}
