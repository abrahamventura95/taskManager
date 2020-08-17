var controller = require('../Controllers/user');
var auth = require('../Middleware/auth');

module.exports = function(app) {	
	app.route('/user')
	  	.get(auth.check, controller.get)
		.put(auth.check, controller.edit)
		.delete(auth.check, controller.delete);
	app.route('/user/data')
		.delete(auth.check, controller.deleteData);
	app.route('/user/statistics')
		.get(auth.check, controller.getStats);
	app.route('/users')
	  	.get(controller.getUsers);	  	
	app.route('/register')
	  	.post(controller.create);
	app.route('/login')
	  	.post(controller.login); 
};
