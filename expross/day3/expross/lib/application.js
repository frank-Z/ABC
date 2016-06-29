var http = require('http'),
	Router = require('./router');

var Application = function() {
	this._router = new Router();
};

Application.prototype.use = function(path, fn) {
	var router = this._router;
	return router.use(path, fn);
};

Application.prototype.handle = function(req, res) {
	var router = this._router;
	router.handle(req, res);
};

Application.prototype.listen = function(port) {
	var self = this;

	http.createServer(function(req, res) {
		self.handle(req, res);
	}).listen(port);
};

module.exports = Application;