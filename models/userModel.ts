import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: [true, 'pleasse provide a username'],
        unique: true,
    },
    email: {
        type: String,
        require: [true, 'pleasse provide a email'],
        unique: true,
    },
    password: {
        type: String,
        require: [true, 'pleasse provide a password'],
    }
})

const User = mongoose.models.users || mongoose.model("users", userSchema)

export default User;