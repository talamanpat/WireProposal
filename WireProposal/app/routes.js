var Proposal = require('./models/proposal');
const uuidv4 = require('uuid/v4');

module.exports = function(app) {

    app.get('/api/props', function(req, res) {
        Proposal.find(function(err, props) {

            if (err)
                res.send(err)

            res.json(props);
        });
    });

    app.post('/api/props', function(req, res) {

        Proposal.create({
            "id" : uuidv4(),
            "datetime" : req.body.datetime,
            "description" : req.body.description,
            "negotiable" : req.body.negotiable,
            "status" : 0,
            "company_id" : uuidv4(),
            "job_id" : uuidv4(),
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

    app.delete('/api/props/:proposal_id', function(req, res) {
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

    app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

};