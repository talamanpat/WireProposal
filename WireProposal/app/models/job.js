var mongoose = require('mongoose');

module.exports = mongoose.model('Job', {
    id : String,
    is_emergency : Boolean,
    title : String,
    description : String,
    allow_contact_by_app : Boolean,
    can_user_bring_boat : Boolean,
    allow_picking_from_spot : Boolean,
    allow_repair_on_spot : Boolean,
    allow_contact_by_phone : Boolean,
    allow_contact_by_email : Boolean,
    lat: Number,
    ing:Number,
    price:Number,
    posted:Boolean,
    due_date: Date,
    due_time:Date,
    is_done:Boolean,
    user_id:String,
    boat_id:String,
    service_id:String,
    awarded_company_id:String,
    created_at: Date,
    updated_at: Date
});