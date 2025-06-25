const mongoose = require('mongoose');

const ContactUsSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Email: {
        type: String,
        require: true
    },
    Mobile: {
        type: String,
        require: true
    },
    Service: {
        type: String,
        require: true
    },
    Message: {
        type: String,
        require: true
    },
    IsContacted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

const ContactUsModel = mongoose.model('ContactUs', ContactUsSchema);

module.exports = { ContactUsModel }
