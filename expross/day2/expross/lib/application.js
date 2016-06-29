

var http = require('http'),
	Layer = require('./layer.js');

var Application = function() {
	this.router = [new Layer('*', function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Cannot ' + req.method + ' ' + req.url);
	})];
};


Application.prototype.use = function(path, cb) {
	this.router.push(new Layer(path, cb));
};


Application.prototype.handle = function(req, res) {
	var self = this;

	for(var i=0,len=self.router.length; i<len; i++) {
		if(self.router[i].match(req.url)) {
			return self.router[i].handle_request(req, res);
		}
	}

	return self.router[0].handle_request(req, res);
};


Application.prototype.listen = function(port) {
	var self = this;

	http.createServer(function(req, res) {
		self.handle(req, res);
	}).listen(port);
};

module.exports = Application;