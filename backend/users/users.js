import  mongoose  from "mongoose";

const usersSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        minlength: 4,
        unique: true,
    },
    email:{
        type: String,
        required: true,
    },
    password:{
        type: String,
        required: true,
    }
});
const userModel = new mongoose.model('users', usersSchema);

export default userModel;
