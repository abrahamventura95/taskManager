var DBHelper 	= require('../helper');

exports.get = function(user, callback) {
	var sqlQuery = "SELECT id, tag, priority, status, created_at	\
					FROM task										\
					WHERE id_user ='" + user + "'					\
					ORDER BY status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByStatus = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, priority, created_at		\
					FROM task									\
					WHERE id_user ='" + obj.user   + "'	AND		\
						  status  ='" + obj.status + "'			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByTag = function(obj, callback) {
	var sqlQuery = "SELECT id, priority, status, created_at			\
					FROM task										\
					WHERE id_user ='" + obj.user 	+ "'	AND		\
						  tag  ='" 	  + obj.tag 	+ "'			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByPriority = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, status, created_at					\
					FROM task											\
					WHERE id_user   ='" + obj.user 		+ "'	AND		\
						  priority  ='" + obj.priority 	+ "'			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByDate = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, status, priority						\
					FROM task												\
					WHERE id_user   		='" + obj.user 	+ "'	AND		\
						  DATE(created_at)  ='" + obj.date 	+ "'			\
					ORDER BY status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
	var bool = (obj.status === true);

  	var sqlQuery = "INSERT INTO task (id_user, tag, status, priority)		\
							VALUES ('" + obj.user		+ "',				\
									'" + obj.tag		+ "',				\
									 " + bool 			+ ",					\
									'" + obj.priority 	+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	var bool = (obj.status === true);

	var sqlQuery = "UPDATE  task SET  								\
					 	    tag 		='" + obj.tag		+ "',	\
						    status 		="  + bool 			+ ",	\
						    priority 	='" + obj.priority	+ "'	\
					WHERE   id			='" + obj.id 		+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM task   		\
					WHERE id ='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
