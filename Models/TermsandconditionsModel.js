const mongoose = require('mongoose');

const TermsandconditionSchema = new mongoose.Schema({
    Termsandcondition: {
        type: String,
        require: true,
        default: ''
    }
}, { timestamps: true });


const TermsandconditionsModel = mongoose.model("Termsandconditions", TermsandconditionSchema);

module.exports = TermsandconditionsModel;

