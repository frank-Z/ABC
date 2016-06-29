
function Layer(path, fn) {
	this.handle = fn;
	this.name = fn.name || '<anonymous>';
	this.path = path;
}

Layer.prototype.handle_request = function (req, res, next) {
  var fn = this.handle;

  if(fn) {
  	fn(req, res, next);
  }
}

Layer.prototype.match = function (path) {
	if(path === this.path) {
		return true;
	}
	
	return false;
}

module.exports = Layer;