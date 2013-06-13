var express = require('express');
var fs   = require('fs');
var path = require('path');
var createSchedule = require('./js/createSchedule.js')

var app = express.createServer(express.logger());

app.use(express.bodyParser());

app.get('/*', function(request, response) {
	console.log("GET RECIEVED");

	var filePath = '.' + request.url;
    if (filePath == './') filePath = './html/signup.html';

    console.log(filePath);

    var extension = path.extname(filePath);
    var contentType = 'text/html';
    switch (extension) {
        case '.html': contentType = 'text/html'; break;
        case '.js': contentType = 'text/javascript'; break;
        case '.css': contentType = 'text/css'; break;
    }

    fs.readFile(filePath, function(err, content) {
        if (err) {
            /*
            *   TODO: Make sad kitty error page
            */
            response.writeHead(404, {'Content-Type' : 'text/html'});
            response.write("File not found!");
            console.log("INVALID REQUEST");
            response.end();
        }else{
            response.writeHead(200, {'Content-Type' : contentType});
            response.write(content);
            console.log("GET RESPONDED");
            response.end();
        }
    });
});

app.post('/', function(request, response){
    console.log("POST RECIEVED");
    console.log(request.body);
    var data = request.body;
    response.writeHead(200, {'Content-Type' : 'text/plain'});
    response.write("success");
    response.end();
    if(data.request == "createSchedule") createSchedule.createSchedule();
});


var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});
