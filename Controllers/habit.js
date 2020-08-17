var validator	= require('validator');
var queries		= require('../DB/Connections/habit');

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

exports.getByAlarm = function(req, res) {
	var obj = {
		user: req.user.sub,
		alarm: req.body.alarm
	}
	queries.getByAlarm(obj, function(err, data){
		res.json(data);
	});
};

exports.create = function(req, res) {
	var habit = {
		user: 	   	req.user.sub,
	    tag:  		req.body.tag,
	    status: 	req.body.status,
		alarm:   	req.body.alarm
	};
	queries.create(habit, function(err, data){
		res.json(data);
	});
};

exports.edit = function(req, res){
	var habit = {
		id: 	   	req.param('id'),
	    tag:  		req.body.tag,
	    status: 	req.body.status,
		alarm:   	req.body.alarm
	};
	queries.edit(habit, function(err, data){
		res.json(data);
	});
}

exports.delete = function(req,res){
	queries.delete(req.param('id'), function(err, data){
		res.json(data);
	});
}