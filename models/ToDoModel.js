const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
    toDo: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model("ToDo", todoSchema);