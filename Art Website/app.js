const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const app = express();
const xoauth2 = require('xoauth2');
const port = process.env.PORT || 3000;

// Middlware
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());


// Index route
app.get('/', (req, res) => {
    res.render('index');
});

// Send email
app.post('/contactme', (req,res,next) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'atxlifestyle512@gmail.com',
            pass: 'passwordGoesHere'
        }
    });

    var mailOptions = {
        from: "Julie Mosley Website",
        to: 'alejandrossh@hotmail.com',
        subject: "Message from your website!",
        text: "You have mail from... Name: " + req.body.name+ "Email " + req.body.email + "Message " + req.body.message
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if(error) {
            return(error);
        } else {
        console.log("Message sent " + info.response);
        res.redirect('/'); }

    });

});


// Port Listening
app.listen(port, function(){
    console.log("Listening");
});
