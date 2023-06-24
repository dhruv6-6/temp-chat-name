import mongoose from "mongoose";
import { roomSchema } from "./models/room.mjs";

const dbConnect = async function () {
    await mongoose
        .connect(
            "mongodb+srv://nougaiarmaan:test123@cluster0.3zaic80.mongodb.net/testDB1?retryWrites=true&w=majority",
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        )
        .then(() => {
            console.log("database connected brother!");
        })
        .catch((err) => {
            console.log("ERR:", err);
        });
};
const addRoomData = async function (data) {
    const options = { upsert: true, new: true };

    return roomSchema.findOneAndUpdate({ roomID: data.roomID }, data, options)
    .exec()
    .then((dbRes) => {
      return dbRes;
    })
    .catch((err) => {
      throw err;
    });
};

const getRoomData = async function (data) {
    let Rdata = null,
        Rerr = null;
    await roomSchema
        .find(data)
        .then((dbRes) => {
            Rdata = dbRes;
        })
        .catch((err) => {
            Rerr = err;
        });
    return new Promise((resolve, reject) => {
        if (Rerr == null) {
            resolve(Rdata);
        } else {
            reject(Rerr);
        }
    });
};

export { dbConnect, addRoomData, getRoomData };
