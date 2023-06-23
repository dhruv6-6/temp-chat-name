import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";
import { v1 as uuidv1 } from 'uuid';
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
    console.log(socket.id + " connected!"); 
    socket.on("sign-up-init", async (data) => {
        let f = 1;
        await getUserData({ username: data.username }).then((res) => {
            if (res.length != 0) {
                f = 0;
                socket.emit("username-exist", data);
            }
        });
        if (f === 1) {
            var expData = data;
            expData["rooms"] = {};
            expData["duos"] = {};
            await addUserData(expData);
            console.log("daal diya\n");
            socket.emit("sign-up-complete", data);
        }
    });
    socket.on("login-init", async (username) => {
        getUserData({ username: username }).then((res) => {
            if (res.length == 0) {
                socket.emit("user-not-found", {});
            } else {
                socket.emit("login-response", {
                    username: res[0].username,
                    encryptedPrivateKey: res[0].encryptedPrivateKey,
                    encryptedPassword: res[0].encryptedPassword
                });
            }
        });
    });
    socket.on("login-authenticate" , async (data)=>{
        getUserData({username:data.username}).then(async res=>{
            var expData=  res[0];
            expData.socketID = data.socketID;
            console.log("UPDATED SOCKET\n" , expData);
            await addUserData(expData);
        })
        socket.emit("login-success" ,data);
    })
    socket.on("search-user-global" , async (data)=>{
        var expData = [ ];
        await getUserData({}).then(res=>{
            res.forEach((e)=>{
                if (e.username.length >= data.length && e.username.substring(0 , data.length)==data){
                    expData.push( e.username);
                }
            })
        })
        console.log(expData);
        socket.emit("search-user-global-response" , expData);
    })
    socket.on("send-user-request" , async (data)=>{
        console.log(data);
        var expData;
        await getUserData({username:data.sender}).then(res=>{
            expData = res[0];
        })
        if (("sentRequests" in expData)===false)
            expData["sentRequests"] = [];
        
        
        expData["sentRequests"] = [ data.reciever  , ...expData["sentRequests"] ];
        console.log(expData);
        await addUserData(expData);
        
        
        await getUserData({username:data.reciever}).then(res=>{
            expData = res[0];
        })
        if (("recievedRequests" in expData)===false)
            expData["recievedRequests"] = [];
        
        
        expData["recievedRequests"] = [ data.sender  , ...expData["recievedRequests"] ];
        console.log(expData);
        await addUserData(expData);

    })
    socket.on("get-sentRequestList" , async (data)=>{
        console.log(data);
        getUserData({username:data}).then(res=>{
            console.log("get-sentRequestList", res[0].sentRequests);
            socket.emit("recieve-sentRequestList" , res[0].sentRequests);
        })
    })
    socket.on("get-recievedRequestList" , async (data)=>{
        console.log(data);
        getUserData({username:data}).then(res=>{
            console.log("get-recievedRequestList", res[0].recievedRequests);
            socket.emit("recieve-recievedRequestList" , res[0].recievedRequests);
        })
    })
    socket.on("accept-request", async (data)=>{
        var expData;
        await getUserData({username:data[0]}).then(res=>{
            expData = res[0];
        })
        expData.sentRequests = expData.sentRequests.filter((e)=>{
            return e!=data[1];            
        })
        expData.recievedRequests = expData.recievedRequests.filter((e)=>{
            return e!=data[1];
        })
        expData.duos[data[1]] = uuidv1();
        await addUserData(expData);



        await getUserData({username:data[1]}).then(res=>{
            expData = res[0];
        })
        expData.sentRequests = expData.sentRequests.filter((e)=>{
            return e!=data[0];            
        })
        expData.recievedRequests = expData.recievedRequests.filter((e)=>{
            return e!=data[0];
        })
        expData.duos[data[0]] = uuidv1();
        await addUserData(expData);
    })
    socket.on("get-duoList" , async (data)=>{
        console.log("Sending duos\n");
        var expData;
        await getUserData({username:data}).then(res=>{
            expData = res[0].duos;
        })
        console.log(expData);
        socket.emit("recieve-duoList" , expData);
        
    })
    socket.on("disconnect", function () {
        console.log("exiting:", socket.id);
    });
});

async function start() {
    await dbConnect();
    server.listen(3001, () => {
        console.log("listening on *:3001");
    });
}
start();
