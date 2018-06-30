var mongoose = require('mongoose');
var Proposal = require('../app/models/proposal');
var Company = require('../app/models/company');
var User = require('../app/models/user');
const uuidv4 = require('uuid/v4');
var props = [{
    "id" : "af6603d0-7c4b-11e8-a339-a3303c765d50",
    "datetime" : new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    "description" : "This is one proposal named x",
    "negotiable" : "Yes",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "b0a3ac28-33ab-4bd8-b38d-4aa984414e45",
    "created_at": Date.now(),
    "updated_at": Date.now()
},
{
    "id" : "ca500836-d2a6-4fe2-aa3e-f8e3c01c35d0",
    "datetime" : new Date(new Date().getTime()  + 2 * 24 * 60 * 60 * 1000),
    "description" : "This is another proposal named z",
    "negotiable" : "No",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "30499190-7c21-4a38-b986-4382ca39840f",
    "created_at": Date.now(),
    "updated_at": Date.now()
}];

var users= [{
    "id" : "c72b724e-7f84-4973-8a6f-f48550b07b60",
    "active" :true,
    "profile_pic" : "empty",
    "name" : "Jean Pierre",
    "email" : "jean.pierre@example.com",
    "user_role_id" : "admin",
    "password" : "e10adc3949ba59abbe56e057f20f883e",
    "phone_number" : "12345678",
    "address" : "Example st. 2323",
    "zip_code" : "8700",
    "city" : "Horsens",
    "created_at": Date.now(),
    "updated_at": Date.now()}
]
var companies= [{
    "id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "name" : "Talaman EIRL",
    "lat" : 12,
    "ing" : 33,
    "user_id" : "c72b724e-7f84-4973-8a6f-f48550b07b60",
    "logo_image_url" : "empty",
    "cvr" : "",
    "is_paid" : true,
    "is_enabled" : true,
    "is_visible" : true,
    "created_at": Date.now(),
    "updated_at": Date.now()
}]

module.exports =  function(app) {

    var conn = mongoose.connection;
    conn.on('open', function () {

        conn.db.listCollections({name: 'users'})
        .next(function(err, collinfo) {
            if (err)
            res.send(err);
            if (!collinfo) {
                console.log("New database, mocking!");
                console.log("creating users and companies...");
                User.create(users, function(err, prop) {
                    if (err)
                        res.send(err);
                });
                Company.create(companies, function(err, prop) {
                    if (err)
                        res.send(err);
                });
                console.log("done");
            }
        });

        conn.db.listCollections({name: 'proposals'})
        .next(function(err, collinfo) {
            if (err)
            res.send(err);
            if (!collinfo) {
                console.log("creating proposals...");
                Proposal.create(props, function(err, prop) {
                    if (err)
                        res.send(err);
                });
                console.log("done");
            }
        });

    });
   
};