var http = require('http');
var url = require('url');
var static = require('node-static');
var file = new static.Server('.');

http.createServer(function(req, res) {
	//console.log('request received');
    file.serve(req, res);

    console.log(req.url);


}).listen(8080);


console.log('Server running on port 8080');