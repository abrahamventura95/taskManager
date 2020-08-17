var controller = require('../Controllers/task');
var subController = require('../Controllers/subTask');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/task')
		.post(auth.check, controller.create)
		.put(auth.check, auth.checkTask, controller.edit)
		.delete(auth.check, auth.checkTask, controller.delete);
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
	app.route('/task/sub')
		.get(auth.check, subController.get)
		.post(auth.check, auth.checkTask, subController.create)
		.put(auth.check, auth.checkTask, subController.edit)
		.delete(auth.check, auth.checkTask, subController.delete);
};
