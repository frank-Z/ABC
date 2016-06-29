var expross = require('./expross');
var app = expross();

app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Hello World');
});

app.route('/book')
.get(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Get a random book');
});

app.listen(3000);