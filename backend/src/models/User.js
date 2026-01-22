const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true, // Removes accidental whitespace
        minLength: 2,
        maxLength: 15,
    },
    lastName: {
        type: String,
        trim: true,
        maxLength: 15,
        validate(value) {
            if (!/^[a-zA-Z._]+$/.test(value)) { //Allows only letters, dots, and underscores
                throw new Error("Only letters, '_' (underscore) and '.' (dot) are allowed");
            }
        }
    },
    emailId: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        min: 18,
        max: 100,
    },
    gender: {
        type: String,
        lowercase: true,
        enum: {
            values: ["male", "female", "others"],
            message: "{VALUE} is not a valid gender"
        }
    },
    photoURL: {
        type: String,
        default: "https://example.com/default-avatar.png", // Use a URL, not a local file path
        validate(value) {
            if (!validator.isURL(value)) {
                throw new Error("Invalid Photo URL");
            }
        }
    },
    about: {
        type: String,
        default: "Tell us about yourself!",
        maxLength: 500,
        trim: true
    },
    skills: {
        type: [String],
        // Prevents users from adding more than 10 skills
        validate(value) {
            if (value.length > 10) {
                throw new Error("You can only add up to 10 skills");
            }
        }
    }
}, {
    timestamps: true // Adds createdAt and updatedAt automatically
});

const User = mongoose.model("User", userSchema);
module.exports = User;