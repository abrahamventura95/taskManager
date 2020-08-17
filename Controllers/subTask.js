var validator	= require('validator');
var queries		= require('../DB/Connections/subTask');

function validate(body, callback) {
	if(validator.isEmpty(body.tag)){
		callback('Tag is required');
	}else{
			callback('pass');
	}
};

exports.get = function(req, res) {
	queries.get(req.param('id'), function(err, data){
		res.json(data);
	});
};

exports.create = function(req, res) {
	validate(req.body, function(value){
		try{
			if (value == 'pass') {
				var subtask = {
					task: 	   	req.body.task,
				    tag:  		req.body.tag
				};
				queries.create(subtask, function(err, data){
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
				var subtask = {
					id: 	   	req.param('id'),
				    tag:  		req.body.tag,
				    status: 	req.body.status
				};
				queries.edit(subtask, function(err, data){
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