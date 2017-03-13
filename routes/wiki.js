const express = require('express');
const router = express.Router();

const client = require('../models');

router.get('/', function(req, res, next) {
	res.redirect('/')
});

router.post('/', function(req, res, next) {
	console.log('body!', req.body);
	res.json(req.body);
	// res.send('got to POST /wiki/');
});


router.get('/add', function(req, res, next) {
	res.render('../views/addpage')
});


module.exports = router;