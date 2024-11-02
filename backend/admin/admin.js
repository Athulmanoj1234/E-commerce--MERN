import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    businessname: String,
    adminCover: String,
    password: String,
})

const adminModel = new mongoose.model('admin', adminSchema);
export default adminModel;