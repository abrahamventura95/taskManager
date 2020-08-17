require('dotenv').config();
var validator	= require('validator');
var queries		= require('../DB/Connections/task');

function validate(body,callback) {
	if(validator.isEmpty(body.tag)){
		callback('Tag is required');
	}else{
		if(validator.isEmpty(body.priority) || 
			!validator.isIn(body.priority,['1','2','3','4','5'])){
				callback('Priority out of range');
		}else{
			callback('pass');
		}
	}
};

exports.get = function(req, res) {
	queries.get(req.user.sub, function(err, data){
		res.json(data);
	});
};

exports.getByStatus = function(req, res) {
	var obj = {
		user: req.user.sub,
		status: req.body.status
	}
	queries.getByStatus(obj, function(err, data){
		res.json(data);
	});
};

exports.getByTag = function(req, res) {
	var obj = {
		user: req.user.sub,
		tag: req.body.tag
	}
	queries.getByTag(obj, function(err, data){
		res.json(data);
	});
};

exports.getByPriority = function(req, res) {
	var obj = {
		user: req.user.sub,
		priority: req.body.priority
	}
	queries.getByPriority(obj, function(err, data){
		res.json(data);
	});
};

exports.getByDate = function(req, res) {
	var obj = {
		user: req.user.sub,
		date: req.body.date
	}
	queries.getByDate(obj, function(err, data){
		res.json(data);
	});
};

exports.create = function(req, res) {
	validate(req.body, function(value){
		try{
			if (value == 'pass') {
				var task = {
					user: 	   	req.user.sub,
				    tag:  		req.body.tag,
				    status: 	req.body.status,
					priority:   req.body.priority
				};
				queries.create(task, function(err, data){
					res.json(data);
				});
			}
			else 
				throw Error(value);
		}catch(err){
			obj = {
				error: 	process.env.BAD_REQUEST,
				msg: 	err.message
			};
			res.json(obj);
		}
	});
};

exports.edit = function(req, res){
	validate(req.body, function(value){
		try{
			if(value == 'pass'){
				var task = {
					id: 	   	req.param('id'),
				    tag:  		req.body.tag,
				    status: 	req.body.status,
					priority:   req.body.priority
				};
				queries.edit(task, function(err, data){
					res.json(data);
				});
			}else{
				throw Error(value);
			}
		}catch(err){
			obj = {
				error: 	process.env.BAD_REQUEST,
				msg: 	err.message
			};
			res.json(obj);
		}
	});
}

exports.delete = function(req,res){
	queries.delete(req.param('id'), function(err, data){
		res.json(data);
	});
}