import React from "react";

import './Message.css';


const Message = ({message , name}) =>{
    const formatHour = (input) => {
      if (input > 12) {
        return input - 12;
      }
      return input;
    };
    const formatData = (input) => {
        if (input > 9) {
          return input;
        } else return `0${input}`;
      };

    let isSentByCurrentUser = false;

    const myTrimmedName = name.trim().toLowerCase();
    const hisTrimmedName = message.sender.trim().toLowerCase();
    const hour =  formatData(formatHour(message.time.getHours()))
    const minute =  formatData(message.time.getMinutes())

    if(myTrimmedName===hisTrimmedName){
        isSentByCurrentUser = true;
    }

    return(
        isSentByCurrentUser===true
        ?
            <div className="messageContainer">
                <div className="allInfoBox myContainer">
                    <div className="messageBox">
                        <p className="messageText colorWhite">{message.message}</p>
                    </div>
                    <p className="time myTime">{hour + ":" + minute}</p>
                </div>
            </div>
        :

        <div className="messageContainer">
            <div className="allInfoBox hisContainer">
                <div className="messageBox">
                    <p className="messageText colorWhite">{message.message}</p>
                </div>
                <div className="nameDate">
                    <p className="hisName">{hisTrimmedName}</p>
                    <p className="time hisTime">{hour + ":" + minute}</p>
                </div>
            </div>
        </div>
    );
}

export default Message;