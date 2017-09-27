'use strict';

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
const hb = require('express-handlebars');
const yelp = require('yelp-fusion');
const url = require('url');
const path = require('path');
const options = { method: 'POST',
    url: 'https://api.yelp.com/oauth2/token',
    qs:
        { grant_type: 'client_credentials',
            client_id: 'qzNrKkfNxLz-jrs8lUBMjA',
            client_secret: 'rxeCWouhc1dmavPmL1XzYrUad3GzbRrZqz4PKnGD5A7VHR8zWhgOGhfprTohBYl7'},
    headers:
        { 'postman-token': '044a3a55-a5b4-8a0d-f10a-fe958cbe9a98',
            'cache-control': 'no-cache',
            'content-type': 'application/x-www-form-urlencoded',
            'access_token': 'EAqZcFtQ-mimlJypE8N2Z099gkNOs50B-F_YMHP1ZiuNz-82b4ZR6bqx7zIePsMpkA4FrGkhTgKi9f1ROglfLkClqIpH1OpXhKi1ggN62IX-9RmT2IxnEUI_amKnWXYx'} };
const clientId = 'qzNrKkfNxLz-jrs8lUBMjA';
const clientSecret = 'rxeCWouhc1dmavPmL1XzYrUad3GzbRrZqz4PKnGD5A7VHR8zWhgOGhfprTohBYl7';


// Handlebars - View Engine
app.engine('handlebars', hb()); // no default layer needed
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, 'views'))); //path for rating images

//Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Loading first page - Search Form
app.get('/', function(req,res){
    res.render('index');
});

// Working on the Post Request from the landing page's form
app.post('/yelp', (req, res) => {
    let businessName = req.body.searchBusiness;
    let businessCity = req.body.searchCity;
    var result = [];
    const searchQuery = {
        term: businessName,
        location: businessCity,
        limit: 10
    };

    yelp.accessToken(clientId, clientSecret).then(response => {
        const client = yelp.client(response.jsonBody.access_token);

        client.search(searchQuery).then(response => {
            let businesses = response.jsonBody.businesses;
            for(var i=0;i<10;i++) {
                result.push(businesses[i].name + ", " + businesses[i].rating);
            }
            res.render('yelp',{
                businessName: businessName,
                result: result,
            }) //res.render
        }); // client search
    }) // yelp access token
    .catch(function (err) {
        console.error(err);
    });
});


app.listen(3000, function(){
    console.log("Port 3000 is ON");
});
