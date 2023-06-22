import React from "react";

import './Message.css';


const Message = () =>{
    let isSentByCurrentUser = false;



    return(
        isSentByCurrentUser
        ?(
            <div className="messageContainer justifyEnd">
                
            </div>
        )
        :(
            <div className="messageContainer justifyStart">
                
            </div>
        )
    );
}

export default Message;