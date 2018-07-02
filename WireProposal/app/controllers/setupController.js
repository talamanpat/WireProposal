var User = require('../models/user');
var Company = require('../models/company');
const uuidv4 = require('uuid/v4');
var md5 = require('md5');
var express     = require('express');
let router = express.Router(); 

router.post('/company', function(req, res) {

    var userId= uuidv4();
    var companyId= uuidv4();
    User.create({
        "id" : userId,
        "active" :true,
        "profile_pic" : "empty",
        "name" : req.body.name,
        "email" : req.body.email,
        "user_role_id" : "company",
        "password" : md5(req.body.password),
        "phone_number" : "12345678",
        "address" : "Example st. 2323",
        "zip_code" : "8700",
        "city" : "Horsens",
        "created_at": Date.now(),
        "updated_at": Date.now()
    }, function(err, user) {
        if (err)
            res.send(err);

        Company.create({
            "id" : companyId,
            "name" : req.body.companyName,
            "lat" : 12,
            "ing" : 33,
            "user_id" : userId,
            "logo_image_url" : "empty",
            "cvr" : "",
            "is_paid" : req.body.idPaid||false,
            "is_enabled" : req.body.isEnabled||false,
            "is_visible" : req.body.isVisible||false,
            "created_at": Date.now(),
            "updated_at": Date.now()},
            function(err, comp) {
                if (err)
                    res.send(err)
                res.status(201).json(comp);
        });
    });

});



module.exports = router;