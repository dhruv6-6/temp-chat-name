import {React , useState} from "react";
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

const Chat = ()=>{
    const [normal_search_area , Set_normal_search_area] = useState(1);
    const [add_user_popup , Set_add_user_popup] = useState(0);
    const [make_group_window , Set_make_group_window] = useState(0);
    const [add_user_window , Set_add_user_window] = useState(0);

    const UserInfoAddUser = (name)=> {
        const index = name.name.codePointAt(0) -65;

        return(
            <div>
                <div className="user_info">
                    <div className="user_icon">
                        <div className="user_name_image_circle">
                            <div className="white_circle">
                                <img src = {Letters[index]} className="user_icon_letter"></img>  
                            </div>
                        </div>
                    </div>
                    <p>{name.name}</p>
                </div>
            </div>
        )
    }

    const change_to_main_chat_window = () =>{
        Set_normal_search_area(1)
        Set_add_user_popup(0);
        Set_add_user_window(0);
        Set_make_group_window(0);
    }
    const user_add_popup_window = () =>{
        if(make_group_window || add_user_window){
            change_to_main_chat_window();
            Set_add_user_popup(1^add_user_popup);
        }
        else{
            Set_add_user_popup(1^add_user_popup);
        }
    }
    const change_to_add_user_window = () =>{
        Set_normal_search_area(0);
        Set_add_user_popup(0);
        Set_add_user_window(1);
    }
    const change_to_create_group_window = () =>{
        Set_normal_search_area(0);
        Set_add_user_popup(0);
        Set_make_group_window(1);
    }

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
                <button className="sidebar_button" onClick={() => {user_add_popup_window()}}>
                    <img src= {creategroup} className="sidebar_image"></img>
                </button>
                <button className="sidebar_button logout_button">
                    <img src= {logout} className="sidebar_image"></img>
                </button>
                <button className="sidebar_button">
                    <img src= {settings} className="sidebar_image"></img>
                </button>
            </div>
            <div className="user_names_area">
                {normal_search_area 
                ? 
                    <input placeholder="Search" className="search_box_1"></input>
                :
                    <div className="add_user_search_area">
                        <button onClick={() => {change_to_main_chat_window()}} className="back_button">
                            <img src={backbutton} className="back_button_image"></img> 
                        </button>
                        <input placeholder="Search User" className="search_box_2"></input>
                    </div>
                }  
                <div className="user_names">
                    {normal_search_area
                    ?
                        <div>
                            <p>normal_search_area</p>
                        </div>
                    :
                        make_group_window
                        ?   
                            <div className = "make_group_box">
                                <input className="enter_group_name" placeholder="Enter Group Name"></input>
                                <div className="users_to_add"></div>
                                <button className="main_create_group_button">Create Group</button>
                            </div>
                        :
                            <div>
                                <UserInfoAddUser name="Dhruv" />
                            </div>
                    }

                    {add_user_popup  
                    ?
                        <div className="add_user_popup_css">
                            <button onClick={() => {change_to_create_group_window()}} className="create_group_button">Create Group</button>
                            <button onClick={() => {change_to_add_user_window()}} className="add_user_button">Add User</button>
                        </div>
                    :
                        <></>
                    }
                </div>
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