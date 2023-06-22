import {react , useState} from 'react';
import './App.css';
import io from "socket.io-client";

var socket = io.connect("http://localhost:3001", {
    cors: {
        origin: "*",
    },
});

import Signup from "./windows/signup/Signup";
import Login from "./windows/login/Login";
import Chat from "./windows/chat/Chat";

function App() {
  const [signup , Setsignup] = useState(0);
  const [chat , Setchat] = useState(0);
  const [username,  setUsername] = useState("");
  const [password,  setPassword] = useState("");
  const [privateKey,  setPrivateKey] = useState("");
  const [publicKey,  setPublicKey] = useState("");


  return (
    <div>
      {
      signup ?<Signup socket:socket />:
      chat ?<Chat socket:socket />:
      <Login socket:socket/>}
    </div>
  );
}

export default App;