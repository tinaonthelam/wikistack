
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
	Page.findAll({
			where: {authorId : req.params.id},
			include: [
			  {model: User, as: 'author'}
	    ]
	})
	.then(function(pages){
		// console.log(pages[0].author);
		res.render('userLinks', {pages: pages, author: pages[0]})
	})
	.catch(next);
})


module.exports = router;
