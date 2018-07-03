var mongoose = require('mongoose');
var Proposal = require('../app/models/proposal');
var Company = require('../app/models/company');
var User = require('../app/models/user');
var Job = require('../app/models/job');
const uuidv4 = require('uuid/v4');

var users= [{
    "id" : "c72b724e-7f84-4973-8a6f-f48550b07b60",
    "active" :true,
    "profile_pic" : "empty",
    "name" : "Jean Pierre",
    "email" : "jean.pierre@example.com",
    "user_role_id" : "company",
    "password" : "e10adc3949ba59abbe56e057f20f883e",
    "phone_number" : "12345678",
    "address" : "Example st. 2323",
    "zip_code" : "8700",
    "city" : "Horsens",
    "created_at": Date.now(),
    "updated_at": Date.now()
    },{
        "id" : "90c56a96-0d18-43aa-81f8-ceca0d265859",
        "active" :true,
        "profile_pic" : "empty",
        "name" : "Paul Walker",
        "email" : "paul.walker@companyexample.com",
        "user_role_id" : "company",
        "password" : "e10adc3949ba59abbe56e057f20f883e",
        "phone_number" : "12345678",
        "address" : "Example st. 2323",
        "zip_code" : "8701",
        "city" : "Horsens",
        "created_at": Date.now(),
        "updated_at": Date.now()
        },
    {
        "id" : "d0d542a2-dc61-4060-9d42-51f1d9a69fe9",
        "active" :true,
        "profile_pic" : "empty",
        "name" : "Daniel Antonio Tala de Dompierre de Chaufepie",
        "email" : "daniel.talaman@gmail.com",
        "user_role_id" : "applicant",
        "password" : "e10adc3949ba59abbe56e057f20f883e",
        "phone_number" : "12345678",
        "address" : "Glentevej 20",
        "zip_code" : "8701",
        "city" : "Horsens",
        "created_at": Date.now(),
        "updated_at": Date.now()
    },
    {
        "id" : "7347c0c3-4505-474c-ab18-639eea616bab",
        "active" :true,
        "profile_pic" : "empty",
        "name" : "John Doe",
        "email" : "john.doe@example.com",
        "user_role_id" : "applicant",
        "password" : "e10adc3949ba59abbe56e057f20f883e",
        "phone_number" : "12345678",
        "address" : "Glentevej 20",
        "zip_code" : "8701",
        "city" : "Horsens",
        "created_at": Date.now(),
        "updated_at": Date.now()
    }
]
var companies= [{
    "id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "name" : "WireDelta",
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
},{
    "id" : "4c0451fc-20e1-4196-a2b2-5ed3f9578dd0",
    "name" : "Examcompany LTDA",
    "lat" : 12,
    "ing" : 33,
    "user_id" : "90c56a96-0d18-43aa-81f8-ceca0d265859",
    "logo_image_url" : "empty",
    "cvr" : "",
    "is_paid" : true,
    "is_enabled" : true,
    "is_visible" : true,
    "created_at": Date.now(),
    "updated_at": Date.now()
}]
var jobs = [{ 
    "id" : "71726c29-e207-4dfa-a6d7-246eadb769e6",
    "is_emergency" : true,
    "title" : "Senior Software Engineer",
    "description" : "Software design and development",
    "allow_contact_by_app" : true,
    "can_user_bring_boat" : true,
    "allow_picking_from_spot" : true,
    "allow_repair_on_spot" : true,
    "allow_contact_by_phone" : true,
    "allow_contact_by_email" : true,
    "lat": 2,
    "ing":3,
    "price":100000,
    "posted":true,
    "due_datetime": new Date(new Date().getTime()  + 10 * 24 * 60 * 60 * 1000),
    "is_done":false,
    "user_id":"d0d542a2-dc61-4060-9d42-51f1d9a69fe9",
    "boat_id":"",
    "service_id":"",
    "awarded_company_id":"c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "created_at": Date.now(),
    "updated_at": Date.now()
},
{ 
    "id" : "4780e84b-fb95-4584-bc1d-aae24866a3fd",
    "is_emergency" : false,
    "title" : "Software Architect",
    "description" : "Software architecture",
    "allow_contact_by_app" : true,
    "can_user_bring_boat" : true,
    "allow_picking_from_spot" : true,
    "allow_repair_on_spot" : true,
    "allow_contact_by_phone" : true,
    "allow_contact_by_email" : true,
    "lat": 2,
    "ing":3,
    "price":120000,
    "posted":true,
    "due_datetime": new Date(new Date().getTime()  + 20 * 24 * 60 * 60 * 1000),
    "is_done":false,
    "user_id":"d0d542a2-dc61-4060-9d42-51f1d9a69fe9",
    "boat_id":"",
    "service_id":"",
    "awarded_company_id":"c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "created_at": Date.now(),
    "updated_at": Date.now()
},{
"id" : "3eb6fae4-449d-4bf6-bfb5-fa1d60417974",
    "is_emergency" : true,
    "title" : "Technical support",
    "description" : "other",
    "allow_contact_by_app" : true,
    "can_user_bring_boat" : true,
    "allow_picking_from_spot" : true,
    "allow_repair_on_spot" : true,
    "allow_contact_by_phone" : true,
    "allow_contact_by_email" : true,
    "lat": 2,
    "ing":3,
    "price":100000,
    "posted":true,
    "due_datetime": new Date(new Date().getTime()  + 12 * 24 * 60 * 60 * 1000),
    "is_done":false,
    "user_id":"7347c0c3-4505-474c-ab18-639eea616bab",
    "boat_id":"",
    "service_id":"",
    "awarded_company_id":"2b1b32d9-5b2e-4899-add2-53a8fd570b4",
    "created_at": Date.now(),
    "updated_at": Date.now()
},{
    "id" : "210356a6-c9dd-43a8-b930-79d0cba4f2b7",
        "is_emergency" : true,
        "title" : "Technical support 2",
        "description" : "other",
        "allow_contact_by_app" : true,
        "can_user_bring_boat" : true,
        "allow_picking_from_spot" : true,
        "allow_repair_on_spot" : true,
        "allow_contact_by_phone" : true,
        "allow_contact_by_email" : true,
        "lat": 2,
        "ing":3,
        "price":100000,
        "posted":true,
        "due_datetime": new Date(new Date().getTime()  + 12 * 24 * 60 * 60 * 1000),
        "is_done":false,
        "user_id":"7347c0c3-4505-474c-ab18-639eea616bab",
        "boat_id":"",
        "service_id":"",
        "awarded_company_id":"c5185640-57eb-4ea2-a4b7-50b3577a0f79",
        "created_at": Date.now(),
        "updated_at": Date.now()
    }
];
var props = [{
    "id" : "af6603d0-7c4b-11e8-a339-a3303c765d50",
    "datetime" : new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000),
    "description" : "This is one proposal from senior software engineer",
    "negotiable" : "Yes",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "71726c29-e207-4dfa-a6d7-246eadb769e6",
    "created_at": Date.now(),
    "updated_at": Date.now()
},
{
    "id" : "ca500836-d2a6-4fe2-aa3e-f8e3c01c35d0",
    "datetime" : new Date(new Date().getTime()  + 2 * 24 * 60 * 60 * 1000),
    "description" : "This is another proposal from senior software engineer",
    "negotiable" : "No",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "71726c29-e207-4dfa-a6d7-246eadb769e6",
    "created_at": Date.now(),
    "updated_at": Date.now()
},
{
    "id" : "b24f5668-52ba-477b-963b-c8dba85c39e9",
    "datetime" : new Date(new Date().getTime()  + 4 * 24 * 60 * 60 * 1000),
    "description" : "This is a proposal from the architect job",
    "negotiable" : "No",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "4780e84b-fb95-4584-bc1d-aae24866a3fd",
    "created_at": Date.now(),
    "updated_at": Date.now()
}
,
{
    "id" : "3b34f899-9541-465f-98b7-650509fa0f2c",
    "datetime" : new Date(new Date().getTime()  + 4 * 24 * 60 * 60 * 1000),
    "description" : "A new proposal for x project",
    "negotiable" : "No",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "4780e84b-fb95-4584-bc1d-aae24866a3fd",
    "created_at": Date.now(),
    "updated_at": Date.now()
},
{
    "id" : "3b5df17b-1240-4051-9edb-61031d93ff6d",
    "datetime" : new Date(new Date().getTime()  + 4 * 24 * 60 * 60 * 1000),
    "description" : "Someone offering technical support",
    "negotiable" : "No",
    "status" : 0,
    "company_id" : "c5185640-57eb-4ea2-a4b7-50b3577a0f79",
    "job_id" : "210356a6-c9dd-43a8-b930-79d0cba4f2b7",
    "created_at": Date.now(),
    "updated_at": Date.now()
},
{
    "id" : "70a7b000-47e2-451a-b05b-2191e1e5a727",
    "datetime" : new Date(new Date().getTime()  + 4 * 24 * 60 * 60 * 1000),
    "description" : "Someone offering technical support 2",
    "negotiable" : "No",
    "status" : 0,
    "company_id" : "2b1b32d9-5b2e-4899-add2-53a8fd570b4",
    "job_id" : "3eb6fae4-449d-4bf6-bfb5-fa1d60417974",
    "created_at": Date.now(),
    "updated_at": Date.now()
}];
module.exports =  function(app) {

    var conn = mongoose.connection;
    conn.on('open', function () {

        conn.db.listCollections({name: 'users'})
        .next(function(err, collinfo) {
            if (err)
            console.log(err);
            if (!collinfo) {
                console.log("New database, mocking!");
                console.log("creating users and companies...");
                User.create(users, function(err, prop) {
                    if (err)
                        console.log(err);
                });
                Company.create(companies, function(err, prop) {
                    if (err)
                        console.log(err);
                });
                console.log("done");
            }
        });

        conn.db.listCollections({name: 'proposals'})
        .next(function(err, collinfo) {
            if (err)
                console.log(err);
                
            if (!collinfo) {
                console.log("creating jobs and proposals...");
                Job.create(jobs, function(err, job) {
                    if (err)
                        console.log(err);
                });
                Proposal.create(props, function(err, prop) {
                    if (err)
                        console.log(err);
                });
                console.log("done");
            }
        });

    });
   
};