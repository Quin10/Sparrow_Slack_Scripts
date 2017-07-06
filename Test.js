var http = require('http');
var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');
var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});
var Slack = require('node-slack-upload');
var slack = new Slack("xoxp-148741775620-195455982320-203550966192-bcd0408fb6fc789587db6b30574b2a5c");


app.post('/', urlencodedParser, (req, res) =>{
        res.status(200).end();
        var actionJSONPayload = JSON.parse(req.body.payload);
slack.uploadFile({
    file: fs.createReadStream(path.join(actionJSONPayload.inlineImages, '..', 'README.md')),
    filetype: 'post',
    title: 'README',
    initialComment: 'my comment',
    channels: 'quinton_testing'
}, function(err, data) {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Uploaded file details: ', data);
    }
});
});
