import { React, useEffect, useState } from "react";
import "./Chat.css";

import Letters from "./letters/Letters";
import adduser from "./images/adduser.png";
import call from "./images/call.png";
import videocall from "./images/videocall.png";
import logout from "./images/logout.png";
import callhistory from "./images/callhistory.png";
import settings from "./images/settings.png";
import user from "./images/users.png";
import backbutton from "./images/backButton.png";
import creategroup from "./images/createGroup.png";
import Plus from "./images/Plus.png";
import logo from "./images/logoSymbol.png";
import chat from "./images/chats.png";
import reject from "./images/reject.png";
import accept from "./images/accept.png";
import Messages from "./components/messages/Messages";

const Chat = (props) => {
    var { socket, curUserData, setChat, setSignup } = props;

    const [normalSearchArea, SetnormalSearchArea] = useState(1);
    const [addUserPopup, SetaddUserPopup] = useState(0);
    const [userRequestPopup, SetuserRequestPopup] = useState(0);
    const [makeGroupWindow, SetmakeGroupWindow] = useState(0);
    const [addUserWindow, SetaddUserWindow] = useState(0);
    const [sentRequestWindow, SetsentRequestWindow] = useState(0);
    const [recievedRequestWindow, SetrecievedRequestWindow] = useState(0);
    const [recievedRequestList, setRecievedRequestList] = useState([]);
    const [sentRequestList, setSentRequestList] = useState([]);
    const [duoList, setDuoList] = useState([]);
    const [chatHistory , SetchatHistory] = useState([{time:new Date() , sender:"dhruv" , message:"how are you"},{time:new Date() , sender:"armaan" , message:"good"}]);
    const [gloablQueryResult, setGlobalQueryResult] = useState([]);

    function userSearch(data) {
        socket.emit("search-user-global", data);
    }
    function sendRequest(data) {
        socket.emit("send-user-request", {
            sender: curUserData.username,
            reciever: data,
        });
    }
    function acceptRequest(data) {
        socket.emit("accept-request", [curUserData.username, data]);
    }

    useEffect(() => {
        socket.on("recieve-recievedRequestList", (data) => {
            console.log(data);
            setRecievedRequestList(data);
        });
        socket.on("recieve-sentRequestList", (data) => {
            console.log(data);
            setSentRequestList(data);
        });
        socket.on("search-user-global-response", (data) => {
            console.log("setting this\n", data);
            setGlobalQueryResult(data);
        });
        socket.on("recieve-duoList", (data) => {
            console.log("duos", Object.keys(data));
            setDuoList(Object.keys(data));
        });
    }, [socket]);

    const UserInfo = (props) => {
        const index = props.name.codePointAt(0) - 97;
        return (
            <div className="userInfo">
                <div className="userIcon">
                    <div className="userNameImageCircle">
                        <div className="whiteCircle">
                            <img
                                src={Letters[index]}
                                className="userIconLetter"
                            ></img>
                        </div>
                    </div>
                </div>
                <p className="userLogName">{props.name}</p>
                {addUserWindow ? (
                    <button className="plusCircle  button">
                        <img
                            src={Plus}
                            className="plusIcon"
                            onClick={(e) => sendRequest(props.name)}
                        ></img>
                    </button>
                ) : recievedRequestWindow ? (
                    <div>
                        <button
                            className="acceptCircle button"
                            onClick={(e) => {
                                acceptRequest(props.name);
                            }}
                        >
                            <img src={accept} className="acceptIcon"></img>
                        </button>
                        <button className="rejectCircle button">
                            <img src={reject} className="rejectIcon"></img>
                        </button>
                    </div>
                ) : recievedRequestWindow ? (
                    <>
                        <p>withdraw</p>
                    </>
                ) : (
                    <>dot</>
                )}
            </div>
        );
    };

    const changeToMainChatWindow = () => {
        socket.emit("get-duoList", curUserData.username);
        SetnormalSearchArea(1);
        SetaddUserPopup(0);
        SetaddUserWindow(0);
        SetmakeGroupWindow(0);
        SetsentRequestWindow(0);
        SetrecievedRequestWindow(0);
        SetuserRequestPopup(0);
    };

    const userAddPopupWindow = () => {
        if (makeGroupWindow || addUserWindow) {
            changeToMainChatWindow();
            SetaddUserPopup(1 ^ addUserPopup);
        } else {
            SetaddUserPopup(1 ^ addUserPopup);
            SetuserRequestPopup(0);
        }
    };
    const userRequestPopupWindow = () => {
        if (makeGroupWindow || addUserWindow) {
            changeToMainChatWindow();
            SetuserRequestPopup(1 ^ userRequestPopup);
        } else {
            SetuserRequestPopup(1 ^ userRequestPopup);
            SetaddUserPopup(0);
        }
    };
    const changeToAddUserWindow = () => {
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetaddUserWindow(1);
        SetsentRequestWindow(0);
        SetrecievedRequestWindow(0);
    };
    const changeToCreateGroupWindow = () => {
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(1);
        SetsentRequestWindow(0);
        SetrecievedRequestWindow(0);
    };
    const changeToRecievedRequestWindow = () => {
        SetsentRequestWindow(0);
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(0);
        socket.emit("get-recievedRequestList", curUserData.username);
        SetrecievedRequestWindow(1);
        SetuserRequestPopup(0);
    };
    const changeToSentRequestWindow = () => {
        socket.emit("get-sentRequestList", curUserData.username);
        SetsentRequestWindow(1);
        SetnormalSearchArea(0);
        SetaddUserPopup(0);
        SetmakeGroupWindow(0);
        SetrecievedRequestWindow(0);
        SetuserRequestPopup(0);
    };

    return (
        <div className="mainBody">
            <div className="sidebar">
                <img src={logo} className="logo"></img>
                <button
                    className="sidebarButton button"
                    onClick={() => {
                        changeToMainChatWindow();
                    }}
                >
                    <img src={chat} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton button">
                    <img src={user} className="sidebarImage"></img>
                </button>
                <button
                    className="sidebarButton button"
                    onClick={() => {
                        userRequestPopupWindow();
                    }}
                >
                    <img src={adduser} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton button">
                    <img src={callhistory} className="sidebarImage"></img>
                </button>
                <button
                    className="sidebarButton button"
                    onClick={() => {
                        userAddPopupWindow();
                    }}
                >
                    <img src={creategroup} className="sidebarImage"></img>
                </button>
                <div className="middleGap"></div>
                <button
                    className="sidebarButton logoutButton button"
                    onClick={() => {
                        window.location.reload();
                    }}
                >
                    <img src={logout} className="sidebarImage"></img>
                </button>
                <button className="sidebarButton button">
                    <img src={settings} className="sidebarImage"></img>
                </button>
            </div>
            <div className="userNamesArea">
                {normalSearchArea ? (
                    <input placeholder="Search" className="searchBox1"></input>
                ) : (
                    <div className="addUserSearchArea">
                        <button
                            onClick={() => {
                                changeToMainChatWindow();
                            }}
                            className="backButton button"
                        >
                            <img
                                src={backbutton}
                                className="backButtonImage"
                            ></img>
                        </button>
                        <input
                            placeholder="Search User"
                            className="searchBox2"
                            onChange={(e) => {
                                e.target.value = e.target.value.toLowerCase();
                                console.log(e.target.value);
                                userSearch(e.target.value);
                            }}
                        ></input>
                    </div>
                )}
                <div className="userNames">
                    {normalSearchArea ? (
                        <div>
                            {duoList.map((e) => {
                                return <UserInfo name={e} />;
                            })}
                        </div>
                    ) : makeGroupWindow ? (
                        <div className="makeGroupBox">
                            <input
                                className="enterGroupName"
                                placeholder="Enter Group Name"
                            ></input>
                            <div className="usersToAdd"></div>
                            <button className="mainCreateGroupButton button">
                                Create Group
                            </button>
                        </div>
                    ) : addUserWindow ? (
                        <div>
                            {gloablQueryResult
                                .filter((e) => {
                                    return e != curUserData.username;
                                })
                                .map((e) => {
                                    return <UserInfo name={e} />;
                                })}
                        </div>
                    ) : sentRequestWindow ? (
                        <div>
                            {sentRequestList.map((e) => {
                                return <UserInfo name={e} />;
                            })}
                        </div>
                    ) : (
                        <div>
                            {recievedRequestList.map((e) => {
                                return <UserInfo name={e} />;
                            })}
                        </div>
                    )}
                    {userRequestPopup ? (
                        <div className="PopupCss">
                            <button
                                onClick={() => {
                                    changeToRecievedRequestWindow();
                                }}
                                className="createGroupButton button"
                            >
                                Recieved Requests
                            </button>
                            <button
                                onClick={() => {
                                    changeToSentRequestWindow();
                                }}
                                className="addUserButton button"
                            >
                                Sent Requests
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                    {addUserPopup ? (
                        <div className="PopupCss">
                            <button
                                onClick={() => {
                                    changeToCreateGroupWindow();
                                }}
                                className="createGroupButton button"
                            >
                                Create Group
                            </button>
                            <button
                                onClick={() => {
                                    changeToAddUserWindow();
                                }}
                                className="addUserButton button"
                            >
                                Add User
                            </button>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
            </div>
            <div className="chatArea">
                <div className="chatterInfo">
                    <button className="videocallButton button">
                        <img src={videocall} className="userinfoImage"></img>
                    </button>
                    <button className="callButton button">
                        <img src={call} className="userinfoImage"></img>
                    </button>
                </div>
                <div className="chats">
                    <div className="messages">
                        <Messages messages={chatHistory} data={curUserData} />
                    </div>
                    <div className="sendArea">
                        <input
                            className="messageInput"
                            placeholder="Type message"
                        ></input>
                        <button className="sendButton button">Send</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Chat;
