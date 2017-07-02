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

app.post('/', urlencodedParser, (req, res) =>{
        res.status(200).end();
        var actionJSONPayload = JSON.parse(req.body.payload);
        
        if(actionJSONPayload.callback_id == "SignInOut_selection")
        {
            if(actionJSONPayload.actions[0].name == "SignIn")
            {
                var message = {
                    "text": actionJSONPayload.user.name+" thanks for signing in. Don't forget to sign out!!!",
                    "replace_original": true
                 }
                var googleScript = {
                    "name": "InOut",
                    "value": "In",
                    "user": actionJSONPayload.user.name
                }
                 sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);                            
                 sendMessageToSlackResponseURL(actionJSONPayload.response_url, message);    
            }
            else
            {
                var message = {
                    "text": "Job type",
                    "response_type": "ephemeral",
                    "replace_original" : true,
                    "attachments": [
                        {
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
                var googleScript = {
                    "name": "InOut",
                    "value": "Out",
                    "user": actionJSONPayload.user.name
                }
                sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);   
                sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
            }
        }
        else if(actionJSONPayload.callback_id == "job_selection")
        {
            var message = {
                "text": "Project",
                "response_type": "ephemeral",
                "replace_original" : true,
                "attachments": [
                    {
                        "text": "What project did you work on?",
                        "fallback": "Job Selection Not Available",
                        "color": "#3AA3E3",
                        "attachment_type": "default",
                        "callback_id": "project_selection",
                        "actions": [
                            {
                                "name": "project_list",
                                "text": "What project did you work on?",
                                "type": "select",
                                "options": [
                                    {
                                        "text": "NATREF",
                                        "value": "NATREF"
                                    },
                                    {
                                        "text": "General",
                                        "value": "General"
                                    },
                                    {
                                        "text": "DHET ISAT",
                                        "value": "DHET ISAT"
                                    },
                                    {
                                        "text": "GFRAS",
                                        "value": "GFRAS"
                                    },
                                    {
                                        "text": "NCPC",
                                        "value": "NCPC"
                                    },
                                    {
                                        "text": "Khumani EDMS",
                                        "value": "Khumani EDMS"
                                    },
                                    {
                                        "text": "UoA",
                                        "value": "UoA"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
            var googleScript = {
                "name": "Job",
                "value": actionJSONPayload.actions[0].selected_options[0].value,
                "user": actionJSONPayload.user.name
           }
            sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);     
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        }
        else if(actionJSONPayload.callback_id == "project_selection")
        {
            var message = {
                "text": "Location",
                "response_type": "ephemeral",
                "replace_original" : true,
                "attachments": [
                    {
                        "text": "Where did you work from?",
                        "fallback": "You are unable",
                        "callback_id": "location_selection",
                        "color": "#3AA3E3",
                        "name": "location_list",
                        "attachment_type": "default",
                        "actions": [
                            {
                                "name": "SparrowOffices",
                                "type": "button",
                                "text": "Sparrow Offices",
                                "value": "Sparrow Offices"
                            },
                            {
                                "name": "Home",
                                "type": "button",
                                "text": "Home",
                                "value": "Home"
                            },
                            {
                                "name": "Other",
                                "type": "button",
                                "text": "Other",
                                "value": "Other"
                            }
                        ]
                    }
                ]
            }
            var googleScript = {
                "name": "Project",
                "value": actionJSONPayload.actions[0].selected_options[0].value,
                "user": actionJSONPayload.user.name
           }
            sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);     
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        }
        else if(actionJSONPayload.callback_id == "location_selection")
        {
            var message = {
                    "text": actionJSONPayload.user.name+" thanks for signing out. Hope to see you soon!!!",
                    "replace_original": true
            }
            var googleScript = {
                "name": "Location",
                "value": actionJSONPayload.actions[0].value,
                "user": actionJSONPayload.user.name
           }
            sendMessageToSlackResponseURL("https://script.google.com/macros/s/AKfycbyoQBvG09Pa8AZiDDEKNtgsPtBmJK7lma-QC7CjeKyKfrA42pJG/exec", googleScript);     
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        }
        else
        {
            var message = {
                    "text": "SOMETHING HAS GONE WRONG",
                    "replace_original": true
            }
            sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
        }
})


var port = 9001;
app.listen(port);
console.log('Listening on port',port);
