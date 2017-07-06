var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/', urlencodedParser, (req, res) =>{
        console.log("COnnection Recieved");
        console.log(req.body);
        console.log(req.Message);
       
});


var port = 9005;
app.listen(port);
console.log('Listening on port',port);
