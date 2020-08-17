const jwt 		= require('jsonwebtoken');
var DBHelper 	= require('../DB/helper');

exports.check = function(req, res, next){
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]

    if (token == null) 
    	return res.sendStatus(process.env.UNAUTHORIZED);
    
    jwt.verify(token, process.env.secretOrKey, (err, user) =>{
        if (err) return res.sendStatus(process.env.FORBIDDEN);
        req.user = user;
        next();
    });
}

exports.checkTask = function(req, res, next){
	var id = req.body.task || req.param('id');
	var sqlQuery = "SELECT *									\
					FROM task									\
					WHERE id_user ='" + req.user.sub  + "'	AND	\
						  id 	  ='" + id 			  + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		if(data[0] == undefined) return res.sendStatus(process.env.FORBIDDEN);
		next();
	});
}

exports.checkHabit = function(req, res, next){
	var id = req.body.habit || req.param('id');
	var sqlQuery = "SELECT *									\
					FROM habit									\
					WHERE id_user ='" + req.user.sub  + "'	AND	\
						  id 	  ='" + id 			  + "'";
	DBHelper.doQuery(sqlQuery, function(err, data) {
		if(data[0] == undefined) return res.sendStatus(process.env.FORBIDDEN);
		next();
	});
}
