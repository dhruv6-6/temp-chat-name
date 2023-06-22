import mongoose from "mongoose";

let schema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    username: String,
    publicKey: String,
    encryptedPrivateKey: String,
    encryptedPassword: String,
    rooms: Object,
    duos: Object,
    socketID: String
}, { versionKey: false });
const userSchema = mongoose.model('user' , schema, 'user');
export {userSchema};