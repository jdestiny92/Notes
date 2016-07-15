var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root", //Your username
    password: "", //Your password
    database: "greatbay_db"
})

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    start();
})

var start = function() {
    inquirer.prompt({
        name: "postOrBid",
        type: "rawlist",
        message: "Would you like to [POST] an auction or [BID] on an auction?",
        choices: ["POST", "BID"]
    }).then(function(answer) {
        if (answer.postOrBid.toUpperCase() == "POST") {
            postAuction();
        } else {
            bidAuction();
        }
    })
}

var postAuction = function() {
    //your code to add an auction item and 'inquire' the user what they want to add
}

var bidAuction = function() {
    //show the user a list of items are availble to bid on. maybe the inquirer type - rawlist would work here?
    //inquire the user what they want to bid on
}

start();