import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import {
    dbConnect,
    deleteUserData,
    addUserData,
    getUserData,
} from "./database/userFunctions.mjs";
import {
    deleteRoomData,
    addRoomData,
    getRoomData,
} from "./database/roomFunction.mjs";

const app = express();
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.get("/", (req, res) => {
    res.send("running server well and good");
});
let thisU;
io.on("connection", function (socket) {
    console.log(socket.id  + " connected!");
    socket.on("sign-up-init" , async data=>{
        let f =1;
        await getUserData({username:data.username}).then( res=>{
            if(res.length!=0){
                f = 0;
                socket.emit("username-exist" , data);
            }
        })
        if (f===1){
            
            var expData = data;
            expData["rooms"] = {};
            expData["duos"] = {};
            await addUserData(expData);
            console.log("daal diya\n");
            socket.emit("sign-up-complete" ,data);
        }
    })
    socket.on("disconnect", function () {
        console.log("exiting:" , socket.id);
        
    });
});

async function start() {
    await dbConnect();
    server.listen(3001, () => {
        console.log("listening on *:3001");
    });
}
start();
