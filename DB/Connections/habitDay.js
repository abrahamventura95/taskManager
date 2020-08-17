var DBHelper 	= require('../helper');

exports.get = function(id, callback) {
	var sqlQuery = "SELECT id, tag, frequency, day, time, created_at	\
					FROM habitday										\
					WHERE id_habit ='" + id + "'						\
					ORDER BY day DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
  	var sqlQuery = "INSERT INTO habitday (id_habit, tag, frequency,	\
  										  day, time)				\
							VALUES ('" + obj.habit		+ "',		\
									'" + obj.tag		+ "',		\
									'" + obj.frequency	+ "',		\
									'" + obj.day		+ "',		\
									'" + obj.time 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.edit = function(obj, callback) {
	var sqlQuery = "UPDATE  habitday SET  								\
					 	    tag 		='" + obj.tag			+ "',	\
					 	    frequency 	='" + obj.frequency		+ "',	\
					 	    day 		='" + obj.day			+ "',	\
						    time 		='" + obj.time 			+ "'	\
					WHERE   id			='" + obj.id 			+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM habitday   		\
					WHERE id ='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
