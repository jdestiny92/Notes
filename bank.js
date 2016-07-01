var fs = require('fs');

var input = process.argv;

var fileName = input[1];

var fileRead = input[2];

var transactions = input[3];

var amount = input[4];

fs.readFile(fileRead, 'utf8', function(error, data){
	if(error){
		console.log('there is an error');
			}
	else{
		//console.log(data);
		var newData = data.split(', ')
		var total = 0;
		//console.log(newData);
		for(i=0; i<newData.length; i++){
				var transaction = parseFloat(newData[i]);
				total += transaction;
				
			}
		//console.log('current total is ' + total + ' dollars');
		if(transactions == 'total'){
			console.log('current total is ' + total + ' dollars');
		}
		else if(transactions == 'deposit'){
			fs.appendFile('bank.txt', amount + ',')
			console.log('current total is ' + total + ' dollars');
		}
		else if(transactions == 'withdraw'){
			fs.appendFile('bank.txt', '-' + amount + ',')
			console.log('current total is ' + total + ' dollars');
		}
	}
})



