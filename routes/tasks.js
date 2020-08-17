var controller = require('../Controllers/task');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/task')
		.post(auth.check, controller.create)
		.put(auth.check, controller.edit)
		.delete(auth.check, controller.delete);
	app.route('/tasks')
		.get(auth.check, controller.get);
	app.route('/tasks/status')
	  	.get(auth.check, controller.getByStatus);	 
	app.route('/tasks/tag')
	  	.get(auth.check, controller.getByTag);	 
	app.route('/tasks/priority')
	  	.get(auth.check, controller.getByPriority);	 
	app.route('/tasks/date')
	  	.get(auth.check, controller.getByDate);	 
};
