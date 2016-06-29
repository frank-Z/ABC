var expross = require('./expross');
var app = expross();

app.get('/', function(req, res, next) {
	console.log('first');
	next();
});

app.get('/', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('second');
});



app.route('/book')
.get(function(req, res, next) {
	console.log('find...');
	next();
})
.get(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Get a random book');
});


app.route('/list')
.get(function(req, res, next) {
	console.log('find...');
	next('route');
})
.get(function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('Get a list');
});

app.get('/list', function(req, res) {
	res.writeHead(200, {'Content-Type': 'text/plain'});
	res.end('hoooo, go to here');
});


app.listen(3000);