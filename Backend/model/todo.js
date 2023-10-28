const mongoose = require("mongoose")

const TodoSchema= new mongoose.Schema({
    title: String,
    task: [String]
})

module.exports= mongoose.model("Todo", TodoSchema )


