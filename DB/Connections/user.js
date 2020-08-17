require('dotenv').config();
var jwt 		= require('jsonwebtoken');
var DBHelper 	= require('../helper');
var bcrypt 		= require('bcrypt');


exports.login = function (obj, callback) {
	var sqlQuery = "SELECT id, email, password, fullName, 		\
						   gender, dateOfBirth					\
					FROM user									\
					WHERE `user`.`email` = '" + obj.email + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		if(data.length == 0){
			message = {
	          "code": process.env.BAD_REQUEST,
	          "msg":  "Unregistered email"
	        };
		}else{
	        var x = obj.password;
	        var y = data[0].password;
			if (!bcrypt.compareSync(x, y)) {
				message ={
					"code": process.env.BAD_REQUEST,
					"msg": 	"Wrong password"
				};
			}else{
				let payload = {
						sub: 	data[0].id,
						email: 	data[0].email
					};
				let token = jwt.sign(payload, process.env.secretOrKey);
				message = { 
		    		"code": 	process.env.OK,
		      		"msg": 		"login sucessfull",
		      		"token": 	token,
		      		"name":  	data[0].fullName,
		      		"email": 	data[0].email,
		      		"date": 	data[0].dateOfBirth,
		      		"gender": 	data[0].gender
		    	};	
			}
		}
	  callback(err, message);
	});
};

exports.getUsers = function(callback) {
	var sqlQuery = "SELECT user.id, user.email, user.fullName, user.gender,	\
						   user.dateOfBirth, password									\
					FROM user												\
					Order by user.email";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.get = function(id, callback) {
	var sqlQuery = "SELECT user.id, user.email, user.fullName, user.gender,	\
						   user.dateOfBirth									\
					FROM user												\
					WHERE `user`.`id` = '" + id+"'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.existsEmail = function(email, callback) {
	var sqlQuery = "SELECT COUNT(user.email) as value			\
					FROM user									\
					WHERE `user`.`email` = '" + email + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};

exports.create = function(obj, callback) {
  	var sqlQuery = "INSERT INTO user (fullName, email, password, 			\
  									  dateOfBirth, gender)					\
							VALUES ('" + obj.fullName		+ "',			\
									'" + obj.email			+ "',			\
									'" + obj.password 		+ "',			\
									'" + obj.dateOfBirth 	+ "',			\
									'" + obj.gender 		+ "')";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		callback(err, data);
	});
};


exports.edit = function(obj, callback) {
	if(obj.password == null){
		var sqlQuery = 
				"UPDATE `user` SET  										\
				 	    `user`.`fullName` 	='" + obj.full_name		+ "',	\
					    `user`.`dateOfBirth`='" + obj.dateOfBirth	+ "',	\
					    `user`.`gender` 	='" + obj.gender		+ "'	\
				WHERE `user`.`id`			='" + obj.id 			+ "'";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err,data);
		});
	}else{
	  	var sqlQuery = 
	  			"UPDATE `user` SET  										\
					    `user`.`full_name`  ='" + obj.full_name		+"',	\
					    `user`.`dateOfBirth`='" + obj.dateOfBirth	+"',	\
					    `user`.`gender` 	='" + obj.gender		+"',	\
					    `user`.`password` 	='" + obj.password		+"'		\
				WHERE `user`.`id`			='" + obj.id 			+"'";
		DBHelper.doQuery(sqlQuery, function(err, data) {
			callback(err, data);
		});
	}
};

exports.delete = function (id, callback){
	var sqlQuery = "DELETE FROM `user`   		\
					WHERE `id`='" + id + "'";
	DBHelper.doQuery(sqlQuery, function(err, data){
		callback(err, data);
	});
};
