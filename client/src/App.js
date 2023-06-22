import {react , useState} from 'react';
import './App.css';
import io from "socket.io-client";
import Signup from "./windows/signup/Signup";
import Login from "./windows/login/Login";
import Chat from "./windows/chat/Chat";

var socket = io.connect("http://localhost:3001", {
    cors: {
        origin: "*",
    },
});


function App() {
  const [signup , setSignup] = useState(1);
  const [chat , setChat] = useState(0);
  const [username,  setUsername] = useState("");
  const [password,  setPassword] = useState("");
  const [privateKey,  setPrivateKey] = useState("");
  const [publicKey,  setPublicKey] = useState("");

  var curUserData = {
    socketID:socket.id,
    username, setUsername,
    password, setPassword,
    privateKey, setPrivateKey,
    publicKey, setPublicKey
  }
  return (
    <div>
      {
      signup ?<Signup socket={socket} curUserData={curUserData} setSignup={setSignup} setChat={setChat}/>:
      chat ?<Chat socket={socket} curUserData={curUserData} setSignup={setSignup} setChat={setChat}/>:
      <Login socket={socket} curUserData={curUserData} setSignup={setSignup} setChat={setChat}/>}
    </div>
  );
}

export default App;