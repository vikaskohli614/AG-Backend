const mongoose = require('mongoose');

const PrivacyPolicySchema = new mongoose.Schema({
    PrivacyPolicy: {
        type: String,
        require: true,
        default: ''
    }
}, { timestamps: true });


const PrivacyPolicysModel = mongoose.model("PrivacyPolicys", PrivacyPolicySchema);

module.exports = PrivacyPolicysModel;

