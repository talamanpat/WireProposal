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
    // POST - Add new prop
    it('should add new proposal', function () {
        return chai.request(app)
            .post('/api/props')
            .send({
                "datetime" : Date.now(),
                "description" : "req.body.description",
                "negotiable" : "req.body.negotiable"
            })
            .then(function (res) {
                expect(res).to.have.status(201);
                expect(res).to.be.json;
                expect(res.body).to.be.an('array');
        //        expect(res.body.proposal).to.be.an('array');//.that.deep.includes({id:4,title:'Norberto' });
                
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