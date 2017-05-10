const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use(function(request, response, next) {
	var now = new Date().toString();
	var log = now + ' ' + request.method + ' ' + request.url;
	console.log(log);
	fs.appendFile('server.log', log + '\n', function(error) {
		if(error) {
			console.log('unable to append to server.');
		}
	});
	next();
});

app.use(function(request, response, next) {
	response.render('maintenance.hbs');	
});

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', function() {
	return new Date().getFullYear();
});

app.get('/', function(request, response) {
	response.render('home.hbs', {
		pageTitle: 'Home Page',
		welcomeMessage: 'Welcome to my homepage'
	});
	//response.send('<strong>Hello express</strong>');
});

hbs.registerHelper('screamIt', function(text) {
	return text.toUpperCase();
});

app.get('/about', function(request, response) {
	response.render('about.hbs', {
		pageTitle: 'About Page'
	});
});


app.get('/bad', function(request, response) {
	response.send({errorMessage: 'The request is unable to be processed'});
});

app.listen(3000, function() {
	console.log('server is up on port 3000');
});