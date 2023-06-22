import mongoose from "mongoose";

let schema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    roomID: String,
    messages: [],
    participants: []
} , { versionKey: false });
const roomSchema = mongoose.model('room' , schema, 'room');
export {roomSchema};