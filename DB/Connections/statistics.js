var DBHelper 	= require('../helper');

exports.avgPriority = function(user, callback) {
	var sqlQuery = "SELECT AVG(priority) as ap			\
					FROM completedTask					\
					WHERE id_user ='" + user + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.completedTasks = function(user, callback) {
	var sqlQuery = "SELECT COUNT(*)	as ct				\
					FROM completedTask					\
					WHERE id_user ='" + user + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.avgTimeTask = function(user, callback){
	var sqlQuery = "SELECT AVG(temp.times / (1000*60*24) ) as days 	\
					FROM (SELECT  (end_time - begin_time) as times	\
						  FROM completedtask 						\
						  WHERE id_user ='" + user + "') as temp;"
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

exports.avgTimeApp = function(user, callback){
	var sqlQuery = "SELECT AVG(temp.times / (1000*60*24) ) as days 	\
					FROM (SELECT  (end_at - begin_at) as times		\
						  FROM completedappointment 				\
						  WHERE id_user ='" + user + "') as temp;"
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
}

exports.completedApps = function(user, callback) {
	var sqlQuery = "SELECT COUNT(*)	as ca				\
					FROM completedappointment			\
					WHERE id_user ='" + user + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};