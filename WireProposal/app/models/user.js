var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    id : String,
    active :Boolean,
    profile_pic : String,
    name : String,
    email : String,
    user_role_id : String,
    password : String,
    phone_number : String,
    address : String,
    zip_code : String,
    city : String,
    created_at: Date,
    updated_at: Date,
    job_name:String
});