var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');

router.get('/', (req,res,next)=>{
    res.render('index', {title: 'Home'});
});

// Send email
router.post('/send', (req,res,next) => {
    var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'alejandro.sanchez4@g.austincc.edu',
            pass: 'alicias09'
        }
    });

    var mailOptions = {
        from: "Julie Mosley Website <julie@juliemosley.com>",
        to: 'alejandrossh@hotmail.com',
        subject: "Hello from Juslie Mosley Website!",
        text: "You have mail from... Name: " + req.body.name+ "Email " + req.body.email + "Message " + req.body.message
    }

    transporter.sendMail(mailOptions, (error, info)=>{
        if(error) {
            return(error);
        }
        console.log("Message sent " + info.response);
        res.redirect('/');
    });

});

module.exports = router;
