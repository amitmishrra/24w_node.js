const mongoose = require("mongoose");




const bookSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    number: {
        type: Number,
        required: true,
    },
    mail: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
        required: true,
    },
    age: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    datetime: {
        type: String,
        required: true,
    }


})

const Book = new mongoose.model("Book", bookSchema);

module.exports = Book;