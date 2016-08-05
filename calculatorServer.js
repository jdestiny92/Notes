var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var PORT = 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type:'application/vnd.api+json'}));


app.get('/:condition/:first/:second', function(req, res){
	//console.log(req.params);
	if(req.params.condition == 'addition'){
		var answer = parseInt(req.params.first) + parseInt(req.params.second);
		console.log(answer);
	}
})

// : the colon says its a varible!! Very important


app.listen(PORT, function(){
	console.log('App listening on PORT ' + PORT);
})