const mongoose= require("mongoose");

const UserSchema= new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    todoList: [],
    token: {
        type: String
    }
})

module.exports= mongoose.model("User", UserSchema)