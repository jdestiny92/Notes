var express = require('express');
var app = express();

// Adding in the components of the mysql library. Outlining the parameters tied to the mysql db
var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
    user: 'jpmfic6bzhhzeyjd',
    password: 'destiny101',
    database: 'jycxtsgajvvqqqrx'
});

// Connecting the mysql database mentioned above
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});