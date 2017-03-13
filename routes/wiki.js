const express = require('express');
const router = express.Router();

const models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
	// res.redirect('/')
	Page.findAll({
		attributes: ['urlTitle', 'title']
	})
	.then(function(foundPage) {
		res.render('../views/index', {pages: foundPage})
	})
	.catch(next);

});

router.get('/users', function(req, res, next) {
	User.findAll({
		attributes: ['name']
	})
	.then(function(foundUser) {
		res.render('../views/users', {users: foundUser})
	})
	.catch(next);
})

router.get('/users/:id', function(req, res, next) {
	User.findOne({
		attributes: ['name']
	})
	.then(function(foundUser) {
		res.render('../views/users', {users: foundUser})
	})
	.catch(next);
})

router.post('/', function(req, res, next) {

 	User.findOrCreate({
 		where: {
 			name : req.body.user,
 			email : req.body.email
 		}
 	})
 	.then(function(users){
 		console.log(users[0])
 		var user = users[0];

 		var page = Page.build({
			title: req.body.title,
			content: req.body.content
	 	});

	 	return page.save().then(function(page) {
	 		return page.setAuthor(user);
	 	});

 	})
	
	.then(function(done) {
		res.redirect(page.route);
	})
	.catch(next);

});


router.get('/add', function(req, res, next) {
	res.render('../views/addpage')
});

router.get('/:urlTitle', function (req, res, next) {
  Page.findOne({
		where: {
			urlTitle: req.params.urlTitle
		}
	})
	.then(function(foundPage) {
		res.render('../views/wikipage', {page: foundPage})
	})
	.catch(next);
});


module.exports = router;
