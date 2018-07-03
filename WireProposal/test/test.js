'use strict';

process.env.NODE_ENV = 'test';
const chai = require('chai');
const expect = require('chai').expect;
const md5 = require('md5');

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /api/props', function () {
    this.timeout(5000); // How long to wait for a response (ms)
    var token = "";
    var emailUser = "test"+Math.floor(Math.random() * 1000000) +"@test.com";
    var companyNameUser ="TTTTest"+Math.floor(Math.random() * 1000000) ;
    var idUser ="";

    before(function () {
    });

    after(function () {

    });

    //POST-create user for testing
    //TODO: create local authentication and protect setup route
    it('should create a new user company', function () {
        return chai.request(app)
            .post('/setup/company')
            .send({
                "name" : "Juan perez",
                "email" : emailUser, 
                "password" : "123456", 
                "companyName" : companyNameUser,
                
            })
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name');
                expect(res.body.id).to.be.an('string');
                idUser = res.body.id;
            });
    });

     //POST - get token
     it('should generate a new token for user', function () {
        return chai.request(app)
            .post('/auth').set('content-type', 'application/x-www-form-urlencoded')
            .send({
                "email" : emailUser, 
                "password" : "123456", 
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('success');
                expect(res.body.success).to.be.an('boolean').that.is.equals(true);
                expect(res.body).to.have.property('token');
                expect(res.body.token).to.be.an('string');
                token = res.body.token;
            });
    });
    // POST - auth and get token
    it('should add new proposal', function () {
        return chai.request(app)
            .post('/api/props')
            .set({'x-access-token':token})
            .send({
                "datetime" : Date.now(),
                "description" : "TTTDescription"+Math.floor(Math.random() * 1000000) ,
                "negotiable" : "TTTNegotiable"+Math.floor(Math.random() * 1000000) ,
                "job_id":"71726c29-e207-4dfa-a6d7-246eadb769e6"
            })
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');                
            });
    });
        // PUT - List all proposals
    it('should return all proposals', function () {
        return chai.request(app)
            .put('/api/props')
            .set({'x-access-token':token})
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

         // PATCH - Change status
    it('should change the status', function () {

        return chai.request(app)
        //TODO: get id from own prop and add validation of user prop modification, time...
            .patch('/api/props/'+"3b5df17b-1240-4051-9edb-61031d93ff6d")
            .set({'x-access-token':token})
            .send({
                "status" : 3
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });
     // PUT - get user by job 
     it('should return info about the user who is posting', function () {
        return chai.request(app)
            .put('/api/getInfoUserByJob')
            .set({'x-access-token':token})  
            .send({
                "job_id" : "3eb6fae4-449d-4bf6-bfb5-fa1d60417974",
            })
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('name');
                expect(res.body.id).to.be.an('string');
            });
    });

});