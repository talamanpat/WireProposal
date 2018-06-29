var mongoose = require('mongoose');

module.exports = mongoose.model('Proposal', {
    id : String,
    datetime : Date,
    description : String,
    negotiable : String,
    status : Number,
    company_id : String,
    job_id : String,
    created_at: Date,
    updated_at: Date
});