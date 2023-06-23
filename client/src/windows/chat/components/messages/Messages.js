import React from "react";
import ScrollToBottom from 'react-scroll-to-bottom';

import './Messages.css';
import Message from "./message/Message";

const Mesages = ({messages , data}) =>{
    return(
        <ScrollToBottom className="messages">
            {messages.map((message , i) => <div key = {i}><Message message = {message} name={data.username}/></div>)}
        </ScrollToBottom>
    );
}

export default Mesages;