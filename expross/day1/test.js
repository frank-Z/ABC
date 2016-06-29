var expross = require('./expross');
var app = expross();

app.use('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World');
});

app.listen(3000);