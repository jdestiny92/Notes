DOM Notes

document.getElmentById.innerText = "blank"

var newDiv = document.createElement("div");
//Need this bottom line to append it to the browser
targetDiv.appendChild(newDiv);

document.getElmentById("winner").setAttribute('class', 'green');



JQuery!!

$("clickMe").on("click", function(){
	//trigger an alert
	alert("I've been clicked!");
})

Can mix javascript and JQuery!!!

var newDiv = $('<div>'); //creates a new div tag

$('.todolist').append('<li>do dishes</li>'); 
//adds on an li, instead of erasing what was inside


//always use this!!!
$(document).ready(function() {

	//all your javascript
}