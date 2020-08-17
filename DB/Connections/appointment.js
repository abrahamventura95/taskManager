var DBHelper 	= require('../helper');

exports.get = function(user, callback) {
	var sqlQuery = "SELECT id, tag, place, topic, status, time,	created_at	\
					FROM appointment										\
					WHERE id_user ='" + user + "'							\
					ORDER BY status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByStatus = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, place, topic, time,	created_at	\
					FROM appointment								\
					WHERE id_user ='" + obj.user   + "'	AND			\
						  status  ="  + obj.status + "				\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByTag = function(obj, callback) {
	var sqlQuery = "SELECT id,  place, topic, status, time,	created_at	\
					FROM appointment									\
					WHERE id_user ='" + obj.user 	+ "'	AND			\
						  tag  	  ='" + obj.tag 	+ "'				\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByTopic = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, place, status, time, created_at		\
					FROM appointment									\
					WHERE id_user   ='" + obj.user 		+ "'	AND		\
						  topic 	='" + obj.topic 	+ "'			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByPlace = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, status, time, created_at			\
					FROM appointment									\
					WHERE id_user   ='" + obj.user 		+ "'	AND		\
						  place  	='" + obj.place 	+ "'			\
					ORDER BY created_at DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.getByDate = function(obj, callback) {
	var sqlQuery = "SELECT id, tag, place, topic, status, time				\
					FROM appointment										\
					WHERE id_user   		='" + obj.user 	+ "'	AND		\
						  DATE(created_at)  ='" + obj.date 	+ "'			\
					ORDER BY status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
	var bool = (obj.status == "TRUE");
	
  	var sqlQuery = "INSERT INTO appointment (id_user, tag, place, topic,	\
  							 				 status, time)					\
							VALUES ('" + obj.user		+ "',				\
									'" + obj.tag		+ "',				\
									'" + obj.place		+ "',				\
									'" + obj.topic		+ "',				\
									 " + bool 			+ ",				\
									'" + obj.time 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	var bool = (obj.status == "TRUE");

	var sqlQuery = "UPDATE  appointment SET  						\
					 	    tag 		='" + obj.tag		+ "',	\
					 	    topic 		='" + obj.topic		+ "',	\
					 	    place 		='" + obj.place		+ "',	\
					 	    time 		='" + obj.time		+ "',	\
						    status 		="  + bool 			+ "		\
					WHERE   id			='" + obj.id 		+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM appointment   		\
					WHERE id ='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
