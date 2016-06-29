console.log(process.argv);

//process is a global object
// argv is an array of all the arguments processed

//console.log(parseInt(process.argv[2]) + parseInt(process.argv[3]));

var x = parseInt(process.argv[2]);

var y = parseInt(process.argv[3]);

if (x===y) {
	console.log('the two values are equal');
}

else {
	console.log('the two values are not equal');
}


