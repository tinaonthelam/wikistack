
const express = require('express');

const router = express.Router();
const models = require('../models');

var Page = models.Page;
var User = models.User;


router.get('/', function(req, res, next) {
	User.findAll({
		attributes: ['name']
	})
	.then(function(foundUser) {
		res.render('../views/users', {users: foundUser})
	})
	.catch(next);
})


router.get('/:id', function(req, res, next) {
	User.findOne({
		attributes: ['id']
	})
	.then(function(id) {
		Page.findAll({
			where: {authorId : id}	
		})
		
	})
	.then(function(pages){
		res.render('', {user})
	})
	.catch(next);
})


module.exports = router;