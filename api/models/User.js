import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    highScoreEnglish: {
        type: Number,
        required: false,
        default: 0
    },
    highScoreRussian: {
        type: Number,
        required: false,
        default: 0
    },


}, {timestamps: true});

export default mongoose.model("User", UserSchema)