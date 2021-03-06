const mongoose = require("mongoose");
const bcrypt = require("bcrypt-nodejs");
const salt_factor = 8;

const userSchema = mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
        default: "other"
    },
    role: {
        type: String,
        enum: ["admin", "public", "VIT"],
        default: "public"
    },
    password: String
});

userSchema.methods.generateHash = password => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(salt_factor), null);
};



module.exports = mongoose.model("User", userSchema);