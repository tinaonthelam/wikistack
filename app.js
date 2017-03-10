var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
const app = require('express')();
const env = nunjucks.configure('views', {noCache: true});

// have res.render work with html files
app.set('view engine', 'html');
// when res.render works with html files, have it use nunjucks to do so
app.engine('html', nunjucks.render);
