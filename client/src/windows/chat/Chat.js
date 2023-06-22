import {React , useEffect, useState} from "react";
import './Chat.css';

import Letters from './letters/Letters'
import adduser from './images/adduser.png'
import call from './images/call.png'
import videocall from './images/videocall.png'
import logout from './images/logout.png'
import callhistory from './images/callhistory.png'
import settings from './images/settings.png'
import user from './images/users.png'
import backbutton from './images/backButton.png'
import creategroup from './images/createGroup.png'
import Plus from "./images/Plus.png"
import Messages from './components/messages/Messages';


const Chat = (props)=>{
    var {socket , curUserData , setChat , setSignup} = props;

    const [normalSearchArea , SetnormalSearchArea] = useState(1);
    const [addUserPopup , SetaddUserPopup] = useState(0);
    const [makeGroupWindow , SetmakeGroupWindow] = useState(0);
    const [addUserWindow , SetaddUserWindow] = useState(0);
    const [chatHistory , SetchatHistory] = useState([{time:new Date() , sender:"dhruv" , message:""}]);

    useEffect(()=>{
        socket.emit("loadChat" , curUserData)
    } , [socket])

    const UserInfoAddUser = (name)=> {
        const index = name.name.codePointAt(0) -65;

        return(
            <div className="userInfo">
                <div className="userIcon">
                    <div className="userNameImageCircle">
                        <div className="whiteCircle">
                            <img src = {Letters[index]} className="userIconLetter"></img>  
                        </div>
                    </div>
                </div>
                <p className="userLogName">{name.name}</p>
                <div className="plusCircle">
                    <img src={Plus} className="plusIcon"></img>
                </div>
            </div>
        )

    }

    const changeToMainChatWindow = () =>{
        SetnormalSearchArea(1)
        SetaddUserPopup(0);
        SetaddUserWindow(0);
        SetmakeGroupWindow(0);
    }
    const userAddPopupWindow = () =>{
        if(makeGroupWindow || addUserWindow){
            changeToMainChatWindow();
            SetaddUserPopup(1^addUserPopup);
        }
        else{
            SetaddUserPopup(1^addUserPopup);
        }
    }
    const changeToAddUserWindow = () =>{
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetaddUserWindow(1);
    }
    const changeToCreateGroupWindow = () =>{
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(1);
    }

    return(
        <div className="mainBody">
            <div className="sidebar">
                <button className="sidebarButton userButton">
                    <img src = {user} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton">
                    <img src = {adduser} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton">
                    <img src = {callhistory} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton" onClick={() => {userAddPopupWindow()}}>
                    <img src= {creategroup} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton logoutButton">
                    <img src= {logout} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton">
                    <img src= {settings} className="sidebarImage"></img>
                </button>
            </div>
            <div className="userNamesArea">
                {normalSearchArea 
                ? 
                    <input placeholder="Search" className="searchBox1"></input>
                :
                    <div className="addUserSearchArea">
                        <button onClick={() => {changeToMainChatWindow()}} className="backButton">
                            <img src={backbutton} className="backButtonImage"></img> 
                        </button>
                        <input placeholder="Search User" className="searchBox2"></input>
                    </div>
                }  
                <div className="userNames">
                    {normalSearchArea
                    ?
                        <div>
                            <p>normalSearchArea</p>
                        </div>
                    :
                        makeGroupWindow
                        ?   
                            <div className = "makeGroupBox">
                                <input className="enterGroupName" placeholder="Enter Group Name"></input>
                                <div className="usersToAdd"></div>
                                <button className="mainCreateGroupButton">Create Group</button>
                            </div>
                        :
                            <div>
                                <UserInfoAddUser name="Armaan" />
                            </div>
                    }

                    {addUserPopup  
                    ?
                        <div className="addUserPopupCss">
                            <button onClick={() => {changeToCreateGroupWindow()}} className="createGroupButton">Create Group</button>
                            <button onClick={() => {changeToAddUserWindow()}} className="addUserButton">Add User</button>
                        </div>
                    :
                        <></>
                    }
                </div>
            </div>
            <div className="chatArea">
                <div className="chatterInfo">
                    <button className="videocallButton">
                        <img src= {videocall} className="userinfoImage"></img>
                    </button>
                    <button className="callButton">
                        <img src= {call} className="userinfoImage"></img>
                    </button>
                </div>
                <div className="chats">
                    <div className="messages">
                        {/*<Messages messages = {messages} data={curUserData} />*/}
                    </div>
                    <div className="sendArea">
                        <input className="messageInput" placeholder="Type message"></input>
                        <button className="sendButton">Send</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Chat;