var controller = require('../Controllers/appointment');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/appointment')
		.post(auth.check, controller.create)
		.put(auth.check, controller.edit)
		.delete(auth.check, controller.delete);
	app.route('/appointments')
		.get(auth.check, controller.get);
	app.route('/appointments/status')
	  	.get(auth.check, controller.getByStatus);	 
	app.route('/appointments/tag')
	  	.get(auth.check, controller.getByTag);
	app.route('/appointments/topic')
	  	.get(auth.check, controller.getByTopic);
	app.route('/appointments/place')
	  	.get(auth.check, controller.getByPlace);	 
	app.route('/appointments/date')
	  	.get(auth.check, controller.getByDate);	 
};
