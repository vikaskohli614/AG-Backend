const mongoose = require('mongoose');

const BlogSchema = new mongoose.Schema({
    Title: {
        type: String,
        required: true,
        trim: true,
    },
    Content: {
        type: String,
        required: true,
    },
    Category: {
        type: String,
        required: true,
    },
    Image: {
        type: String,
        default: '',
    },
}, {
    timestamps: true,
});

const BlogModel = mongoose.model('Blog', BlogSchema);

module.exports = { BlogModel };
