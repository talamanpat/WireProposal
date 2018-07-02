var Proposal = require('../models/proposal');
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
    Proposal.find(function(err, props) {
        if (err)
            res.send(err)
        res.json(props);
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
        "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
        "job_id" : "71726c29-e207-4dfa-a6d7-246eadb769e6" ,
        "created_at": Date.now(),
        "updated_at": Date.now()
    }, function(err, prop) {
        if (err)
            res.send(err);

        // get and return all the props after you create another
        Proposal.find(function(err, props) {
            if (err)
                res.send(err)
            res.status(201).json(props);
        });
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

        // get and return all the props after you create another
        Proposal.find(function(err, props) {
            if (err)
                res.send(err)
            res.json(props);
        });
    });
});



module.exports = router;