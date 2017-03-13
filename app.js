var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var chalk = require('chalk');
var models = require('./models/index.js');
const express = require('express');
var path = require('path');
const app = express();
const env = nunjucks.configure('views', {noCache: true});
const routes = require('./routes/wiki');

app.use(bodyParser.urlencoded({ extended: true })); // for HTML form submits
app.use(bodyParser.json()); // would be for AJAX requests

app.use(express.static(path.join(__dirname, '/public')));
app.use('/wiki', routes);


app.set('view engine', 'html');
app.engine('html', nunjucks.render);

models.User.sync({})
.then(function () {
    return models.Page.sync({})
})
.then(function () {
    app.listen(3000, function () {
        console.log(chalk.bgCyan('hay im hur on port 3000'));
    });
})
.catch(console.error);
