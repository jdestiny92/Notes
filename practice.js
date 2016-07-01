var fs = require('fs');


fs.readFile('best_things_ever.txt', 'utf8', function(error, data){
	if(error){
		console.log('there is an error');
			}
	else{
		
		var newData = data.split(', ')
		console.log(newData);
		for(i=0; i<newData.length; i++){
				var point = newData[i];
				console.log(point);
			}
		}
		})

//for file name, simply use process.argv[2], then just name file name, if in same directory
//example: node practice best_things_ever.txt