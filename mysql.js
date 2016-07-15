var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "destiny101", //Your password
    database: "icecreamDB"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});

connection.query('SELECT * FROM products', function(err, res){
	if(err) throw err;
	console.log('id     flavor     price     quantity');
	console.log(res[0].id + '      ' + res[0].flavor + '     ' + res[0].price + '       ' + res[0].quantity);
	console.log(res[1].id + '      ' + res[1].flavor + '   ' + res[1].price + '       ' + res[1].quantity);
	console.log(res[2].id + '     ' + res[2].flavor + '   ' + res[2].price + '       ' + res[2].quantity);
});