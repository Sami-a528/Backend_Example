const mongoose = require("mongoose")

const userEnquireSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true
    }
});

const enquiryModel = mongoose.model("enquiry", userEnquireSchema)

module.exports = enquiryModel