var validator	= require('validator');
var queries		= require('../DB/Connections/habitDay');

function validate(body, callback) {
	if(validator.isEmpty(body.tag)){
		callback('Tag is required');
	}else{
		if(validator.isEmpty(body.day) || 
			!validator.isIn(body.day,['monday',
									  'tuesday',
									  'wednesday',
									  'thursday',
									  'friday',
									  'saturday',
									  'sunday',
									  'everyday'])){
				callback('Day out of range');
		}else{
			callback('pass');
		}
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
				var habitDay = {
					habit: 	   	req.body.habit,
				    tag:  		req.body.tag,
				    frequency:  req.body.frequency,
				    day:  		req.body.day,
				    time:  		req.body.time
				};
				queries.create(habitDay, function(err, data){
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
				var habitDay = {
					id: 	   	req.param('id'),
				    tag:  		req.body.tag,
				    frequency:  req.body.frequency,
				    day: 		req.body.day,
				    time:  		req.body.time
				};
				queries.edit(habitDay, function(err, data){
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