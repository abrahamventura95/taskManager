var DBHelper 	= require('../helper');

exports.get = function(user, callback) {
	var sqlQuery = "SELECT id, tag, status, alarm, created_at	\
					FROM habit									\
					WHERE id_user ='" + user + "'				\
					ORDER BY status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByStatus = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, alarm, created_at			\
					FROM habit									\
					WHERE id_user ='" + obj.user   + "'	AND		\
						  status  ="  + obj.status + "			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByTag = function(obj, callback) {
	var sqlQuery = "SELECT id, status, alarm, created_at			\
					FROM habit										\
					WHERE id_user ='" + obj.user 	+ "'	AND		\
						  tag  ='" 	  + obj.tag 	+ "'			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByAlarm = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, status, created_at					\
					FROM habit											\
					WHERE id_user   ='" + obj.user 		+ "'	AND		\
						  alarm  	="  + obj.alarm 	+ "				\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
	var status = (obj.status == "TRUE");
	var alarm = (obj.alarm == "TRUE");

  	var sqlQuery = "INSERT INTO habit (id_user, tag, status, alarm)		\
							VALUES ('" + obj.user	+ "',				\
									'" + obj.tag	+ "',				\
									 " + status 	+ ",				\
									 " + alarm 		+ ")";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	var status = (obj.status == "TRUE");
	var alarm = (obj.alarm == "TRUE");

	var sqlQuery = "UPDATE  habit SET  							\
					 	    tag 		='" + obj.tag	+ "',	\
						    status 		="  + status 	+ ",	\
						    alarm 	 	="  + alarm		+ "		\
					WHERE   id			='" + obj.id 	+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM habit   		\
					WHERE id ='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
