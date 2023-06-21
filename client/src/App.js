import {react , useState} from 'react';
import './App.css';

import Signup from "./windows/signup/Signup";
import Login from "./windows/login/Login";
import Chat from "./windows/chat/Chat";

function App() {
  const [signup , Setsignup] = useState(1);
  const [chat , Setchat] = useState(0);
  return (
    <div>
      {
      signup ?<Signup />:
      chat ?<Chat />:
      <Login />}
    </div>
  );
}

export default App;