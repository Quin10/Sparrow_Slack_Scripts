var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/', urlencodedParser, (req, res) =>{
        console.log("SOMETHING");
        console.log(req.body);
       
});


var port = 9005;
app.listen(port);
console.log('Listening on port',port);
