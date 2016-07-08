var input = process.argv;


//console.log(input);

var empty = [];

for(i=2; i<input.length; i++){
	empty.push(input[i]);
	console.log(empty);
	empty.sort(function(a,b){
		return a-b
	});
	console.log(empty);
}

