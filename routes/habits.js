var controller = require('../Controllers/habit');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/habit')
		.post(auth.check, controller.create)
		.put(auth.check, controller.edit)
		.delete(auth.check, controller.delete);
	app.route('/habits')
		.get(auth.check, controller.get);
	app.route('/habits/status')
	  	.get(auth.check, controller.getByStatus);	 
	app.route('/habits/tag')
	  	.get(auth.check, controller.getByTag);	 
	app.route('/habits/alarm')
	  	.get(auth.check, controller.getByAlarm);
};
