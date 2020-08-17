var validator	= require('validator');
var queries		= require('../DB/Connections/appointment');

function validate(body,callback) {
	if(validator.isEmpty(body.tag)){
		callback('Tag is required');
	}else{
		if(validator.isEmpty(body.time)){
			callback('Time is required');
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

exports.getByTopic = function(req, res) {
	var obj = {
		user: req.user.sub,
		topic: req.body.topic
	}
	queries.getByTopic(obj, function(err, data){
		res.json(data);
	});
};

exports.getByPlace = function(req, res) {
	var obj = {
		user: req.user.sub,
		place: req.body.place
	}
	queries.getByPlace(obj, function(err, data){
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
				var appointment = {
					user: 	req.user.sub,
				    tag:  	req.body.tag,
				    place:  req.body.place,
				    topic:  req.body.topic,
				    status: req.body.status,
				    time:  	req.body.time
				};
				queries.create(appointment, function(err, data){
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
				var appointment = {
					id: 	req.param('id'),
				    tag:  	req.body.tag,
				    topic:  req.body.topic,
				    place:  req.body.place,
				    status: req.body.status,
					time:   req.body.time
				};
				queries.edit(appointment, function(err, data){
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