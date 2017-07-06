var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.post('/', urlencodedParser, (req, res) =>{
        console.log("SOMETHING");
       req.addListener('data', function(chunk) { data += chunk; });
req.addListener('end', function() {
    console.log("from android :"+data); //result of data is Hello%0AI+learn+android 
       
});



});

var port = 9005;
app.listen(port);
console.log('Listening on port',port);
