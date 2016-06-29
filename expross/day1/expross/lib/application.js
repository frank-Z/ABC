

var http = require('http');

var Application = function() {
	this.router = [{
		path: '*', 
		fn: function(req, res) {
			res.writeHead(200, {'Content-Type': 'text/plain'});
			res.end('Cannot ' + req.method + ' ' + req.url);
		}
	}];
};


Application.prototype.use = function(path, cb) {
	this.router.push({
		path: path,
		fn: cb
	});
};


Application.prototype.listen = function(port) {
	var self = this;

	http.createServer(function(req, res) {

		//自动匹配
		for(var i=1,len=self.router.length; i<len; i++) {

			if(req.url === self.router[i].path) {
				return self.router[i].fn(req, res);
			}
		}

		return self.router[0].fn(req, res);

	}).listen(port);
};

module.exports = Application;