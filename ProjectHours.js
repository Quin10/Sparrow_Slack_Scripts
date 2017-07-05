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
                    "text": "Project",
                    "response_type": "ephemeral",
                    "replace_original" : true,
                    "attachments": [
                        {
                            "text": "Which project would you like to view the hours for?",
                            "fallback": "Job Selection Not Available",
                            "color": "#3AA3E3",
                            "attachment_type": "default",
                            "callback_id": "project_selection2",
                            "actions": [
                                {
                                    "name": "projects_list2",
                                    "text": "Projects",
                                    "type": "select",
                                    "options": [
                                        {
                                            "text": "Writing",
                                            "value": "Writing"
                                        },
                                        {
                                            "text": "Editing",
                                            "value": "Editing"
                                        },
                                        {
                                            "text": "QA",
                                            "value": "QA"
                                        },
                                        {
                                            "text": "Formatting",
                                            "value": "Formatting"
                                        },
                                        {
                                            "text": "E-learning",
                                            "value": "E-learning"
                                        },
                                        {
                                            "text": "Corrections",
                                            "value": "Corrections"
                                        },
                                        {
                                            "text": "Management",
                                            "value": "Management"
                                        },
                                        {
                                            "text": "Guides/Question Bank",
                                            "value": "Guides or Question Bank"
                                        },
                                        {
                                            "text": "Artwork",
                                            "value": "Artwork"
                                        },
                                        {
                                            "text": "Training",
                                            "value": "Training"
                                        },
                                        {
                                            "text": "Sales",
                                            "value": "Sales"
                                        },
                                        {
                                            "text": "Admin",
                                            "value": "Admin"
                                        },
                                        {
                                            "text": "Other",
                                            "value": "Other"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
                sendMessageToSlackResponseURL(responseURL, message);
        }
});

var port = 9000;
app.listen(port);
console.log('Listening on port',port);
