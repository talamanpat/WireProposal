var User = require('../models/user');
var Company = require('../models/company');
var jwt    = require('jsonwebtoken');
var md5 = require('md5');
var express     = require('express');
let router = express.Router(); 
var confs = require('../../config/confs');     

    router.post('/auth', function(req, res) {

        User.findOne({
          email: req.body.email
        }, function(err, user) {
      
          if (err) throw err;
      
          if (!user) {
            res.json({ success: false, message: 'Authentication failed. User not found.' });
          } else if (user) {
      
            if (user.password != md5(req.body.password)) {
              res.json({ success: false, message: 'Authentication failed. Wrong password.' });
            } else {
      
          const payload = {
            role: (user.user_role_id=="company"),
            user : (user.id)
          };
              var token = jwt.sign(payload, confs.tokenKey, {
                expiresIn: 1440 // expires in 24 hours
              });
      
              res.json({
                success: true,
                message: 'Token granted!',
                token: token
              });
            }   
      
          }
      
        });
      });

      module.exports = router;