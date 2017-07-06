var Slack = require('node-slack-upload');
var slack = new Slack("xoxp-148741775620-195455982320-203550966192-bcd0408fb6fc789587db6b30574b2a5c");



slack.uploadFile({
    file: fs.createReadStream(path.join(__dirname, '..', 'README.md')),
    filetype: 'post',
    title: 'README',
    initialComment: 'my comment',
    channels: 'XXXXX'
}, function(err, data) {
    if (err) {
        console.error(err);
    }
    else {
        console.log('Uploaded file details: ', data);
    }
});
