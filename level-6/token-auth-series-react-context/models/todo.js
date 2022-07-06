const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    completed: {
        type: Boolean,
        default: false
    },
    imgUrl: {
        type: String,
        required: true
    },
    // Add a reference to the user to whom this todo belongs AUTH
    user: {
        type: Schema.Types.ObjectId,
        ref: "User", // from the User model
        required: true
    }
});

module.exports = mongoose.model("Todo", todoSchema); 