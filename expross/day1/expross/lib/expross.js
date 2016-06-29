var Application = require('./application');

exports = module.exports = createApplication;

function createApplication() {
	var app = new Application();
	
	return app;
}