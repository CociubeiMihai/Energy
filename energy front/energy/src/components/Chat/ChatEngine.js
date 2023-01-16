import React, {useState, useEffect, useRef} from 'react'
import { findUser } from '../../services/UserService';
import { SupportEngineStyle } from '../../styles/SupportEngineStyle'
import "../../styles/chat.css";
import {over} from 'stompjs'
import SockJS from 'sockjs-client';
import "../../styles/chat.css";

var stompClient = null;
const ChatEngine = props =>{

    const stateRef = useRef();
    const [messageChat, setMessageChat] = useState([]);
    const [first, setFirst] = useState(true);
    const [seen, setSeen] = useState(false);
    const [ttype, setTtype] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        recevername:"Admin",
        connected:false,
        message:"" 
    })

    stateRef.current = props;

    useEffect(() =>{
        findUser( JSON.parse(localStorage.getItem('user'))).then((res) => {
           userData.username = res.data.name 
        })
        userData.connected = props.visible
        if(first){
            registerUser();
            setFirst(false);
        }
    })

    const registerUser = () => {
        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected);
    } 

    const onConnected = () => {
        stompClient.subscribe('/user/'+userData.username+'/chat', onPrivateMessage);
      } 
  
      const onPrivateMessage = (payload) => {
        let message = JSON.parse(payload.body)
        switch(message.status){
            case "SEEN":
                 setSeen(true);
                break;
            case "WRITING":
                setTtype(true);
                break;
            case "MESSAGE":
                messageChat.push(message);
                setMessageChat(messageChat);
                setUserData({...userData,"message": ""});
                setSeen(false);//cand primesc de la el mesaj nu are sens sa ne apara seen
                setTtype(false);
                if(stateRef.current.visible){
                    handleSeen();
                    var chatMessage = {
                        message:"",
                        destinatar: "ADMIN",
                        sender:userData.username,
                        status:"SEEN"
                    };
                    stompClient.send('/user/ADMIN/chat', {}, JSON.stringify(chatMessage));
                }
                break;
        }
      }

      const handleSeen = () => {
        if(stompClient){
            var chatMessage = {
                message:"",
                destinatar: "ADMIN",
                sender:userData.username,
                status:"SEEN"
            };
            stompClient.send('/user/ADMIN/chat', {}, JSON.stringify(chatMessage));
        }
      }

      const handleMessage = (event) => {
        const {value}=event.target;
        setUserData({...userData,"message": value});
      }

      const handleTyping = () => {
        if(stompClient){
            var chatMessage = {
                message:"",
                destinatar: "ADMIN",
                sender:userData.username,
                status:"WRITING"
            };
            stompClient.send('/user/ADMIN/chat', {}, JSON.stringify(chatMessage));
        }
      }

      const sendValue = (e) => {
            if(stompClient){
                var chatMessage = {
                    message: userData.message,
                    destinatar: "ADMIN",
                    sender:userData.username,
                    status:"MESSAGE"
                  };
                console.log(chatMessage);
                setSeen(false);
                messageChat.push(chatMessage);
                setMessageChat(messageChat);
                stompClient.send('/user/ADMIN/chat', {}, JSON.stringify(chatMessage));
                setUserData({...userData,"message": ""});
            }
      }

    return(
        <div>
        {props.visible?
        <div
        className='transition-5'
        style={{
            ...SupportEngineStyle.supportWindow,

        }}
        >
            {
                props.visible &&
                <div className='chat-box'>
                    <div className='member-content'>
                    <ul className="chat-messages">
                        {messageChat.map((chat,index) => (
                            <li className='message' key={index}>
                                {chat.sender !== userData.username && <div className="avatar">{chat.senderName}</div>} 
                                <div className="message-data">{chat.message}</div>
                                {chat.sender === userData.username && <div className="avatar self">{userData.username}</div>} 
                            </li>
                        ))}
                        {
                        seen? 
                        <div>seen</div> : <div></div>
                        }
                        {
                        ttype? 
                        <div>Typing....</div> : <div></div>
                        }
                        </ul>
                        <div className='send-messages'>
                            <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} onClick={handleTyping}/> 
                            <button type="button" className="send-button" onClick={sendValue}>send</button>
                        </div>
                    </div>
                </div>
            }
        </div>
        :
            <div></div>
        
        }
    </div>
    )
}

export default ChatEngine