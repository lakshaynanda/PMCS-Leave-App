const mongoose = require("mongoose");

const leaveSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        required: true,
        ref: "User"
    },
    mailSent: {
        type: Boolean,
        default: false
    },
    lid: String,
    approved: {
        type: Boolean,
        default: false
    },
    option: String,
    place: String,
    from: String,
    to: String,
    bill: String,
    log: [
        { type: String }
    ],
    cdetails: String,
    desc: String

});


module.exports = mongoose.model("Leave", leaveSchema);