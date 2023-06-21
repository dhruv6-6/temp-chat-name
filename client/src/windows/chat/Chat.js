import React from "react";
import './Chat.css';

import dots from './images/3dots.png';
import adduser from './images/adduser.png'
import call from './images/call.png'
import videocall from './images/videocall.png'
import logout from './images/logout.png'
import callhistory from './images/callhistory.png'
import settings from './images/settings.png'
import users from './images/users.png'

const Chat = ()=>{
    return(
        <div className="main_body">
            <div className="sidebar">
                
            </div>
            <div className="user_names_area">
                <div className="search_user_area">
                    <input placeholder="Search" className="search_box"></input>
                    <img src = {dots} className="dots"></img>
                </div>
                <div className="user_names"></div>
            </div>
            <div className="chat_area">
                <div className="chatter_info"></div>
                <div className="chats"></div>
            </div>
        </div>
    )
}

export default Chat;