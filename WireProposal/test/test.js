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
    before(function () {
    });

    after(function () {

    });

    //POST-create user for testing
    it('should create a new user company', function () {
        return chai.request(app)
            .post('/setup/company')
            .send({
                "name" : "Juan perez",
                "email" : emailUser, 
                "password" : "123456", 
                "companyName" : companyNameUser
            })
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('object');
                expect(res.body.id).to.be.an('string');
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
                expect(res.body.success).to.be.an('boolean').that.is.equals(true);
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
                "description" : "TTTDescription",
                "negotiable" : "TTTNegotiable"
            })
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
        //        expect(res.body.proposal).to.be.an('array');//.that.deep.includes({id:4,title:'Norberto' });
                
            });
    });
        // GET - List all proposals
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
            .patch('/api/props/'+"af6603d0-7c4b-11e8-a339-a3303c765d50")
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

    // GET - Invalid path
 /*   it('should return Not Found', function () {
        return chai.request(app)
            .get('/api/INVALID_PATH')
            .then(function (res) {
                throw new Error('Path exists!');
            })
            .catch(function (err) {
                expect(err).to.have.status(404);
            });
    });


    // POST - Bad Request
    it('should return Bad Request', function () {
        return chai.request(app)
            .post('/api/cats')
            .type('form')
            .send({
                color: 'YELLOW'
            })
            .then(function (res) {
                throw new Error('Invalid content type!');
            })
            .catch(function (err) {
                expect(err).to.have.status(400);
            });
    });*/
});