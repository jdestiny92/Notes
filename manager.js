var inquirer = require('inquirer');
var count = 0;

function Player(name, position, offense, defense){
	this.name = name;
	this.position = position;
	this.offense = offense;
	this.defense = defense;
	this.goodGame = function(){

	}
	this.badGame = function(){

	}
	this.printStats = function(){

	}
}

var askQuestion = function(){
	if(count < 5){
		var offense = Math.floor((Math.random() * 10) + 1);
		var defense = Math.floor((Math.random() * 10) + 1);

	}
	else if(count < 8){
		var offense = Math.floor((Math.random() * 10) + 1);
		var defense = Math.floor((Math.random() * 10) + 1);
	}
	else{

	}
}

function beAwesome(awesomeSauce){
	
};