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
                
                var message = {
                    "text": "Sign In/Out",
                    "response_type": "ephemeral",
                    "replace_original" : true,
                    "attachments": [
                        {
                            "text": "Are you signing in or out?",
                            "fallback": "You are unable",
                            "callback_id": "SignInOut_selection",
                            "color": "#3AA3E3",
                            "name": "SignInOut_list",
                            "attachment_type": "default",
                            "actions": [
                                {
                                    "name": "SignIn",
                                    "type": "button",
                                    "text": "Sign in",
                                    "value": "Sign in"
                                },
                                {
                                    "name": "SignOut",
                                    "type": "button",
                                    "text": "Sign out",
                                    "value": "Sign out"
                                }
                            ]
                        }
                    ]
                }
                var googleScript = {
                    "name": "Description",
                    "value": reqBody.text
                }
                sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);   
                sendMessageToSlackResponseURL(responseURL, message);
        }
});

var port = 9000;
app.listen(port);
console.log('Listening on port',port);
