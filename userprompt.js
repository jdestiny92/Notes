// Create a basic command line Node application using the inquirer package.
// Your application should ask the user any five questions of your choosing. 
// The question set should include at least one:

//  	- Basic input, 
//		- Password, 
//		- List, 
//		- Checkbox, 
//		- and Confirm

// Then if a user's password matches a pre-defined password, re-display the data back to the user with some text. 
// See the inquirer GitHub documentation "examples" page if you need help.

// Remember to be creative!

// ========================================================================

// Load the NPM Package inquirer
var inquirer = require('inquirer');

// Create a "Prompt" with a series of questions.
inquirer.prompt([{
	type: 'confirm',
	message: 'You fall asleep one night. Instead of waking up in your bed, you wake up in a mysterious field. Scared, trying to find your bearings, you see a sword next to you. Do you pick it up?',
	name: 'confirm',
	default: true
}]).then(function (user) {
	// If we log that user as a JSON, we can see how it looks.
	//console.log(JSON.stringify(user, null, 2));
	if(user.confirm){
		console.log('You pick up the sword to keep yourself armed just in case. You finally stumble upon a main road but are immediately approached by a thief. Luckily you use the sword to defend yourself and the thief runs away.');
	}
	else{
		console.log('Lost in your own confusion, you leave the sword and run away, looking for the first sign of civilization. You come upon a main road but, are met by a thief. Ruthlessly he attacks and kills you to acquire your belongings.');
	}
});

