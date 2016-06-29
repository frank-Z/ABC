
var Layer = require('./layer.js'),
	Route = require('./route.js');


var Router = function() {
	this.stack = [new Layer('*', function(req, res) {
		res.writeHead(200, {'Content-Type': 'text/plain'});
		res.end('Cannot ' + req.method + ' ' + req.url);
	})];
};


Router.prototype.handle = function(req, res) {
	var self = this,
		method = req.method,
		i = 1, len = self.stack.length,
		stack;


	function next() {
		if(i >= len) {		
			return self.stack[0].handle_request(req, res);
		}

		stack = self.stack[i++];

		if(stack.match(req.url) && stack.route 
			&& stack.route._handles_method(method)) {
			return stack.handle_request(req, res, next);
		} else {
			next();
		}
	}

	next();
};

// Router.prototype.use = function(path, fn) {
// 	this.stack.push(new Layer(path, fn));
// };

Router.prototype.get = function(path, fn) {
	var route = this.route(path);
	route.get(fn);
	return this;
};


Router.prototype.route = function route(path) {
	var route = new Route(path);

	var layer = new Layer(path, function(req, res, next) {
		route.dispatch(req, res, next)
	});

	layer.route = route;

	this.stack.push(layer);
	return route;
};

module.exports = Router;