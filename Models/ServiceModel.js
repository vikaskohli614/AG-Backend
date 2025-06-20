const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
    Name: {
        type: String,
        require: true
    },
    Category: {
        type: String,
        require: true
    },
    Image: {
        type: String,
        require: true
    },
    Description: {
        type: String,
        require: true
    },
}, { timestamps: true });

const ServiceModel = mongoose.model('Service', ServiceSchema);

module.exports = { ServiceModel }
