var morgan = require('morgan');
var bodyParser = require('body-parser');
var nunjucks = require('nunjucks');
var chalk = require('chalk');
var models = require('./models');
const app = require('express')();
const env = nunjucks.configure('views', {noCache: true});

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
