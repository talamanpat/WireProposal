var User = require('../models/user');
var Company = require('../models/company');
var jwt    = require('jsonwebtoken');
var md5 = require('md5');
var express     = require('express');
let router = express.Router(); 
var confs = require('../../config/confs');     

    router.post('/auth', function(req, res) {

        if(!req.body.email||!req.body.password)
          res.json({ success: false, message: 'Authentication failed. Fill user and password.' });
        else{
          User.findOne({
            email: req.body.email
          }, function(err, user) {
        
            if (err) throw err;
        
            if (!user) {
              res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {
        
              if (user.password != md5(req.body.password)) {
                res.json({ success: false, message: 'Authentication failed. Wrong password.' });
              } 
              if (user.user_role_id!="company") {
                res.json({ success: false, message: 'This is not your app! This is for companies.' });
              } else {
        
              
            const payload = {
              role: user.user_role_id,
              userId : (user.id)
            };
                var token = jwt.sign(payload, confs.tokenKey, {
                  expiresIn: 2880 // expires in 48 hours
                });
        
                res.json({
                  success: true,
                  message: 'Token granted!',
                  token: token
                });
              }   
        
            }
        
          });
        }
      });

      module.exports = router;