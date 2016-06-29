var Layer = require('./layer.js');


var Route = function(path) {
	this.path = path;
	this.stack = [];

	this.methods = {};
};

Route.prototype._handles_method = function(method) {
	var name = method.toLowerCase();
	return Boolean(this.methods[name]);
};

Route.prototype.get = function(fn) {
	var layer = new Layer('/', fn);
	layer.method = 'get';

	this.methods['get'] = true;
	this.stack.push(layer);

	return this;
};

Route.prototype.dispatch = function(req, res, done) {
	var self = this,
		method = req.method.toLowerCase(),
		i = 0, len = self.stack.length, stack;

	function next(gt) {
		if(gt === 'route') {
			return done();
		}

		if(i >= len) {
			return done();
		}

		stack = self.stack[i++];

		if(method === stack.method) {
			return stack.handle_request(req, res, next);
		} else {
			next();
		}		
	}

	next();
};


module.exports = Route;