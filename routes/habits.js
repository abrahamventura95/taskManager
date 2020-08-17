var controller = require('../Controllers/habit');
var dayController = require('../Controllers/habitDay');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/habit')
		.post(auth.check, controller.create)
		.put(auth.check, auth.checkHabit, controller.edit)
		.delete(auth.check, auth.checkHabit, controller.delete);
	app.route('/habits')
		.get(auth.check, controller.get);
	app.route('/habits/status')
	  	.get(auth.check, controller.getByStatus);	 
	app.route('/habits/tag')
	  	.get(auth.check, controller.getByTag);	 
	app.route('/habits/alarm')
	  	.get(auth.check, controller.getByAlarm);
	app.route('/habit/day')
		.get(auth.check, dayController.get)
		.post(auth.check, auth.checkHabit, dayController.create)
		.put(auth.check, auth.checkHabit, dayController.edit)
		.delete(auth.check, auth.checkHabit, dayController.delete);
};
