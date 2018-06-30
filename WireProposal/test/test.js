'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../app.js'); // Our app

describe('API endpoint /api/props', function () {
    this.timeout(5000); // How long to wait for a response (ms)

  
    before(function () {
    });

    after(function () {

    });


    // POST - Add new prop
    it('should add new proposal', function () {
        return chai.request(app)
            .post('/api/props')
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
            .get('/api/props/')
            .then(function (res) {
                expect(res).to.have.status(200);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
            });
    });

         // PATCH - Change status
    it('should change the status', function () {

        return chai.request(app)
            .patch('/api/props/'+"af6603d0-7c4b-11e8-a339-a3303c765d50").send({
                "status" : 2
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