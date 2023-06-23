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
import chat from "./images/chats.png"
import reject from "./images/reject.png"
import accept from "./images/accept.png"
import Messages from './components/messages/Messages';


const Chat = (props)=>{
    var {socket , curUserData , setChat , setSignup} = props;

    const [normalSearchArea , SetnormalSearchArea] = useState(1);
    const [addUserPopup , SetaddUserPopup] = useState(0);
    const [userRequestPopup , SetuserRequestPopup] = useState(0);
    const [makeGroupWindow , SetmakeGroupWindow] = useState(0);
    const [addUserWindow , SetaddUserWindow] = useState(0);
    const [sentRequestWindow , SetsentRequestWindow] = useState(0);
    const [recievedRequestPage  , SetrecievedRequestPage] = useState(0);
    const [chatHistory , SetchatHistory] = useState([{time:new Date() , sender:"dhruv" , message:""}]);
    const [gloablQueryResult, setGlobalQueryResult] = useState([]);

    function userSearch(data){
        socket.emit("search-user-global" , data);
    }
    
    useEffect(()=>{
        if (addUserWindow===1){
            socket.on("search-user-global-response" , (data)=>{
                setGlobalQueryResult(data);
            });
        }else{
            setGlobalQueryResult([]);
            return ()=>{
                socket.off("search-user-gloabl-response");
            }
        }
    } , [socket , addUserWindow])

    const UserInfo = (props)=> {
        const index = props.name.codePointAt(0) - 97;

        return(
            <div className="userInfo">
                <div className="userIcon">
                    <div className="userNameImageCircle">
                        <div className="whiteCircle">
                            <img src = {Letters[index]} className="userIconLetter"></img>  
                        </div>
                    </div>
                </div>
                <p className="userLogName">{props.name}</p>
                {
                    addUserWindow
                    ?
                    <button className="plusCircle">
                        <img src={Plus} className="plusIcon"></img>
                    </button>
                    :
                    <div>
                        <button className="acceptCircle">
                            <img src={accept} className="acceptIcon"></img>
                        </button>
                        <button className="rejectCircle">
                            <img src={reject} className="rejectIcon"></img>
                        </button>
                    </div>
                }

            </div>
        )

    }
        
    
    const changeToMainChatWindow = () =>{
        SetnormalSearchArea(1)
        SetaddUserPopup(0);
        SetaddUserWindow(0);
        SetmakeGroupWindow(0);
        SetsentRequestWindow(0);
        SetrecievedRequestPage(0);
        SetuserRequestPopup(0);
    }
    
    const userAddPopupWindow = () =>{
        if(makeGroupWindow || addUserWindow){
            changeToMainChatWindow();
            SetaddUserPopup(1^addUserPopup);
        }
        else{
            SetaddUserPopup(1^addUserPopup);
            SetuserRequestPopup(0);
        }
    }
    const userRequestPopupWindow = () =>{
        if(makeGroupWindow || addUserWindow){
            changeToMainChatWindow();
            SetuserRequestPopup(1^userRequestPopup);
        }
        else{
            SetuserRequestPopup(1^userRequestPopup);
            SetaddUserPopup(0);
        }
    }
    const changeToAddUserWindow = () =>{
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetaddUserWindow(1);
        SetsentRequestWindow(0);
        SetrecievedRequestPage(0);
    }
    const changeToCreateGroupWindow = () =>{
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(1);
        SetsentRequestWindow(0);
        SetrecievedRequestPage(0);
    }
    const changeToRecievedRequestWindow = ()=>{
        SetsentRequestWindow(0);
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(0 );
        SetrecievedRequestPage(1);
        SetuserRequestPopup(0);
    }
    const changeToSentRequestWindow = ()=>{
        SetsentRequestWindow(1);
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(0);
        SetrecievedRequestPage(0);
        SetuserRequestPopup(0);
    }

    return(
        <div className="mainBody">
            <div className="sidebar">
                <button className="sidebarButton userButton" onClick={()=>{changeToMainChatWindow()}}>
                    <img src = {chat} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton">
                    <img src = {user} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton" onClick={()=>{userRequestPopupWindow()}}>
                    <img src = {adduser} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton">
                    <img src = {callhistory} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton" onClick={() => {userAddPopupWindow()}}>
                    <img src= {creategroup} className="sidebarImage"></img>
                </button>
                <div className="middleGap"></div>
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
                        <input placeholder="Search User"  className="searchBox2" onChange={(e)=>{
                            e.target.value = e.target.value.toLowerCase();
                            userSearch(e.target.value);
                        }}></input>
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
                    addUserWindow
                    ?
                        <div>
                            {gloablQueryResult.map((e)=> { return (<UserInfo name={e} />);} )}
                        </div>
                    :
                    sentRequestWindow
                    ?
                        <div>
                            <p>sent req</p>
                        </div>
                    :
                        <div>
                            <UserInfo name="armaan" />
                        </div>                                

                    }
                    {userRequestPopup  
                    ?
                        <div className="PopupCss">
                            <button onClick={() => {changeToRecievedRequestWindow()}} className="createGroupButton">Recieved Requests</button>
                            <button onClick={() => {changeToSentRequestWindow()}} className="addUserButton">Sent Requests</button>
                        </div>
                    :
                        <></>
                    }
                    {addUserPopup  
                    ?
                        <div className="PopupCss">
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