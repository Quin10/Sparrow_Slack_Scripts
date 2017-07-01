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
        res.status(200).end()
        var actionJSONPayload = JSON.parse(req.body.payload)
        var message = {
                "text": actionJSONPayload.user.name+" clicked: "+actionJSONPayload.actions[0].name,
                "replace_original": false
        }
        sendMessageToSlackResponseURL(actionJSONPayload.response_url, message)
})


var port = 9001;
app.listen(port);
console.log('Listening on port',port);
