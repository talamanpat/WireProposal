var Proposal = require('../models/proposal');
var Company = require('../models/company');
var User = require('../models/user');
var Job = require('../models/job');
const uuidv4 = require('uuid/v4');
var jwt      = require('jsonwebtoken');
var express  = require('express');
let router   = express.Router(); 
var confs    = require('../../config/confs');     

    router.use(function(req, res, next) {

    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if (token) {
        jwt.verify(token, confs.tokenKey, function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          req.decoded = decoded;    
          next();
        }
      });
    } else {
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });  
    }
  });
  
//----------------------------------------------------
router.put('/props', function(req, res) {

    Company.findOne({'user_id' : req.decoded.userId},function(err, comp) {
        if (err)
            res.send(err)
        Proposal.find({
            company_id : comp.id
        },function(err, props) {
            if (err)
                res.send(err)
            res.json(props);
        });
    });


   
});
router.post('/props', function(req, res) {
    var propId= uuidv4();
    Proposal.create({
        "id" :propId ,
        "datetime" : req.body.datetime,
        "description" : req.body.description,
        "negotiable" : req.body.negotiable,
        "status" : 0,
        "company_id" : req.decoded.userId,
        "job_id" : req.body.job_id ,
        "created_at": Date.now(),
        "updated_at": Date.now()
    }, function(err, prop) {
        if (err)
            res.send(err);

        Company.findOne({'user_id' : req.decoded.userId},function(err, comp) {
            if (err)
                res.send(err)
            Proposal.find({
                company_id : comp.id
            },function(err, props) {
                if (err)
                    res.send(err)
                
                res.status(201).json(props);
            });
        });
        
        // get and return all the props after you create another
    /*    Proposal.find(function(err, props) {
            if (err)
                res.send(err)
            res.status(201).json(props);
        });*/
    });

});

router.delete('/props/:proposal_id', function(req, res) {
    Proposal.remove({
        id : req.params.proposal_id
    }, function(err, prop) {
        if (err)
            res.send(err);

        // get and return all the props after you create another
        Proposal.find(function(err, props) {
            if (err)
                res.send(err)
            
            Job.findOne({"id":req.body.job_id}, 
                function(err, j){
             
                    if (err || j===null)
                        res.send(err);
                    else{
                    User.findOne({"id":j.user_id}, 
                        function(err, u){
                            if (err)
                                res.send(err);
                            else
                            res.json(u);
                        });
                    }
                });
            res.json(props);


        });
    });
});

router.patch('/props/:proposal_id', function(req, res) {
    if(req.body.status<0||req.body.status>3)
      {
            return   res.status(400).send({
                "error": "status is not valid."
            });
        }
    Proposal.findOneAndUpdate({"id":req.params.proposal_id},{ "status" : req.body.status }, 
    function(err, doc){
        if (err)
            res.send(err);

            Company.findOne({'user_id' : req.decoded.userId},function(err, comp) {
                if (err)
                    res.send(err)
                Proposal.find({
                    company_id : comp.id
                },function(err, props) {
                    if (err)
                        res.send(err)
                    res.json(props);
                });
            });
        
        // get and return all the props after you create another
       /* Proposal.find(function(err, props) {
            if (err)
                res.send(err)
            res.json(props);
        });*/
    });
});
router.put('/getInfoUserByJob', function(req, res) {
    //console.log(req.body.job_id);
    Job.findOne({"id":req.body.job_id}, 
    function(err, j){
 
        if (err || j===null)
            res.send(err);
        else{
        User.findOne({"id":j.user_id}, 
            function(err, u){
                if (err)
                    res.send(err);
                else{
        
                    u.job_name = j.title;
                    res.json(u);
                }
            });
        }
    });
    
 
});


module.exports = router;