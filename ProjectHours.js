var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        url: responseURL,
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        json: JSONmessage
    }
request(postOptions, (error, response, body) => {
        if (error){
            // handle errors as you see fit
        }
    })
}

app.post('/', urlencodedParser, (req, res) =>{
        res.status(200).end();
        var reqBody = req.body;
        var responseURL = reqBody.response_url;
        if(reqBody.token != 'CVuvCq700N50MgszRrYNn5x7')
        {
                res.status(403).end("Access forbidden");
        }else{
            if(reqBody.callback_id == "ProjectList")
            {
                console.log("HELLO");
                var message = '{ "text": "Projects","response_type": "ephemeral","replace_original" : false,"attachments": [{"text": "Which work project would you like to view the hours for?",';
                message += '"fallback": "Not Available","color": "#3AA3E3","attachment_type": "default","callback_id": "project_selection2", "actions": [{';                 
                message += '"name": "record_list","text": "Which work project would you like to view the hours for?","type": "select","options":'; 
                message += actionJSONPayload.message.toString();
                message += '}]}]}';
            
                sendMessageToSlackResponseURL(actionJSONPayload.response_url, JSON.parse(message));
            }
            else
            {
                var googleScript = {
                    "name": "ProjectList",
                    "response_url": actionJSONPayload.response_url,
                    "user": actionJSONPayload.user.name
                }
                 sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);  
            }
        }
});

var port = 9003;
app.listen(port);
console.log('Listening on port',port);
