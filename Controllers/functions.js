var user_queries = require('../DB/Connections/user');

exports.findRegisteredEmail = function(email, callback){
	user_queries.existsEmail(email,function(err,data){
		callback(data[0].value);
	});
}
