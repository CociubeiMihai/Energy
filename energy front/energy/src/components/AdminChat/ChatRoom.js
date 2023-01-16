import React, { useEffect, useState, useRef } from 'react'
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import "../../styles/adminChat.css";
import { useNavigate } from "react-router-dom";

var stompClient =null;
const ChatRoom = () => {
    //debugger
    const stateRefSetTypingList = useRef();
    const stateRefTypingList = useRef();
    const stateRefTab = useRef();
    const stateRefSetSeenList = useRef();
    const stateRefSeenList = useRef();
    const stateRefPrivateChats = useRef();
    const [privateChats, setPrivateChats] = useState(new Map([['CHATROOM', 'S']]));     
    const [tab,setTab] =useState("CHATROOM");
    const [user,setUser] =useState("");
    const [first, setFirst] = useState(true);
    const [seenList, setSeenList] = useState([]);
    const [typingList, setTypingList] = useState([]);
    const [userData, setUserData] = useState({
        username: 'ADMIN',
        receivername: '',
        connected: false,
        message: 'Bine ai venit',
      });
    const rol = JSON.parse(localStorage.getItem('rol'));
    let navigate = useNavigate();
    stateRefSetTypingList.current = setTypingList;
    stateRefTypingList.current = typingList;
    stateRefTab.current = tab;
    stateRefSetSeenList.current = setSeenList;
    stateRefSeenList.current = seenList;
    stateRefPrivateChats.current = privateChats;
      
    useEffect(() => {
      //console.log(userData);
      //console.log(privateChats instanceof Map);
      //console.log(privateChats.get());
      if(rol !== "ADMIN"){
        navigate("/");
        }
      if(first){

        let Sock = new SockJS('http://localhost:8080/ws');
        stompClient = over(Sock);
        stompClient.connect({},onConnected, onError);
        setFirst(false);
        }
    }, [userData, first]);

    const onConnected = () => {
        setUserData({...userData,"connected": true});
        stompClient.subscribe('/user/ADMIN/chat', onPrivateMessage);
    }
    
    const onPrivateMessage = (payload)=>{
        
        var payloadData = JSON.parse(payload.body);
        console.log(payloadData.sender)
        console.log(seenList)
        console.log(tab)
        switch(payloadData.status){
            case "SEEN":
                if(privateChats.get(payloadData.sender)){
                seenList.push(payloadData.sender)
                setSeenList(seenList)
                }
                break;
            case "WRITING":
                if(privateChats.get(payloadData.sender)){
                typingList.push(payloadData.sender)
                setTypingList(typingList)
                }
                break;
            case "MESSAGE":
                stateRefSetTypingList.current(stateRefTypingList.current.filter(e => e !== stateRefTab.current))
                stateRefSetSeenList.current(stateRefSeenList.current.filter(e => e !== stateRefTab.current))
                if(privateChats.get(payloadData.sender)){
                    privateChats.get(payloadData.sender).push(payloadData);
                    setPrivateChats(new Map(privateChats));
                }else{
                    let list =[];
                    list.push(payloadData);
                    privateChats.set(payloadData.sender,list);
                    setPrivateChats(new Map(privateChats));
                }
            break;
        }
    }

    const handleSeen = () => {
        if(stompClient){
            var chatMessage = {
                destinatar: tab,
                sender:"ADMIN",
                status:"SEEN",
            };
            stompClient.send('/user/'+tab+'/chat', {}, JSON.stringify(chatMessage));
        }
      }

    const onError = (err) => {
        console.log(err);
        
    }

    const handleMessage =(event)=>{
        const {value}=event.target;
        setUserData({...userData,"message": value});
    }

    const handleTyping = () => {
        if(stompClient){
            var chatMessage = {
                destinatar: "ADMIN",
                sender:userData.username,
                status:"WRITING",
                value: "true"
            };
            stompClient.send('/user/'+tab+'/chat', {}, JSON.stringify(chatMessage));
            handleSeen();
        }
      }
    const handleStopTyping = () => {
        if(stompClient){
            var chatMessage = {
                destinatar: "ADMIN",
                sender:userData.username,
                status:"WRITING",
                value: "false"
            };
            stompClient.send('/user/'+tab+'/chat', {}, JSON.stringify(chatMessage));
        }
    }

    const sendPrivateValue=()=>{
        if (stompClient) {
          var chatMessage = {
            senderName: userData.username,
            receiverName:tab,
            message: userData.message,
            status:"MESSAGE"
          };
          
          if(userData.username !== tab){
            privateChats.get(tab).push(chatMessage);
            setPrivateChats(new Map(privateChats));
          }
          stompClient.send('/user/'+tab+'/chat', {}, JSON.stringify(chatMessage));
          setUserData({...userData,"message": ""});
          setSeenList(seenList.filter(e => e !== tab))

        }
    }

    const handleClick = (e) => {
        setTab(e)
        setUser(e);
        handleSeen()
        console.log(typingList);
    }
    return (
    <div className="container">
        <div className="chat-box">
            <div className="member-list">
                <ul>
                    {[...privateChats.keys()].map((name,index)=>(
                        <li onClick={()=>{handleClick(name)}} className={`member ${tab===name && "active"}`} key={index}>{name}</li>
                    ))}
                </ul>
                <div className="chat-content">
                <ul className="chat-messages">
                {[...privateChats.get(tab)].map((chat,index)=>(
                        <li className={`message ${chat.senderName === userData.username && "self"}`} key={index}>
                            {chat.senderName !== userData.username && <div className="avatar">{tab}</div>}
                            <div className="message-data">{chat.message}</div>
                            {chat.senderName === userData.username && <div className="avatar self">{chat.senderName}</div>}
                        </li>
                ))}
                {
                seenList.includes(tab)? 
                    <div>seen</div> : <div></div>
                }
                {
                typingList.includes(tab)? 
                    <div>Typing....</div> : <div></div>
                }
                </ul>

                <div className="send-message">
                    <input type="text" className="input-message" placeholder="enter the message" value={userData.message} onChange={handleMessage} onClick={handleTyping}/> 
                    <button type="button" className="send-button" onClick={sendPrivateValue}>send</button>
                </div>
            </div>
            </div>
        </div>
    </div>
    )
}

export default ChatRoom