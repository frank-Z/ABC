
var Layer = require('./layer.js');


var Router = function() {
	this.stack = [new Layer('*', function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Cannot ' + req.method + ' ' + req.url);
	})];
};

Router.prototype.handle = function(req, res) {
	var self = this;

	for(var i=0,len=self.stack.length; i<len; i++) {
		if(self.stack[i].match(req.url)) {
			return self.stack[i].handle_request(req, res);
		}
	}

	return self.stack[0].handle_request(req, res);
};

Router.prototype.use = function(path, fn) {
	this.stack.push(new Layer(path, fn));
};

module.exports = Router;