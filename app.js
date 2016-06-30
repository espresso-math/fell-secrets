/*=======================================================================================================================
/
/											Main application
/						      					 Server
/
========================================================================================================================*/

// Require requirements
var http = require('http');
var fs = require('fs');
var path = require('path');
var routes = require('./routes');
	
// Some global variables

global.api_v = "/api/v1/";

// Start server

http.createServer(function (req, res) {

	if (req.url.indexOf(api_v) > -1) { // The api routes
		var routename = req.url.replace(api_v, '');
		if (routename[routename.length-1] == '/')
			routename[routename.length-1] = '';

		// Mapping routename to functions.
		switch (routename) {
			case 'get_coordinate':
				routes.get_coordinate(req, function(val, err) {
					res.writeHead(err);
					res.write(val);
					res.end();
				});
				break;
			default:
				res.writeHead(routes.x404());
				res.write('404. Look elsewhere');
				res.end();
				break;
		}

	} else if (req.url.indexOf('/static/' == -1)) { // Template routes
		var routename = req.url;
		switch (routename) {
			case '/':
				routes.get_index(req, function(val, err) {
					res.writeHead(err, { 'Content-Type': 'text/html' });
					res.end(val, 'utf-8');
				});
				break;
			default:
				res.writeHead(routes.x404());
				res.write('404. Look elsewhere');
				res.end();
				break;
		}
	} else if (req.url.indexOf(api_v) == -1 && req.url.indexOf('/static/') > -1) { // Static file server
	    var filePath = '.' + req.url;
	    if (filePath[filePath.length - 1] == '/')
	        filePath += 'index.html';

	    var extname = path.extname(filePath);
	    var contentType = 'text/html';
	    switch (extname) {
	        case '.js':
	            contentType = 'text/javascript';
	            break;
	        case '.css':
	            contentType = 'text/css';
	            break;
	        case '.json':
	            contentType = 'application/json';
	            break;
	        case '.png':
	            contentType = 'image/png';
	            break;      
	        case '.jpg':
	            contentType = 'image/jpg';
	            break;
	        case '.wav':
	            contentType = 'audio/wav';
	            break;
	    }

	    fs.readFile(filePath, function(error, content) {
	        if (error) {
	            if(error.code == 'ENOENT'){
	                fs.readFile('./404.html', function(error, content) {
	                    res.writeHead(routes.x200(), { 'Content-Type': contentType });
	                    res.end(content, 'utf-8');
	                });
	            }
	            else {
	                res.writeHead(routes.x500());
	                res.end('Sorry, check with the site admin for error: '+error.code+' ..\n');
	                res.end(); 
	            }
	        }
	        else {
	            res.writeHead(routes.x200(), { 'Content-Type': contentType });
	            res.end(content, 'utf-8');
	        }
	    });
	} else {
		res.writeHead(routes.x404());
		res.write("hello. not found anywhere");
		res.end();
	}

}).listen(8080);
