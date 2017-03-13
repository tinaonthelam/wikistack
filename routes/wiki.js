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

	page.save()
	.then(function(done) {
		var urlTitle = page.dataValues.urlTitle;
		res.redirect('/' + urlTitle);
	})
	.catch(function(err) {
		throw(err);
	})
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
