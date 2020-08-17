var DBHelper 	= require('../helper');

exports.get = function(id, callback) {
	var sqlQuery = "SELECT id, tag, status, created_at	\
					FROM subtask						\
					WHERE id_task ='" + id + "'			\
					ORDER BY status DESC";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
  	var sqlQuery = "INSERT INTO subtask (id_task, tag)		\
							VALUES ('" + obj.task	+ "',	\
									'" + obj.tag 	+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.edit = function(obj, callback) {
	var bool = (obj.status == "TRUE");

	var sqlQuery = "UPDATE  subtask SET  							\
					 	    tag 		='" + obj.tag		+ "',	\
						    status 		="  + bool 			+ "		\
					WHERE   id			='" + obj.id 		+ "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err,data);
	});
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM subtask   		\
					WHERE id ='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
