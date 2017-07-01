var express = require('express')
var request = require('request')
var bodyParser = require('body-parser')
var app = express()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

function sendMessageToSlackResponseURL(responseURL, JSONmessage){
    var postOptions = {
        uri: responseURL,
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

/*app.get('/', function (req, res){
        res.send('TESTING\n');
});*/

app.post('/', urlencodedParser, (req, res) =>{
        res.status(200).end();
        var actionJSONPayload = JSON.parse(req.body.payload);
        if(actionJSONPayload.callback_id == "SignInOut_selection")
        {
            var message = {
                "text": "Job type",
                "response_type": "ephemeral",
                "replace_original" : true,
                "attachments": [
                    {
                        "channel" : "#" + params.channel_name ,
                        "username" : params.user_name,
                        "text": "What type of work did you do?",
                        "fallback": "Job Selection Not Available",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "callback_id": "job_selection",
                        "actions": [
                            {
                                "name": "job_list",
                                "text": "What type of work did you do?",
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
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        }
        else
        {
            var message = {
                    "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
                    "replace_original": false
            }
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        }
})


var port = 9001;
app.listen(port);
console.log('Listening on port',port);
