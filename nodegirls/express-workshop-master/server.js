var fs = require('fs');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get('/get-posts', function (req, res){
    res.sendfile(__dirname + '/data/posts.json');
});


app.post('/create-post', function (req, res) {
    fs.readFile(__dirname + '/data/posts.json', function (error, file) {
        // console.log(__dirname);
        // console.log(file);
        // console.log(file.toString());
        var parsedFile = JSON.parse(file);
        // console.log(parsedFile);
        parsedFile[Date.now()] = req.body.blogpost;
        // console.log(req);
        var toString = JSON.stringify(parsedFile);
        fs.writeFile(__dirname + '/data/posts.json', toString, function (error) {
            // do somethg;
            res.redirect('/');
        });
    });

});


app.listen(3000, function () {
  console.log('Server is listening on port 3000. Ready to accept requests!');
});