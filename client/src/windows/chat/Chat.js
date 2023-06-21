import React from "react";
import './Chat.css';

import dots from './images/3dots.png'
import adduser from './images/adduser.png'
import call from './images/call.png'
import videocall from './images/videocall.png'
import logout from './images/logout.png'
import callhistory from './images/callhistory.png'
import settings from './images/settings.png'
import user from './images/users.png'

const Chat = ()=>{
    return(
        <div className="main_body">
            <div className="sidebar">
                <button className="sidebar_button user_button">
                    <img src = {user} className="sidebar_image"></img>
                </button>
                <button className="sidebar_button">
                    <img src = {adduser} className="sidebar_image"></img>
                </button>
                <button className="sidebar_button">
                    <img src = {callhistory} className="sidebar_image"></img>
                </button>
                <button className="sidebar_button logout_button">
                    <img src= {logout} className="sidebar_image"></img>
                </button>
                <button className="sidebar_button">
                    <img src= {settings} className="sidebar_image"></img>
                </button>
            </div>
            <div className="user_names_area">
                <div className="search_user_area">
                    <input placeholder="Search" className="search_box"></input>
                    <img src = {dots} className="dots"></img>
                </div>
                <div className="user_names"></div>
            </div>
            <div className="chat_area">
                <div className="chatter_info">
                    <button className="videocall_button">
                        <img src= {videocall} className="userinfo_image"></img>
                    </button>
                    <button className="call_button">
                        <img src= {call} className="userinfo_image"></img>
                    </button>
                </div>
                <div className="chats">
                    <div className="messages"></div>
                    <div className="send_area">
                        <input className="message_input" placeholder="Type message"></input>
                        <button className="send_button">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;