import mongoose from "mongoose";
import { userSchema } from "./models/user.mjs";

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

const addUserData = async function (data) {
    const options = { upsert: true, new: true };
  
  return userSchema.findOneAndUpdate({ username: data.username }, data, options)
    .exec()
    .then((dbRes) => {
      return dbRes;
    })
    .catch((err) => {
      throw err;
    });
};

const getUserData = async function (data) {
    let Rdata,
        Rerr = null;
    await userSchema
        .find(data)
        .then((dbRes) => {
            Rdata = dbRes;
        })
        .catch((err) => {
            Rerr = err;
        });
    return new Promise((resolve, reject) => {
        if (Rerr == null) resolve(Rdata);
        else reject(Rerr);
    });
};
export { dbConnect, addUserData, getUserData };
