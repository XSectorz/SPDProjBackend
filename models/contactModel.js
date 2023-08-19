const mongoose = require("mongoose");

const contactScheme = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please add the contact name"]
    },
    email: {
        type: String,
        required: [true, "Please add the contact email"]
    },
    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Contact",contactScheme);