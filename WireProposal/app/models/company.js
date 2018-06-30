var mongoose = require('mongoose');

module.exports = mongoose.model('Company', {
    id : String,
    name : String,
    lat : Number,
    ing : Number,
    user_id : String,
    logo_image_url : String,
    cvr : String,
    is_paid : Boolean,
    is_enabled : Boolean,
    is_visible : Boolean,
    created_at: Date,
    updated_at: Date
});