const express = require('express');
const router = express.Router();

const models = require('../models');
var Page = models.Page;
var User = models.User;

router.get('/', function(req, res, next) {
	res.redirect('/')
});

router.post('/', function(req, res, next) {

	var page = Page.build({
	 title: req.body.title,
	 content: req.body.content
 });

	console.log(page);
	page.save()
	.then(function(done) {
		console.log(done);
		res.redirect('/');
	})
	.catch(function(err) {
		throw(err);
	})
});


router.get('/add', function(req, res, next) {
	res.render('../views/addpage')
});


module.exports = router;
